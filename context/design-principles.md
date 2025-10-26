# Nes Hatamar - Design Principles & Checklist

This design checklist is specifically tailored for the Nes Hatamar bilingual (Hebrew/English) Next.js application with RTL support. Follow these principles rigorously to maintain world-class design quality.

## I. Core Design Philosophy & Strategy

*   [ ] **Users First:** Prioritize user needs in both Hebrew and English contexts. Understand cultural expectations for both language audiences.
*   [ ] **Bilingual Excellence:** Hebrew and English content should receive equal design attention. Never compromise one language for the other.
*   [ ] **RTL/LTR Harmony:** Layouts must work beautifully in both reading directions without feeling like an afterthought.
*   [ ] **Meticulous Craft:** Aim for precision, polish, and high quality in every UI element and interaction. Details matter in both directions.
*   [ ] **Speed & Performance:** Optimize for Next.js performance. Fast page loads, minimal hydration, efficient font loading.
*   [ ] **Simplicity & Clarity:** Clean, uncluttered interface. Labels and instructions should be clear in both Hebrew and English.
*   [ ] **Focus & Efficiency:** Help users achieve goals quickly. Minimize friction in both languages.
*   [ ] **Consistency:** Maintain uniform design language across all pages and both language directions.
*   [ ] **Accessibility (WCAG AA+):** Design for inclusivity. Ensure sufficient color contrast, keyboard navigability, and screen reader compatibility in both RTL and LTR.
*   [ ] **Cultural Respect:** Honor the cultural context of both Hebrew and English content. Avoid cultural assumptions.

## II. Design System Foundation - Nes Hatamar Tokens

### Color Palette

