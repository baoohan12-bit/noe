/**
 * ============================================================
 * NOE Workshop Funnel Backend — Google Apps Script
 * ============================================================
 * Handles:
 *  - POST createOrder → save PENDING order to Sheet, return orderId + ckContent
 *  - POST updateOrder → update bumps/amount when user toggles in checkout
 *  - POST Sepay webhook → match content with orderId → mark PAID + send email
 *  - GET getStatus → poll order status from xac-nhan page
 *
 * Deploy: Extensions → Apps Script → Deploy → New deployment → Web app
 *   - Execute as: Me
 *   - Who has access: Anyone
 *
 * Sepay webhook URL = {GAS_URL}?key={SEPAY_API_KEY}
 * Frontend API URL  = {GAS_URL}
 * ============================================================
 */

// ============================================================
// CONFIG — edit here khi cần update
// ============================================================
const CONFIG = {
  SHEET_ID: '1aCzTkj_uJvHzhba9oWrywAcLjGi_lFocB2g-58zWdaA',
  SHEET_TAB_NAME: 'Orders',

  // Sepay API key — match với query param ?key=... trong webhook URL
  SEPAY_API_KEY: '83ROLVG2T5QXDHC6KRJH5NWSKPTBQZI7VDAVCMBUFRPWST7SU910ZODBOJOVWY0G',

  // Email — Sender = account deploy GAS
  EMAIL_SENDER_NAME: 'NOE Workshop',
  EMAIL_REPLY_TO: 'hello.noevn@gmail.com',

  // Zalo group (optional, empty string nếu không có)
  ZALO_GROUP_URL: 'https://zalo.me/g/mcyd8fcdaus2zwf7zdj2',

  // Products / Drive links
  PRODUCT_NAME: 'Workshop Nghệ Thuật Xác Lập Vị Thế',
  PRODUCT_PRICE: 99000,
  EBOOK_URL: 'https://zalo.me/g/mcyd8fcdaus2zwf7zdj2',

  // Bumps (set giá = 0 nếu không có bump)
  BUMP1_NAME: '',
  BUMP1_PRICE: 0,
  BUMP1_URL: '',
  BUMP2_NAME: '',
  BUMP2_PRICE: 0,
  BUMP2_URL: '',

  // CK content prefix + auto-increment 4 digits (vd MYBRAND0001)
  CK_PREFIX: 'NOE',

  // Brand info
  HOTLINE: '0342580741',
  ADDRESS: 'NOE Workshop',
  SITE_URL: '',

  // Workshop schedule (cập nhật trước mỗi khoá)
  SESSION1: '[Thứ, ngày/tháng/năm] · 20h00',
  SESSION2: '[Thứ, ngày/tháng/năm] · 20h00',
  ZOOM_NOTE: 'Link Zoom sẽ được gửi qua nhóm Zalo trước buổi học 30 phút'
};

// ============================================================
// SHEET HELPERS
// ============================================================
function getSheet() {
  const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  let sheet = ss.getSheetByName(CONFIG.SHEET_TAB_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_TAB_NAME);
    sheet.appendRow([
      'orderId','createdAt','name','phone','email','goal',
      'bump1','bump2','totalAmount','ckContent','status',
      'paidAt','sepayTxId','emailSent','rawSepay'
    ]);
    sheet.getRange('A1:O1').setFontWeight('bold').setBackground('#0A0A0A').setFontColor('#fff');
    sheet.setFrozenRows(1);
    sheet.setColumnWidths(1, 15, 130);
    const dateFormat = 'dd/MM/yyyy HH:mm:ss';
    sheet.getRange('B:B').setNumberFormat(dateFormat);
    sheet.getRange('L:L').setNumberFormat(dateFormat);
    sheet.getRange('N:N').setNumberFormat(dateFormat);
  }
  return sheet;
}

/**
 * Format date columns cho Sheet HIỆN TẠI (đã có data).
 * Chạy 1 lần thủ công từ GAS editor.
 */
function formatDateColumns() {
  const sheet = getSheet();
  const dateFormat = 'dd/MM/yyyy HH:mm:ss';
  sheet.getRange('B:B').setNumberFormat(dateFormat);
  sheet.getRange('L:L').setNumberFormat(dateFormat);
  sheet.getRange('N:N').setNumberFormat(dateFormat);
  Logger.log('Date columns formatted');
}

