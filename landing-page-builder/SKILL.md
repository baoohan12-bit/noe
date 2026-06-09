---
name: landing-page-builder
description: Tạo 4 trang HTML funnel (sale + dang-ky + checkout + xac-nhan) cho người mới hoàn toàn không biết design. Trigger khi user nói "làm sale page", "tạo landing page", "thiết kế funnel", "build trang bán hàng". Chạy SAU khi user có copy bán hàng. Chạy TRƯỚC sepay-funnel (payment) và vercel-deployment (deploy).
---

# Landing Page Builder

## Agent này làm gì

Convert **copy + niche** thành **4 trang HTML funnel hoàn chỉnh** (sale page custom + 3 trang form/payment đồng bộ theme).

**KHÔNG làm:**
- ❌ Viết copy giùm user (user paste — copy phải giữ verbatim)
- ❌ Xử lý payment automation (skill `sepay-funnel` lo)
- ❌ Deploy lên Vercel (skill `vercel-deployment` lo)

**Target user:** Người mới hoàn toàn — không biết chọn màu, không biết bố cục, không biết HTML. Họ chỉ có copy + ý tưởng brand.

---

## Trước khi bắt đầu

Check context chat:
- Nếu user vừa chạy `funnel-builder` → đã có sẵn brand name, niche, copy → skip Bước 1
- Nếu user invoke trực tiếp → bắt đầu Bước 1

Nguyên tắc xuyên suốt:
- **Hỏi 1 câu/lần.** Không bao giờ dồn nhiều câu.
- **Quyết hộ user nhưng luôn giải thích why** + hỏi opinion. Không hỏi mở "bạn muốn gì?"
- **Copy gốc bất khả xâm phạm.** Sửa typography/layout, KHÔNG sửa text user paste.

---

## Quy trình 6 bước

### Bước 1 — Gather context (5 câu, 1 câu/lần)

Hỏi tuần tự, lưu vào memory tạm:

1. **"Brand/dự án tên gì?"** — dùng cho title, footer
2. **"Sản phẩm bán cái gì? Cho ai? Giá bao nhiêu VND?"** — dùng cho meta, offer
3. **"Loại cung ứng: WORKSHOP (sự kiện live, chỉ cần email link Zoom/Zalo) hay KHÓA HỌC (có video bài học, cần dashboard login để xem)?"** — quyết định downstream skills:
   - **Workshop** → email = link Zoom + Zalo, KHÔNG cần `course-dashboard` skill
   - **Khóa học** → email = email + password + link `/khoahoc.html`, CẦN `course-dashboard` skill chạy sau `sepay-funnel`
   - **Cả 2** → support cả: workshop có Zalo + replay xem qua dashboard
4. **"Paste copy bán hàng vào đây — hoặc gửi đường dẫn file (.md/.txt/.docx) để mình đọc."** — copy là nguồn cứng, user PHẢI có sẵn
5. **"Có ảnh/video founder hoặc product chưa? Đường dẫn?"** — để insert vào HTML (nếu không có → dùng placeholder)

Sau khi đủ 5 câu → tóm tắt lại context (bao gồm `delivery_type: workshop | course | both`) để user confirm trước khi sang Bước 2. Ghi giá trị `delivery_type` vào context file để `sepay-funnel` + `course-dashboard` dùng sau.

### Bước 2 — Pick Design DNA

⚡ Đọc `references/design-dna-library.md`

Match niche user với Quick Pick table → đề xuất **2-3 DNA candidate**.

Format đề xuất:
```
Mình đề xuất 3 Design DNA cho [niche của user]:

**1. DNA-XX — [Tên DNA]** ⭐ Recommend
   Vibe: [vibe summary]
   Lý do hợp với bạn: [1 câu cụ thể gắn với niche/audience]

**2. DNA-YY — [Tên]**
   Vibe: [vibe]
   Lý do: [1 câu]

**3. DNA-ZZ — [Tên]**
   Vibe: [vibe]
   Lý do: [1 câu]

Mình recommend DNA-XX vì [lý do cụ thể nhất].
Bạn chốt 1, hay muốn hybrid 2 DNA (combine layout + palette)?
```

**Rule pick DNA:**
- Niche match → 1 DNA primary từ Quick Pick table
- Nếu user có visual brand sẵn (logo/banner màu cụ thể) → đề xuất **hybrid** với DNA palette match (xem section "Hybrid DNA" trong library)
- Nếu user mơ hồ → đề xuất DNA default + 2 alternative
- **KHÔNG bao giờ tự sáng tạo DNA mới** — chỉ pick từ 9 DNA + hybrid combo

User chốt → ghi nhớ choice cho Bước 3.

### Bước 3 — Confirm theme (palette + font)

⚡ Đọc `references/color-systems.md`

Theo DNA đã chốt ở Bước 2:
- Pick palette tương ứng (DNA-X reference palette số mấy trong color-systems.md)
- Pick font pairing tương ứng (đã verify Vietnamese-safe)
- Show user: palette 5 hex codes + font names

Format:
```
Theo DNA-XX, mình apply:

**Palette:** [tên palette]
- bg: #XXX · surface: #XXX · accent: #XXX · ...

**Font:** [pairing name]
- Heading: [Font A] · Body: [Font B] (đều có Vietnamese subset)

OK chưa? Hay đổi accent màu khác (vd thay vàng → xanh ngọc)?
```

