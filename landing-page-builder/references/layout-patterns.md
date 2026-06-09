# Layout Patterns

> 6 layout pattern proven, rút từ 23 project. Pick theo niche + scope copy.

---

## Decision tree (chọn pattern)

```
Copy có VSL/video hero + form opt-in cùng fold?
├── YES → Pattern 2 (Split-screen)
└── NO ↓

Copy dài > 3000 chữ, dạng sales letter cá nhân?
├── YES → Pattern 3 (Narrow editorial)
└── NO ↓

Founder là USP chính, cần bio prominent?
├── YES → Pattern 5 (2-col hero with photo)
└── NO ↓

Sản phẩm có nhiều feature/module cần grid showcase?
├── YES → Pattern 4 (Multi-col grid sections)
└── NO ↓

Default → Pattern 1 (Vertical-long centered)
```

---

## Pattern 1 — Vertical-Long Centered (DEFAULT)

**Structure:**
```
[Sticky top bar] (optional)
[Hero — centered, max-width 900px]
[Pain section — alternating bg]
[Story section]
[Solution — grid 3-col cards]
[Offer box — centered, max-width 700px]
[Social proof — grid 3-col]
[Guarantee — centered narrow]
[FAQ — accordion centered]
[Final CTA — full-width dark]
[Footer]
```

- **Container:** `max-width: 1100px`, padding `0 24px`
- **Section spacing:** `padding: 80px 0` desktop, `48px 0` mobile
- **Alternating bg:** odd sections `--bg`, even `--surface`
- **Use case:** 80% sale page coaching/workshop
- **References:** `1percent-editor-v2`, `vnc-workshop-optin`, `giao-tiep-thau-cam`

---

## Pattern 2 — Split-Screen Hero

**Structure:**
```
[Hero — 2 col]
  [Left: VSL video + tagline]   [Right: Opt-in form / Order box]
[Income proof bar]
[Solution grid]
[Offer recap]
[Testimonial]
[FAQ]
[Footer]
```

- **Hero grid:** `grid-template-columns: 1fr 420px` desktop, `1fr` mobile (stack)
- **Form sticky** trên desktop scroll
- **Use case:** VSL funnel, lead-gen high-intent, AI/income course
- **References:** `ai-ghostwriter-vn`

---

## Pattern 3 — Narrow Editorial (long-form letter)

**Structure:**
```
[Hero — centered, narrow]
[Story section — narrow, reading-focused]
[Long sales argument — paragraphs + subheads]
[Inline CTAs every ~800 words]
[Offer box — wider than narrow]
[FAQ]
[Final CTA]
```

- **Container:** `max-width: 720px` (reading width) hoặc `880px`
- **Typography:** font-size body `18-19px`, line-height `1.7`
- **No grid, no card** — chỉ text flow + small images inline
- **Use case:** Sales letter dài, personal brand cao, premium course
- **References:** `cabin-crew-mastery-salespage`, `5-ngay-tim-lai-minh`

---

## Pattern 4 — Multi-Col Grid Heavy

**Structure:**
```
[Hero centered]
[Pain — 3-col card grid]
[Module/Feature — 3 or 4-col grid với icon]
[Outcomes — 6-col icon grid]
[Testimonial — 3 or 4-col cards]
[Offer box]
[FAQ accordion 2-col]
[Footer]
```

- **Grid:** `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))` (responsive)
- **Card style:** subtle border + padding 24-32px + hover lift
- **Use case:** Course nhiều module · workshop nhiều outcomes · B2B service
- **References:** `lct-visuals` (6-col why-us), `vnc-workshop-optin` (6-col outcomes)

---

## Pattern 5 — 2-Col Hero with Photo

**Structure:**
```
[Hero — 2 col]
  [Left: Photo founder (circle/portrait)]   [Right: Headline + bio + CTA]
[Credentials cards — 3-col]
[Story long-form — narrow]
[Workshop detail]
[Offer]
[FAQ]
[Final CTA]
```

- **Photo:** circle với accent ring/border decoration
- **Layout:** `grid-template-columns: 380px 1fr` (photo bên trái fixed)
- **Use case:** Founder personal-brand workshop, coaching 1-1
- **References:** `bac-thuy-cat`, `phu-nu-gia-tri-cao`

---

## Pattern 6 — Theme Toggle (Advanced)

**Structure:** Bất kỳ pattern trên + nút toggle light/dark trên nav

- **Implementation:** CSS variable swap via `data-theme="dark|light"` trên `<html>`
- **FOUC prevention:** inline script trong `<head>` set theme TRƯỚC khi paint
- **Use case:** Agency, B2B, audience tech-savvy
- **References:** `duy-landing-page`
- **⚠️ Lưu ý:** Chỉ pick khi user explicitly muốn — phức tạp hơn, dễ sai nếu skip FOUC

---

## Responsive breakpoints chuẩn

```css
/* Mobile-first */
:root { --max-w: 1100px; }

@media (min-width: 640px) { /* tablet */ }
@media (min-width: 1024px) { /* desktop */ }
@media (min-width: 1280px) { /* wide */ }
```

**Rule chung:**
- Mobile: stack tất cả grid về 1 column
- Hero photo/video: full-width trên mobile, side-by-side trên desktop
- Sticky bars: ẩn trên mobile nếu chiếm > 12% viewport
- Font size: dùng `clamp()` để scale mượt, vd `clamp(2rem, 5vw, 3.5rem)` cho h1

---

## Anti-patterns (TRÁNH)

- ❌ Carousel/slider cho testimonial (user không click qua)
- ❌ Parallax phức tạp (jank trên mobile)
- ❌ Animation tự chạy > 2s sau load (distract)
- ❌ Modal popup chặn đọc trước khi user scroll 50%
- ❌ Hero hình background đè text khó đọc (overlay phải ≥ 50%)
- ❌ CTA cùng màu với section bg (vô hình)
