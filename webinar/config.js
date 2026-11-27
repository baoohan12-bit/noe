// ============================================================
// NOE · Cấu hình cổng thanh toán
// ============================================================
window.NOE_PAY = {
  // Link Web app của Apps Script (đã điền sẵn)
  GAS_URL: 'https://script.google.com/macros/s/AKfycbwBfRmvRIbr6ALtu-PM2gRlD1OS0YApLhk_vhPaEGc8hJbs15h87WmVxQi2-UBqzrc/exec',
  // Số VA của Sepay (bắt đầu bằng VQRQ...) — dùng để tạo mã QR
  VA_NUMBER: 'VQRQALHKI2554',
  // Số tài khoản MB Bank chính — hiện cho khách chuyển khoản thủ công
  ACCOUNT_NUMBER: '881122289',
  // Tên chủ tài khoản, viết in hoa không dấu như trên app ngân hàng
  ACCOUNT_HOLDER: 'HO KINH DOANH NOE',

  BANK_CODE: 'MBBank',
  BANK_NAME: 'MB Bank',
  PRICE: 99000,
  ZALO: '0342 580 741',
  ZALO_URL: 'https://zalo.me/0342580741',
  // Meta Pixel "NOE Workshop" (TKQC 2) — ghi nhận lượt xem, đăng ký và mua vé
  PIXEL_ID: '2483114602153995'
};
