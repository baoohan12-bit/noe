# Color Systems & Typography Catalog

> Bộ palette + font pairing đã proven, rút từ 23 project trong `reference-index.md`.
>
> **Cách dùng:** Match niche/vibe user → pick palette → copy CSS variables vào `page-skeleton.html`.

---

## 9 Palette chuẩn

### 1. Dark Glow Red
```css
--bg: #0A0A0A;
--surface: #141414;
--text: #FFFFFF;
--text-muted: #A0A0A0;
--accent: #FF3B30;
--accent-soft: rgba(255, 59, 48, 0.15);
```
- **Vibe:** modern-minimal · dark-glow · stadium-energy
- **Niche fit:** Freelance skill coaching, video editing, mindset cao năng lượng
- **Reference:** `1percent-editor-v2`, `1percent-vsl-book-call`

### 2. Dark Glow Green
```css
--bg: #0A0A0A;
--surface: #141414;
--text: #FFFFFF;
--text-muted: #94A3B8;
--accent: #22C55E;
--accent-warn: #EF4444;
```
- **Vibe:** dark-glow · clinical · tech
- **Niche fit:** AI/tech tools, income/wealth, ghostwriting, programming
- **Reference:** `ai-ghostwriter-vn`

### 3. Dark Gold Luxury
```css
--bg: #0D0D0D;
--surface: #1A1A1A;
--text: #FFFFFF;
--text-muted: #B8B8B8;
--accent: #D4AE4A;
--accent-deep: #64491C;
```
- **Vibe:** professional · luxury · dark-glow
- **Niche fit:** Premium course, aviation/executive coaching, high-ticket
- **Reference:** `cabin-crew-mastery`, `cabin-crew-mastery-salespage`, `cabin-crew-mastery-upsell`

### 4. Warm Rose Feminine
```css
--bg: #FFFBF8;
--surface: #FFFFFF;
--text: #3D2222;
--text-muted: #6B4848;
--accent: #C96A6A;
--accent-soft: rgba(201, 106, 106, 0.12);
```
- **Vibe:** warm-feminine · editorial · elegant-serif
- **Niche fit:** Parenting, women empowerment, wellness, healing
- **Reference:** `giao-tiep-thau-cam`

### 5. Warm Copper
```css
--bg: #FDE5D0;
--surface: #FFFFFF;
--text: #3D2A1A;
--text-muted: #6B5340;
--accent: #C77539;
--accent-soft: rgba(199, 117, 57, 0.15);
```
- **Vibe:** warm-feminine · editorial · elegant
- **Niche fit:** Montessori/parenting education, founder personal-brand workshop
- **Reference:** `bac-thuy-cat`

### 6. Stadium Red on White
```css
--bg: #FFFFFF;
--surface: #F5F5F5;
--text: #1C1C1C;
--text-muted: #6B7280;
--accent: #E50914;
--accent-dark: #0A0A0A;
```
- **Vibe:** stadium-energy · clinical · masculine-strong
- **Niche fit:** Fitness challenge, health program, urgency-driven offer
- **Reference:** `ifits`, `ifits-v2`

### 7. Editorial Light + Yellow
```css
--bg: #F4F4F4;
--surface: #FFFFFF;
--text: #0A1628;
--text-muted: #4A5568;
--accent: #FFE711;
--accent-dark: #0A1628;
```
- **Vibe:** modern-minimal · editorial · playful
- **Niche fit:** B2B agency, DFY service, creator coaching
- **Reference:** `duy-landing-page`

### 8. Luxury Black + Burgundy + Gold
```css
--bg: #0A0A0A;
--surface: #1A1010;
--text: #F5E6D3;
--text-muted: #B8A088;
--accent: #D4AF37;
--accent-deep: #5C1A1B;
```
- **Vibe:** luxury · elegant-serif · dark-glow
- **Niche fit:** Premium food/product, boutique, gifting business
- **Reference:** `king-cake`, `king-florist`

### 9. Cosmic Mystical
```css
--bg: #0B0B1A;
--surface: #15152A;
--text: #F0E8FF;
--text-muted: #A89BC8;
--accent: #C8A6FF;
--accent-glow: rgba(200, 166, 255, 0.4);
```
- **Vibe:** cosmic · mystical · spiritual
- **Niche fit:** Spiritual healing, meditation, energy work, astrology
- **Reference:** `tro-ve-ben-trong`

