/* issue.js - ใบเบิก: เบิกยาออกจากคลัง (หัก Lot อัตโนมัติแบบ FIFO ใกล้หมดอายุก่อน) */
const Issue = {
  _view: null, _recent: [], selected: null, _timer: null,

  async render(view) {
    this._view = view; this.selected = null;
    view.innerHTML = `<div class="page-title">ใบเบิก</div><div id="isBody">${App.loader()}</div>`;

    const rx = await api('recentIssues', { limit: 15 }).catch(() => null);
    this._recent = (rx && rx.data) || [];
    this.paintPick();
  },

  /* ---------- เลือกยาที่จะเบิก ---------- */
  paintPick() {
    document.getElementById('isBody').innerHTML = `
      <div class="page-sub">ค้นหายาที่ต้องการเบิก ระบบจะหักจาก Lot ที่ใกล้หมดอายุก่อนให้อัตโนมัติ</div>
      <div class="search-wrap">
        <i class="bi bi-search"></i>
        <input id="isSearch" autocomplete="off" placeholder="ค้นหาชื่อยา หรือรหัสยา">
      </div>
      <div id="isList" style="margin-top:14px"></div>
      <div class="section-label">เบิกล่าสุด</div>
      <div id="isRecent">${this._recent.length ? this.recentHtml() : '<div class="hint">ยังไม่มีรายการ</div>'}</div>`;

    const input = document.getElementById('isSearch');
    input.addEventListener('input', () => {
      const q = input.value.trim();
      clearTimeout(this._timer);
      if (!q) { document.getElementById('isList').innerHTML = ''; return; }
      this._timer = setTimeout(() => this.search(q), 300);
    });
  },

  async search(q) {
    const wrap = document.getElementById('isList');
    if (!wrap) return;
    wrap.innerHTML = '<div class="hint">กำลังค้นหา...</div>';
    const r = await api('issueSearch', { q }).catch(() => null);
    const list = (r && r.data) || [];
    if (!list.length) { wrap.innerHTML = '<div class="hint">ไม่พบยาที่มีของในคลัง</div>'; return; }
    wrap.innerHTML = list.map(d => {
      const b = expiryBucket(d.min_days);
      return `<button class="menu-item" data-id="${d.drug_id}">
        ${drugThumb(d.image_url)}
        <div class="mi-body"><div class="mi-title">${App.esc(d.drug_name)}</div>
          <div class="mi-desc">คงเหลือ ${d.total}${d.unit ? ' ' + App.esc(d.unit) : ''} · ${d.lots} Lot</div></div>
        <span class="chip ${b.cls}">${b.label}</span>
      </button>`;
    }).join('');
    wrap.querySelectorAll('.menu-item').forEach(btn => btn.addEventListener('click', () => {
      const d = list.find(x => x.drug_id === btn.dataset.id);
      this.start(d);
    }));
  },

  /* ---------- ฟอร์มเบิก ---------- */
  start(drug) {
    this.selected = drug;
    const b = expiryBucket(drug.min_days);

    document.getElementById('isBody').innerHTML = `
      <button class="btn-ghost" style="width:auto;margin-bottom:16px" id="isBack"><i class="bi bi-chevron-left"></i> กลับ</button>

      <div class="card-soft" style="padding:14px 16px;margin-bottom:18px">
        <div class="d-flex align-items-start gap-2">
          ${drugThumb(drug.image_url)}
          <div style="flex:1;min-width:0"><div style="font-weight:600">${App.esc(drug.drug_name)}</div>
            <div class="hint" style="margin:2px 0 0">คงเหลือรวม ${drug.total}${drug.unit ? ' ' + App.esc(drug.unit) : ''} · ${drug.lots} Lot</div></div>
          <span class="chip ${b.cls}">${b.label}</span>
        </div>
      </div>

      <div class="field"><label>จำนวนที่เบิก <span style="color:var(--danger)">*</span></label>
        <div class="qty-row">
          <button type="button" class="qty-btn" id="isMinus">-</button>
          <input type="number" id="isQty" value="1" min="1" max="${drug.total}" inputmode="numeric">
          <span class="qty-unit">/ ${drug.total}</span>
          <button type="button" class="qty-btn" id="isPlus">+</button>
        </div></div>

      <div class="field"><label>ผู้เบิก <span style="color:var(--danger)">*</span></label>
        <input type="text" id="isRequester" autocomplete="off" placeholder="ชื่อผู้เบิก"></div>

      <div class="field"><label>หน่วยงาน / ปลายทาง</label>
        <input type="text" id="isDept" autocomplete="off" placeholder="เช่น OPD, ตึกผู้ป่วยใน"></div>

      <div class="field"><label>หมายเหตุ (ถ้ามี)</label><input type="text" id="isNote" autocomplete="off"></div>

      <button id="isConfirm" class="btn-brand"><i class="bi bi-box-arrow-right"></i> ยืนยันการเบิก</button>`;

    document.getElementById('isBack').addEventListener('click', () => this.paintPick());
    const q = document.getElementById('isQty');
    document.getElementById('isMinus').addEventListener('click', () => { q.value = Math.max(1, (parseInt(q.value) || 1) - 1); });
    document.getElementById('isPlus').addEventListener('click', () => { q.value = Math.min(drug.total, (parseInt(q.value) || 0) + 1); });
    document.getElementById('isConfirm').addEventListener('click', (e) => this.confirm(e.currentTarget));
  },

  async confirm(btn) {
    const drug = this.selected;
    const qty = parseInt(document.getElementById('isQty').value) || 0;
    const requester = document.getElementById('isRequester').value.trim();
    const department = document.getElementById('isDept').value.trim();
    const note = document.getElementById('isNote').value.trim();
    if (qty <= 0 || qty > drug.total) { App.invalid('isQty', 'จำนวนไม่ถูกต้อง'); return; }
    if (!requester) { App.invalid('isRequester', 'กรุณาระบุผู้เบิก'); return; }

    btn.disabled = true; btn.innerHTML = '<span class="spin"></span>';
    const r = await api('issueItem', { drug_id: drug.drug_id, qty, requester, department, note }).catch(() => null);
    btn.disabled = false; btn.innerHTML = '<i class="bi bi-box-arrow-right"></i> ยืนยันการเบิก';
    if (r && r.status === 'success') {
      App.toast(r.message, 'ok');
      if (navigator.vibrate) navigator.vibrate(40);
      this.selected = null;
      this.render(this._view);
    } else App.toast((r && r.message) || 'เบิกไม่สำเร็จ', 'err');
  },

  recentHtml() {
    return this._recent.map(t => `
      <div class="scan-row">
        ${drugThumb(t.image_url)}
        <div style="flex:1;min-width:0">
          <div style="font-weight:600">${App.esc(t.drug_name)}</div>
          <div class="hint" style="margin:2px 0 0">${App.esc(t.requester || '')}${t.department ? ' · ' + App.esc(t.department) : ''}${t.from_location_name ? ' · จาก ' + App.esc(t.from_location_name) : ''}</div>
        </div>
        <div class="num" style="color:var(--danger)">-${t.qty}</div>
      </div>`).join('');
  }
};

function viewIssue(view) { Issue.render(view); }