function findOrderRowByContent(content) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const upper = (content || '').toUpperCase().trim();
  for (let i = 1; i < data.length; i++) {
    const orderCK = String(data[i][9] || '').toUpperCase().trim();
    const orderStatus = data[i][10];
    if (orderStatus === 'PENDING' && orderCK && upper.indexOf(orderCK) !== -1) {
      return { row: i + 1, data: data[i] };
    }
  }
  return null;
}

function findOrderRowById(orderId) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === orderId) return { row: i + 1, data: data[i] };
  }
  return null;
}

// ============================================================
// CORE ACTIONS
// ============================================================
function nextCkCode() {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  let max = 0;
  const pattern = new RegExp('^' + CONFIG.CK_PREFIX + '(\\d{4})$', 'i');
  for (let i = 1; i < data.length; i++) {
    const ck = String(data[i][9] || '').trim();
    const m = ck.match(pattern);
    if (m) {
      const num = parseInt(m[1], 10);
      if (num > max) max = num;
    }
  }
  return CONFIG.CK_PREFIX + String(max + 1).padStart(4, '0');
}

function createOrder(data) {
  const sheet = getSheet();
  const orderId = CONFIG.CK_PREFIX + '-' + Date.now().toString().slice(-9);
  const ckContent = nextCkCode();

  sheet.appendRow([
    orderId,
    new Date(),
    data.name || '',
    data.phone || '',
    data.email || '',
    data.goal || '',
    data.bump1 ? CONFIG.BUMP1_NAME : '',
    data.bump2 ? CONFIG.BUMP2_NAME : '',
    Number(data.totalAmount) || CONFIG.PRODUCT_PRICE,
    ckContent,
    'PENDING',
    '', '', '', ''
  ]);

  return {
    success: true,
    orderId: orderId,
    ckContent: ckContent,
    totalAmount: Number(data.totalAmount) || CONFIG.PRODUCT_PRICE
  };
}

function updateOrder(orderId, updates) {
  const row = findOrderRowById(orderId);
  if (!row) return { success: false, error: 'Order not found' };
  const sheet = getSheet();
  if (row.data[10] !== 'PENDING') {
    return { success: false, error: 'Order already ' + row.data[10] + ', cannot update' };
  }
  if (updates.bump1 !== undefined) {
    sheet.getRange(row.row, 7).setValue(updates.bump1 ? CONFIG.BUMP1_NAME : '');
  }
  if (updates.bump2 !== undefined) {
    sheet.getRange(row.row, 8).setValue(updates.bump2 ? CONFIG.BUMP2_NAME : '');
  }
  if (updates.totalAmount !== undefined) {
    sheet.getRange(row.row, 9).setValue(Number(updates.totalAmount));
  }
  return { success: true, orderId: orderId };
}

function getStatus(orderId) {
  const row = findOrderRowById(orderId);
  if (!row) return { success: false, error: 'Order not found' };
  return {
    success: true,
    orderId: orderId,
    status: row.data[10],
    paidAt: row.data[11] ? new Date(row.data[11]).toISOString() : null
  };
}

/**
 * Detect bumps từ số tiền user CK (reverse engineering).
 * Tolerance ±500đ.
 */
function detectBumpsFromAmount(amount) {
  const base = CONFIG.PRODUCT_PRICE;
  const p1 = CONFIG.BUMP1_PRICE;
  const p2 = CONFIG.BUMP2_PRICE;
  function near(target) { return Math.abs(amount - target) <= 500; }
  if (p1 && p2 && near(base + p1 + p2)) return { bump1: true,  bump2: true };
  if (p1 && near(base + p1))            return { bump1: true,  bump2: false };
  if (p2 && near(base + p2))            return { bump1: false, bump2: true };
  return { bump1: false, bump2: false };
}

