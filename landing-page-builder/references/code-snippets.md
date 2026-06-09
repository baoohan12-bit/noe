# Code Snippets Bank

> Snippet HTML/CSS proven cho từng component sale page. Claude đọc + adapt vào output.
>
> **Cách dùng:** Sau khi pick DNA, lookup snippet tương ứng dưới đây + inject CSS variables từ palette đã chọn.

---

## 🎯 Component Index

- [Hero — Centered](#hero-centered)
- [Hero — 2-col with Portrait](#hero-2-col-with-portrait)
- [Hero — Split Screen](#hero-split-screen)
- [Eyebrow Section Label](#eyebrow-section-label)
- [Story Narrative (long-form)](#story-narrative)
- [Pain List Cards](#pain-list-cards)
- [Founder Banner](#founder-banner)
- [Founder Quote](#founder-quote)
- [Pillar Cards (3 trụ)](#pillar-cards)
- [Curriculum Session Cards](#curriculum-session-cards)
- [Outcomes Grid 4-col](#outcomes-grid)
- [Audience Fit Checklist](#audience-fit-checklist)
- [Contrast ✕/✓ 2-col](#contrast-2col)
- [Testimonial Cards 4-col](#testimonial-cards)
- [Offer Box Centerpiece](#offer-box)
- [Reason Cards "Vì sao..."](#reason-cards)
- [FAQ Accordion (native)](#faq-accordion)
- [Final CTA with P.S.](#final-cta)
- [Sticky Mobile CTA](#sticky-mobile-cta)
- [Footer](#footer)

---

## Hero — Centered
**Khi dùng:** DNA-01, 03, 04, 06 — text-focused hero, không cần ảnh prominent

```html
<section class="hero">
  <div class="container text-center">
    <span class="badge">Workshop Online · Miễn Phí</span>
    <h1 class="mt-6">Headline 6-12 chữ<br><span class="text-accent">Accent line</span></h1>
    <p class="mt-4 text-muted" style="font-size: 1.15rem; max-width: 640px; margin: 0 auto;">
      Sub-headline 15-30 chữ giải thích offer
    </p>
    <div class="mt-8">
      <a href="dang-ky.html" class="btn-primary">CTA Text →</a>
    </div>
  </div>
</section>
```

```css
.hero {
  padding: clamp(80px, 12vw, 140px) 0 var(--section-py);
  background: radial-gradient(ellipse at top, var(--accent-soft) 0%, var(--bg) 60%);
}
```

---

## Hero — 2-col with Portrait
**Khi dùng:** DNA-08, 05 — founder/brand portrait là USP

```html
<section class="hero">
  <div class="container">
    <div class="hero-grid">
      <div>
        <div class="hero-meta">
          <span>Meta info 1</span><span>Meta info 2</span><span>Meta info 3</span>
        </div>
        <span class="badge">Badge</span>
        <h1 class="mt-6">Headline<br>Multi line<br><span class="text-accent">Highlight</span></h1>
        <div class="hero-info">
          <div class="hero-info-card"><div class="icon">🕗</div><div class="label">Time</div></div>
          <div class="hero-info-card"><div class="icon">📅</div><div class="label">Date</div></div>
          <div class="hero-info-card"><div class="icon">💻</div><div class="label">Location</div></div>
        </div>
        <div class="mt-8"><a href="dang-ky.html" class="btn-primary">CTA →</a></div>
      </div>
      <div class="hero-portrait">
        <img src="assets/portrait.png" alt="Founder">
      </div>
    </div>
  </div>
</section>
```

```css
.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 60px;
  align-items: center;
}
@media (max-width: 900px) { .hero-grid { grid-template-columns: 1fr; gap: 40px; } }

.hero-portrait {
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent-soft) 0%, transparent 70%);
  padding: 20px;
  max-width: 480px;
  margin: 0 auto;
}
.hero-portrait img {
  border-radius: 50%;
  border: 3px solid var(--accent);
  box-shadow: 0 12px 48px var(--accent-soft);
}

.hero-info { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 32px; }
.hero-info-card {
  background: var(--surface-2); border: 1px solid var(--border);
  padding: 18px; border-radius: 10px; text-align: center;
}
@media (max-width: 600px) { .hero-info { grid-template-columns: 1fr; } }
```

---

## Hero — Split Screen
**Khi dùng:** DNA-02 — VSL/income offer cần video + form cùng fold

```html
<section class="hero">
  <div class="container">
    <div class="split-hero">
      <div class="split-left">
        <div class="video-wrapper">
          <video controls poster="assets/poster.jpg">
            <source src="assets/vsl.mp4" type="video/mp4">
          </video>
        </div>
        <h1 class="mt-6">Headline</h1>
      </div>
      <div class="split-right order-form">
        <h3>Đăng ký nhận</h3>
        <form>
          <input type="text" placeholder="Họ và tên" required>
          <input type="email" placeholder="Email" required>
          <button type="submit" class="btn-primary">Nhận Ngay →</button>
        </form>
      </div>
    </div>
  </div>
</section>
```

```css
.split-hero {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 40px;
  align-items: start;
}
@media (max-width: 900px) { .split-hero { grid-template-columns: 1fr; } }
.order-form { background: var(--surface-2); padding: 32px; border-radius: var(--radius); position: sticky; top: 24px; }
```

---

## Eyebrow Section Label
**Khi dùng:** Mọi section, tạo nhịp đọc editorial

```html
<span class="eyebrow">Section label</span>
<h2>Section heading</h2>
```

```css
.eyebrow {
  display: inline-block;
  font-family: var(--font-h);
  font-size: 0.85rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 600;
  margin-bottom: 18px;
}
.eyebrow::before { content: "✦  "; }
```

---

## Story Narrative
**Khi dùng:** Long-form section (Founder Story, Pain narrative)

```html
<div class="story-narrative">
  <p>Đoạn text chính (cream màu).</p>
  <p class="muted">Đoạn text phụ (muted màu).</p>
  <p class="pull-quote">"Quote nổi bật trong câu chuyện."</p>
  <p>Tiếp đoạn chính.</p>
</div>
```

```css
.story-narrative p {
  font-size: 1.1rem;
  margin-bottom: 20px;
  color: var(--text);
}
.story-narrative p.muted { color: var(--text-muted); }
.story-narrative .pull-quote {
  font-family: var(--font-h);
  font-size: 1.25rem;
  color: var(--accent);
  border-left: 3px solid var(--accent);
  padding-left: 24px;
  margin: 32px 0;
  font-style: italic;
  font-weight: 500;
}
```

---

## Pain List Cards
**Khi dùng:** Section "Điều gì cản bạn lại?" / pain points

```html
<div class="pain-list">
  <div class="pain-item">Pain point 1 — text dài 1-2 dòng</div>
  <div class="pain-item">Pain point 2</div>
  <div class="pain-item">Pain point 3</div>
</div>
```

```css
.pain-list { display: grid; gap: 16px; }
.pain-item {
  background: var(--surface-2);
  border-left: 3px solid var(--accent-deep);
  padding: 20px 24px;
  border-radius: 8px;
  color: var(--text);
}
```

---

## Founder Banner
**Khi dùng:** Visual divider trong Founder Story section

```html
<div class="founder-banner">
  <img src="assets/founder-banner.png" alt="Founder banner">
</div>
```

```css
.founder-banner {
  background: linear-gradient(135deg, var(--accent-deep) 0%, #2A0A0B 100%);
  border-radius: var(--radius);
  padding: 48px;
  margin: 48px 0;
  text-align: center;
  border: 1px solid var(--accent);
}
.founder-banner img { max-width: 100%; border-radius: 8px; margin: 0 auto; }
```

---

## Founder Quote
**Khi dùng:** Highlight quote trong story long-form

```html
<div class="founder-quote">
  "Quote text — câu nói đắt giá của founder/insight."
</div>
```

```css
.founder-quote {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 32px;
  margin: 32px 0;
  font-family: var(--font-h);
  font-size: 1.15rem;
  color: var(--accent);
  font-style: italic;
}
```

---

## Pillar Cards
**Khi dùng:** Methodology 3 trụ cốt / 3 pillar

```html
<div class="grid-3 mt-16">
  <div class="pillar">
    <span class="pillar-num">Trụ cột 01</span>
    <h3 class="mt-4">Tên trụ cột</h3>
    <p class="pillar-quote">"Tagline ngắn"</p>
    <p>Giải thích chi tiết...</p>
  </div>
  <!-- 2 pillar còn lại -->
</div>
```

```css
.pillar {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 36px 32px;
  position: relative;
}
.pillar-num {
  position: absolute; top: -16px; left: 32px;
  background: var(--accent); color: #0A0A0A;
  padding: 6px 16px; border-radius: 999px;
  font-family: var(--font-h); font-weight: 700; font-size: 0.85rem;
}
.pillar-quote {
  font-style: italic; color: var(--accent);
  font-family: var(--font-h); font-size: 1.05rem;
  margin: 16px 0 20px; padding-left: 16px;
  border-left: 2px solid var(--accent);
}
```

---

## Curriculum Session Cards
**Khi dùng:** Workshop schedule / module breakdown

```html
<div class="grid-2 mt-16">
  <div class="session">
    <div class="session-num">1</div>
    <h3>Tên buổi 1</h3>
    <p class="session-date">Thứ Bảy · 30/5 · 20:00</p>
    <ul>
      <li>Bullet point 1</li>
      <li>Bullet point 2</li>
    </ul>
  </div>
</div>
```

```css
.session {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 36px;
}
.session-num {
  display: inline-flex; align-items: center; justify-content: center;
  width: 56px; height: 56px;
  background: var(--accent); color: #0A0A0A;
  border-radius: 50%;
  font-family: var(--font-h); font-weight: 800; font-size: 1.5rem;
  margin-bottom: 20px;
}
.session-date { color: var(--accent); font-weight: 600; font-family: var(--font-h); margin-bottom: 16px; }
.session ul { list-style: none; padding: 0; }
.session ul li { padding: 10px 0 10px 28px; position: relative; color: var(--text); }
.session ul li::before { content: "→"; position: absolute; left: 0; color: var(--accent); font-weight: 700; }
```

---

## Outcomes Grid
**Khi dùng:** "Sau workshop bạn cầm về..." 4 outcomes

```html
<div class="outcomes-grid">
  <div class="outcome-card">
    <div class="icon">🗺️</div>
    <p>Outcome 1 description</p>
  </div>
  <!-- 3 outcomes còn lại -->
</div>
```

```css
.outcomes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}
.outcome-card {
  background: var(--surface); border: 1px solid var(--border);
  padding: 24px; border-radius: var(--radius); text-align: center;
}
.outcome-card .icon { font-size: 2rem; margin-bottom: 12px; }
```

---

## Audience Fit Checklist
**Khi dùng:** "Workshop dành cho bạn nếu..." section

```html
<div class="audience-list mt-12">
  <div class="audience-item">Bạn có chuyên môn nhưng người lạ không biết bạn tồn tại.</div>
  <div class="audience-item">Bạn đăng bài đều đặn nhưng không có khách.</div>
</div>
```

```css
.audience-list { display: grid; gap: 14px; }
.audience-item {
  background: var(--surface-2);
  padding: 18px 24px 18px 56px;
  border-radius: 8px;
  position: relative;
  color: var(--text);
  border: 1px solid var(--border);
}
.audience-item::before {
  content: "✓"; position: absolute; left: 20px; top: 18px;
  width: 24px; height: 24px;
  background: var(--accent); color: #0A0A0A;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 0.85rem;
}
```

---

## Contrast 2col
**Khi dùng:** "Không phải / Thực sự là" so sánh

```html
<div class="contrast-grid">
  <div class="contrast-col contrast-no">
    <h3>✕ Không phải</h3>
    <ul>
      <li>Item không phải 1</li>
      <li>Item không phải 2</li>
    </ul>
  </div>
  <div class="contrast-col contrast-yes">
    <h3>✓ Thực sự là</h3>
    <ul>
      <li>Item thực sự 1</li>
      <li>Item thực sự 2</li>
    </ul>
  </div>
</div>
```

```css
.contrast-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
@media (max-width: 700px) { .contrast-grid { grid-template-columns: 1fr; } }
.contrast-col {
  background: var(--surface-2); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 32px 28px;
}
.contrast-col h3 { margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border); }
.contrast-col ul { list-style: none; padding: 0; }
.contrast-col li { padding: 10px 0 10px 28px; position: relative; color: var(--text); }
.contrast-no li::before { content: "✕"; position: absolute; left: 0; color: #8B4444; font-weight: 700; }
.contrast-yes li::before { content: "✓"; position: absolute; left: 0; color: var(--accent); font-weight: 700; }
```

---

## Testimonial Cards
**Khi dùng:** Social proof 3-4 nhân vật

```html
<div class="grid-4 mt-16">
  <div class="testimonial-card">
    <div class="avatar-placeholder">V</div>
    <div class="testimonial-name">Vi Hoa</div>
    <div class="testimonial-role">Role/Title</div>
    <p>Quote testimonial nội dung kết quả cụ thể.</p>
  </div>
</div>
```

```css
.testimonial-card {
  background: var(--surface-2); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 32px 28px; text-align: center;
}
.avatar-placeholder {
  width: 80px; height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-deep) 100%);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-h); font-size: 2rem; font-weight: 700;
  color: #0A0A0A;
  margin: 0 auto 20px;
  border: 2px solid var(--accent);
}
.testimonial-name { font-family: var(--font-h); font-weight: 700; color: var(--text); }
.testimonial-role { color: var(--accent); font-size: 0.85rem; letter-spacing: 0.05em; text-transform: uppercase; margin-top: 4px; margin-bottom: 16px; }
```

---

## Offer Box
**Khi dùng:** Centerpiece chuyển đổi — phải nổi bật nhất trang

```html
<div class="offer-box">
  <span class="badge">Badge ưu đãi</span>
  <div class="offer-price">
    <span class="strike">999.000đ</span>
    <span class="main">99.000đ</span>
  </div>
  <p>Mô tả gói ngắn</p>
  <ul class="offer-list">
    <li>Bao gồm item 1</li>
    <li>Bao gồm item 2</li>
    <li>Bonus item</li>
  </ul>
  <a href="dang-ky.html" class="btn-primary" style="font-size: 1.15rem;">Đăng Ký Ngay →</a>
</div>
```

```css
.offer-box {
  background: linear-gradient(135deg, var(--accent-deep) 0%, #2A0A0B 100%);
  border: 2px solid var(--accent);
  border-radius: var(--radius);
  padding: 56px 40px;
  text-align: center;
  box-shadow: 0 20px 60px var(--accent-soft);
}
.offer-price { font-family: var(--font-h); margin: 24px 0 32px; }
.offer-price .strike { color: var(--text-muted); text-decoration: line-through; font-size: 1.1rem; display: block; margin-bottom: 4px; }
.offer-price .main { color: var(--accent); font-size: 3rem; font-weight: 800; }
.offer-list { text-align: left; max-width: 480px; margin: 32px auto; }
.offer-list li {
  list-style: none; padding: 12px 0 12px 32px; position: relative; color: var(--text);
}
.offer-list li::before { content: "✦"; position: absolute; left: 0; color: var(--accent); font-weight: 700; }
```

---

## Reason Cards
**Khi dùng:** "Vì sao..." 2 lý do song song

```html
<div class="grid-2 mt-12">
  <div class="reason-card">
    <div class="reason-num">01</div>
    <h3>Lý do 1 heading</h3>
    <p>Giải thích chi tiết</p>
  </div>
</div>
```

```css
.reason-card {
  background: var(--surface-2); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 28px;
}
.reason-num {
  font-family: var(--font-h); font-size: 2rem;
  color: var(--accent); font-weight: 800; margin-bottom: 8px;
}
```

---

## FAQ Accordion
**Khi dùng:** Mọi sale page — dùng `<details>` native, không cần JS

```html
<details class="faq-item">
  <summary>Câu hỏi 1?</summary>
  <div class="answer">Câu trả lời chi tiết.</div>
</details>
```

```css
.faq-item {
  background: var(--surface-2); border: 1px solid var(--border);
  border-radius: 10px; margin-bottom: 12px; overflow: hidden;
}
.faq-item summary {
  padding: 20px 24px; cursor: pointer;
  font-family: var(--font-h); font-weight: 600; color: var(--text);
  list-style: none;
  display: flex; justify-content: space-between; align-items: center;
}
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item summary::after { content: "+"; color: var(--accent); font-size: 1.5rem; }
.faq-item[open] summary::after { content: "−"; }
.faq-item .answer { padding: 0 24px 24px; color: var(--text-muted); }
```

---

## Final CTA
**Khi dùng:** Cuối trang, thúc đẩy quyết định cuối

```html
<section class="section final-cta">
  <div class="container-narrow text-center">
    <h2>Final headline thúc đẩy</h2>
    <p class="mt-8">Đoạn giải thích cuối cùng</p>
    <div class="mt-12">
      <a href="dang-ky.html" class="btn-primary">CTA Cuối →</a>
      <p class="mt-6 text-accent">Thông tin urgency</p>
    </div>
    <div class="ps-note">
      Note P.S. cuối — câu hỏi reflection cho reader.
    </div>
  </div>
</section>
```

```css
.final-cta {
  background: linear-gradient(180deg, var(--surface) 0%, var(--accent-deep) 100%);
  border-top: 1px solid var(--accent);
}
.ps-note {
  margin-top: 48px; padding: 24px;
  border: 1px dashed var(--accent); border-radius: var(--radius);
  font-style: italic; color: var(--text); text-align: left;
}
.ps-note::before { content: "P.S. "; color: var(--accent); font-weight: 700; }
```

---

## Sticky Mobile CTA
**Khi dùng:** Mọi sale page có conversion goal — đảm bảo CTA luôn visible mobile

```html
<div class="sticky-cta">
  <a href="dang-ky.html" class="btn-primary">CTA →</a>
</div>
```

```css
.sticky-cta {
  display: none;
  position: fixed; bottom: 0; left: 0; right: 0;
  padding: 12px 16px;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--accent);
  z-index: 50;
}
.sticky-cta a { display: block; text-align: center; }
@media (max-width: 700px) {
  .sticky-cta { display: block; }
  body { padding-bottom: 80px; }
}
```

---

## Footer
**Khi dùng:** Cuối trang — minimal, không distract

```html
<footer>
  <div class="container">
    <p>© 2026 Brand. All rights reserved.</p>
    <p class="mt-4">Mô tả thêm / contact</p>
  </div>
</footer>
```

```css
footer {
  padding: 32px 0; background: var(--bg);
  border-top: 1px solid var(--border);
  text-align: center; color: var(--text-muted); font-size: 0.875rem;
}
```

---

## 🔧 Base CSS (luôn có)

```css
:root {
  /* Inject từ palette đã chọn — xem color-systems.md */
  --bg, --surface, --surface-2, --text, --text-muted, --accent, --accent-soft, --accent-deep, --border;
  /* Inject từ DNA — xem design-dna-library.md */
  --font-h, --font-b;
  /* Constants */
  --max-w: 1100px;
  --max-w-narrow: 760px;
  --section-py: clamp(56px, 9vw, 112px);
  --radius: 14px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-b); background: var(--bg); color: var(--text);
  line-height: 1.7; -webkit-font-smoothing: antialiased;
}
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
button { font-family: inherit; cursor: pointer; border: none; background: none; color: inherit; }
h1, h2, h3, h4 { font-family: var(--font-h); line-height: 1.25; font-weight: 700; color: var(--text); }
h1 { font-size: clamp(2rem, 5.5vw, 3.75rem); letter-spacing: -0.01em; }
h2 { font-size: clamp(1.65rem, 3.8vw, 2.6rem); letter-spacing: -0.01em; }
h3 { font-size: clamp(1.2rem, 2.4vw, 1.5rem); }
p { color: var(--text-muted); }

.container { max-width: var(--max-w); margin: 0 auto; padding: 0 24px; }
.container-narrow { max-width: var(--max-w-narrow); margin: 0 auto; padding: 0 24px; }
.section { padding: var(--section-py) 0; position: relative; }
.section-alt { background: var(--surface); }
.section-deep { background: linear-gradient(180deg, var(--bg) 0%, var(--surface) 100%); }

.badge {
  display: inline-block; padding: 8px 18px; border-radius: 999px;
  background: var(--accent-soft); color: var(--accent);
  font-size: 0.875rem; font-weight: 600; letter-spacing: 0.02em;
  border: 1px solid var(--border);
}
.btn-primary {
  display: inline-block; padding: 18px 36px;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-deep) 100%);
  color: #0A0A0A; border-radius: var(--radius);
  font-weight: 700; font-size: 1.05rem; font-family: var(--font-h);
  transition: all 0.2s; box-shadow: 0 4px 16px var(--accent-soft);
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px var(--accent-soft); }
.btn-secondary {
  display: inline-block; padding: 16px 32px;
  background: transparent; color: var(--text);
  border: 1px solid var(--border); border-radius: var(--radius); font-weight: 600;
}

.grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 24px; }
.grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
.grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }

.text-center { text-align: center; }
.text-accent { color: var(--accent); }
.text-muted { color: var(--text-muted); }
.mt-2 { margin-top: 8px; } .mt-4 { margin-top: 16px; } .mt-6 { margin-top: 24px; }
.mt-8 { margin-top: 32px; } .mt-12 { margin-top: 48px; } .mt-16 { margin-top: 64px; }
```