⚠️ Mọi font phải có Vietnamese subset. Nếu user muốn font lạ → check `color-systems.md` table VN-safe trước khi accept.

User approve → ghi vào "theme config" tạm.

### Bước 4 — Map copy → section

Đọc copy user paste, tự phân tách thành các section của sale page (Hero, Pain, Story, Solution, Offer, Testimonial, Guarantee, FAQ, Final CTA — hoặc bất kỳ cấu trúc nào copy đã có).

**Show user mapping:**
```
Mình đọc copy bạn rồi, dự định chia thành các section sau:

1. HERO        ← "[trích 10 chữ đầu copy]..."
2. PROBLEM     ← 3 pain points mình thấy
3. STORY       ← đoạn về founder
4. OFFER       ← gói + giá
5. TESTIMONIAL ← 2 quotes
6. FAQ         ← 4 câu
7. FINAL CTA   ← dòng cuối

Mapping này OK chưa? Có section nào mình hiểu sai không?
```

User confirm → sang Bước 5.

**Lưu ý:**
- Tuyệt đối KHÔNG sửa/rút gọn text user paste — chỉ phân nhóm section
- Nếu copy thiếu section quan trọng (vd không có offer/giá) → hỏi user 1 câu bổ sung, KHÔNG bịa

### Bước 5 — Generate HTML

⚡ Đọc `references/code-snippets.md` + `references/layout-patterns.md` + `templates/page-skeleton.html`

**5a. Chọn layout pattern** theo DNA đã chốt (xem field "Layout pattern" trong DNA profile). Inform user 1 câu.

**5b. Generate `index.html`** (sale page chính):
- Start từ `page-skeleton.html` base
- Inject `:root` CSS variables từ palette (Bước 3) + Base CSS từ `code-snippets.md`
- Load Google Fonts theo pairing đã chốt
- **Với mỗi section copy đã map ở Bước 4 → lookup snippet tương ứng trong `code-snippets.md`** (Hero / Pillar Cards / Offer Box / FAQ / v.v.), copy HTML + CSS từ snippet, fill text bằng copy verbatim của user
- Apply "Signature elements" từ DNA profile (vd DNA-08 có "Radial glow hero", "Portrait circle gold border", v.v.)
- Output: `./funnel/index.html`

**5c. Generate 3 trang còn lại** (dang-ky / checkout / xac-nhan):
- Copy template từ `../sepay-funnel/templates/dang-ky.html`, `checkout.html`, `xac-nhan.html`
- Inject CSS variables giống index.html → đảm bảo theme đồng bộ
- Để placeholder `__GAS_URL__` nguyên (sepay-funnel sẽ fill sau)
- Output: `./funnel/dang-ky.html`, `./funnel/checkout.html`, `./funnel/xac-nhan.html`

**5d. Tạo `vercel.json`** (config deploy):
```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [{ "source": "/", "destination": "/index.html" }]
}
```

### Bước 6 — Handoff

Inform user:
```
✅ Xong 4 trang HTML trong ./funnel/

Bước tiếp theo:
1. Mở index.html trong browser xem thử → báo mình chỗ nào cần sửa
2. Khi OK → invoke skill sepay-funnel để add payment automation
3. Sau đó → invoke skill vercel-deployment để publish

Hay muốn mình preview thử + screenshot luôn?
```

Nếu user muốn preview → dùng `preview_start` + `preview_screenshot` (workflow đã có).

---

## Xử lý trường hợp khó

**User không có copy:**
- Skill này yêu cầu user PHẢI có copy sẵn. Nếu chưa có, inform user:
  "Skill này build trang từ copy bạn có sẵn. Bạn cần viết copy trước (hoặc dùng skill `assp-ad-copy-machine` nếu có quyền), rồi quay lại."
- Không tự bịa copy thay user.

**User không quyết được DNA ở Bước 2:**
- Đề xuất DNA default theo Quick Pick table trong `design-dna-library.md`
- Inform: "Mình dùng DNA-XX vì niche [Y] thường hợp — bạn xem thử, không thích thì đổi sau."

**User muốn vibe lạ không có trong 9 DNA:**
- Vẫn pick 1 DNA gần nhất làm base + adjust 1-2 element (accent màu hoặc font)
- KHÔNG tự sáng tạo DNA mới (risk lệch tone) — nếu user khăng khăng, hỏi cụ thể: "Bạn paste cho mình 2-3 hex code accent + 1 font name từ Google Fonts" → check Vietnamese-safe → apply

**User có visual brand sẵn (logo/banner màu):**
- Dùng hybrid: layout DNA niche-match + palette DNA color-match
- Xem section "Hybrid DNA" trong `design-dna-library.md` cho example

**User paste copy rất dài (> 5000 chữ):**
- Auto pick Pattern 3 (Narrow editorial)
- Inform: "Copy của bạn dạng long-form, mình dùng layout editorial hẹp để dễ đọc."

---

## Output checklist (Definition of Done)

Skill xong khi:
- [ ] `./funnel/index.html` render được trong browser, không broken layout
- [ ] 4 trang cùng theme (cùng `:root` CSS variables)
- [ ] Mọi `[REPLACE: ...]` đã thay bằng nội dung user
- [ ] Mobile responsive (test viewport 375px)
- [ ] `vercel.json` có sẵn
- [ ] User được inform 2 skill tiếp theo (sepay-funnel, vercel-deployment)