function handleSepayWebhook(payload) {
  const content = payload.content || '';
  const amount = Number(payload.transferAmount || 0);
  const sheet = getSheet();

  if (payload.transferType !== 'in') {
    return { success: true, message: 'Outgoing transaction, skipped' };
  }

  const match = findOrderRowByContent(content);

  if (!match) {
    sheet.appendRow([
      'UNMATCHED-' + Date.now(),
      new Date(),
      '', '', '', '',
      '', '', amount, content,
      'UNMATCHED', '', String(payload.id || ''), '',
      JSON.stringify(payload)
    ]);
    return { success: true, message: 'No matching order, logged for manual review' };
  }

  let bump1Set = !!match.data[6];
  let bump2Set = !!match.data[7];
  if (!bump1Set && !bump2Set) {
    const detected = detectBumpsFromAmount(amount);
    bump1Set = detected.bump1;
    bump2Set = detected.bump2;
    sheet.getRange(match.row, 7).setValue(bump1Set ? CONFIG.BUMP1_NAME : '');
    sheet.getRange(match.row, 8).setValue(bump2Set ? CONFIG.BUMP2_NAME : '');
  }

  sheet.getRange(match.row, 9).setValue(amount);
  sheet.getRange(match.row, 11).setValue('PAID');
  sheet.getRange(match.row, 12).setValue(new Date());
  sheet.getRange(match.row, 13).setValue(String(payload.id || ''));
  sheet.getRange(match.row, 15).setValue(JSON.stringify(payload));

  match.data[6] = bump1Set ? CONFIG.BUMP1_NAME : '';
  match.data[7] = bump2Set ? CONFIG.BUMP2_NAME : '';
  match.data[8] = amount;

  triggerPaidActions(match.row);

  return { success: true, message: 'Order paid', orderId: match.data[0] };
}

/**
 * Helper: send email cho 1 order đã PAID.
 * Idempotent: skip nếu đã emailSent.
 */
function triggerPaidActions(rowIndex) {
  const sheet = getSheet();
  const data = sheet.getRange(rowIndex, 1, 1, 15).getValues()[0];

  if (data[13] && String(data[13]).indexOf('ERROR') !== 0) {
    Logger.log('Order ' + data[0] + ' already processed, skipping');
    return;
  }

  try {
    sendConfirmationEmail({
      orderId: data[0],
      name: data[2],
      email: data[4],
      goal: data[5],
      bump1: !!data[6],
      bump2: !!data[7],
      totalAmount: data[8]
    });
    sheet.getRange(rowIndex, 14).setValue(new Date());
  } catch (err) {
    sheet.getRange(rowIndex, 14).setValue('ERROR: ' + err.toString());
  }
}

/**
 * onSheetEdit — Trigger khi user edit Sheet thủ công.
 * Đổi cột K (status) thành 'PAID' → fire email cho row đó.
 *
 * INSTALL TRIGGER (1 lần):
 *   GAS editor → ⏰ Triggers → Add Trigger
 *   - Function: onSheetEdit
 *   - Event source: From spreadsheet
 *   - Event type: On edit
 */
function onSheetEdit(e) {
  if (!e || !e.range || !e.source) return;
  const sheet = e.source.getActiveSheet();
  if (sheet.getName() !== CONFIG.SHEET_TAB_NAME) return;

  const col = e.range.getColumn();
  const row = e.range.getRow();
  if (row === 1) return;
  if (col !== 11) return;

  const newValue = String(e.range.getValue() || '').toUpperCase().trim();
  if (newValue === 'PAID') {
    if (!sheet.getRange(row, 12).getValue()) {
      sheet.getRange(row, 12).setValue(new Date());
    }
    triggerPaidActions(row);
    Logger.log('Manual trigger PAID for row ' + row);
  }
}

// ============================================================
// EMAIL SENDER
// ============================================================
function sendConfirmationEmail(order) {
  const v = {
    name: order.name,
    orderId: order.orderId,
    totalAmount: formatVnd(order.totalAmount),
    goal: order.goal,
    zaloLink: CONFIG.ZALO_GROUP_URL || ('(Liên hệ hotline ' + CONFIG.HOTLINE + ')'),
    hasBumps: !!(order.bump1 || order.bump2),
    bump1: !!order.bump1,
    bump2: !!order.bump2
  };

  const subject = "Chào mừng bạn đến với NOE · Xác nhận đăng ký Workshop #" + v.orderId;

  MailApp.sendEmail({
    to: order.email,
    subject: subject,
    htmlBody: buildHtmlEmail(v),
    body: buildPlainEmail(v),
    name: CONFIG.EMAIL_SENDER_NAME,
    replyTo: CONFIG.EMAIL_REPLY_TO
  });
}

