---
name: sepay-funnel
description: Use this skill when the user wants to set up automated payment confirmation with Sepay + email delivery of digital products (Ebook, PDF) for a sale funnel deployed on Vercel. Triggers on phrases like "Sepay", "thiết lập thanh toán tự động", "tạo funnel Sepay", "auto payment funnel", "Sepay webhook", "gửi tài liệu tự động qua email sau thanh toán", "automation sale page", "funnel automation".
---

# 🎯 Sepay Funnel Automation Skill

> Skill này hướng dẫn người mới setup từ A-Z: Sepay xác nhận thanh toán tự động + Email gửi tài liệu PDF, triển khai trên Vercel (free hosting).
>
> **Kết quả cuối:** User CK → 30 giây sau → status `PAID` trong Sheet + email kèm Ebook/PDF được gửi tự động.

## 🤝 Bạn (Claude) là conductor

Skill này designed cho **người mới chưa code bao giờ**. Bạn phải:
- Hỏi user 1 câu hỏi tại 1 thời điểm, không hỏi 10 câu cùng lúc
- Yêu cầu user gửi screenshot ở các bước quan trọng để verify
- Generate code đã pre-filled với info user, không bắt user tự thay placeholder
- Cung cấp lệnh + URL cụ thể, không nói "vào setting" mà phải nói "click icon đồng hồ thứ 4 ở sidebar trái"
- Dừng lại + chờ confirm trước khi sang phase tiếp theo

## 📋 Workflow 8 phases

```
Phase 0 — Welcome + Pre-check (5 phút)
Phase 1 — Discovery: gather user data (10 phút)
Phase 2 — Sepay setup (10 phút)
Phase 3 — Google Sheet + Apps Script (25 phút)
Phase 4 — Sepay webhook config (5 phút)
Phase 5 — Deploy 4 HTML files lên Vercel (15 phút)
Phase 6 — Link GAS URL vào frontend + re-deploy (5 phút)
Phase 7 — Test end-to-end với CK thật 1000đ (10 phút)
Phase 8 — Pre-launch checklist (reference)
```

Tổng thời gian: ~1h30 cho lần đầu.

---

## Phase 0 — Welcome + Pre-check

Khi user invoke skill, bắt đầu bằng:

```
Chào mừng! Mình sẽ giúp bạn setup automation cho sale funnel:
- Sepay tự động xác nhận thanh toán khi khách CK qua app banking
- Email tự động gửi Ebook/PDF cho khách ngay sau khi nhận được tiền
- Deploy free trên Vercel

Trước khi bắt đầu, bạn cần CÓ SẴN 5 thứ sau (sẽ check từng cái):

[ ] Tài khoản Gmail (sẽ làm email gửi)
[ ] Tài khoản ngân hàng (vd MSB/VPB/VCB - Sepay support 15+ banks)
[ ] PDF/Ebook + bonus đã upload lên Google Drive với link share "Anyone with the link"
[ ] Sale page + form đăng ký + checkout + xác nhận - 4 trang HTML (mình sẽ tạo template nếu chưa có)
[ ] Máy có Git + Node.js (để deploy Vercel) HOẶC tài khoản GitHub (deploy qua web UI)

Bạn đã có hết chưa? Nếu thiếu, mình hướng dẫn chuẩn bị trước.
```

**Nếu user thiếu prerequisites:**
- Hướng dẫn họ chuẩn bị từng thứ. Tham khảo `docs/PREREQUISITES.md`
- Đợi user confirm có đủ rồi mới sang Phase 1.

---

## Phase 1 — Discovery (gather user data)

⚠️ **CHECK CONTEXT TRƯỚC:** Đọc `./funnel/user-context.md` (nếu có từ `landing-page-builder`) để lấy `delivery_type`. Nếu chưa có, hỏi câu đầu tiên trong Phase 1:

**"Cung ứng của bạn là WORKSHOP (chỉ link Zoom/Zalo) hay KHÓA HỌC (cần dashboard login + video bài học)?"**

Branching ảnh hưởng:
- Email template (Phase 3.2): workshop = link Zalo, khóa học = email + password + link `/khoahoc.html`
- Phase tiếp theo sau sepay-funnel: workshop → vercel-deployment; khóa học → course-dashboard trước → vercel-deployment

Hỏi user **TỪNG CÂU MỘT**, không paste 10 câu:

