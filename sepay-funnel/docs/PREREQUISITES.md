# Prerequisites — Chuẩn bị trước khi chạy skill

Trước khi gõ "Sepay" để Claude bắt đầu setup, đảm bảo bạn có sẵn 5 thứ sau.

## 1. Tài khoản Gmail (sẽ là sender email)

- Email Gmail thông thường (vd: support@brand.com hoặc cá nhân)
- Lưu ý: Email này sẽ là **Sender Name** + nhận thông báo lỗi GAS
- Khuyến nghị: tạo Gmail riêng cho automation (vd: noreply.brand@gmail.com) để tách bạch với email cá nhân

**Giới hạn Gmail:**
- 100 emails/ngày (Gmail free)
- 1.500 emails/ngày (Google Workspace paid)

## 2. Tài khoản ngân hàng (kết nối Sepay)

Sepay hiện hỗ trợ 15+ ngân hàng Việt:
- MSB, VPBank, VCB, BIDV, TPBank, ACB, Techcombank, MB Bank, OCB, Sacombank, Vietinbank, Agribank, SHB, HDBank, VIB, ...

Yêu cầu:
- Có app banking đã active (Smart Banking, VPBank NEO, MSB mBank...)
- Số TK chính chủ (Sepay verify theo CMND)
- Có thể tạo TK phụ riêng cho automation (recommended)

## 3. File PDF/Ebook đã upload Google Drive

- Upload PDF/zip lên Google Drive (file lớn nhất ~25MB là vừa cho email link)
- **Quan trọng:** Share file với "Anyone with the link" (View only)
- Copy share link, vd: `https://drive.google.com/file/d/AAAA_BBBB/view`

Nếu sản phẩm có **bumps** (upsells), upload thêm các file đó.

**Tránh:** Đừng đính kèm file PDF trực tiếp vào email (sẽ bị block hoặc spam). Luôn dùng link Drive.

## 4. Sale page + Order form + Checkout + Xác nhận (4 trang HTML)

**Option A — Đã có HTML từ designer:**
- 4 file `.html` riêng biệt
- Skill sẽ giúp inject GAS_URL + redirect logic

**Option B — Chưa có, dùng template trong skill:**
- Skill sẽ generate 4 file generic với placeholder data của bạn
- Sau đó bạn customize copy/design theo brand

## 5. Vercel + (optional) GitHub

Để deploy 4 file HTML lên web, có 3 cách:

### Cách A — Vercel drag-drop (đơn giản nhất, không cần Git)
- Tạo account: https://vercel.com/signup (free, login bằng GitHub/Google/Email)
- Sẽ kéo thả file ZIP của 4 trang HTML vào

### Cách B — GitHub + Vercel auto-deploy (recommended cho update lâu dài)
- Tạo account: https://github.com/signup (free)
- Cài Git trên máy: https://git-scm.com/downloads
- Kết nối Vercel với GitHub

### Cách C — Vercel CLI (cho dev đã quen terminal)
- Cài Node.js: https://nodejs.org/ (LTS version)
- Sau đó `npm i -g vercel`

---

## Checklist before Phase 1

Khi gõ "Sepay" cho Claude, bạn cần đọc to + tick từng cái:

- [ ] Tôi có Gmail account, đang đăng nhập trên máy này
- [ ] Tôi có app banking + biết STK + tên CTK
- [ ] Tôi đã upload PDF lên Drive, share "Anyone with the link", và copy URL sẵn
- [ ] Tôi đã quyết định domain (vd: dùng default *.vercel.app, hay custom domain)
- [ ] Tôi đã sẵn sàng dành ~1h30 tập trung làm

Nếu chưa đủ 5 cái, hãy chuẩn bị trước rồi mới start.

---

## Optional — Pre-launch checklist (cho production)

Sau khi skill chạy xong, trước khi chạy ads, cần thêm:

- [ ] Privacy Policy page (cần để Meta duyệt ad)
- [ ] Refund Policy page (nếu có hoàn tiền)
- [ ] Custom domain trỏ về Vercel (vd brand.com thay vì brand.vercel.app)
- [ ] Meta Pixel + Conversion API (nâng cấp tracking — gọi skill khác)
- [ ] Backup Google Sheet định kỳ (File → Download → Excel)