function buildHtmlEmail(v) {
  const s = CONFIG;
  return [
    '<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>',
    '<body style="font-family:Georgia,serif;font-size:15px;line-height:1.7;color:#222;max-width:600px;margin:0 auto;padding:32px 24px;background:#fff">',

    // Header
    // Greeting
    '<p style="font-size:17px;margin:0 0 8px">Chào ' + esc(v.name) + ',</p>',
    '<p style="margin:0 0 24px">NOE đã nhận được thanh toán của bạn cho <strong>Workshop Nghệ Thuật Xác Lập Vị Thế</strong>.</p>',

    // Order info box
    '<div style="background:#f9f6f2;border-left:3px solid #8B6F5E;padding:14px 18px;margin:0 0 28px;font-size:14px;line-height:1.8">',
    'Mã đơn: <strong>' + esc(v.orderId) + '</strong><br>',
    'Số tiền: <strong>' + v.totalAmount + 'đ</strong>',
    v.goal ? '<br>Mục tiêu: <strong>' + esc(v.goal) + '</strong>' : '',
    '</div>',

    // Welcome message
    '<p style="margin:0 0 28px">Chiếc nôi NOE đã sẵn sàng chào đón bạn.<br><br>NOE rất vui khi bạn đã chọn dành 3 tiếng đồng hồ này cho chính mình. Đây không phải là một quyết định nhỏ, và mình trân trọng sự tin tưởng đó.</p>',

    // Schedule
    '<h3 style="font-size:15px;font-weight:bold;color:#222;margin:0 0 12px;padding-bottom:6px;border-bottom:1px solid #eee">Thông tin buổi học của bạn</h3>',
    '<p style="margin:0 0 6px">🗓 Buổi 1: <strong>' + esc(s.SESSION1) + '</strong></p>',
    '<p style="margin:0 0 6px">🗓 Buổi 2: <strong>' + esc(s.SESSION2) + '</strong></p>',
    '<p style="margin:0 0 6px">📍 Hình thức: <strong>Live Zoom · 90 phút mỗi buổi</strong></p>',
    '<p style="margin:0 0 24px">🔗 Link Zoom: <em>' + esc(s.ZOOM_NOTE) + '</em></p>',

    // Zalo CTA
    '<h3 style="font-size:15px;font-weight:bold;color:#222;margin:0 0 12px;padding-bottom:6px;border-bottom:1px solid #eee">Bước tiếp theo của bạn</h3>',
    '<p style="margin:0 0 8px">Tham gia nhóm Zalo đồng hành để nhận link Zoom, tài liệu chuẩn bị và cập nhật từ NOE trước buổi học:</p>',
    '<p style="margin:0 0 8px">👉 <a href="' + s.ZALO_GROUP_URL + '" style="color:#8B6F5E;font-weight:bold">Nhấn vào đây để tham gia nhóm Zalo</a></p>',
    '<p style="font-size:13px;color:#666;margin:0 0 28px">Lưu ý: Link Zoom sẽ được gửi qua nhóm trước buổi học 30 phút. Nếu bạn không nhận được, hãy nhắn tin trực tiếp cho NOE trong nhóm.</p>',

    // Preparation note
    '<h3 style="font-size:15px;font-weight:bold;color:#222;margin:0 0 12px;padding-bottom:6px;border-bottom:1px solid #eee">Để buổi học có giá trị nhất với bạn</h3>',
    '<p style="margin:0 0 8px">Trước khi đến với buổi 1, bạn không cần chuẩn bị gì đặc biệt. Chỉ cần dành cho mình một góc yên tĩnh, một tách trà hay cà phê, và sự sẵn lòng ngồi lại với chính mình.</p>',
    '<p style="margin:0 0 8px">Nếu trong lúc chờ đợi bạn muốn bắt đầu suy ngẫm, hãy thử tự hỏi:</p>',
    '<p style="font-style:italic;color:#555;margin:0 0 8px;padding-left:16px;border-left:2px solid #ddd">Điều gì đang khiến mình mệt mỏi nhất lúc này? Và mình thực sự muốn điều gì?</p>',
    '<p style="font-size:14px;color:#666;margin:0 0 32px">Không cần trả lời ngay. Chỉ cần dành một chút thời gian để suy ngẫm.</p>',

    // Sign off
    '<p style="margin:0 0 4px">Hẹn gặp lại!</p>',
    '<p style="margin:0 0 32px"><strong>NOE</strong><br><span style="font-size:13px;color:#888">Nest of Essence — Tổ ấm của Bản thể</span></p>',

    // Footer
    '<p style="font-size:12px;color:#aaa;border-top:1px solid #eee;padding-top:16px;margin:0">',
    'Câu hỏi? Nhắn qua nhóm Zalo hoặc hotline <a href="tel:' + s.HOTLINE + '" style="color:#aaa">' + s.HOTLINE + '</a>',
    '</p>',
    '</body></html>'
  ].join('\n');
}