1. Tên brand/dự án? (vd "iFit's Fitness", "MyShop")
2. Sản phẩm chính tên gì? Giá bao nhiêu VND?
3. Có bumps không? Nếu có, tên + giá từng cái (max 2 bumps)
4. Email Gmail gửi mail? (vd `support@brand.com`)
5. Số tài khoản ngân hàng + tên ngân hàng + tên chủ tài khoản?
6. URL Google Drive của PDF sản phẩm chính? (đã share "Anyone with the link")
7. URL Drive của bumps (nếu có)?
8. URL Zalo group hỗ trợ (nếu có, gõ "skip" nếu không)
9. Domain dự định dùng? (vd `mybrand.com` hoặc dùng default Vercel `*.vercel.app`)
10. Mục tiêu khách hàng (vd "Giảm Mỡ / Tăng Cơ / Duy Trì" - dùng cho form đăng ký) — có hay không?

**Lưu tất cả answers vào memory hoặc 1 file** `user-context.md` trong thư mục làm việc để dùng generate code sau.

**Sau khi đủ thông tin:**
```
OK đã đủ. Mình sẽ generate tất cả code đã pre-filled với info trên.
Bắt đầu Phase 2 — Sepay setup.
```

---

## Phase 2 — Sepay setup

```
Phase 2 — Setup Sepay (10 phút)

Bạn làm theo 3 bước sau:

Bước 1. Đăng ký Sepay
- Mở https://my.sepay.vn → Sign up
- Login

Bước 2. Liên kết tài khoản ngân hàng
- Menu trái: "Tài khoản ngân hàng" hoặc "Bank accounts"
- Click "Liên kết tài khoản mới"
- Nhập:
  - Ngân hàng: [bank của user]
  - Số TK: [STK của user]
  - Tên chủ TK: [tên của user]
- Save
- Sepay verify (instant hoặc 1-2 ngày tuỳ bank)

Bước 3. Generate API Key
- Menu: "Cài đặt" → "API"
- Click "Generate new key" → copy key (dạng dài 50-60 chars)
- Paste cho mình ở tin nhắn tiếp theo

⚠️ Bảo mật: key này dùng để verify webhook. Đừng share công khai. Có thể rotate sau.
```

Đợi user paste API key. Lưu vào context.

---

## Phase 3 — Google Sheet + Apps Script (longest phase)

### Step 3.1 — Tạo Sheet

```
Bước 3.1 — Tạo Google Sheet

1. Mở https://sheets.google.com → click "+ Blank"
2. Đặt tên Sheet: "[Brand] - Orders"
3. Quan trọng: copy URL Sheet, dạng:
   https://docs.google.com/spreadsheets/d/AAAAA_BBBBB/edit

   Phần "AAAAA_BBBBB" là SHEET_ID. Copy paste cho mình.

❗ KHÔNG cần tạo columns trước. Code sẽ tự tạo lần chạy đầu.
```

Đợi user gửi SHEET_ID. Lưu.

### Step 3.2 — Generate Code.gs cá nhân hóa

Bây giờ generate file `Code.gs` đã fill sẵn CONFIG cho user.

**Template Code.gs có trong** `templates/Code.gs`. Đọc template, **thay 8 placeholders** với data user:
- `__SHEET_ID__` → user's SHEET_ID
- `__SEPAY_API_KEY__` → user's API key
- `__EMAIL_SENDER_NAME__` → user's brand name
- `__EMAIL_REPLY_TO__` → user's Gmail
- `__ZALO_GROUP_URL__` → user's Zalo (hoặc empty string)
- `__EBOOK_URL__` → user's Drive PDF
- `__BUMP1_NAME__`, `__BUMP1_PRICE__`, `__BUMP1_URL__` → if user has bump 1
- `__BUMP2_NAME__`, `__BUMP2_PRICE__`, `__BUMP2_URL__` → if user has bump 2

Write filled Code.gs vào thư mục làm việc của user (vd `./Code.gs`).

```
Bước 3.2 — Code.gs đã generate

Mình đã tạo file Code.gs cá nhân hoá cho [brand].
Đường dẫn: ./Code.gs

Bạn mở file đó, copy toàn bộ (Ctrl+A → Ctrl+C).
```

### Step 3.3 — Paste vào Apps Script

