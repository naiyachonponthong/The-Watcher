/* settings.js - หน้าตั้งค่า (พาร์ท 1: ข้อมูล รพ. + โลโก้, บัญชีผู้ใช้, คู่มือ ทำได้จริง) */
const Settings = {
  render(view) {
    const u = App.user || {};
    view.innerHTML = `
      <div class="page-title">ตั้งค่า</div>

      <button class="menu-item" data-act="account">
        <div class="mi-icon c-teal"><i class="bi bi-person-circle"></i></div>
        <div class="mi-body"><div class="mi-title">${App.esc(u.name || 'บัญชีผู้ใช้')}</div>
          <div class="mi-desc">${App.esc(u.username || '')} ${u.role ? '· ' + App.esc(u.role) : ''}</div></div>
        <i class="bi bi-chevron-right mi-arrow"></i>
      </button>

      <button class="menu-item" data-act="manual">
        <div class="mi-icon c-indigo"><i class="bi bi-book-fill"></i></div>
        <div class="mi-body"><div class="mi-title">คู่มือการใช้งาน</div>
          <div class="mi-desc">วิธีใช้งาน The Watcher</div></div>
        <i class="bi bi-chevron-right mi-arrow"></i>
      </button>

      <div class="section-label">การตั้งค่าต่าง ๆ</div>

      <button class="menu-item" data-act="hospital">
        <div class="mi-icon c-indigo"><i class="bi bi-hospital-fill"></i></div>
        <div class="mi-body"><div class="mi-title">ข้อมูลโรงพยาบาล</div>
          <div class="mi-desc">ตั้งชื่อและโลโก้ที่แสดงทั้งระบบ</div></div>
        <i class="bi bi-chevron-right mi-arrow"></i>
      </button>

      <button class="menu-item" data-act="locations">
        <div class="mi-icon c-amber"><i class="bi bi-geo-alt-fill"></i></div>
        <div class="mi-body"><div class="mi-title">สถานที่เก็บยา</div>
          <div class="mi-desc">เพิ่ม แก้ไข ไอคอน สี และจุดเริ่มต้นตอนรับเข้า</div></div>
        <i class="bi bi-chevron-right mi-arrow"></i>
      </button>

      <button class="menu-item" data-act="drugs">
        <div class="mi-icon c-coral"><i class="bi bi-capsule-pill"></i></div>
        <div class="mi-body"><div class="mi-title">รายการยา</div>
          <div class="mi-desc">ปรับรายการยาที่ใช้ค้นหาและเลือกตอนรับเข้า</div></div>
        <i class="bi bi-chevron-right mi-arrow"></i>
      </button>

      <button class="menu-item" data-act="lot">
        <div class="mi-icon c-violet"><i class="bi bi-upc-scan"></i></div>
        <div class="mi-body"><div class="mi-title">รายการที่ต้องบันทึก Lot No.</div>
          <div class="mi-desc">กำหนดรายการที่บังคับกรอก Lot ก่อนบันทึก</div></div>
        <i class="bi bi-chevron-right mi-arrow"></i>
      </button>

      <button class="menu-item" data-act="notify">
        <div class="mi-icon c-teal"><i class="bi bi-bell-fill"></i></div>
        <div class="mi-body"><div class="mi-title">การแจ้งเตือน</div>
          <div class="mi-desc">แจ้งเตือนยาใกล้หมดอายุผ่าน Telegram หรือ LINE</div></div>
        <i class="bi bi-chevron-right mi-arrow"></i>
      </button>

      <button class="menu-item" data-act="export">
        <div class="mi-icon c-indigo"><i class="bi bi-file-earmark-excel-fill"></i></div>
        <div class="mi-body"><div class="mi-title">ส่งออกข้อมูล (Excel)</div>
          <div class="mi-desc">ดาวน์โหลดรายการรับเข้า/ใบเบิก/สต็อก เป็นไฟล์ .xlsx</div></div>
        <i class="bi bi-chevron-right mi-arrow"></i>
      </button>

      <button class="menu-item" data-act="history">
        <div class="mi-icon c-amber"><i class="bi bi-clock-history"></i></div>
        <div class="mi-body"><div class="mi-title">ประวัติการเคลื่อนไหว</div>
          <div class="mi-desc">รับเข้า ย้าย และตัดจ่ายย้อนหลัง</div></div>
        <i class="bi bi-chevron-right mi-arrow"></i>
      </button>

      <button class="menu-item" data-act="report">
        <div class="mi-icon c-coral"><i class="bi bi-printer-fill"></i></div>
        <div class="mi-body"><div class="mi-title">พิมพ์รายงาน</div>
          <div class="mi-desc">รายงานยาใกล้หมดอายุ / สต็อก (พิมพ์หรือ PDF)</div></div>
        <i class="bi bi-chevron-right mi-arrow"></i>
      </button>

      ${(App.user && (App.user.permissions || []).some(x => x === '*' || x === 'stock')) ? `
      <button class="menu-item" data-act="issueform">
        <div class="mi-icon c-violet"><i class="bi bi-file-earmark-text-fill"></i></div>
        <div class="mi-body"><div class="mi-title">ตั้งค่าใบเบิก</div>
          <div class="mi-desc">หัวกระดาษและผู้ลงนามในใบเบิก</div></div>
        <i class="bi bi-chevron-right mi-arrow"></i>
      </button>` : ''}

      ${(App.user && (App.user.permissions || []).some(x => x === '*' || x === 'stock')) ? `
      <button class="menu-item" data-act="audit">
        <div class="mi-icon c-teal"><i class="bi bi-clipboard-check-fill"></i></div>
        <div class="mi-body"><div class="mi-title">ตรวจนับสต็อก / วันหมดอายุ</div>
          <div class="mi-desc">เช็คของจริง เทียบระบบ และพิมพ์รายงาน</div></div>
        <i class="bi bi-chevron-right mi-arrow"></i>
      </button>` : ''}

      ${(App.user && (App.user.permissions || []).some(x => x === '*' || x === 'stock')) ? `
      <button class="menu-item" data-act="disposeExp">
        <div class="mi-icon c-coral"><i class="bi bi-trash3-fill"></i></div>
        <div class="mi-body"><div class="mi-title">ตัดจ่ายยาหมดอายุ</div>
          <div class="mi-desc">บันทึกการทำลาย พร้อมพิมพ์ใบบันทึก</div></div>
        <i class="bi bi-chevron-right mi-arrow"></i>
      </button>` : ''}

      <button class="menu-item" data-act="usageRpt">
        <div class="mi-icon c-teal"><i class="bi bi-bar-chart-fill"></i></div>
        <div class="mi-body"><div class="mi-title">รายงานการใช้ยา</div>
          <div class="mi-desc">สรุปยาที่เบิกไปตามช่วงเวลา</div></div>
        <i class="bi bi-chevron-right mi-arrow"></i>
      </button>

      <button class="menu-item" data-act="display">
        <div class="mi-icon c-violet"><i class="bi bi-palette-fill"></i></div>
        <div class="mi-body"><div class="mi-title">การแสดงผล</div>
          <div class="mi-desc">โหมดมืด และปีพุทธศักราช</div></div>
        <i class="bi bi-chevron-right mi-arrow"></i>
      </button>

      ${(App.user && (App.user.permissions || []).indexOf('*') !== -1) ? `
      <button class="menu-item" data-act="users">
        <div class="mi-icon c-indigo"><i class="bi bi-people-fill"></i></div>
        <div class="mi-body"><div class="mi-title">จัดการผู้ใช้</div>
          <div class="mi-desc">เพิ่ม แก้ไข และรีเซ็ตรหัสผ่านผู้ใช้</div></div>
        <i class="bi bi-chevron-right mi-arrow"></i>
      </button>` : ''}

      <button id="logoutBtn" class="btn-line" style="margin-top:22px">
        <i class="bi bi-box-arrow-right"></i> ออกจากระบบ
      </button>
    `;

    view.querySelectorAll('.menu-item').forEach(b => {
      b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'hospital') this.hospital(view);
        else if (act === 'account') this.account(view);
        else if (act === 'manual') this.manual(view);
        else if (act === 'locations') Manage.locations(view);
        else if (act === 'drugs') Manage.drugs(view);
        else if (act === 'lot') Manage.lotRequired(view);
        else if (act === 'notify') this.notify(view);
        else if (act === 'export') Export.screen(view);
        else if (act === 'history') this.history(view);
        else if (act === 'report') this.report(view);
        else if (act === 'issueform') this.issueSettings(view);
        else if (act === 'audit') this.audit(view);
        else if (act === 'disposeExp') this.disposeExpired(view);
        else if (act === 'usageRpt') this.usageReport(view);
        else if (act === 'display') this.display(view);
        else if (act === 'users') this.users(view);
        else App.toast('ส่วนนี้จะมาในพาร์ทถัดไป');
      });
    });
    document.getElementById('logoutBtn').addEventListener('click', () => {
      if (confirm('ออกจากระบบ?')) App.logout();
    });
  },

  back(view) {
    return `<button class="btn-ghost" style="width:auto;margin-bottom:16px" onclick="Settings.render(document.getElementById('view'))">
      <i class="bi bi-chevron-left"></i> กลับ</button>`;
  },

  /* ---------- ข้อมูลโรงพยาบาล + โลโก้ ---------- */
  async hospital(view) {
    view.innerHTML = `${this.back(view)}<div class="page-title">ข้อมูลโรงพยาบาล</div>
      <div id="hospForm">${App.loader()}</div>`;
    const r = await api('getConfig').catch(() => null);
    const c = (r && r.config) || {};
    const logoUrl = c.logo_url || '';

    document.getElementById('hospForm').innerHTML = `
      <div class="card-soft" style="padding:18px">
        <div class="d-flex align-items-center gap-3 mb-3">
          <div class="logo-preview" id="logoPrev">
            ${logoUrl ? `<img src="${logoUrl}">` : `<i class="bi bi-hospital"></i>`}
          </div>
          <div class="flex-fill">
            <div style="font-weight:600;margin-bottom:8px">โลโก้</div>
            <div class="d-flex gap-2">
              <button id="pickLogo" class="btn-ghost" style="width:auto">เลือกรูป</button>
              ${logoUrl ? `<button id="delLogo" class="btn-ghost" style="width:auto;background:transparent;color:var(--danger)">ลบ</button>` : ''}
            </div>
            <div class="hint">PNG / JPG อัปโหลดเก็บใน Google Drive</div>
          </div>
        </div>
        <input type="file" id="logoFile" accept="image/*" style="display:none">
      </div>

      <div class="field" style="margin-top:18px">
        <label>ชื่อโรงพยาบาล</label>
        <input type="text" id="hospName" value="${App.esc(c.hospital_name || '')}" placeholder="เช่น โรงพยาบาลร้องกวาง">
      </div>

      <div class="section-label" style="margin-top:6px">ช่วงแจ้งเตือนใกล้หมดอายุ (วัน)</div>
      <div class="d-flex gap-2">
        <div class="field flex-fill"><label>เร่งด่วน (แดง)</label><input type="number" id="thCrit" min="1" value="${(c.expiry_thresholds && c.expiry_thresholds.critical) || 35}"></div>
        <div class="field flex-fill"><label>เตือน (ส้ม)</label><input type="number" id="thHigh" min="1" value="${(c.expiry_thresholds && c.expiry_thresholds.high) || 60}"></div>
        <div class="field flex-fill"><label>เฝ้าระวัง (เหลือง)</label><input type="number" id="thMed" min="1" value="${(c.expiry_thresholds && c.expiry_thresholds.medium) || 120}"></div>
      </div>
      <div class="hint" style="margin:-6px 0 16px">ต้องเรียงจากน้อยไปมาก เช่น 35 &lt; 60 &lt; 120</div>

      <button id="saveHosp" class="btn-brand">บันทึก</button>
    `;

    const fileInput = document.getElementById('logoFile');
    document.getElementById('pickLogo').addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => this.uploadLogo(fileInput));

    const del = document.getElementById('delLogo');
    if (del) del.addEventListener('click', async () => {
      if (!confirm('ลบโลโก้?')) return;
      const res = await api('removeLogo').catch(() => null);
      if (res && res.status === 'success') {
        App.branding.logo_url = '';
        App.renderHeader(); App.paintLoginBrand();
        App.toast('ลบโลโก้แล้ว', 'ok');
        this.hospital(view);
      }
    });

    document.getElementById('saveHosp').addEventListener('click', async (e) => {
      const btn = e.currentTarget;
      const name = document.getElementById('hospName').value.trim();
      if (!name) { App.invalid('hospName', 'กรุณากรอกชื่อโรงพยาบาล'); return; }
      const crit = parseInt(document.getElementById('thCrit').value) || 0;
      const high = parseInt(document.getElementById('thHigh').value) || 0;
      const med = parseInt(document.getElementById('thMed').value) || 0;
      if (!(crit > 0 && high > crit && med > high)) { App.toast('ช่วงเตือนต้องเรียงจากน้อยไปมาก', 'err'); return; }
      btn.disabled = true; btn.innerHTML = '<span class="spin"></span>';
      const res = await api('saveConfig', { config: { hospital_name: name, expiry_thresholds: { critical: crit, high: high, medium: med } } }).catch(() => null);
      btn.disabled = false; btn.textContent = 'บันทึก';
      if (res && res.status === 'success') {
        App.branding.hospital_name = name;
        App.thresholds = { critical: crit, high: high, medium: med };
        App.renderHeader(); App.paintLoginBrand();
        App.toast('บันทึกแล้ว', 'ok');
      } else {
        App.toast((res && res.message) || 'บันทึกไม่สำเร็จ', 'err');
      }
    });
  },

  async uploadLogo(fileInput) {
    const file = fileInput.files[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) { App.toast('ไฟล์ใหญ่เกิน 4MB', 'err'); return; }
    const prev = document.getElementById('logoPrev');
    prev.innerHTML = '<span class="spin" style="border-color:var(--brand-soft);border-top-color:var(--brand)"></span>';
    const base64 = await new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result);
      r.onerror = () => rej(new Error('อ่านไฟล์ไม่ได้'));
      r.readAsDataURL(file);
    });
    const result = await api('uploadLogo', { base64, filename: file.name }).catch(() => null);
    if (result && result.status === 'success') {
      App.branding.logo_url = result.logo_url;
      App.renderHeader(); App.paintLoginBrand();
      App.toast('อัปโหลดโลโก้แล้ว', 'ok');
      this.hospital(document.getElementById('view'));
    } else {
      App.toast((result && result.message) || 'อัปโหลดไม่สำเร็จ', 'err');
      prev.innerHTML = '<i class="bi bi-hospital"></i>';
    }
  },

  /* ---------- บัญชีผู้ใช้ + เปลี่ยนรหัสผ่าน ---------- */
  account(view) {
    const u = App.user || {};
    view.innerHTML = `${this.back(view)}<div class="page-title">บัญชีผู้ใช้</div>
      <div class="card-soft" style="padding:18px;margin-bottom:18px">
        <div class="field"><label>ชื่อ</label><input type="text" value="${App.esc(u.name || '')}" disabled></div>
        <div class="field"><label>ชื่อผู้ใช้</label><input type="text" value="${App.esc(u.username || '')}" disabled></div>
        <div class="field" style="margin-bottom:0"><label>บทบาท</label><input type="text" value="${App.esc((u.role || ''))}" disabled></div>
      </div>

      <div class="section-label" style="margin-top:0">เปลี่ยนรหัสผ่าน</div>
      <div class="field"><label>รหัสผ่านเดิม</label><input type="password" id="pwOld" autocomplete="current-password"></div>
      <div class="field"><label>รหัสผ่านใหม่</label><input type="password" id="pwNew" autocomplete="new-password"></div>
      <div class="field"><label>ยืนยันรหัสผ่านใหม่</label><input type="password" id="pwNew2" autocomplete="new-password"></div>
      <button id="pwSave" class="btn-brand">เปลี่ยนรหัสผ่าน</button>`;

    document.getElementById('pwSave').addEventListener('click', async (e) => {
      const oldp = document.getElementById('pwOld').value;
      const n1 = document.getElementById('pwNew').value;
      const n2 = document.getElementById('pwNew2').value;
      if (!oldp || !n1) { App.toast('กรอกรหัสผ่านให้ครบ', 'err'); return; }
      if (n1.length < 4) { App.toast('รหัสผ่านใหม่อย่างน้อย 4 ตัวอักษร', 'err'); return; }
      if (n1 !== n2) { App.toast('ยืนยันรหัสผ่านไม่ตรงกัน', 'err'); return; }
      const btn = e.currentTarget; btn.disabled = true; btn.innerHTML = '<span class="spin"></span>';
      const r = await api('changePassword', { old_password: oldp, new_password: n1 }).catch(() => null);
      btn.disabled = false; btn.textContent = 'เปลี่ยนรหัสผ่าน';
      if (r && r.status === 'success') { App.toast('เปลี่ยนรหัสผ่านแล้ว', 'ok'); this.account(view); }
      else App.toast((r && r.message) || 'เปลี่ยนไม่สำเร็จ', 'err');
    });
  },

  /* ---------- การแจ้งเตือน ---------- */
  async notify(view) {
    view.innerHTML = `${this.back(view)}<div class="page-title">การแจ้งเตือน</div>
      <div id="ntForm">${App.loader()}</div>`;
    const r = await api('getNotifyConfig').catch(() => null);
    const n = (r && r.notification) || { enabled: false, channel: 'telegram', notify_time: '08:00' };
    this._renderNotify(view, n);
  },

  _renderNotify(view, n) {
    const isTg = n.channel !== 'line';
    document.getElementById('ntForm').innerHTML = `
      <div class="card-soft d-flex align-items-center justify-content-between" style="padding:14px 16px;margin-bottom:18px">
        <div><div style="font-weight:600">เปิดการแจ้งเตือน</div>
          <div class="hint" style="margin:2px 0 0">ส่งสรุปยาใกล้หมดอายุทุกวัน</div></div>
        <div class="form-check form-switch m-0"><input class="form-check-input" type="checkbox" id="ntEnabled" ${n.enabled ? 'checked' : ''} style="transform:scale(1.3)"></div>
      </div>

      <div class="field"><label>ช่องทาง</label>
        <select id="ntChannel">
          <option value="telegram" ${isTg ? 'selected' : ''}>Telegram</option>
          <option value="line" ${!isTg ? 'selected' : ''}>LINE (Messaging API)</option>
        </select></div>

      <div class="field"><label>เวลาส่งแจ้งเตือน (ทุกวัน)</label>
        <input type="time" id="ntTime" value="${App.esc(n.notify_time || '08:00')}"></div>

      <div id="ntTg" style="display:${isTg ? 'block' : 'none'}">
        <div class="field"><label>Telegram Chat ID</label>
          <input type="text" id="ntChatId" value="${App.esc(n.telegram_chat_id || '')}" placeholder="เช่น -1001234567890"></div>
        <div class="field"><label>Telegram Bot Token</label>
          <input type="text" id="ntTgToken" autocomplete="off" placeholder="${n.has_telegram_token ? 'ตั้งค่าไว้แล้ว (เว้นว่างถ้าไม่เปลี่ยน)' : 'วาง bot token'}">
          <div class="hint">สร้างบอทด้วย @BotFather แล้วเอา token มาวาง</div></div>
      </div>

      <div id="ntLine" style="display:${isTg ? 'none' : 'block'}">
        <div class="field"><label>LINE Channel Access Token</label>
          <input type="text" id="ntLineToken" autocomplete="off" placeholder="${n.has_line_token ? 'ตั้งค่าไว้แล้ว (เว้นว่างถ้าไม่เปลี่ยน)' : 'วาง channel access token'}">
          <div class="hint">ใช้ broadcast ของ Messaging API (LINE Notify ปิดบริการแล้ว)</div></div>
      </div>

      <button id="ntSave" class="btn-brand">บันทึก</button>
      <button id="ntTest" class="btn-ghost" style="margin-top:12px"><i class="bi bi-send"></i> ส่งข้อความทดสอบ</button>
      <p class="hint" style="margin-top:14px">หลังบันทึกครั้งแรก ให้เปิด Apps Script รันฟังก์ชัน setupNotifications หนึ่งครั้งเพื่ออนุญาตสิทธิ์ส่งข้อความ</p>`;

    document.getElementById('ntChannel').addEventListener('change', (e) => {
      const tg = e.target.value !== 'line';
      document.getElementById('ntTg').style.display = tg ? 'block' : 'none';
      document.getElementById('ntLine').style.display = tg ? 'none' : 'block';
    });

    document.getElementById('ntSave').addEventListener('click', async (e) => {
      const patch = {
        enabled: document.getElementById('ntEnabled').checked,
        channel: document.getElementById('ntChannel').value,
        notify_time: document.getElementById('ntTime').value || '08:00'
      };
      const tgToken = document.getElementById('ntTgToken'); if (tgToken && tgToken.value.trim()) patch.telegram_bot_token = tgToken.value.trim();
      const chatId = document.getElementById('ntChatId'); if (chatId) patch.telegram_chat_id = chatId.value.trim();
      const lineToken = document.getElementById('ntLineToken'); if (lineToken && lineToken.value.trim()) patch.line_token = lineToken.value.trim();

      const btn = e.currentTarget; btn.disabled = true; btn.innerHTML = '<span class="spin"></span>';
      const r = await api('saveNotifyConfig', { notification: patch }).catch(() => null);
      btn.disabled = false; btn.textContent = 'บันทึก';
      if (r && r.status === 'success') { App.toast('บันทึกการแจ้งเตือนแล้ว', 'ok'); this.notify(view); }
      else App.toast((r && r.message) || 'บันทึกไม่สำเร็จ', 'err');
    });

    document.getElementById('ntTest').addEventListener('click', async (e) => {
      const btn = e.currentTarget; btn.disabled = true; btn.innerHTML = '<span class="spin"></span>';
      const r = await api('testNotification').catch(() => null);
      btn.disabled = false; btn.innerHTML = '<i class="bi bi-send"></i> ส่งข้อความทดสอบ';
      if (r && r.status === 'success') App.toast('ส่งข้อความทดสอบแล้ว', 'ok');
      else App.toast((r && r.message) || 'ส่งไม่สำเร็จ', 'err');
    });
  },

  /* ---------- คู่มือ (ละเอียด แบบ accordion) ---------- */
  manual(view) {
    const sections = [
      { ic: 'bi-info-circle-fill', t: 'ภาพรวมระบบ', h: `
        <p>The Watcher ช่วยติดตามยาคงคลังแยกตาม <b>สถานที่เก็บ</b> <b>เลขล็อต (Lot)</b> และ <b>วันหมดอายุ</b> พร้อมเตือนยาที่ใกล้หมดอายุล่วงหน้า</p>
        <p>เมนูหลักอยู่แถบล่าง (บนคอมจะอยู่ด้านซ้าย) มี 6 ส่วน:</p>
        <ul>
          <li><b>หน้าหลัก</b> สรุปยาใกล้หมดอายุ + ค้นหา</li>
          <li><b>ยาแต่ละจุด</b> ดูยาคงเหลือแยกสถานที่</li>
          <li><b>รับเข้า</b> (ปุ่มกลาง) เพิ่มยาเข้าสต็อก</li>
          <li><b>ใบเบิก</b> เบิกยาออกหลายรายการต่อใบ + พิมพ์ใบเบิก</li>
          <li><b>แลกยา</b> ย้ายยาระหว่างสถานที่</li>
          <li><b>ตั้งค่า</b> ข้อมูล รพ. รายการยา การแจ้งเตือน ฯลฯ</li>
        </ul>` },

      { ic: 'bi-box-arrow-in-right', t: 'เริ่มต้น และบทบาทผู้ใช้', h: `
        <p>เข้าสู่ระบบด้วยชื่อผู้ใช้และรหัสผ่าน เปลี่ยนรหัสผ่านได้ที่ <b>ตั้งค่า > บัญชีผู้ใช้</b></p>
        <p>บทบาทผู้ใช้:</p>
        <ul>
          <li><b>ผู้ดูแลระบบ</b> ใช้ได้ทุกส่วน รวมตั้งค่า รพ. และการแจ้งเตือน</li>
          <li><b>เภสัชกร</b> จัดการสต็อก รายการยา รับเข้า และแลกยา</li>
          <li><b>เจ้าหน้าที่</b> รับเข้าและดูข้อมูลได้</li>
        </ul>` },

      { ic: 'bi-gear-fill', t: 'ตั้งค่าก่อนใช้ครั้งแรก', h: `
        <p>แนะนำทำตามลำดับนี้ที่หน้า <b>ตั้งค่า</b>:</p>
        <ol>
          <li><b>ข้อมูลโรงพยาบาล</b> ตั้งชื่อและอัปโหลดโลโก้</li>
          <li><b>สถานที่เก็บยา</b> เพิ่ม/แก้สถานที่ เลือกไอคอนและสี ตั้ง <span class="tag">จุดเริ่มต้นรับเข้า</span> และจัดลำดับด้วยปุ่มขึ้น/ลง (บันทึกอัตโนมัติ)</li>
          <li><b>รายการยา</b> เพิ่มยา ใส่ชื่อ บาร์โค้ด หน่วย รูปยา และจุดเก็บเริ่มต้น</li>
          <li><b>รายการที่ต้องบันทึก Lot No.</b> เปิดสวิตช์ยาที่ต้องบังคับกรอก Lot</li>
        </ol>` },

      { ic: 'bi-upc-scan', t: 'การสแกนบาร์โค้ด', h: `
        <p><b>เครื่องยิงบาร์โค้ด (ต่อ USB/บลูทูธ)</b></p>
        <ul>
          <li>ตั้งเครื่องให้ส่ง Enter ปิดท้าย (ค่าเริ่มต้นส่วนใหญ่เป็นแบบนี้)</li>
          <li>แตะที่ช่องบาร์โค้ดให้มีเคอร์เซอร์ แล้วยิงได้เลย ตัวเลขจะค้างในช่อง</li>
        </ul>
        <p><b>กล้องมือถือ</b></p>
        <ul>
          <li>กดปุ่มกล้อง แล้วอนุญาตการใช้กล้อง (ต้องเปิดผ่าน https)</li>
          <li>เล็งบาร์โค้ดให้อยู่ในกรอบ รองรับทั้ง QR และบาร์โค้ดแท่ง</li>
        </ul>` },

      { ic: 'bi-box-arrow-in-down', t: 'การรับเข้า (เพิ่มยาเข้าสต็อก)', h: `
        <ol>
          <li>แตะปุ่มกลาง <b>รับเข้า</b></li>
          <li>เลือกยา: ยิงบาร์โค้ด หรือสแกนกล้อง หรือค้นหาจากรายการ</li>
          <li>กรอก <b>Lot</b> (ถ้ายานั้นบังคับ), <b>วันหมดอายุ</b>, <b>จำนวน</b> (ปุ่ม +/-), และเลือก <b>สถานที่</b></li>
          <li>กด <b>บันทึกรับเข้า</b></li>
        </ol>
        <p>ระบบจะ <b>รวมเข้ากับล็อตเดิมอัตโนมัติ</b> ถ้า ยา/จุด/Lot/วันหมดอายุ ตรงกัน</p>
        <p>ดู "รับเข้าล่าสุด" ด้านล่าง และกด <b>ส่งออกวันนี้</b> เพื่อดาวน์โหลดรายการของวันนั้นเป็น Excel</p>` },

      { ic: 'bi-house-door-fill', t: 'หน้าหลัก (อ่านค่าอย่างไร)', h: `
        <p>การ์ดสรุป 4 ช่วงตามวันที่เหลือก่อนหมดอายุ:</p>
        <ul>
          <li><b>ภายใน 35 วัน</b> (แดง) เร่งด่วน รวมยาที่หมดอายุแล้ว</li>
          <li><b>ภายใน 60 วัน</b> (ส้ม)</li>
          <li><b>ภายใน 120 วัน</b> (เหลือง)</li>
          <li><b>มากกว่า 120 วัน</b> (เขียว) ปลอดภัย</li>
        </ul>
        <p>แตะการ์ดเพื่อกรองรายการเฉพาะช่วงนั้น</p>
        <p>ช่องค้นหา: พิมพ์ชื่อยา สถานที่ หรือ Lot</p>
        <p>ปุ่ม <b>ดูแยกสถานที่</b>: สรุปจำนวนใกล้หมดอายุของแต่ละสถานที่</p>` },

      { ic: 'bi-geo-alt-fill', t: 'ยาแต่ละจุด', h: `
        <p>แสดงการ์ดของแต่ละสถานที่ พร้อมจำนวนรายการและจำนวนรวม</p>
        <ol>
          <li>แตะการ์ดเพื่อดูรายการยาในจุดนั้น เรียงตามวันใกล้หมดอายุ</li>
          <li>แตะ <b>ย้าย / แลกยา</b> ที่รายการเพื่อย้ายไปจุดอื่น</li>
        </ol>
        <p>การ์ด <b>รวมทุกสถานที่</b> แสดงผลรวมทั้งระบบ</p>` },

      { ic: 'bi-arrow-left-right', t: 'แลกยา / ย้ายระหว่างจุด', h: `
        <ol>
          <li>ค้นหายาที่ต้องการย้าย แล้วเลือกรายการ</li>
          <li>เลือก <b>สถานที่ปลายทาง</b></li>
          <li>ระบุ <b>จำนวน</b> ที่ย้าย (ไม่เกินที่มี)</li>
          <li>กด <b>ยืนยันการย้าย</b></li>
        </ol>
        <p>ระบบลดของจากต้นทางและเพิ่มที่ปลายทางให้อัตโนมัติ พร้อมเก็บประวัติไว้ที่ "ย้ายล่าสุด"</p>` },

      { ic: 'bi-dash-circle', t: 'ตัดจ่าย / ทิ้งยา', h: `
        <p>ใช้ลดจำนวนยาเมื่อเบิกใช้ หมดอายุ หรือชำรุด</p>
        <ol>
          <li>ไปที่ <b>ยาแต่ละจุด</b> แล้วเลือกสถานที่</li>
          <li>แตะ <b>ตัดจ่าย / ทิ้ง</b> ที่รายการยา</li>
          <li>เลือกเหตุผล ระบุจำนวน แล้วกดยืนยัน</li>
        </ol>
        <p>รายการจะถูกหักออกจากสต็อกและบันทึกไว้ในประวัติ</p>` },

      { ic: 'bi-bell-fill', t: 'การแจ้งเตือน (Telegram / LINE)', h: `
        <ol>
          <li>ไป <b>ตั้งค่า > การแจ้งเตือน</b> เปิดสวิตช์</li>
          <li>เลือกช่องทาง แล้วใส่ token และ chat id ตั้งเวลาส่งรายวัน</li>
          <li>กด <b>บันทึก</b> แล้วกด <b>ส่งข้อความทดสอบ</b></li>
          <li>เปิด Apps Script รันฟังก์ชัน <span class="tag">setupNotifications</span> หนึ่งครั้ง เพื่ออนุญาตสิทธิ์และสร้างตัวจับเวลารายวัน</li>
        </ol>
        <p>ระบบจะส่งสรุปยาใกล้หมดอายุทุกวันตามเวลาที่ตั้ง</p>
        <p>หมายเหตุ: Telegram สร้างบอทด้วย @BotFather ส่วน LINE ใช้ Channel Access Token (LINE Notify ปิดบริการแล้ว)</p>` },

      { ic: 'bi-file-earmark-excel-fill', t: 'ส่งออกข้อมูล (Excel)', h: `
        <ul>
          <li>หน้ารับเข้า: ปุ่ม <b>ส่งออกวันนี้</b></li>
          <li>ตั้งค่า > ส่งออกข้อมูล: เลือกประเภท (รับเข้า / การเคลื่อนไหวทั้งหมด / สต็อกคงเหลือ) และช่วงวันที่</li>
        </ul>
        <p>ได้ไฟล์ .xlsx เปิดด้วย Excel หรือ Google Sheets รองรับภาษาไทย</p>` },

      { ic: 'bi-laptop', t: 'ใช้งานบนคอมพิวเตอร์', h: `
        <p>เปิดลิงก์เดิมบนเบราว์เซอร์คอม ระบบจะสลับเป็นเลย์เอาต์เดสก์ท็อปอัตโนมัติ เมนูย้ายไปด้านซ้าย เนื้อหากว้างขึ้น ใช้ฟังก์ชันได้เหมือนมือถือทุกอย่าง</p>
        <p>เครื่องยิงบาร์โค้ดแบบ USB เสียบกับคอมแล้วใช้ได้ทันที</p>` },

      { ic: 'bi-people-fill', t: 'ประวัติ และจัดการผู้ใช้ (แอดมิน)', h: `
        <p><b>ประวัติการเคลื่อนไหว</b> (ตั้งค่า) ดูรายการรับเข้า ย้าย และตัดจ่ายย้อนหลัง กรองตามประเภทได้</p>
        <p><b>จัดการผู้ใช้</b> (เฉพาะผู้ดูแล) เพิ่ม/แก้ไขผู้ใช้ กำหนดบทบาท รีเซ็ตรหัสผ่าน และเปิด/ปิดการใช้งาน</p>
        <p><b>ช่วงแจ้งเตือน</b> ปรับจำนวนวัน แดง/ส้ม/เหลือง ได้ที่ ตั้งค่า &gt; ข้อมูลโรงพยาบาล</p>` },

      { ic: 'bi-lightbulb-fill', t: 'เคล็ดลับ และแก้ปัญหา', h: `
        <ul>
          <li>อัปเดตแล้วหน้าจอไม่เปลี่ยน: รีเฟรชแบบล้าง cache (hard refresh)</li>
          <li>เปิดกล้องไม่ได้: ต้องเปิดผ่าน https และอนุญาตสิทธิ์กล้องในเบราว์เซอร์</li>
          <li>ยิงบาร์โค้ดแล้วเลขหาย: ตรวจว่าตั้งเครื่องส่ง Enter ปิดท้าย และเคอร์เซอร์อยู่ในช่องบาร์โค้ด</li>
          <li>บาร์โค้ดซ้ำ: ระบบจะเตือนและไม่บันทึกซ้ำ (ช่องจะเป็นขอบแดง)</li>
          <li>ช่องจำเป็นไม่ครบ: จะมีขอบแดงและข้อความเตือน</li>
        </ul>` }
    ];

    view.innerHTML = `${this.back(view)}<div class="page-title">คู่มือการใช้งาน</div>
      <div class="page-sub">แตะหัวข้อเพื่อดูรายละเอียด</div>
      <div id="accList">` +
      sections.map((s, i) => `
        <div class="acc-item ${i === 0 ? 'open' : ''}">
          <button class="acc-head"><span><i class="bi ${s.ic}" style="color:var(--brand-strong);margin-right:9px"></i>${s.t}</span><i class="bi bi-chevron-right chev"></i></button>
          <div class="acc-body">${s.h}</div>
        </div>`).join('') + `</div>`;

    view.querySelectorAll('.acc-head').forEach(b =>
      b.addEventListener('click', () => b.parentElement.classList.toggle('open')));
  },

  /* ---------- ประวัติการเคลื่อนไหว ---------- */
  async history(view) {
    view.innerHTML = `${this.back()}<div class="page-title">ประวัติการเคลื่อนไหว</div>
      <div class="hist-filter" id="histFilter">
        <button class="hchip on" data-t="">ทั้งหมด</button>
        <button class="hchip" data-t="receive">รับเข้า</button>
        <button class="hchip" data-t="exchange">ย้าย</button>
        <button class="hchip" data-t="issue">เบิก</button>
        <button class="hchip" data-t="dispose">ตัดจ่าย</button>
      </div>
      <div id="histList">${App.loader()}</div>`;

    const load = async (type) => {
      document.getElementById('histList').innerHTML = App.loader();
      const r = await api('getHistory', { type, limit: 80 }).catch(() => null);
      const list = (r && r.data) || [];
      document.getElementById('histList').innerHTML = list.length
        ? list.map(t => this.histRow(t)).join('')
        : '<div class="empty-state"><div class="es-title">ยังไม่มีประวัติ</div></div>';
    };
    view.querySelectorAll('.hchip').forEach(b => b.addEventListener('click', () => {
      view.querySelectorAll('.hchip').forEach(x => x.classList.remove('on'));
      b.classList.add('on'); load(b.dataset.t);
    }));
    load('');
  },

  histRow(t) {
    const meta = {
      receive:         { ic: 'bi-box-arrow-in-down',  c: 'var(--brand-strong)', label: 'รับเข้า' },
      exchange:        { ic: 'bi-arrow-left-right',    c: '#2563eb',             label: 'ย้าย' },
      issue:           { ic: 'bi-box-arrow-right',     c: 'var(--danger)',       label: 'เบิก' },
      dispose:         { ic: 'bi-dash-circle',         c: 'var(--danger)',       label: 'ตัดจ่าย' },
      dispose_expired: { ic: 'bi-trash3',              c: 'var(--danger)',       label: 'ตัดจ่ายหมดอายุ' },
      adjust:          { ic: 'bi-sliders',             c: '#8b5cf6',             label: 'ปรับยอด' }
    }[t.type] || { ic: 'bi-dot', c: 'var(--muted)', label: t.type };
    let route = '';
    if (t.type === 'receive') route = '→ ' + App.esc(t.to_location_name || '');
    else if (t.type === 'exchange') route = App.esc(t.from_location_name || '') + ' → ' + App.esc(t.to_location_name || '');
    else if (t.type === 'issue') route = App.esc(t.from_location_name || '') + (t.requester ? ' · ' + App.esc(t.requester) : '') + (t.department ? ' · ' + App.esc(t.department) : '') + (t.slip_no ? ' · เลขที่ ' + App.esc(t.slip_no) : '');
    else if (t.type === 'dispose') route = App.esc(t.from_location_name || '') + (t.reason ? ' · ' + App.esc(t.reason) : '');
    else if (t.type === 'adjust') route = App.esc(t.from_location_name || '') + (t.note ? ' · ' + App.esc(t.note) : '');
    const when = t.created_at ? new Date(t.created_at).toLocaleString('th-TH', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '';
    return `<div class="scan-row">
      <div class="mi-icon" style="background:transparent;color:${meta.c};flex:none"><i class="bi ${meta.ic}"></i></div>
      <div style="flex:1;min-width:0">
        <div style="font-weight:600">${App.esc(t.drug_name)} <span class="hint" style="font-weight:400">· ${meta.label}</span></div>
        <div class="hint" style="margin:2px 0 0">${route}${t.lot_no ? ' · Lot ' + App.esc(t.lot_no) : ''}</div>
      </div>
      <div style="text-align:right">
        <div class="num" style="font-weight:600">${t.qty}</div>
        <div class="hint" style="margin:2px 0 0">${when}</div>
      </div></div>`;
  },

  /* ---------- จัดการผู้ใช้ (แอดมิน) ---------- */
  async users(view) {
    view.innerHTML = `${this.back()}<div class="page-title">จัดการผู้ใช้</div>
      <button id="addUser" class="btn-ghost" style="width:auto;margin-bottom:16px"><i class="bi bi-plus-lg"></i> เพิ่มผู้ใช้</button>
      <div id="userList">${App.loader()}</div>`;
    document.getElementById('addUser').addEventListener('click', () => this.userForm(view, null));
    const r = await api('getUsers').catch(() => null);
    const list = (r && r.data) || [];
    const roleName = { admin: 'ผู้ดูแลระบบ', pharmacist: 'เภสัชกร', staff: 'เจ้าหน้าที่' };
    document.getElementById('userList').innerHTML = list.map(u => `
      <button class="menu-item" data-id="${u.id}">
        <div class="mi-icon"><i class="bi bi-person-fill"></i></div>
        <div class="mi-body"><div class="mi-title">${App.esc(u.name || u.username)} ${u.active ? '' : '<span class="hint" style="font-weight:400">(ปิดใช้งาน)</span>'}</div>
          <div class="mi-desc">${App.esc(u.username)} · ${roleName[u.role] || u.role}</div></div>
        <i class="bi bi-chevron-right mi-arrow"></i>
      </button>`).join('');
    view.querySelectorAll('.menu-item').forEach(b => b.addEventListener('click', () => {
      const u = list.find(x => x.id === b.dataset.id); this.userForm(view, u);
    }));
  },

  userForm(view, u) {
    const isEdit = !!u;
    u = u || { username: '', name: '', role: 'staff', active: true };
    view.innerHTML = `
      <button class="btn-ghost" style="width:auto;margin-bottom:16px" id="uBack"><i class="bi bi-chevron-left"></i> กลับ</button>
      <div class="page-title">${isEdit ? 'แก้ไขผู้ใช้' : 'เพิ่มผู้ใช้'}</div>
      <div class="field"><label>ชื่อผู้ใช้ (สำหรับเข้าระบบ)</label><input type="text" id="uUser" value="${App.esc(u.username)}" autocomplete="off"></div>
      <div class="field"><label>ชื่อ-สกุล</label><input type="text" id="uName" value="${App.esc(u.name || '')}" placeholder="เว้นว่างใช้ชื่อตามบทบาท"></div>
      <div class="field"><label>บทบาท</label><select id="uRole">
        <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>ผู้ดูแลระบบ</option>
        <option value="pharmacist" ${u.role === 'pharmacist' ? 'selected' : ''}>เภสัชกร</option>
        <option value="staff" ${u.role === 'staff' ? 'selected' : ''}>เจ้าหน้าที่</option>
      </select></div>
      <div class="field"><label>รหัสผ่าน${isEdit ? ' (เว้นว่างถ้าไม่เปลี่ยน)' : ''}</label>
        <input type="text" id="uPass" autocomplete="off" placeholder="${isEdit ? 'ตั้งใหม่ถ้าต้องการ' : 'อย่างน้อย 4 ตัวอักษร'}"></div>
      ${isEdit ? `<div class="card-soft d-flex align-items-center justify-content-between" style="padding:14px 16px;margin-bottom:18px"><div style="font-weight:600">เปิดใช้งาน</div><div class="form-check form-switch m-0"><input class="form-check-input" type="checkbox" id="uActive" ${u.active ? 'checked' : ''} style="transform:scale(1.3)"></div></div>` : ''}
      <button id="uSave" class="btn-brand">${isEdit ? 'บันทึก' : 'เพิ่มผู้ใช้'}</button>
      ${isEdit ? '<button id="uDel" class="btn-line" style="margin-top:12px"><i class="bi bi-trash3"></i> ลบผู้ใช้</button>' : ''}`;

    document.getElementById('uBack').addEventListener('click', () => this.users(view));
    document.getElementById('uSave').addEventListener('click', async (e) => {
      const payload = {
        id: u.id,
        username: document.getElementById('uUser').value.trim(),
        name: document.getElementById('uName').value.trim(),
        role: document.getElementById('uRole').value,
        password: document.getElementById('uPass').value
      };
      const act = document.getElementById('uActive'); if (act) payload.active = act.checked;
      if (!payload.username) { App.invalid('uUser', 'กรุณากรอกชื่อผู้ใช้'); return; }
      if (!isEdit && payload.password.length < 4) { App.invalid('uPass', 'รหัสผ่านอย่างน้อย 4 ตัวอักษร'); return; }
      const btn = e.currentTarget; btn.disabled = true; btn.innerHTML = '<span class="spin"></span>';
      const r = await api('saveUser', { user: payload }).catch(() => null);
      btn.disabled = false; btn.textContent = isEdit ? 'บันทึก' : 'เพิ่มผู้ใช้';
      if (r && r.status === 'success') { App.toast(r.message, 'ok'); this.users(view); }
      else App.toast((r && r.message) || 'บันทึกไม่สำเร็จ', 'err');
    });
    const del = document.getElementById('uDel');
    if (del) del.addEventListener('click', async () => {
      if (!confirm(`ลบผู้ใช้ "${u.username}"?`)) return;
      const r = await api('deleteUser', { id: u.id }).catch(() => null);
      if (r && r.status === 'success') { App.toast('ลบแล้ว', 'ok'); this.users(view); }
      else App.toast((r && r.message) || 'ลบไม่สำเร็จ', 'err');
    });
  },

  /* ---------- การแสดงผล (โหมดมืด / พ.ศ.) ---------- */
  display(view) {
    const isAdmin = App.user && (App.user.permissions || []).indexOf('*') !== -1;
    view.innerHTML = `${this.back()}<div class="page-title">การแสดงผล</div>
      <div class="card-soft d-flex align-items-center justify-content-between" style="padding:14px 16px;margin-bottom:12px">
        <div><div style="font-weight:600">โหมดมืด</div><div class="hint" style="margin:2px 0 0">ปรับธีมให้สบายตา</div></div>
        <div class="form-check form-switch m-0"><input class="form-check-input" type="checkbox" id="dkDark" ${App.isDark() ? 'checked' : ''} style="transform:scale(1.3)"></div>
      </div>
      ${isAdmin ? `<div class="card-soft d-flex align-items-center justify-content-between" style="padding:14px 16px">
        <div><div style="font-weight:600">แสดงปีเป็น พ.ศ.</div><div class="hint" style="margin:2px 0 0">เช่น 30/09/2569</div></div>
        <div class="form-check form-switch m-0"><input class="form-check-input" type="checkbox" id="dkBE" ${App.beYear ? 'checked' : ''} style="transform:scale(1.3)"></div>
      </div>` : ''}`;

    document.getElementById('dkDark').addEventListener('change', e => App.setTheme(e.target.checked));
    const be = document.getElementById('dkBE');
    if (be) be.addEventListener('change', async e => {
      const v = e.target.checked;
      const r = await api('saveConfig', { config: { display_be: v } }).catch(() => null);
      if (r && r.status === 'success') { App.beYear = v; App.toast('บันทึกแล้ว', 'ok'); }
      else { e.target.checked = !v; App.toast('บันทึกไม่สำเร็จ', 'err'); }
    });
  },

  /* ---------- ตรวจนับสต็อก / เช็ควันหมดอายุ ---------- */
  async audit(view) {
    view.innerHTML = `${this.back()}<div class="page-title">ตรวจนับสต็อก / วันหมดอายุ</div>
      <div class="page-sub">เลือกสถานที่ กรอกจำนวนที่นับจริง แล้วพิมพ์รายงาน</div>
      <div class="field"><label>สถานที่</label><select id="adLoc"><option value="">กำลังโหลด...</option></select></div>
      <div id="adSummary"></div>
      <div id="adItems"></div>
      <div id="adActions" class="d-none">
        <button id="adSaveAll" class="btn-ghost" style="width:auto"><i class="bi bi-floppy-fill"></i> บันทึกทั้งหมด</button>
        <button id="adPrint" class="btn-brand" style="margin-top:10px"><i class="bi bi-printer-fill"></i> พิมพ์รายงาน</button>
      </div>`;
    const rl = await api('getLocations').catch(() => null);
    const locs = ((rl && rl.data) || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    const sel = document.getElementById('adLoc');
    sel.innerHTML = '<option value="">เลือกสถานที่</option>' + locs.map(l => `<option value="${l.id}">${App.esc(l.name)}</option>`).join('');
    sel.addEventListener('change', () => this.auditLoad(sel.value, locs.find(l => l.id === sel.value)));
  },

  async auditLoad(locId, loc) {
    const wrap = document.getElementById('adItems');
    const summary = document.getElementById('adSummary');
    const actions = document.getElementById('adActions');
    if (!locId) { wrap.innerHTML = ''; summary.innerHTML = ''; actions.classList.add('d-none'); return; }
    wrap.innerHTML = App.loader(); summary.innerHTML = ''; actions.classList.add('d-none');

    const r = await api('getLocationItems', { location_id: locId }).catch(() => null);
    const list = (r && r.data) || [];
    if (!list.length) { wrap.innerHTML = '<div class="empty-state"><div class="es-title">ไม่มียาในจุดนี้</div></div>'; return; }

    const thr = App.thresholds || { critical: 35, high: 60, medium: 120 };
    const expired  = list.filter(it => it.days !== null && it.days < 0).length;
    const critical = list.filter(it => it.days !== null && it.days >= 0 && it.days <= thr.critical).length;
    const high     = list.filter(it => it.days !== null && it.days > thr.critical && it.days <= thr.high).length;
    const ok       = list.filter(it => it.days === null || it.days > thr.high).length;

    summary.innerHTML = `<div class="au-summary">
      ${expired  ? `<span class="au-sum-chip au-s-expired"><i class="bi bi-x-circle-fill"></i> หมดอายุ ${expired} รายการ</span>` : ''}
      ${critical ? `<span class="au-sum-chip au-s-critical"><i class="bi bi-exclamation-triangle-fill"></i> เร่งด่วน ${critical} รายการ</span>` : ''}
      ${high     ? `<span class="au-sum-chip au-s-high"><i class="bi bi-clock-fill"></i> ใกล้หมด ${high} รายการ</span>` : ''}
      <span class="au-sum-chip au-s-ok"><i class="bi bi-check-circle-fill"></i> ปกติ ${ok} รายการ</span>
    </div>`;

    wrap.innerHTML = list.map(it => {
      const b = expiryBucket(it.days);
      const rowCls = it.days === null ? '' : it.days < 0 ? 'au-row-expired' : it.days <= thr.critical ? 'au-row-critical' : it.days <= thr.high ? 'au-row-high' : '';
      return `<div class="au-row ${rowCls}" data-id="${it.id}">
        <div class="aur-top">
          <div class="aur-name">${App.esc(it.drug_name)}</div>
          ${it.days !== null ? `<span class="chip ${b.cls}">${b.label}</span>` : ''}
        </div>
        <div class="aur-meta">
          ${it.lot_no ? `<span>Lot&nbsp;${App.esc(it.lot_no)}</span>` : ''}
          ${it.expiry_date ? `<span>${fmtDate(it.expiry_date)}</span>` : ''}
          <span>ระบบมี <strong>${it.qty}</strong>${it.unit ? '&nbsp;' + App.esc(it.unit) : ''}</span>
        </div>
        <div class="aur-count">
          <input type="number" class="ad-count" data-id="${it.id}" min="0" placeholder="จำนวนที่นับจริง">
          <button class="btn-ghost ad-save" data-id="${it.id}" style="width:auto;padding:8px 14px">บันทึก</button>
        </div>
      </div>`;
    }).join('');

    actions.classList.remove('d-none');

    const doSave = async (id) => {
      const inp = wrap.querySelector(`.ad-count[data-id="${id}"]`);
      const btn = wrap.querySelector(`.ad-save[data-id="${id}"]`);
      const v = inp.value.trim();
      if (v === '') { App.toast('กรอกจำนวนที่นับได้', 'err'); inp.focus(); return false; }
      const actual = parseInt(v);
      if (isNaN(actual) || actual < 0) { App.toast('จำนวนไม่ถูกต้อง', 'err'); return false; }
      btn.disabled = true; btn.innerHTML = '<span class="spin"></span>';
      const res = await api('adjustItem', { item_id: id, actual_qty: actual }).catch(() => null);
      if (res && res.status === 'success') { App.toast(res.message || 'บันทึกแล้ว', 'ok'); btn.innerHTML = '<i class="bi bi-check2"></i>'; return true; }
      btn.disabled = false; btn.textContent = 'บันทึก'; App.toast((res && res.message) || 'ไม่สำเร็จ', 'err'); return false;
    };

    wrap.querySelectorAll('.ad-save').forEach(b => b.addEventListener('click', () => doSave(b.dataset.id)));

    document.getElementById('adSaveAll').onclick = async () => {
      const filled = [...wrap.querySelectorAll('.ad-count')].filter(i => i.value.trim() !== '');
      if (!filled.length) { App.toast('ยังไม่ได้กรอกจำนวน', 'err'); return; }
      for (const inp of filled) await doSave(inp.dataset.id);
    };

    document.getElementById('adPrint').onclick = () => {
      const withActual = list.map(it => {
        const inp = wrap.querySelector(`.ad-count[data-id="${it.id}"]`);
        return Object.assign({}, it, { _actual: inp ? inp.value.trim() : '' });
      });
      this.auditPrint(loc ? loc.name : locId, withActual);
    };
  },

  auditPrint(locName, items) {
    const hospital = (App.branding && App.branding.hospital_name) || '';
    const thr = App.thresholds || { critical: 35, high: 60 };
    const today = new Date();
    const beYear = today.getFullYear() + (App.beYear ? 543 : 0);
    const months = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
    const dateStr = `${today.getDate()} ${months[today.getMonth()]} ${beYear}`;
    const esc = s => String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

    const tableRows = items.map((it, idx) => {
      const actual = it._actual;
      const diff = actual !== '' ? Number(actual) - it.qty : '';
      let rowBg = '';
      if (it.days !== null) {
        if (it.days < 0) rowBg = 'background:#ffe4e4;';
        else if (it.days <= thr.critical) rowBg = 'background:#ffe8d6;';
        else if (it.days <= thr.high)     rowBg = 'background:#fff8d6;';
      }
      const expiryText = it.expiry_date ? fmtDate(it.expiry_date) : '-';
      const expiryNote = it.days !== null ? (it.days < 0 ? ' ⚠' : ` (${it.days}ว)`) : '';
      const diffStyle  = diff !== '' ? (diff < 0 ? 'color:#c00;font-weight:bold;' : diff > 0 ? 'color:#090;' : '') : '';
      const diffText   = diff !== '' ? (diff > 0 ? `+${diff}` : String(diff)) : '';
      return `<tr style="${rowBg}">
        <td style="text-align:center">${idx + 1}</td>
        <td>${esc(it.drug_name)}</td>
        <td style="text-align:center">${esc(it.lot_no || '-')}</td>
        <td style="text-align:center">${esc(expiryText)}${esc(expiryNote)}</td>
        <td style="text-align:center">${esc(it.unit || '')}</td>
        <td style="text-align:center">${it.qty}</td>
        <td style="text-align:center">${esc(actual)}</td>
        <td style="text-align:center;${diffStyle}">${esc(diffText)}</td>
        <td></td>
      </tr>`;
    }).join('');

    const pad = Math.max(0, 15 - items.length);
    const emptyRows = pad > 0 ? Array(pad).fill('<tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>').join('') : '';

    const html = `<!DOCTYPE html><html lang="th"><head><meta charset="utf-8">
<title>รายงานตรวจนับสต็อก</title>
<link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Sarabun',sans-serif;font-size:13px;color:#000;background:#fff;padding:16mm 14mm}
h1{font-size:17px;font-weight:700;text-align:center;margin-bottom:3px}
.hsub{font-size:13px;text-align:center;color:#555;margin-bottom:14px}
.info-row{display:flex;justify-content:space-between;margin-bottom:10px;font-size:13px}
.legend{display:flex;gap:16px;margin-bottom:10px;font-size:11.5px;flex-wrap:wrap}
.leg{display:inline-flex;align-items:center;gap:5px}
.leg-dot{width:12px;height:12px;border-radius:2px;border:1px solid rgba(0,0,0,.12)}
table{width:100%;border-collapse:collapse;margin-bottom:18px;font-size:12px}
th{background:#1a237e;color:#fff;padding:6px 5px;text-align:center;font-weight:600;border:1px solid #999;font-size:12px}
td{padding:5px;border:1px solid #ccc;vertical-align:middle;line-height:1.4}
.sig-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:32px}
.sig-block{border-top:1px solid #000;padding-top:8px;text-align:center;font-size:12px}
.sig-title{margin-bottom:48px;font-size:12px;color:#555}
@media print{@page{size:A4;margin:12mm 10mm}body{padding:0}}
</style></head><body>
<h1>รายงานการตรวจนับสต็อกและตรวจสอบวันหมดอายุ</h1>
<div class="hsub">${esc(hospital)}</div>
<div class="info-row">
  <span>สถานที่: <strong>${esc(locName)}</strong></span>
  <span>วันที่ตรวจ: <strong>${dateStr}</strong></span>
  <span>ทั้งหมด: <strong>${items.length} รายการ</strong></span>
</div>
<div class="legend">
  <span class="leg"><span class="leg-dot" style="background:#ffe4e4"></span>หมดอายุแล้ว</span>
  <span class="leg"><span class="leg-dot" style="background:#ffe8d6"></span>ใกล้หมดอายุ (เร่งด่วน)</span>
  <span class="leg"><span class="leg-dot" style="background:#fff8d6"></span>ใกล้หมดอายุ</span>
</div>
<table>
<thead><tr>
  <th style="width:5%">ลำดับ</th>
  <th style="width:26%">ชื่อยา / เวชภัณฑ์</th>
  <th style="width:12%">Lot No.</th>
  <th style="width:18%">วันหมดอายุ</th>
  <th style="width:7%">หน่วย</th>
  <th style="width:10%">คงเหลือ<br>(ระบบ)</th>
  <th style="width:10%">ตรวจนับ<br>จริง</th>
  <th style="width:7%">ผลต่าง</th>
  <th style="width:5%">หมายเหตุ</th>
</tr></thead>
<tbody>${tableRows}${emptyRows}</tbody>
</table>
<div class="sig-grid">
  <div class="sig-block"><div class="sig-title">ผู้ตรวจนับ</div>ลงชื่อ ________________________________<br>ตำแหน่ง ___________________________</div>
  <div class="sig-block"><div class="sig-title">ผู้ตรวจสอบ</div>ลงชื่อ ________________________________<br>ตำแหน่ง ___________________________</div>
  <div class="sig-block"><div class="sig-title">หัวหน้างาน / ผู้บริหาร</div>ลงชื่อ ________________________________<br>ตำแหน่ง ___________________________</div>
</div>
</body></html>`;

    const w = window.open('', '_blank');
    w.document.write(html);
    w.document.close();
    setTimeout(() => w.print(), 500);
  },

  /* ---------- ตัดจ่ายยาหมดอายุ ---------- */
  async disposeExpired(view) {
    view.innerHTML = `${this.back()}<div class="page-title">ตัดจ่ายยาหมดอายุ</div>
      <div class="page-sub">เลือกสถานที่ ตรวจสอบรายการ แล้วบันทึกพร้อมพิมพ์ใบบันทึก</div>
      <div class="field"><label>สถานที่</label>
        <select id="dpLoc">
          <option value="">กำลังโหลด...</option>
        </select>
      </div>
      <div id="dpItems"></div>
      <div id="dpActions" class="d-none">
        <div class="field"><label>ผู้อนุมัติ / หัวหน้างาน</label>
          <input type="text" id="dpApprover" placeholder="ชื่อผู้อนุมัติ"></div>
        <div class="field"><label>หมายเหตุ (ถ้ามี)</label>
          <input type="text" id="dpNote" placeholder="เช่น นำทำลายตามระเบียบ"></div>
        <button id="dpConfirm" class="btn-brand">
          <i class="bi bi-trash3-fill"></i> บันทึกตัดจ่ายและพิมพ์ใบบันทึก
        </button>
      </div>`;
    const rl = await api('getLocations').catch(() => null);
    const locs = ((rl && rl.data) || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    const sel = document.getElementById('dpLoc');
    sel.innerHTML = '<option value="">เลือกสถานที่</option>'
      + '<option value="all">ทุกสถานที่</option>'
      + locs.map(l => `<option value="${l.id}">${App.esc(l.name)}</option>`).join('');
    sel.addEventListener('change', () => this.disposeExpiredLoad(sel.value, locs.find(l => l.id === sel.value)));
  },

  async disposeExpiredLoad(locId, loc) {
    const wrap    = document.getElementById('dpItems');
    const actions = document.getElementById('dpActions');
    if (!locId) { wrap.innerHTML = ''; actions.classList.add('d-none'); return; }
    wrap.innerHTML = App.loader(); actions.classList.add('d-none');
    const locParam = (locId === 'all') ? '' : locId;
    const r = await api('getExpiredItems', { location_id: locParam }).catch(() => null);
    const list = (r && r.data) || [];
    if (!list.length) {
      wrap.innerHTML = `<div class="empty-state"><i class="bi bi-check-circle" style="font-size:2.5rem;color:var(--teal)"></i>
        <div class="es-title">ไม่มียาหมดอายุในจุดนี้ 🎉</div></div>`;
      return;
    }
    wrap.innerHTML = `
      <div class="dp-select-all">
        <label class="dp-check-lbl"><input type="checkbox" id="dpSelectAll" checked> เลือกทั้งหมด (${list.length} รายการ)</label>
      </div>
      ${list.map(it => `
      <div class="dp-row">
        <label class="dp-check-lbl">
          <input type="checkbox" class="dp-chk" data-id="${it.id}" checked>
          <div>
            <div class="dp-name">${App.esc(it.drug_name)}</div>
            <div class="dp-meta">
              ${it.lot_no ? `Lot ${App.esc(it.lot_no)} · ` : ''}${fmtDate(it.expiry_date)}
              · มี <strong>${it.qty}</strong>${it.unit ? ' ' + App.esc(it.unit) : ''}
              ${locId === 'all' ? ' · ' + App.esc(it.location_name || '') : ''}
            </div>
          </div>
        </label>
        <input type="number" class="dp-qty" data-id="${it.id}" value="${it.qty}" min="1" max="${it.qty}">
      </div>`).join('')}`;
    actions.classList.remove('d-none');
    document.getElementById('dpSelectAll').addEventListener('change', e => {
      wrap.querySelectorAll('.dp-chk').forEach(c => c.checked = e.target.checked);
    });
    document.getElementById('dpConfirm').onclick = async () => {
      const checked = [...wrap.querySelectorAll('.dp-chk:checked')].map(c => {
        const qtyEl = wrap.querySelector(`.dp-qty[data-id="${c.dataset.id}"]`);
        return { item_id: c.dataset.id, qty: parseInt(qtyEl ? qtyEl.value : 0) || 0 };
      }).filter(x => x.qty > 0);
      if (!checked.length) { App.toast('ยังไม่ได้เลือกรายการ', 'err'); return; }
      const btn = document.getElementById('dpConfirm');
      btn.disabled = true; btn.innerHTML = '<span class="spin"></span>';
      const res = await api('disposeExpiredBatch', {
        items: checked,
        approver: document.getElementById('dpApprover').value.trim(),
        note:     document.getElementById('dpNote').value.trim()
      }).catch(() => null);
      btn.disabled = false; btn.innerHTML = '<i class="bi bi-trash3-fill"></i> บันทึกตัดจ่ายและพิมพ์ใบบันทึก';
      if (res && res.status === 'success') {
        App.toast(res.message, 'ok');
        const dispItems = checked.map(c => {
          const it = list.find(x => x.id === c.item_id);
          return it ? Object.assign({}, it, { qty: c.qty }) : null;
        }).filter(Boolean);
        this.disposeExpiredPrint(loc ? loc.name : locId, dispItems, {
          approver: document.getElementById('dpApprover').value.trim(),
          note:     document.getElementById('dpNote').value.trim()
        });
        this.disposeExpiredLoad(locId, loc);
      } else App.toast((res && res.message) || 'ไม่สำเร็จ', 'err');
    };
  },

  disposeExpiredPrint(locName, items, info) {
    const hospital = (App.branding && App.branding.hospital_name) || '';
    const today = new Date();
    const beYear = today.getFullYear() + (App.beYear ? 543 : 0);
    const months = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
    const dateStr = `${today.getDate()} ${months[today.getMonth()]} ${beYear}`;
    const esc = s => String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const rows = items.map((it, i) => `<tr>
      <td style="text-align:center">${i + 1}</td>
      <td>${esc(it.drug_name)}</td>
      <td style="text-align:center">${esc(it.lot_no || '-')}</td>
      <td style="text-align:center">${esc(fmtDate(it.expiry_date))}</td>
      <td style="text-align:center">${esc(it.unit || '')}</td>
      <td style="text-align:center">${it.qty}</td>
      <td>${esc(it.location_name || locName)}</td>
      <td></td>
    </tr>`).join('');
    const pad = Math.max(0, 12 - items.length);
    const empty = pad > 0 ? Array(pad).fill('<tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>').join('') : '';
    const html = `<!DOCTYPE html><html lang="th"><head><meta charset="utf-8">
<title>ใบบันทึกการตัดจ่ายยาหมดอายุ</title>
<link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Sarabun',sans-serif;font-size:13px;color:#000;background:#fff;padding:16mm 14mm}
h1{font-size:17px;font-weight:700;text-align:center;margin-bottom:3px}.hsub{text-align:center;color:#555;margin-bottom:14px}
.info-row{display:flex;justify-content:space-between;margin-bottom:10px}.note-box{border:1px solid #ccc;border-radius:4px;padding:8px 12px;margin-bottom:14px}
table{width:100%;border-collapse:collapse;margin-bottom:16px;font-size:12px}
th{background:#b71c1c;color:#fff;padding:6px 5px;text-align:center;font-weight:600;border:1px solid #999}td{padding:5px;border:1px solid #ccc;vertical-align:middle}
.sig-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:28px}
.sig-block{border-top:1px solid #000;padding-top:8px;text-align:center;font-size:12px}.sig-title{margin-bottom:48px;color:#555}
@media print{@page{size:A4;margin:12mm 10mm}body{padding:0}}
</style></head><body>
<h1>ใบบันทึกการตัดจ่ายยาหมดอายุ</h1>
<div class="hsub">${esc(hospital)}</div>
<div class="info-row"><span>สถานที่: <strong>${esc(locName)}</strong></span><span>วันที่: <strong>${dateStr}</strong></span><span>ทั้งหมด: <strong>${items.length} รายการ</strong></span></div>
${info && info.note ? `<div class="note-box">หมายเหตุ: ${esc(info.note)}</div>` : ''}
<table><thead><tr>
  <th style="width:5%">ลำดับ</th><th style="width:28%">ชื่อยา / เวชภัณฑ์</th>
  <th style="width:13%">Lot No.</th><th style="width:14%">วันหมดอายุ</th>
  <th style="width:7%">หน่วย</th><th style="width:10%">จำนวน</th>
  <th style="width:13%">สถานที่</th><th style="width:10%">หมายเหตุ</th>
</tr></thead><tbody>${rows}${empty}</tbody></table>
<div class="sig-grid">
  <div class="sig-block"><div class="sig-title">ผู้ตัดจ่าย</div>ลงชื่อ ________________________________<br>ตำแหน่ง ___________________________</div>
  <div class="sig-block"><div class="sig-title">ผู้ตรวจสอบ</div>ลงชื่อ ________________________________<br>ตำแหน่ง ___________________________</div>
  <div class="sig-block"><div class="sig-title">ผู้อนุมัติ${info && info.approver ? ': ' + esc(info.approver) : ''}</div>ลงชื่อ ________________________________<br>ตำแหน่ง ___________________________</div>
</div></body></html>`;
    const w = window.open('', '_blank'); w.document.write(html); w.document.close(); setTimeout(() => w.print(), 500);
  },

  /* ---------- รายงานการใช้ยา ---------- */
  async usageReport(view) {
    const now = new Date();
    const y = now.getFullYear(), m = now.getMonth();
    const firstDay = new Date(y, m, 1).toISOString().slice(0, 10);
    const lastDay  = new Date(y, m + 1, 0).toISOString().slice(0, 10);
    const prev3    = new Date(y, m - 2, 1).toISOString().slice(0, 10);
    const prev6    = new Date(y, m - 5, 1).toISOString().slice(0, 10);
    const yearStart = `${y}-01-01`;
    view.innerHTML = `${this.back()}<div class="page-title">รายงานการใช้ยา</div>
      <div class="page-sub">สรุปยาที่เบิกไปในช่วงเวลาที่เลือก เรียงจากมากไปน้อย</div>
      <div class="card-soft" style="padding:14px 16px">
        <div class="d-flex gap-2 flex-wrap" style="margin-bottom:10px">
          <button class="btn-ghost ur-preset" data-f="${firstDay}" data-t="${lastDay}" style="width:auto;padding:7px 13px;font-size:.85rem">เดือนนี้</button>
          <button class="btn-ghost ur-preset" data-f="${prev3}" data-t="${lastDay}" style="width:auto;padding:7px 13px;font-size:.85rem">3 เดือน</button>
          <button class="btn-ghost ur-preset" data-f="${prev6}" data-t="${lastDay}" style="width:auto;padding:7px 13px;font-size:.85rem">6 เดือน</button>
          <button class="btn-ghost ur-preset" data-f="${yearStart}" data-t="${lastDay}" style="width:auto;padding:7px 13px;font-size:.85rem">ปีนี้</button>
        </div>
        <div class="d-flex gap-2 align-items-center" style="margin-bottom:10px">
          <input type="date" id="urFrom" value="${firstDay}" class="ur-date flex-fill">
          <span style="color:var(--muted);flex:none">ถึง</span>
          <input type="date" id="urTo" value="${lastDay}" class="ur-date flex-fill">
        </div>
        <button id="urRun" class="btn-brand"><i class="bi bi-bar-chart-fill"></i> ดูรายงาน</button>
      </div>
      <div id="urResults" style="margin-top:16px"></div>`;
    view.querySelectorAll('.ur-preset').forEach(b => b.addEventListener('click', () => {
      document.getElementById('urFrom').value = b.dataset.f;
      document.getElementById('urTo').value   = b.dataset.t;
      this.runUsageReport();
    }));
    document.getElementById('urRun').addEventListener('click', () => this.runUsageReport());
    this.runUsageReport();
  },

  async runUsageReport() {
    const from = document.getElementById('urFrom').value;
    const to   = document.getElementById('urTo').value;
    const wrap = document.getElementById('urResults');
    if (!from || !to) { App.toast('เลือกช่วงวันที่', 'err'); return; }
    wrap.innerHTML = App.loader();
    const r = await api('usageReport', { date_from: from, date_to: to }).catch(() => null);
    const list = (r && r.data) || [];
    if (!list.length) { wrap.innerHTML = '<div class="empty-state"><div class="es-title">ไม่มีการเบิกในช่วงนี้</div></div>'; return; }
    const deptTotals = {};
    list.forEach(d => d.by_dept.forEach(bd => { deptTotals[bd.dept] = (deptTotals[bd.dept] || 0) + bd.qty; }));
    const depts = Object.keys(deptTotals).sort((a, b) => deptTotals[b] - deptTotals[a]).slice(0, 5);
    this._urData = { list, depts, from, to, tx_count: r.tx_count || 0 };
    wrap.innerHTML = `
      <div class="ur-meta">พบ <strong>${list.length}</strong> รายการ · ${r.tx_count || 0} รายการเบิก</div>
      <button id="urPrint" class="btn-ghost" style="width:auto;margin-bottom:12px"><i class="bi bi-printer"></i> พิมพ์รายงาน</button>
      <div class="ur-table-wrap"><table class="ur-table">
        <thead><tr>
          <th>#</th><th>ชื่อยา / เวชภัณฑ์</th><th>หน่วย</th><th>รวมเบิก</th><th>ใบเบิก</th>
          ${depts.map(d => `<th>${App.esc(d)}</th>`).join('')}
        </tr></thead>
        <tbody>${list.map((it, i) => `<tr>
          <td class="urt-n">${i + 1}</td>
          <td>${App.esc(it.drug_name)}</td>
          <td class="urt-c">${App.esc(it.unit)}</td>
          <td class="urt-c urt-bold">${it.total_qty}</td>
          <td class="urt-c">${it.slip_count}</td>
          ${depts.map(d => { const bd = it.by_dept.find(x => x.dept === d); return `<td class="urt-c">${bd ? bd.qty : '-'}</td>`; }).join('')}
        </tr>`).join('')}</tbody>
      </table></div>`;
    document.getElementById('urPrint').onclick = () => this.printUsageReport(this._urData);
  },

  printUsageReport({ list, depts, from, to, tx_count }) {
    const hospital = (App.branding && App.branding.hospital_name) || '';
    const esc = s => String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const rows = list.map((it, i) => `<tr ${i % 2 === 1 ? 'style="background:#f8f8ff"' : ''}>
      <td style="text-align:center">${i + 1}</td><td>${esc(it.drug_name)}</td>
      <td style="text-align:center">${esc(it.unit)}</td>
      <td style="text-align:center;font-weight:600">${it.total_qty}</td>
      <td style="text-align:center">${it.slip_count}</td>
      ${(depts || []).map(d => { const bd = it.by_dept.find(x => x.dept === d); return `<td style="text-align:center">${bd ? bd.qty : '-'}</td>`; }).join('')}
    </tr>`).join('');
    const html = `<!DOCTYPE html><html lang="th"><head><meta charset="utf-8">
<title>รายงานการใช้ยา</title>
<link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Sarabun',sans-serif;font-size:13px;color:#000;background:#fff;padding:14mm 12mm}
h1{font-size:17px;font-weight:700;text-align:center;margin-bottom:3px}.hsub{text-align:center;color:#555;margin-bottom:14px}
.info-row{display:flex;justify-content:space-between;margin-bottom:12px}
table{width:100%;border-collapse:collapse;margin-bottom:18px;font-size:12px}
th{background:#1a237e;color:#fff;padding:6px 5px;text-align:center;font-weight:600;border:1px solid #999}td{padding:5px;border:1px solid #ccc;vertical-align:middle}
.sig-row{display:flex;gap:28px;margin-top:28px}.sig-block{flex:1;border-top:1px solid #000;padding-top:8px;text-align:center;font-size:12px}
@media print{@page{size:A4 landscape;margin:10mm 12mm}body{padding:0}}
</style></head><body>
<h1>รายงานการใช้ยา</h1><div class="hsub">${esc(hospital)}</div>
<div class="info-row">
  <span>ช่วงเวลา: <strong>${from}</strong> ถึง <strong>${to}</strong></span>
  <span>รายการ: <strong>${list.length}</strong> · ใบเบิก: <strong>${tx_count}</strong></span>
</div>
<table><thead><tr>
  <th style="width:4%">#</th><th style="width:30%">ชื่อยา / เวชภัณฑ์</th>
  <th style="width:7%">หน่วย</th><th style="width:8%">รวมเบิก</th><th style="width:8%">ใบเบิก</th>
  ${(depts || []).map(d => `<th>${esc(d)}</th>`).join('')}
</tr></thead><tbody>${rows}</tbody></table>
<div class="sig-row">
  <div class="sig-block">ผู้จัดทำ<br><br><br>ลงชื่อ ____________________________</div>
  <div class="sig-block">ผู้ตรวจสอบ<br><br><br>ลงชื่อ ____________________________</div>
  <div class="sig-block">ผู้อนุมัติ<br><br><br>ลงชื่อ ____________________________</div>
</div></body></html>`;
    const w = window.open('', '_blank'); w.document.write(html); w.document.close(); setTimeout(() => w.print(), 500);
  },

  /* ---------- ตั้งค่าใบเบิก (หัวกระดาษ + ผู้ลงนาม) ---------- */
  async issueSettings(view) {
    view.innerHTML = `${this.back()}<div class="page-title">ตั้งค่าใบเบิก</div>
      <div id="ifForm">${App.loader()}</div>`;
    const r = await api('getConfig').catch(() => null);
    const f = ((r && r.config) || {}).issue_form || {};
    document.getElementById('ifForm').innerHTML = `
      <div class="page-sub">ข้อความเหล่านี้จะแสดงบนใบเบิกที่พิมพ์ออกมา</div>
      <div class="field"><label>ชื่อหัวเอกสาร</label>
        <input type="text" id="ifTitle" value="${App.esc(f.title || 'ใบเบิกเวชภัณฑ์ยาและเวชภัณฑ์มิใช่ยา')}"></div>
      <div class="field"><label>หน่วยงานคลัง (บรรทัดรอง)</label>
        <input type="text" id="ifOrg" value="${App.esc(f.org_unit || '')}" placeholder="เช่น งานคลังเวชภัณฑ์โรงพยาบาลตรอน"></div>
      <div class="field"><label>จากหน่วยงาน</label>
        <input type="text" id="ifFrom" value="${App.esc(f.from_unit || '')}" placeholder="เว้นว่างใช้ชื่อโรงพยาบาล"></div>
      <div class="field"><label>ถึง (หัวหน้าหน่วย)</label>
        <input type="text" id="ifTo" value="${App.esc(f.to_label || 'หัวหน้าหน่วยพัสดุ')}"></div>

      <div class="section-label">ผู้จ่าย (ลงนามอัตโนมัติ)</div>
      <div class="field"><label>ชื่อผู้จ่าย</label><input type="text" id="ifIssuerName" value="${App.esc(f.issuer_name || '')}"></div>
      <div class="field"><label>ตำแหน่งผู้จ่าย</label><input type="text" id="ifIssuerPos" value="${App.esc(f.issuer_position || '')}"></div>

      <div class="section-label">ผู้สั่งจ่าย / หัวหน้าหน่วยพัสดุ</div>
      <div class="field"><label>ชื่อผู้สั่งจ่าย</label><input type="text" id="ifApvName" value="${App.esc(f.approver_name || '')}"></div>
      <div class="field"><label>ตำแหน่งผู้สั่งจ่าย</label><input type="text" id="ifApvPos" value="${App.esc(f.approver_position || '')}" placeholder="หลายบรรทัดได้ คั่นด้วย Enter"></div>

      <button id="ifSave" class="btn-brand">บันทึก</button>
      <p class="hint" style="margin-top:12px">ช่อง "ผู้เบิก" และ "ผู้รับ" บนใบเบิกจะเว้นว่างไว้ให้เซ็นเอง</p>`;

    document.getElementById('ifSave').addEventListener('click', async (e) => {
      const issue_form = {
        title: document.getElementById('ifTitle').value.trim(),
        org_unit: document.getElementById('ifOrg').value.trim(),
        from_unit: document.getElementById('ifFrom').value.trim(),
        to_label: document.getElementById('ifTo').value.trim(),
        issuer_name: document.getElementById('ifIssuerName').value.trim(),
        issuer_position: document.getElementById('ifIssuerPos').value.trim(),
        approver_name: document.getElementById('ifApvName').value.trim(),
        approver_position: document.getElementById('ifApvPos').value.trim()
      };
      const btn = e.currentTarget; btn.disabled = true; btn.innerHTML = '<span class="spin"></span>';
      const res = await api('saveConfig', { config: { issue_form } }).catch(() => null);
      btn.disabled = false; btn.textContent = 'บันทึก';
      App.toast((res && res.status === 'success') ? 'บันทึกแล้ว' : ((res && res.message) || 'บันทึกไม่สำเร็จ'), (res && res.status === 'success') ? 'ok' : 'err');
    });
  },

  /* ---------- พิมพ์รายงาน (A4 / PDF) ---------- */
  report(view) {
    view.innerHTML = `${this.back()}<div class="page-title">พิมพ์รายงาน</div>
      <div class="field"><label>ประเภทรายงาน</label>
        <select id="rpType">
          <option value="near">ยาใกล้หมดอายุ (ภายใน ${App.thresholds.medium} วัน)</option>
          <option value="stock">สต็อกคงเหลือทั้งหมด</option>
        </select></div>
      <button id="rpGo" class="btn-brand"><i class="bi bi-printer"></i> สร้างรายงานและพิมพ์</button>
      <p class="hint" style="margin-top:12px">ในหน้าต่างพิมพ์ เลือกปลายทางเป็น "บันทึกเป็น PDF" เพื่อได้ไฟล์ PDF</p>`;
    document.getElementById('rpGo').addEventListener('click', () => this.runReport(document.getElementById('rpType').value));
  },

  async runReport(type) {
    App.showLoading('กำลังเตรียมรายงาน');
    let rows = [], title = '', columns = [];
    try {
      if (type === 'near') {
        const r = await api('getDashboard');
        const near = (r && r.near) || [];
        title = 'รายงานยาใกล้หมดอายุ';
        columns = ['ยา', 'สถานที่', 'Lot', 'วันหมดอายุ', 'เหลือ (วัน)', 'จำนวน'];
        rows = near.map(it => [it.drug_name, it.location_name || '', it.lot_no || '', fmtDate(it.expiry_date), (it.days < 0 ? 'หมดอายุ' : it.days), it.qty]);
      } else {
        const r = await api('exportData', { kind: 'stock' });
        title = 'รายงานสต็อกคงเหลือ';
        columns = (r && r.columns) || [];
        rows = (r && r.rows) || [];
      }
    } catch (e) { App.hideLoading(); App.toast('ดึงข้อมูลไม่สำเร็จ', 'err'); return; }
    App.hideLoading();
    if (!rows.length) { App.toast('ไม่มีข้อมูลสำหรับรายงานนี้', 'err'); return; }
    this.printDoc(title, columns, rows);
  },

  printDoc(title, columns, rows) {
    const hosp = App.branding.hospital_name || 'The Watcher';
    const when = new Date().toLocaleString('th-TH');
    const head = columns.map(c => `<th>${App.esc(c)}</th>`).join('');
    const body = rows.map(r => `<tr>${r.map(c => `<td>${App.esc(c == null ? '' : String(c))}</td>`).join('')}</tr>`).join('');
    const w = window.open('', '_blank');
    if (!w) { App.toast('เบราว์เซอร์บล็อกหน้าต่างพิมพ์ กรุณาอนุญาต popup', 'err'); return; }
    w.document.write(`<!doctype html><html lang="th"><head><meta charset="utf-8"><title>${App.esc(title)}</title>
      <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600&display=swap" rel="stylesheet">
      <style>
        @page { size:A4; margin:14mm; }
        body { font-family:'Sarabun',sans-serif; color:#19241e; }
        h1 { font-size:18px; margin:0 0 2px; }
        .sub { color:#5a6b62; font-size:12px; margin-bottom:14px; }
        table { width:100%; border-collapse:collapse; font-size:12px; }
        th,td { border:1px solid #cfdcd4; padding:6px 8px; text-align:left; vertical-align:top; }
        th { background:#e9f3ed; }
        tr:nth-child(even) td { background:#f6faf8; }
      </style></head><body>
      <h1>${App.esc(hosp)}</h1>
      <div class="sub">${App.esc(title)} · พิมพ์เมื่อ ${App.esc(when)} · รวม ${rows.length} รายการ</div>
      <table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>
      <script>window.onload=function(){setTimeout(function(){window.print();},350);}<\/script>
      </body></html>`);
    w.document.close();
  }
};
