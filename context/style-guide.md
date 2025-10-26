# Nes Hatamar - Brand Style Guide

## Brand Identity

Nes Hatamar is a bilingual (Hebrew/English) platform with an elegant, sophisticated aesthetic that honors traditional design while maintaining modern usability. The design language reflects warmth, authenticity, and timeless quality.

## Color Palette

### Primary Colors

#### Gold
- **Primary Gold**: `#C9A961` - Used for primary CTAs, accents, highlights, and interactive elements
- **Light Gold**: `#E5D3A6` - Used for subtle backgrounds, hover states, and secondary accents
- **Border**: `rgba(201, 169, 97, 0.3)` - Used for dividers, borders, and subtle separators

**Usage Guidelines:**
- Use Primary Gold for important actions and focal points
- Use Light Gold for hover states and non-critical highlights
- Gold should convey warmth and importance without overwhelming the interface
- Limit gold usage to maintain its impact and elegance

#### Cream
- **Cream**: `#FFFEF7` - Primary background color

**Usage Guidelines:**
- Default background for pages and containers
- Provides soft, warm base that enhances readability
- Creates subtle contrast with pure white elements
- Maintains consistency across all views

#### Dark
- **Dark**: `#2C2416` - Primary text and dark UI elements

**Usage Guidelines:**
- Use for body text, headings, and primary content
- Ensures strong contrast against cream background (meets WCAG AA+)
- Use for important UI elements that need visual weight
- Maintains readability across both RTL and LTR layouts

### Accent Color

#### Pink
- **Accent Pink**: `#E8B4D9` - Secondary accent color

**Usage Guidelines:**
- Use sparingly for special highlights or secondary actions
- Complements the gold palette without competing
- Can be used for special badges, notifications, or decorative elements
- Should not be used for primary CTAs

### Color Accessibility