```
Bước 3.3 — Paste vào Apps Script

1. Mở lại tab Google Sheet vừa tạo
2. Menu: Extensions → Apps Script
3. Tab mới mở Apps Script editor với code mặc định "function myFunction() {}"
4. Xoá hết code đó (Ctrl+A → Delete)
5. Paste code vừa copy từ Code.gs
6. Ctrl + S để save
7. Đổi tên project (góc trên-trái) thành "[Brand] Backend"

Báo mình khi save xong.
```

### Step 3.4 — Test code

```
Bước 3.4 — Test code (3 functions)

Trong Apps Script editor, có dropdown trên thanh công cụ (cạnh nút Run ▶):

Test 1 — Tạo order test
1. Dropdown → chọn "testCreateOrder"
2. Click ▶ Run

Lần đầu hiện "Authorization required":
- Review permissions
- Chọn account Gmail (sẽ là sender)
- "Google hasn't verified this app" → Advanced → Go to [Brand] Backend (unsafe) → Allow

Sau đó code chạy lại. Xem Execution log dưới editor.
Nếu thấy "success: true" → OK.

Verify Sheet: refresh tab Sheet → có tab "Orders" mới với 1 row test.

Báo mình khi xong.
```

Đợi user confirm test 1 pass. Sau đó test 2 (testSendEmail) — verify email arrive.

### Step 3.5 — Deploy Web App

```
Bước 3.5 — Deploy Web App

1. Editor → góc trên-phải click "Deploy" → "New deployment"
2. Click icon ⚙ cạnh "Select type" → chọn "Web app"
3. Configure:
   - Description: "v1"
   - Execute as: Me ([email])
   - Who has access: Anyone   ← QUAN TRỌNG: chọn "Anyone" (KHÔNG phải "Anyone with Google account")
4. Click "Deploy"
5. Authorization lại nếu cần
6. Copy Web app URL (dạng https://script.google.com/macros/s/AKfycb.../exec)

Paste URL cho mình.
```

Đợi user gửi GAS_URL. Lưu vào context.

### Step 3.6 — Install onSheetEdit trigger

```
Bước 3.6 — Cài Installed Trigger (QUAN TRỌNG)

Trigger này cho phép bạn confirm đơn manual bằng cách edit Sheet (use case: khách CK sai content).

1. Apps Script editor → sidebar trái → click icon ⏰ (đồng hồ, thứ 4 từ trên)
2. Click "+ Add Trigger" góc dưới-phải
3. Configure:
   - Function: onSheetEdit
   - Deployment: Head
   - Event source: From spreadsheet
   - Event type: On edit
4. Save → Authorize lại nếu cần

Báo mình xong.
```

### Step 3.7 — Format date columns (one-time)

```
Bước 3.7 — Format date columns

Để Sheet hiển thị ngày/giờ đẹp:
1. Dropdown → chọn "formatDateColumns" → ▶ Run
2. Verify: refresh Sheet, các cột B/L/N có format dd/MM/yyyy HH:mm:ss

Báo mình xong.
```

---

## Phase 4 — Sepay webhook config (5 phút)

```
Phase 4 — Cấu hình Sepay webhook

1. Mở my.sepay.vn → menu "Cài đặt" → "Webhooks"
2. Click "Thêm webhook" (hoặc "Add webhook")
3. Điền form:
   - Tên: "[Brand] Auto Confirm"
   - URL: [GAS_URL]?key=[SEPAY_API_KEY]
     ⚠️ Phải có ?key=... ở cuối URL, không có thì GAS sẽ reject
   - Method: POST
   - Content-Type: application/json
   - Authentication: None
   - Liên kết tài khoản: [bank account của user]
   - Loại giao dịch: Tiền vào (in)
4. Save

URL hoàn chỉnh ví dụ:
https://script.google.com/macros/s/AKfycb.../exec?key=KXRNG73...

Nếu Sepay có nút "Test webhook" → click test.
Verify trong Sheet: có row mới với status "UNMATCHED" (đúng behavior khi test payload không khớp order nào).

Báo mình test webhook xong.
```

---

## Phase 5 — Deploy 4 HTML lên Vercel

### Step 5.1 — Generate 4 HTML files

Có 2 cách:

**A) User đã có 4 HTML files sẵn (từ designer/dev khác):**
Skip generate, sang Step 5.2 deploy.

**B) User chưa có HTML, dùng template trong skill:**