### 10. Warm Terracotta Sand
```css
:root {
  --terra-deep:  #7A3015;
  --terra:       #B84E24;
  --terra-warm:  #C9612E;
  --terra-light: #D4795A;
  --terra-pale:  #E8B49A;
  --sand:        #F7F0E8;
  --sand-mid:    #F2E9DE;
  --sand-deep:   #EBE0D3;
  --linen:       #FBF7F2;
  --bark:        #3D2010;
  --bark-mid:    #6B3E28;
  --bark-soft:   #9A6A52;
  --border:      rgba(139,58,26,0.13);
  --border-warm: rgba(139,58,26,0.22);
}
```
- **Vibe:** warm-feminine · luxury-serif · editorial · sand
- **Niche fit:** Personal branding workshop cho phụ nữ, vị thế & ảnh hưởng, soft luxury coaching
- **Reference:** `noe-sales-page` — NOE Workshop "Nghệ Thuật Xác Lập Vị Thế"

---

## 6 Font Pairings chuẩn

⚠️ **QUAN TRỌNG — Vietnamese-safe:** Mọi font dùng cho landing page tiếng Việt PHẢI hỗ trợ Vietnamese subset đầy đủ. Tránh font display lỗi dấu (Anton, Bebas Neue, Oswald, Instrument Serif, Geist).

| # | Heading | Body | Use case | Reference | VN-safe |
|---|---|---|---|---|---|
| A | **Lora** (serif) | **Inter** | Warm editorial coaching | `giao-tiep-thau-cam` | ✅ |
| B | **Plus Jakarta Sans** | **Inter** | Modern tech/freelance | `1percent-*`, `lct-visuals` | ✅ |
| C | ~~Anton + Barlow Condensed~~ → **Poppins 800** + Inter | **Inter** | Stadium athletic (fallback vì Anton lỗi dấu VN) | `ifits-v2` (cần update) | ✅ fallback |
| D | **Poppins** | **Inter** | Luxury/premium dark | `cabin-crew-mastery` | ✅ |
| E | **Lora** | **Roboto** | Warm educational | `bac-thuy-cat` | ✅ |
| F | ~~Geist + Instrument Serif~~ → **DM Sans** + **Playfair Display** (italic) | **DM Sans** | Modern editorial agency (fallback) | `duy-landing-page` (cần update) | ✅ fallback |
| G | **Montserrat** | **Be Vietnam Pro** | Clinical tech VN | `ai-ghostwriter-vn` | ✅ |
| H | **Cormorant Garamond** (italic serif) | **DM Sans** | Warm terracotta editorial, personal branding phụ nữ sang trọng | `noe-sales-page` | ✅ |

**Default safe pick khi không chắc:** Heading = **Poppins** hoặc **Plus Jakarta Sans** · Body = **Inter** hoặc **Be Vietnam Pro**.

Google Fonts preload snippet (chèn vào `<head>`):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=__HEADING__&family=__BODY__&display=swap" rel="stylesheet">
```

---

## Quick Decision Matrix

| Niche → | Palette gợi ý | Font pairing |
|---|---|---|
| Fitness / Health | #6 Stadium Red | C (Anton + Inter) |
| Freelance / Skill coaching | #1 Dark Glow Red | B (Plus Jakarta) |
| AI / Tech / Income | #2 Dark Glow Green | G (Montserrat) |
| Aviation / Executive | #3 Dark Gold | D (Poppins) |
| Parenting / Wellness | #4 Warm Rose | A (Lora + Inter) |
| Personal branding workshop phụ nữ | #10 Warm Terracotta | H (Cormorant + DM Sans) |
| Education founder | #5 Warm Copper | E (Lora + Roboto) |
| Agency / DFY | #7 Editorial Light | F (Geist) |
| Premium product | #8 Luxury Black Gold | D (Poppins) |
| Spiritual / Mystical | #9 Cosmic | A (Lora + Inter) |

**Rule:** Nếu user đã pick reference cụ thể ở Bước 2 → dùng đúng palette + font của reference đó (không đề xuất khác). Matrix này chỉ dùng khi user chưa có reference.