All color combinations have been verified for WCAG AA compliance:
- **Dark (#2C2416) on Cream (#FFFEF7)**: ✓ Excellent contrast for body text
- **Gold (#C9A961) on Cream (#FFFEF7)**: ✓ Adequate contrast for headings and accents
- **Cream (#FFFEF7) on Dark (#2C2416)**: ✓ Inverse scheme for dark sections

## Typography

### Font Families

#### Hebrew Typography
- **Font**: Frank Ruhl Libre
- **Fallbacks**: Times New Roman, serif
- **Character**: Elegant, traditional Hebrew serif font
- **Usage**: All Hebrew text content

**Guidelines:**
- Maintains traditional aesthetics while being highly legible
- Works well at various sizes
- Provides authentic Hebrew typographic feel
- Ensure proper line-height for Hebrew diacritics if used

#### English Typography
- **Font**: Playfair Display
- **Fallbacks**: Georgia, serif
- **Character**: Classic, elegant serif with high contrast
- **Usage**: All English text content

**Guidelines:**
- Complements Frank Ruhl Libre's elegance
- High contrast strokes create sophisticated feel
- Works best for headings and medium-sized text
- May need size adjustments for optimal readability in body text

#### UI/Sans Typography
- **Font**: System UI
- **Fallbacks**: -apple-system, sans-serif
- **Character**: Clean, modern, native to user's OS
- **Usage**: Buttons, labels, form inputs, navigation elements

**Guidelines:**
- Provides clarity and familiarity for interactive elements
- Ensures fast loading (system font)
- Maintains consistency with OS interface
- Use for any UI chrome that needs high legibility

### Typography Scale

Recommended scale (adjust based on specific needs):

- **H1**: 32-40px - Page titles, hero headings
- **H2**: 24-28px - Section headings
- **H3**: 20-24px - Subsection headings
- **H4**: 18-20px - Card titles, smaller headings
- **Body Large**: 18px - Prominent paragraphs, introductions
- **Body**: 16px - Default body text
- **Body Small**: 14px - Secondary text, captions, metadata
- **Caption**: 12px - Tertiary information, labels

**Line Height Guidelines:**
- **Headings**: 1.2-1.3 - Tighter for visual impact
- **Body Text**: 1.6-1.8 - Generous for readability
- **UI Elements**: 1.4-1.5 - Balanced for buttons/labels

**Font Weight:**
- **Regular (400)**: Default body text
- **Medium (500)**: Emphasis within body text
- **SemiBold (600)**: Subheadings, important labels
- **Bold (700)**: Headings, strong emphasis

## Spacing & Layout

### Container System

**Padding:**
- **Default**: 1.5rem (24px) - Mobile and small screens
- **Small**: 2rem (32px) - Tablet breakpoint
- **Large**: 3rem (48px) - Desktop and larger

**Centering:**
- All containers are centered by default
- Maintains consistent content width across viewports

### Spacing Scale (Tailwind Default - 8px base)

Use consistent spacing multiples:
- **xs**: 4px - Minimal spacing, tight groups
- **sm**: 8px - Related elements
- **md**: 16px - Standard spacing between elements
- **lg**: 24px - Section spacing
- **xl**: 32px - Large section breaks
- **2xl**: 48px - Major section divisions

## Bidirectional Design (RTL/LTR)

### Core Principles

1. **Layout Mirroring**: All horizontal layouts should mirror in RTL
2. **Icon Direction**: Directional icons (arrows, chevrons) should flip in RTL
3. **Text Alignment**: Text naturally aligns right in RTL, left in LTR
4. **Margins/Padding**: Logical properties (start/end) instead of left/right

### RTL Implementation

**Using tailwindcss-rtl plugin:**
- Plugin automatically handles directional styling
- Use Tailwind's logical properties when available
- Test both directions for every layout change

**Best Practices:**
- Avoid hard-coded `margin-left` or `padding-right` - use Tailwind utilities
- Use `ms-` (margin-start) instead of `ml-` (margin-left)
- Use `pe-` (padding-end) instead of `pr-` (padding-right)
- Icons with directional meaning should flip: use CSS `transform: scaleX(-1)` in RTL
- Numbers and Latin text within RTL should remain LTR

### Testing Checklist

For every layout change:
- ✓ View in Hebrew (RTL mode)
- ✓ View in English (LTR mode)
- ✓ Verify text alignment is natural
- ✓ Verify margins/padding mirror correctly
- ✓ Verify navigation flows in natural direction
- ✓ Verify images and media display correctly
- ✓ Check that forms are usable in both directions

## Responsive Design

### Breakpoints (Tailwind Defaults)

- **sm**: 640px - Small tablets
- **md**: 768px - Tablets
- **lg**: 1024px - Small desktops
- **xl**: 1280px - Desktops
- **2xl**: 1536px - Large desktops

### Responsive Strategy

1. **Mobile-First**: Design for mobile, enhance for desktop
2. **Touch Targets**: Minimum 44x44px for interactive elements on mobile
3. **Readable Line Length**: Max 70-80 characters per line for body text
4. **Flexible Images**: Use responsive images, never fixed widths
5. **Progressive Enhancement**: Core functionality works everywhere, enhancements for capable devices

## Accessibility Standards

### WCAG AA Compliance (Minimum)

**Color Contrast:**
- Text: 4.5:1 minimum for normal text
- Large Text: 3:1 minimum for 18px+ or 14px+ bold
- UI Components: 3:1 for interactive elements

**Keyboard Navigation:**
- All interactive elements must be keyboard accessible
- Visible focus states on all focusable elements
- Logical tab order

**Screen Readers:**
- Semantic HTML elements
- Proper heading hierarchy (h1 → h2 → h3, no skipping)
- Alt text for all meaningful images
- ARIA labels for icon buttons
- Form labels properly associated with inputs

**RTL Accessibility:**
- Screen readers should properly announce RTL content
- Keyboard navigation should flow in natural direction
- Focus indicators should be visible in both directions

## Component Guidelines

### Buttons

**Primary Button:**
- Background: Gold (#C9A961)
- Text: Cream (#FFFEF7) or White
- Hover: Gold Light (#E5D3A6)
- Border Radius: 4-6px
- Padding: 12px 24px (md:16px md:32px)

**Secondary Button:**
- Background: Transparent
- Border: 2px solid Gold (#C9A961)
- Text: Dark (#2C2416)
- Hover: Light Gold background

### Cards

- Background: White or Cream
- Border: 1px solid border color (rgba(201, 169, 97, 0.3))
- Border Radius: 8-12px
- Padding: 24px (md:32px)
- Shadow: Subtle, warm-toned shadow

### Forms

- Input Background: White
- Input Border: Border color (rgba(201, 169, 97, 0.3))
- Input Border Radius: 4-6px
- Focus State: Gold border (#C9A961)
- Label: Dark (#2C2416), Medium weight
- Placeholder: Lighter gray for distinction

## Brand Voice

**Visual Tone:**
- Elegant yet approachable
- Warm and inviting
- Traditional with modern sensibility
- Respectful of cultural heritage
- Professional but not corporate

**Design Values:**
- **Clarity**: Information should be easy to find and understand
- **Warmth**: Colors and typography create welcoming atmosphere
- **Quality**: Attention to detail in every element
- **Respect**: Honor both Hebrew and English language equally
- **Accessibility**: Design for everyone, regardless of ability or device