Đọc 4 template trong `templates/`:
- `templates/index.html` — sale page
- `templates/dang-ky.html` — order form
- `templates/checkout.html` — QR + polling
- `templates/xac-nhan.html` — success

**Thay 6 placeholders trong mỗi file:**
- `__BRAND_NAME__` → brand name
- `__PRODUCT_NAME__` → tên sản phẩm chính
- `__PRODUCT_PRICE__` → giá VND (vd 99000)
- `__PRICE_DISPLAY__` → giá format (vd 99.000)
- `__BUMP1_NAME__`, `__BUMP1_PRICE__`, `__BUMP1_DISPLAY__`
- `__BUMP2_NAME__`, `__BUMP2_PRICE__`, `__BUMP2_DISPLAY__`
- `__BANK__`, `__BANK_NAME__` (vd "MSB"), `__ACCOUNT_NUMBER__`, `__ACCOUNT_HOLDER__`
- `__HOTLINE__`
- `__ADDRESS__`
- `__GAS_URL__` (sẽ fill ở Phase 6, hiện để rỗng)

Write 4 files vào thư mục `./funnel/` của user.

Cũng tạo `vercel.json` config:
```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    { "source": "/", "destination": "/index.html" }
  ]
}
```

### Step 5.2 — Deploy lên Vercel

Có 3 cách deploy. Đề xuất user chọn:

```
Bước 5.2 — Deploy lên Vercel

Bạn chọn 1 trong 3 cách:

(A) Drag-drop ZIP - đơn giản nhất, không cần Git
(B) GitHub + Vercel UI - tốt cho update lâu dài
(C) Vercel CLI - nhanh nếu có Node.js

Bạn chọn cách nào?
```

#### Cách A — Drag-drop ZIP

```
Cách A: Deploy bằng cách kéo thả ZIP

1. Mở thư mục ./funnel/ trên máy
2. Chọn tất cả files (index.html, dang-ky.html, checkout.html, xac-nhan.html, vercel.json)
3. Nén thành 1 file ZIP (Right-click → Send to → Compressed folder trên Windows, hoặc tar -cf trên Mac)
4. Mở https://vercel.com/new
5. Đăng ký/login (dùng GitHub/Google account)
6. Click "Drop your project" → kéo thả file ZIP vào
7. Đặt tên project (vd "ifits-funnel")
8. Click Deploy
9. Đợi ~30 giây
10. Copy URL Vercel (dạng https://ifits-funnel.vercel.app)

Paste URL cho mình.
```

#### Cách B — GitHub + Vercel

```
Cách B: Deploy qua GitHub

1. Mở https://github.com → tạo new repo (public hoặc private)
2. Trên máy:
   cd ./funnel/
   git init
   git add .
   git commit -m "Initial funnel"
   git branch -M main
   git remote add origin https://github.com/[user]/[repo].git
   git push -u origin main

3. Mở https://vercel.com/new
4. Đăng nhập với GitHub
5. "Import Git Repository" → chọn repo vừa tạo
6. Framework Preset: Other
7. Click Deploy
8. Đợi build → copy URL

Paste URL cho mình.
```

#### Cách C — Vercel CLI

```
Cách C: Vercel CLI (cho dev)

Terminal:
  npm i -g vercel
  cd ./funnel/
  vercel login          # nhập email Vercel
  vercel                # interactive setup, default OK

Sau khi build xong, terminal in URL Production.
Paste cho mình.
```

---

## Phase 6 — Link GAS URL vào frontend

Sau khi user có URL Vercel:

```
Phase 6 — Update GAS URL vào frontend (5 phút)

URL của bạn: [vercel_url]

Mình sẽ update file checkout.html và xac-nhan.html, thay placeholder __GAS_URL__ với:
[gas_url từ Phase 3]

[Edit cả 2 files, replace __GAS_URL__ → user's GAS_URL]

Done. Bây giờ bạn cần redeploy:

- Nếu Cách A (ZIP): tạo ZIP mới với 4 files updated → vào Vercel project → Deployments → Redeploy hoặc kéo thả ZIP mới
- Nếu Cách B (GitHub):
    git add .
    git commit -m "Add GAS URL"
    git push
  Vercel auto-redeploy.
- Nếu Cách C (CLI):
    vercel --prod

Sau khi redeploy xong (~30s), báo mình.
```

---

## Phase 7 — Test end-to-end (CK thật 1000đ)

