# Troubleshooting — Lỗi thường gặp & cách fix

## 1. GAS không deploy được Web App

**Triệu chứng:** Click Deploy → "Authorization required" loop, hoặc URL không sinh ra.

**Nguyên nhân:**
- Chọn nhầm "Anyone with Google account" thay vì "Anyone"
- Tài khoản Google không support Apps Script (rất hiếm, thường là tài khoản Workspace bị admin disable)

**Fix:**
1. Deploy → Manage deployments → Edit ✏
2. "Who has access" → đổi thành **"Anyone"** (không có "with Google account")
3. Save + Authorize lại

---

## 2. Sepay webhook không fire

**Triệu chứng:** CK thật rồi nhưng Sheet không update, không có row UNMATCHED nào.

**Check:**
1. Vào Sepay dashboard → Webhooks → click vào webhook đã tạo → tab "Logs"
2. Có request nào ko? Status code là gì?

**Các lỗi hay gặp:**

### a) URL thiếu `?key=...`
- URL phải dạng: `https://script.google.com/macros/s/AKfycb.../exec?key=YOUR_API_KEY`
- KHÔNG dùng: `https://script.google.com/macros/s/AKfycb.../exec` (thiếu key)
- Fix: vào Sepay, edit URL, thêm `?key=` ở cuối

### b) API key không match
- Key trong Sepay URL phải = `CONFIG.SEPAY_API_KEY` trong Code.gs
- Fix: copy lại key từ Sepay → paste vào Code.gs → Deploy → Manage deployments → Edit → New version → Deploy

### c) GAS chưa cấp quyền Anyone
- Same as lỗi 1 ở trên

### d) Webhook bị Sepay disable (sai content > 5 lần)
- Sepay auto-disable webhook nếu fail nhiều
- Fix: vào dashboard → Re-enable webhook

---

## 3. Email không gửi (sheet có emailSent ERROR)

**Triệu chứng:** Sheet update PAID nhưng cột `emailSent` ghi "ERROR: ..."

**Các lỗi hay gặp:**

### a) Gmail quota exceeded
- "Service invoked too many times: email"
- Gmail free chỉ 100 emails/ngày
- Fix: chờ 24h, hoặc upgrade Workspace

### b) Recipient email invalid
- "Invalid email"
- Frontend cho phép user nhập email sai format
- Fix: thêm validation pattern email trong dang-ky.html

### c) MailApp permission revoked
- "Authorization required"
- Fix: Run testSendEmail() từ editor → Authorize lại

---

## 4. Status không update khi tick bump

**Triệu chứng:** User tick bump trong checkout, nhưng amount + bump field trong Sheet không update.

**Nguyên nhân:**
- Hàm `updateOrderAPI()` trong checkout.html không gọi
- Hoặc GAS chưa redeploy sau khi thêm `updateOrder` action

**Fix:**
1. Check checkout.html có function `updateOrderAPI` không (line ~120)
2. Check Code.gs có `if (body.action === 'updateOrder')` trong `doPost` không
3. Redeploy GAS: Deploy → Manage deployments → Edit → New version → Deploy
4. Re-paste GAS_URL nếu URL đổi

---

## 5. Manual trigger không work (gõ PAID vào Sheet không gửi email)

**Triệu chứng:** Edit cột K thành "PAID", paidAt không update, không có email gửi.

**Nguyên nhân:** Chưa cài Installed Trigger.

**Fix:**
1. GAS editor → sidebar trái → icon ⏰ (Triggers, thứ 4)
2. Add Trigger
3. Function: `onSheetEdit`
4. Event source: From spreadsheet
5. Event type: On edit
6. Save → Authorize

Sau đó test lại: edit ô status → đợi 2-3s → email arrive.

---

## 6. Frontend báo lỗi "Failed to fetch" hoặc CORS

**Triệu chứng:** Submit form trên dang-ky.html → console báo CORS error.

**Nguyên nhân:**
- GAS deployment access = "Only myself" thay vì "Anyone"
- Hoặc URL GAS_URL có space/typo

**Fix:**
- Re-deploy với access = Anyone
- Verify URL paste đúng (copy nguyên dạng `https://script.google.com/macros/s/.../exec`)
- Test trực tiếp: mở URL trên browser → phải thấy JSON `{"success": false, "error": "Unknown action..."}`

---

## 7. QR Sepay không hiện

**Triệu chứng:** Trang checkout không có ảnh QR.

**Nguyên nhân:**
- URL QR không đúng format
- Bank code sai (vd dùng "MSB" thay vì "MaritimeBank" — cần check format Sepay)

**Fix:**
1. Mở DevTools (F12) → tab Network → xem request đến qr.sepay.vn
2. Test URL trực tiếp browser: `https://qr.sepay.vn/img?acc=YOURACC&bank=MSB&amount=99000&des=TEST`
3. Nếu ko hiện, check bank code đúng: https://my.sepay.vn → "Tài khoản ngân hàng" → bank code thực tế

---

## 8. paidAt hiển thị ngày 1899 hoặc số thập phân

**Triệu chứng:** Cột paidAt hiển thị "12/30/1899" hoặc "45123.7..."

**Nguyên nhân:** Sheet chưa format cột date.

**Fix:**
- Run function `formatDateColumns()` từ GAS editor (Dropdown → chọn → Run)
- Hoặc manual: select cột B/L/N → Format → Number → Date time

---

## 9. Vercel deploy fail "No build configured"

**Triệu chứng:** Vercel báo lỗi "No build configured" hoặc build timeout.

**Nguyên nhân:** Vercel cố gắng build như Next.js/React project.

**Fix:**
1. Project Settings → Framework Preset → **Other** (không phải Next.js/CRA)
2. Build & Development Settings:
   - Build Command: (để trống hoặc `echo "static"`)
   - Output Directory: `.` (chấm)
   - Install Command: (để trống)
3. Redeploy

---

## 10. Test webhook Sepay nhưng không có row UNMATCHED

**Triệu chứng:** Sepay dashboard ko báo lỗi, nhưng Sheet không có row mới.

**Check:**
1. GAS editor → ⋮ menu → Executions → xem có execution gần đây ko
2. Execution log có error ko?

**Common errors:**
- "Unauthorized" → API key sai
- "Cannot read property 'content' of undefined" → Sepay gửi format khác (rare)
- Timeout → Sheet quá lớn (>10k rows), nên archive bớt

---

## Khi nào cần redeploy GAS?

Mỗi lần sửa Code.gs:
1. Ctrl + S save
2. Deploy → Manage deployments
3. Click ✏ Edit deployment hiện tại
4. Version → "New version"
5. Click Deploy

**Quan trọng:** URL KHÔNG đổi khi tạo new version (giữ nguyên). Chỉ đổi khi tạo deployment mới hoàn toàn.

---

## Khi nào cần re-deploy frontend?

Mỗi lần sửa 4 file HTML:
- Cách A (ZIP): tạo ZIP mới + drag-drop vào Vercel project
- Cách B (GitHub): `git add . && git commit -m "..." && git push` → Vercel auto-redeploy
- Cách C (CLI): `vercel --prod`

---

## Reset hoàn toàn (nuclear option)

Nếu muốn làm lại từ đầu:

1. **Sheet:** xoá tab Orders → next createOrder() sẽ tự tạo lại schema
2. **GAS:** xoá deployment cũ + tạo deployment mới (URL sẽ đổi)
3. **Sepay:** update URL mới vào webhook
4. **Frontend:** update GAS_URL mới + redeploy

Hoặc clone toàn bộ skill vào thư mục mới và chạy lại từ Phase 0.
