# Sepay Funnel Skill

Skill cho Claude Code giúp setup automation sale funnel: **Sepay xác nhận thanh toán tự động + Email gửi tài liệu PDF**, deploy trên Vercel.

## Kết quả

User chạy skill → ~1h30 sau có:
- 4 trang funnel chạy trên Vercel (sale → đăng ký → checkout → xác nhận)
- Backend GAS xử lý đơn + lưu Google Sheet
- Sepay webhook tự xác nhận khi nhận tiền
- Email tự động gửi PDF sản phẩm
- Manual trigger qua Sheet edit (cho trường hợp khách CK sai content)

## Cài đặt

### Cách 1 — Cài cho 1 project

Copy thư mục `sepay-funnel/` vào `.claude/skills/` trong project của bạn:

```
your-project/
  .claude/
    skills/
      sepay-funnel/      ← copy toàn bộ folder này
```

### Cách 2 — Cài global (dùng cho mọi project)

```
~/.claude/skills/sepay-funnel/
```

(Trên Windows: `%USERPROFILE%\.claude\skills\sepay-funnel\`)

## Cách dùng

Mở Claude Code trong terminal, type:

```
Sepay
```

Hoặc:
```
Tôi muốn thiết lập thanh toán tự động cho sale page
```

Claude sẽ tự nhận skill và bắt đầu guide từ Phase 0.

## Chuẩn bị trước khi chạy skill

Xem `docs/PREREQUISITES.md`. Tóm tắt:
- Tài khoản Gmail (sẽ gửi email tự động)
- Tài khoản ngân hàng Việt (Sepay support 15+ banks)
- File PDF/Ebook đã upload Google Drive (share Anyone)
- Tài khoản Vercel (free) hoặc GitHub

## Cấu trúc

```
sepay-funnel/
├── SKILL.md          ← Instructions cho Claude (8 phases workflow)
├── README.md         ← File này
├── templates/
│   ├── Code.gs       ← Google Apps Script template (placeholders __XXX__)
│   ├── index.html    ← Sale page
│   ├── dang-ky.html  ← Order form
│   ├── checkout.html ← QR thanh toán + polling status
│   ├── xac-nhan.html ← Success page
│   └── vercel.json   ← Vercel routing
└── docs/
    ├── PREREQUISITES.md
    └── TROUBLESHOOTING.md
```

## Troubleshooting

Xem `docs/TROUBLESHOOTING.md` cho các lỗi thường gặp:
- GAS không deploy
- Sepay webhook không fire
- Email không gửi
- Status không update khi tick bump
- Manual trigger không work

## Tech stack

- **Frontend:** HTML/CSS/JS thuần (no framework, deploy đâu cũng được)
- **Backend:** Google Apps Script (free, không cần server)
- **Database:** Google Sheet (free, ai cũng đọc/edit được)
- **Payment:** Sepay (Vietnamese, support 15+ banks, free webhook)
- **Email:** Gmail via MailApp (100 emails/day free)
- **Hosting:** Vercel (free tier đủ dùng)

## License

MIT. Dùng thoải mái cho dự án thương mại.