```
Phase 7 — Test end-to-end (CK 1.000đ thật)

Test này verify chain hoạt động: User CK → Sepay → Sheet PAID → Email gửi.

1. Mở URL Vercel của bạn (incognito để clean session)
2. Vào /dang-ky → điền form test:
   - Tên: Test User
   - Phone: 0901234567 (hoặc số thật)
   - Email: [email TEST khác email sender, để nhận email]
   - Goal: chọn 1 option
3. Submit → redirect /checkout
4. Quan sát checkout:
   - QR code Sepay hiện
   - Nội dung CK: IFITS7N0001 (hoặc số tiếp theo)
   - Status: 🔴 "Đang chờ giao dịch..."
5. CK 1.000đ qua app banking:
   - Quét QR HOẶC nhập tay đúng nội dung CK
   - Số tiền: 1000
6. Đợi 10-30 giây:
   - Status chuyển 🟢 "✓ Đã nhận giao dịch · Đang chuyển trang..."
   - Auto-redirect /xac-nhan
   - Email đến inbox test
   - Sheet update: status PAID, paidAt, emailSent có timestamp

Gửi mình screenshot kết quả (Sheet row + email inbox).
```

**Nếu test fail, debug theo `docs/TROUBLESHOOTING.md`.**

---

## Phase 8 — Pre-launch checklist (reference)

Khi user pass test:

```
🎉 Automation hoạt động!

Trước khi chạy ads thật, check 4 thứ:

[ ] Privacy Policy page tạo trên Vercel (cần cho Meta ad review)
[ ] Refund Policy page (nếu sản phẩm có hoàn tiền)
[ ] Rotate Sepay API key (Sepay dashboard → generate mới → update Code.gs + Sepay webhook URL → Deploy New version GAS)
[ ] Test thêm 2-3 đơn với amount khác (vd có bumps)

Có cần mình hướng dẫn 1 trong 4 cái trên không?

Optional nâng cấp:
- Meta Pixel + Conversion API tracking
- Custom domain (vd brand.com thay vì brand.vercel.app)
- UTM tracking để biết user đến từ campaign nào

Khi cần, gọi mình lại với keyword cụ thể.
```

---

## 🛠️ Debug helpers cho Claude

### Nếu user stuck ở Phase X

Reference `docs/TROUBLESHOOTING.md` — có solution cho common errors.

Patterns errors hay gặp:
- "GAS không deploy được" → user chọn "Anyone with Google account" thay vì "Anyone"
- "Sepay webhook không fire" → URL thiếu `?key=`
- "Email không gửi" → Gmail quota exceeded (100/ngày free)
- "Status không tự update khi tick bump" → updateOrder không gọi (frontend cũ chưa re-paste)
- "Manual trigger không work" → onSheetEdit trigger chưa install

### Nếu user muốn skip 1 phase

OK cho skip, nhưng explain trade-off:
- Skip Phase 3.6 (trigger install) → không thể manual confirm qua Sheet edit
- Skip Phase 7 (test) → risk ads chạy nhưng automation hỏng

### Nếu user dùng platform khác Vercel

- **Netlify** — tương tự Vercel, drag-drop folder hoặc Git
- **GitHub Pages** — phải set custom domain, không có serverless function (không cần cho skill này)
- **WordPress** — paste 4 file HTML widget vào 4 page riêng. Tham khảo flow cũ ifits-v2.

---

## 📁 Files trong skill này

```
sepay-funnel/
├── SKILL.md             ← File này (instructions cho Claude)
├── README.md            ← Hướng dẫn install + invoke
├── templates/
│   ├── Code.gs              ← Apps Script template với placeholders
│   ├── index.html           ← Sale page generic
│   ├── dang-ky.html         ← Order form generic
│   ├── checkout.html        ← Checkout + QR
│   ├── xac-nhan.html        ← Success page
│   └── vercel.json          ← Vercel config
└── docs/
    ├── PREREQUISITES.md     ← Chuẩn bị trước khi start
    └── TROUBLESHOOTING.md   ← Common errors + fix
```

---

## ✅ Definition of Done

Skill thành công khi user có:
- Vercel URL có 4 trang funnel chạy
- Sepay webhook fired → Sheet auto-update PAID
- Email confirmation đến inbox với link Drive
- Manual trigger qua Sheet edit hoạt động
- Hiểu cách update code + redeploy

Khi user confirm 5 điểm trên, congratulate và remind Pre-launch checklist.