*   [ ] **Primary Brand Color (Gold):**
    *   [ ] Primary Gold (#C9A961) - Used strategically for CTAs, accents, highlights
    *   [ ] Light Gold (#E5D3A6) - For subtle backgrounds and hover states
    *   [ ] Verify gold usage creates warmth without overwhelming the design
*   [ ] **Neutrals:**
    *   [ ] Cream (#FFFEF7) - Primary background
    *   [ ] Dark (#2C2416) - Primary text and dark elements
    *   [ ] White - Secondary backgrounds, cards
    *   [ ] Border (rgba(201, 169, 97, 0.3)) - Dividers and borders
*   [ ] **Accent Color:**
    *   [ ] Pink (#E8B4D9) - Secondary accent, use sparingly
*   [ ] **Accessibility Check:**
    *   [ ] Dark on Cream: Verify excellent contrast (4.5:1 minimum)
    *   [ ] Gold on Cream: Verify adequate contrast for headings
    *   [ ] All interactive elements have sufficient contrast in both light backgrounds

### Typography Scale

*   [ ] **Font Families:**
    *   [ ] **Hebrew**: Frank Ruhl Libre (serif) - All Hebrew content
    *   [ ] **English**: Playfair Display (serif) - All English content
    *   [ ] **UI Elements**: System UI (sans-serif) - Buttons, labels, navigation
    *   [ ] Verify proper fallbacks load correctly
*   [ ] **Type Scale:**
    *   [ ] H1: 32-40px - Hero headings
    *   [ ] H2: 24-28px - Section headings
    *   [ ] H3: 20-24px - Subsection headings
    *   [ ] H4: 18-20px - Card titles
    *   [ ] Body Large: 18px - Introductions
    *   [ ] Body: 16px - Default body text
    *   [ ] Body Small: 14px - Secondary text
    *   [ ] Caption: 12px - Labels
*   [ ] **Font Weights:**
    *   [ ] Use Regular (400), Medium (500), SemiBold (600), Bold (700) consistently
    *   [ ] Avoid excessive weight variations
*   [ ] **Line Height:**
    *   [ ] Headings: 1.2-1.3
    *   [ ] Body: 1.6-1.8 (generous for readability in both Hebrew and English)
    *   [ ] UI: 1.4-1.5
*   [ ] **Bidirectional Typography:**
    *   [ ] Hebrew text aligns right naturally in RTL
    *   [ ] English text aligns left naturally in LTR
    *   [ ] Numbers and Latin text within Hebrew remain LTR
    *   [ ] Proper handling of mixed-direction content

### Spacing System

*   [ ] **Base Unit:** 8px (Tailwind default)
*   [ ] **Spacing Scale:**
    *   [ ] Use consistent multiples: 4px, 8px, 12px, 16px, 24px, 32px, 48px
    *   [ ] Avoid arbitrary spacing values
*   [ ] **Container Padding:**
    *   [ ] Mobile: 1.5rem (24px)
    *   [ ] Tablet: 2rem (32px)
    *   [ ] Desktop: 3rem (48px)
*   [ ] **RTL/LTR Spacing:**
    *   [ ] Use logical properties (ms-/me- instead of ml-/mr-)
    *   [ ] Verify spacing mirrors correctly in RTL

### Border Radii

*   [ ] **Consistent Values:**
    *   [ ] Small (4-6px): Inputs, buttons
    *   [ ] Medium (8-12px): Cards, modals
    *   [ ] Maintain consistency across all components

### Core UI Components

*   [ ] **Buttons** (with consistent states: default, hover, active, focus, disabled):
    *   [ ] Primary: Gold background, cream/white text
    *   [ ] Secondary: Transparent background, gold border
    *   [ ] Tertiary/Ghost: Minimal styling
    *   [ ] Destructive: Red variant if needed
    *   [ ] Icon support
    *   [ ] Works in both RTL and LTR
*   [ ] **Input Fields:**
    *   [ ] Text, textarea, select, date picker
    *   [ ] Clear labels (Hebrew/English)
    *   [ ] Placeholder text appropriate for direction
    *   [ ] Helper text and error messages
    *   [ ] Focus states with gold border
*   [ ] **Checkboxes & Radio Buttons:**
    *   [ ] Clear visual states
    *   [ ] Labels in correct language and position
*   [ ] **Toggles/Switches**
*   [ ] **Cards:**
    *   [ ] White or cream background
    *   [ ] Subtle gold border
    *   [ ] 8-12px border radius
    *   [ ] Appropriate padding (24-32px)
*   [ ] **Tables:**
    *   [ ] Clear headers in Hebrew/English
    *   [ ] Proper text alignment (RTL/LTR aware)
    *   [ ] Sorting/filtering support
*   [ ] **Modals/Dialogs:**
    *   [ ] Centered on screen
    *   [ ] Clear close action
    *   [ ] Content readable in both languages
*   [ ] **Navigation Elements:**
    *   [ ] Direction-aware navigation
    *   [ ] Active state indicators
    *   [ ] Keyboard accessible
*   [ ] **Badges/Tags:**
    *   [ ] Status indicators
    *   [ ] Color-coded appropriately
*   [ ] **Tooltips:**
    *   [ ] Contextual help in appropriate language
    *   [ ] Position adapts to RTL/LTR
*   [ ] **Progress Indicators:**
    *   [ ] Spinners, progress bars
    *   [ ] Direction-aware animations
*   [ ] **Icons:**
    *   [ ] Consistent icon set (SVG preferred)
    *   [ ] Directional icons flip in RTL
    *   [ ] Alt text for accessibility
*   [ ] **Avatars**

## III. Layout, Visual Hierarchy & Structure

*   [ ] **Responsive Grid System:**
    *   [ ] Design based on responsive grid (12-column)
    *   [ ] Breakpoints: 640px, 768px, 1024px, 1280px, 1536px (Tailwind defaults)
*   [ ] **Strategic White Space:**
    *   [ ] Ample negative space for clarity
    *   [ ] Reduce cognitive load with breathing room
*   [ ] **Clear Visual Hierarchy:**
    *   [ ] Guide user's eye using typography size, weight, color
    *   [ ] Spacing creates natural groupings
    *   [ ] Works in both reading directions
*   [ ] **Consistent Alignment:**
    *   [ ] Maintain alignment in RTL and LTR
    *   [ ] Text aligns to natural direction
    *   [ ] Form fields align properly in both directions
*   [ ] **Mobile-First Approach:**
    *   [ ] Design for mobile, enhance for desktop
    *   [ ] Touch targets minimum 44x44px
    *   [ ] Test on actual mobile devices

## IV. Bidirectional (RTL/LTR) Design - Critical

### Layout Mirroring

*   [ ] **Horizontal Layouts:**
    *   [ ] All horizontal layouts mirror in RTL (navigation, sidebars, etc.)
    *   [ ] Flex and grid layouts reverse direction
    *   [ ] Margins and padding use logical properties
*   [ ] **Navigation:**
    *   [ ] Navigation flows in natural reading direction
    *   [ ] Breadcrumbs work left-to-right (LTR) or right-to-left (RTL)
    *   [ ] Menus expand in appropriate direction
*   [ ] **Icons:**
    *   [ ] Directional icons (arrows, chevrons) flip in RTL
    *   [ ] Non-directional icons remain unchanged
    *   [ ] Use CSS transform: scaleX(-1) for RTL flipping

### Text Direction

*   [ ] **Hebrew Content:**
    *   [ ] Always RTL direction
    *   [ ] Text aligns right
    *   [ ] Punctuation appears on correct side
*   [ ] **English Content:**
    *   [ ] Always LTR direction
    *   [ ] Text aligns left
*   [ ] **Mixed Content:**
    *   [ ] Numbers within Hebrew text remain LTR
    *   [ ] English names/terms within Hebrew text handled correctly
    *   [ ] Proper handling of bidirectional Unicode

### Testing Requirements

*   [ ] **RTL Testing:**
    *   [ ] View every page in Hebrew (RTL)
    *   [ ] Verify natural reading flow
    *   [ ] Check that interactive elements are accessible
    *   [ ] Verify forms are usable
*   [ ] **LTR Testing:**
    *   [ ] View every page in English (LTR)
    *   [ ] Verify natural reading flow
    *   [ ] Ensure consistency with RTL version
*   [ ] **Language Switching:**
    *   [ ] Test switching between languages
    *   [ ] Verify layout transitions smoothly
    *   [ ] No broken layouts during transition

## V. Interaction Design & Animations

*   [ ] **Purposeful Micro-interactions:**
    *   [ ] Immediate feedback for user actions
    *   [ ] Subtle animations (150-300ms)
    *   [ ] Appropriate easing (ease-in-out)
    *   [ ] Direction-aware animations (respect RTL/LTR)
*   [ ] **Loading States:**
    *   [ ] Skeleton screens for page loads
    *   [ ] Spinners for in-component actions
    *   [ ] Never leave user wondering about status
*   [ ] **Transitions:**
    *   [ ] Smooth state changes
    *   [ ] Modal appearances/disappearances
    *   [ ] Section expansions
*   [ ] **Avoid Distraction:**
    *   [ ] Animations enhance, don't overwhelm
    *   [ ] Performance is priority
*   [ ] **Keyboard Navigation:**
    *   [ ] All interactive elements keyboard accessible
    *   [ ] Tab order follows natural reading direction (RTL/LTR)
    *   [ ] Clear focus states (gold outline)
    *   [ ] Arrow keys work naturally in both directions

## VI. Accessibility Standards (WCAG AA+)

### Color Contrast

*   [ ] **Text Contrast:**
    *   [ ] Normal text: 4.5:1 minimum
    *   [ ] Large text (18px+ or 14px+ bold): 3:1 minimum
    *   [ ] Dark (#2C2416) on Cream (#FFFEF7): Verify excellent contrast
*   [ ] **UI Component Contrast:**
    *   [ ] Interactive elements: 3:1 minimum
    *   [ ] Gold borders and accents: Verify sufficient contrast

### Keyboard & Screen Reader Support

*   [ ] **Keyboard Navigation:**
    *   [ ] All functionality available via keyboard
    *   [ ] Visible focus states on all focusable elements (gold outline)
    *   [ ] Logical tab order (follows reading direction)
    *   [ ] Enter/Space activation for buttons
    *   [ ] Escape closes modals/dialogs
*   [ ] **Semantic HTML:**
    *   [ ] Proper heading hierarchy (h1 → h2 → h3, no skipping)
    *   [ ] Use semantic elements (nav, main, article, aside)
    *   [ ] Buttons are `<button>`, links are `<a>`
*   [ ] **ARIA Labels:**
    *   [ ] Icon buttons have aria-label
    *   [ ] Form labels properly associated
    *   [ ] Image alt text for meaningful images
    *   [ ] Lang attribute set correctly (he/en)
*   [ ] **RTL Screen Reader Support:**
    *   [ ] Screen readers announce RTL content correctly
    *   [ ] Direction attribute (dir="rtl" or dir="ltr") set on html element
    *   [ ] Proper announcement of mixed-direction content

### Form Accessibility

*   [ ] **Labels:**
    *   [ ] All inputs have associated labels
    *   [ ] Labels in appropriate language
    *   [ ] Label positioning works in RTL/LTR
*   [ ] **Error Messages:**
    *   [ ] Clear, specific error messages
    *   [ ] Announced to screen readers
    *   [ ] In appropriate language
*   [ ] **Required Fields:**
    *   [ ] Clearly marked
    *   [ ] Validation messages clear

## VII. Next.js & Performance Specific

*   [ ] **Image Optimization:**
    *   [ ] Use Next.js Image component
    *   [ ] Proper alt text in Hebrew/English
    *   [ ] Lazy loading for below-fold images
    *   [ ] Responsive images (srcset)
*   [ ] **Font Loading:**
    *   [ ] Optimize Frank Ruhl Libre and Playfair Display loading
    *   [ ] Use next/font for automatic optimization
    *   [ ] Prevent layout shift with font-display: swap
*   [ ] **Code Splitting:**
    *   [ ] Route-based code splitting (automatic in Next.js)
    *   [ ] Component-level code splitting for heavy components
*   [ ] **Performance Metrics:**
    *   [ ] LCP (Largest Contentful Paint) < 2.5s
    *   [ ] FID (First Input Delay) < 100ms
    *   [ ] CLS (Cumulative Layout Shift) < 0.1
*   [ ] **next-intl Integration:**
    *   [ ] Proper locale routing
    *   [ ] Efficient message loading
    *   [ ] Locale-aware formatting (dates, numbers)

## VIII. CSS & Styling Architecture (Tailwind CSS)

*   [ ] **Utility-First Approach:**
    *   [ ] Use Tailwind utilities consistently
    *   [ ] Design tokens defined in tailwind.config.js
    *   [ ] Avoid inline styles or arbitrary values when possible
*   [ ] **RTL Plugin (tailwindcss-rtl):**
    *   [ ] Use logical properties (ms-/me- instead of ml-/mr-)
    *   [ ] Use ps-/pe- instead of pl-/pr-
    *   [ ] Verify plugin handles direction switching
*   [ ] **Custom Components:**
    *   [ ] Extract repeated patterns into components
    *   [ ] Use @apply sparingly (prefer composition)
*   [ ] **Maintainability:**
    *   [ ] Well-organized component structure
    *   [ ] Consistent class ordering
    *   [ ] Comments for complex layouts
*   [ ] **Performance:**
    *   [ ] Purge unused CSS (automatic in Next.js)
    *   [ ] Minimize custom CSS
    *   [ ] Optimize for production builds

## IX. Content & Copy

*   [ ] **Bilingual Content:**
    *   [ ] Hebrew content feels natural, not translated
    *   [ ] English content feels natural, not translated
    *   [ ] Both languages receive equal editorial attention
*   [ ] **Clarity:**
    *   [ ] Clear, concise language in both Hebrew and English
    *   [ ] Avoid jargon unless necessary
    *   [ ] Consistent terminology across languages
*   [ ] **Cultural Sensitivity:**
    *   [ ] Respect cultural norms for both audiences
    *   [ ] Avoid idioms that don't translate
    *   [ ] Appropriate formality level for each language

## X. Testing Checklist (For Every Change)

### Visual Testing

*   [ ] **Desktop (1440px):**
    *   [ ] Test in Hebrew (RTL)
    *   [ ] Test in English (LTR)
    *   [ ] Take screenshots of both
*   [ ] **Tablet (768px):**
    *   [ ] Test in Hebrew (RTL)
    *   [ ] Test in English (LTR)
    *   [ ] Verify layout adapts correctly
*   [ ] **Mobile (375px):**
    *   [ ] Test in Hebrew (RTL)
    *   [ ] Test in English (LTR)
    *   [ ] Touch targets are adequate
    *   [ ] No horizontal scrolling

### Functional Testing

*   [ ] **Interaction:**
    *   [ ] All buttons work in both languages
    *   [ ] Forms submit correctly
    *   [ ] Navigation works in both directions
*   [ ] **Keyboard:**
    *   [ ] Tab order follows reading direction
    *   [ ] All actions accessible via keyboard
    *   [ ] Focus states visible
*   [ ] **Screen Reader:**
    *   [ ] Test with VoiceOver (Mac) or NVDA (Windows)
    *   [ ] Content announces correctly in Hebrew
    *   [ ] Content announces correctly in English
*   [ ] **Performance:**
    *   [ ] Check browser console for errors
    *   [ ] Verify no layout shift
    *   [ ] Fonts load efficiently

### Browser Testing

*   [ ] **Modern Browsers:**
    *   [ ] Chrome/Edge (latest)
    *   [ ] Safari (latest)
    *   [ ] Firefox (latest)
*   [ ] **Mobile Browsers:**
    *   [ ] iOS Safari
    *   [ ] Chrome Mobile

## XI. Quality Standards

### Before Considering a Feature Complete:

*   [ ] Works perfectly in Hebrew (RTL)
*   [ ] Works perfectly in English (LTR)
*   [ ] All accessibility checks passed
*   [ ] No console errors or warnings
*   [ ] Responsive on all breakpoints
*   [ ] Follows brand style guide
*   [ ] Typography is correct for each language
*   [ ] Colors match design system
*   [ ] Spacing is consistent
*   [ ] Loading states are implemented
*   [ ] Error states are handled
*   [ ] Empty states are designed
*   [ ] Keyboard navigation works
*   [ ] Screen reader announces correctly
*   [ ] Performance metrics are acceptable

### Definition of "Done":

A feature is only done when:
1. It meets all quality standards above
2. It has been tested in both languages and directions
3. It has been tested on mobile, tablet, and desktop
4. It has been tested with keyboard and screen reader
5. It has no accessibility violations
6. It performs well (no lag, smooth animations)
7. The code is clean and maintainable

## XII. General Best Practices

*   [ ] **Iterative Design:** Continuously test with users and iterate
*   [ ] **Clear Information Architecture:** Logical organization in both languages
*   [ ] **Responsive Design:** Functional and beautiful on all device sizes
*   [ ] **Documentation:** Document design decisions and patterns
*   [ ] **Consistency:** Maintain uniformity across the entire application
*   [ ] **Performance:** Fast load times, snappy interactions
*   [ ] **Cultural Respect:** Honor both Hebrew and English contexts equally
