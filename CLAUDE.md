# Nes Hatamar Project - Claude Code Configuration

This is a bilingual (Hebrew/English) Next.js application with RTL support, featuring an elegant design with gold, cream, and dark color palette.

## Visual Development

### Design Principles
- Comprehensive design checklist in [/context/design-principles.md](context/design-principles.md)
- Brand style guide in [/context/style-guide.md](context/style-guide.md)
- When making visual (front-end, UI/UX) changes, always refer to these files for guidance

### Quick Visual Check
IMMEDIATELY after implementing any front-end change:
1. **Identify what changed** - Review the modified components/pages
2. **Navigate to affected pages** - Use `mcp__playwright__browser_navigate` to visit each changed view at http://localhost:3000
3. **Verify design compliance** - Compare against [/context/design-principles.md](context/design-principles.md) and [/context/style-guide.md](context/style-guide.md)
4. **Test RTL/LTR switching** - Verify both Hebrew (RTL) and English (LTR) layouts work correctly
5. **Validate brand colors** - Ensure gold (#C9A961), cream (#FFFEF7), and dark (#2C2416) colors are used appropriately
6. **Check typography** - Verify Frank Ruhl Libre (Hebrew) and Playfair Display (English) fonts render correctly
7. **Validate feature implementation** - Ensure the change fulfills the user's specific request
8. **Check acceptance criteria** - Review any provided context files or requirements
9. **Capture evidence** - Take full page screenshot at desktop viewport (1440px) of each changed view
10. **Check for errors** - Run `mcp__playwright__browser_console_messages`

This verification ensures changes meet design standards and user requirements.

### Comprehensive Design Review
Invoke the `@agent-design-review` subagent for thorough design validation when:
- Completing significant UI/UX features
- Before finalizing PRs with visual changes
- Needing comprehensive accessibility and responsiveness testing
- Testing RTL/LTR layout compatibility
- Validating bilingual typography and content presentation

### Development Server
The local development server runs at: **http://localhost:3000**

## Project-Specific Considerations

### Bilingual Support
- Hebrew content uses RTL (right-to-left) layout
- English content uses LTR (left-to-right) layout
- Always test both language directions when modifying layouts
- Use `tailwindcss-rtl` plugin for directional styling

### Brand Identity
- **Primary Color**: Gold (#C9A961) - used for accents, highlights, and CTAs
- **Light Variant**: Gold Light (#E5D3A6) - for subtle backgrounds and hover states
- **Background**: Cream (#FFFEF7) - primary background color
- **Text/Dark**: Dark (#2C2416) - primary text and dark elements
- **Accent**: Pink (#E8B4D9) - secondary accent color

### Typography Hierarchy
- **Hebrew Text**: Frank Ruhl Libre (serif) - elegant, traditional feel
- **English Text**: Playfair Display (serif) - complements Hebrew font
- **UI Elements**: System UI (sans-serif) - for buttons, labels, and interface elements

## Task Master AI Instructions
**Import Task Master's development workflow commands and guidelines, treat as if import is in the main CLAUDE.md file.**
@./.taskmaster/CLAUDE.md