function buildPlainEmail(v) {
  let txt = CONFIG.EMAIL_SENDER_NAME + "\n\n";
  txt += "Chào " + v.name + ",\n\n";
  txt += "Chúng tôi đã nhận được thanh toán của bạn cho " + CONFIG.PRODUCT_NAME + ". Cảm ơn bạn!\n\n";
  txt += "Mã đơn: " + v.orderId + "\n";
  txt += "Số tiền: " + v.totalAmount + "đ\n";
  if (v.goal) txt += "Mục tiêu: " + v.goal + "\n";
  txt += "\nTÀI LIỆU CHÍNH\n" + CONFIG.EBOOK_URL + "\n\n";
  if (CONFIG.ZALO_GROUP_URL) txt += "ZALO GROUP\n" + CONFIG.ZALO_GROUP_URL + "\n\n";
  if (v.hasBumps) {
    txt += "TÀI LIỆU ĐI KÈM\n";
    if (v.bump1) txt += "• " + CONFIG.BUMP1_NAME + ": " + CONFIG.BUMP1_URL + "\n";
    if (v.bump2) txt += "• " + CONFIG.BUMP2_NAME + ": " + CONFIG.BUMP2_URL + "\n";
    txt += "\n";
  }
  txt += "Hotline: " + CONFIG.HOTLINE + "\n\n";
  txt += "—\n" + CONFIG.EMAIL_SENDER_NAME + "\n" + CONFIG.ADDRESS + "\n";
  return txt;
}

// ============================================================
// UTILITIES
// ============================================================
function formatVnd(n) {
  return Number(n).toLocaleString('en-US').replace(/,/g, '.');
}

function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function corsJson(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================
// HTTP ENTRY POINTS
// ============================================================
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');

    if (body.action === 'createOrder') {
      return corsJson(createOrder(body.data || {}));
    }

    if (body.action === 'updateOrder') {
      return corsJson(updateOrder(body.orderId, body.data || {}));
    }

    if (body.content !== undefined && body.transferAmount !== undefined) {
      const key = (e.parameter && e.parameter.key) || '';
      if (key !== CONFIG.SEPAY_API_KEY) {
        return corsJson({ success: false, error: 'Unauthorized' });
      }
      return corsJson(handleSepayWebhook(body));
    }

    return corsJson({ success: false, error: 'Unknown request' });
  } catch (err) {
    return corsJson({ success: false, error: err.toString() });
  }
}

function doGet(e) {
  try {
    const action = (e.parameter && e.parameter.action) || '';
    if (action === 'getStatus') return corsJson(getStatus(e.parameter.orderId));
    if (action === 'health') return corsJson({ success: true, message: 'Backend running' });
    return corsJson({ success: false, error: 'Unknown action. Use ?action=health to test' });
  } catch (err) {
    return corsJson({ success: false, error: err.toString() });
  }
}

// ============================================================
// TEST FUNCTIONS
// ============================================================
function testCreateOrder() {
  const result = createOrder({
    name: 'Test User',
    phone: '0901234567',
    email: CONFIG.EMAIL_REPLY_TO,
    goal: 'Test',
    bump1: false,
    bump2: false,
    totalAmount: CONFIG.PRODUCT_PRICE
  });
  Logger.log(JSON.stringify(result, null, 2));
}

function testSendEmail() {
  sendConfirmationEmail({
    orderId: 'TEST-001',
    name: 'Test User',
    email: CONFIG.EMAIL_REPLY_TO,
    goal: 'Test',
    bump1: false,
    bump2: false,
    totalAmount: CONFIG.PRODUCT_PRICE
  });
  Logger.log('Email sent to ' + CONFIG.EMAIL_REPLY_TO);
}

function manualTriggerRow() {
  const rowNumber = 2; // ← Đổi số row trước khi Run
  triggerPaidActions(rowNumber);
  Logger.log('Manual trigger fired for row ' + rowNumber);
}
