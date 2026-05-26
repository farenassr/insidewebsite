# AGENTS_PHASED.md — WordPress Gutenberg Migration by Phases

## 1. Mission

You are an AI assistant helping migrate an existing static website design into WordPress using a Gutenberg-first workflow.

The current static design may include:

- `index.html`
- `styles.css`
- `script.js`
- Images and visual assets

The target WordPress stack is:

- WordPress
- Gutenberg / Site Editor
- Twenty Twenty-Five as the base Block Theme
- Kadence Blocks as the main advanced block plugin
- EWWW Image Optimizer for free image optimization
- No cache plugin for now
- WooCommerce-compatible structure, even if WooCommerce is not installed yet

The goal is to copy the existing visual design as accurately as possible while keeping the website editable, maintainable, compatible with WordPress plugins, and safe for future updates.

The most important rule:

> Do not rebuild the site as one giant Custom HTML block. Convert the design into WordPress-native Gutenberg sections, patterns, global styles, and minimal custom CSS/JS.

---

## 2. Core Principles

Always prioritize this order:

1. Gutenberg native blocks
2. Twenty Twenty-Five Site Editor
3. Global Styles
4. `theme.json`
5. Kadence Blocks for advanced visual layouts
6. Block Patterns
7. Synced Patterns
8. Minimal namespaced CSS
9. Minimal JavaScript loaded correctly
10. Child theme or small plugin only when needed

Do not use Elementor for this project.

Do not modify the Twenty Twenty-Five parent theme directly.

Do not add a cache plugin for now.

Do not install unnecessary block libraries.

Do not use broad CSS resets that may break WooCommerce or future plugins.

Do not use `!important` unless there is a documented exception.

---

## 3. Mandatory Browser Validation Rule

At the end of every phase, the AI must open the browser and validate the work visually and functionally.

Use available browser tools, Playwright MCP, browser preview, or manual browser inspection.

The AI must validate:

- Frontend page loads correctly.
- WordPress editor or Site Editor still opens.
- Layout matches the intended design for the current phase.
- Desktop layout works.
- Tablet layout works.
- Mobile layout works.
- Browser console has no critical errors.
- No obvious broken images.
- No layout shift or broken spacing.
- Buttons and links work where applicable.
- Navigation works where applicable.
- Any JavaScript added in that phase works correctly.
- Any CSS added in that phase is scoped and does not break other areas.

Never continue to the next phase if the current phase is visibly broken.

If something is broken:

1. Stop.
2. Identify the cause.
3. Fix the issue.
4. Open the browser again.
5. Re-test.
6. Document the fix.

---

# 4. Phase-Based Implementation Plan

Use a small number of phases. Do not split the project into too many tiny phases.

Recommended phases:

```text
Phase 1 — Audit and Planning
Phase 2 — WordPress Foundation
Phase 3 — Design System and Global Styles
Phase 4 — Section Migration and Patterns
Phase 5 — Interactions, Optimization, QA and Handoff
```

Each phase must produce a working state of the website.

---

# Phase 1 — Audit and Planning

## Goal

Understand the existing static design before making WordPress changes.

## Tasks

Analyze:

- `index.html`
- `styles.css`
- `script.js`
- Images
- Fonts
- Color palette
- Layout structure
- Sections
- Reusable components
- Responsive behavior
- JavaScript interactions

Break the static page into WordPress-ready sections.

Example:

```text
Header
Hero
Trust / logos
Services
Benefits
Process
Testimonials
FAQ
CTA
Footer
```

For each section, decide:

| Section | Recommended WordPress approach |
|---|---|
| Header | Site Editor template part |
| Footer | Site Editor template part |
| Hero | Gutenberg + Kadence Blocks |
| Service cards | Kadence Blocks + Pattern |
| FAQ | Kadence Accordion or native details block |
| CTA | Synced Pattern |
| Basic content | Native Gutenberg blocks |
| Complex interaction | Minimal JS or custom block only if needed |

## Output Required

Create a migration map:

```markdown
## Migration Map

| Static Section | WordPress Equivalent | Tool | Editable from Gutenberg? | Needs CSS? | Needs JS? |
|---|---|---|---|---|---|
```

## Browser Validation

At the end of this phase, open the static HTML in the browser and validate:

- The original static design loads.
- Screenshots or visual references are captured if possible.
- Desktop, tablet, and mobile behavior are understood.
- Any current JS behavior is identified.
- Any layout issues in the original design are documented.

## Done Criteria

Phase 1 is complete only when:

- The static design is fully understood.
- Sections are identified.
- Migration strategy is documented.
- Browser has been opened and the original design has been visually reviewed.

---

# Phase 2 — WordPress Foundation

## Goal

Prepare WordPress so the design can be rebuilt safely.

## Tasks

Set up or confirm:

- Twenty Twenty-Five is active.
- Kadence Blocks is installed and active.
- EWWW Image Optimizer is installed and active.
- No cache plugin is active for now.
- WooCommerce is not required now, but structure remains compatible.
- Permalinks are clean.
- Required pages exist.
- A private sandbox page exists.
- A private Design System page exists.
- A backup exists before major changes.

Recommended private pages:

```text
/design-system
/home-sandbox
/home-v2
```

## Child Theme Decision

Create a child theme only if one or more of the following are needed:

- Organized CSS files.
- Organized JS files.
- Custom `theme.json`.
- Registered patterns in code.
- Theme-level PHP functions.
- Version-controlled customizations.

If customization is small, use Global Styles and documented additional CSS first.

Never edit the Twenty Twenty-Five parent theme.

## Browser Validation

Open the browser and validate:

- WordPress frontend loads correctly.
- Site Editor opens.
- Gutenberg page editor opens.
- Kadence Blocks appears in the block editor.
- EWWW Image Optimizer is active.
- No cache plugin is active.
- Sandbox page loads.
- Design System page loads.
- No critical browser console errors.

## Done Criteria

Phase 2 is complete only when:

- WordPress foundation is stable.
- Required plugins are active.
- Editing experience works.
- Browser validation is completed.

---

# Phase 3 — Design System and Global Styles

## Goal

Recreate the brand identity in WordPress before migrating page sections.

## Official Brand Palette

Use this exact palette:

```css
:root {
  --inside-color-light-background: #e4e4e4;
  --inside-color-primary-green: #134840;
  --inside-color-gold: #c3b26f;
  --inside-color-deep-navy: #051647;
  --inside-color-dark-neutral: #1e1e22;
}
```

## Color Usage

| Color Name | Hex | Usage |
|---|---:|---|
| Light Background | `#e4e4e4` | Main soft background, neutral sections |
| Primary Green | `#134840` | Main brand color, buttons, emphasis |
| Gold Accent | `#c3b26f` | Premium accents, icons, borders, highlights |
| Deep Navy | `#051647` | Strong contrast sections, footer, luxury areas |
| Dark Neutral | `#1e1e22` | Main text and dark UI elements |

## Typography

Use:

```text
Headings: Playfair Display
Body/UI: Codec Pro
```

Fallbacks:

```text
Headings fallback: Georgia, serif
Body fallback: Inter, Arial, system-ui, sans-serif
```

Important:

- Do not share or expose font files.
- Only load Codec Pro if the user has a valid webfont license.
- If Codec Pro is not available, use Inter temporarily.

## Global Styles / theme.json

Use Global Styles and/or `theme.json` for:

- Color palette
- Typography
- Font sizes
- Spacing scale
- Layout widths
- Button styles
- Link styles
- Background defaults
- Heading style
- Body text style

Suggested `theme.json` palette:

```json
{
  "version": 3,
  "settings": {
    "color": {
      "palette": [
        { "slug": "light-background", "color": "#e4e4e4", "name": "Light Background" },
        { "slug": "primary-green", "color": "#134840", "name": "Primary Green" },
        { "slug": "gold-accent", "color": "#c3b26f", "name": "Gold Accent" },
        { "slug": "deep-navy", "color": "#051647", "name": "Deep Navy" },
        { "slug": "dark-neutral", "color": "#1e1e22", "name": "Dark Neutral" }
      ]
    },
    "typography": {
      "fontFamilies": [
        { "fontFamily": "\"Playfair Display\", Georgia, serif", "slug": "playfair-display", "name": "Playfair Display" },
        { "fontFamily": "\"Codec Pro\", Inter, Arial, system-ui, sans-serif", "slug": "codec-pro", "name": "Codec Pro" }
      ]
    }
  }
}
```

## Design System Page

Create or update the private Design System page with examples of:

- H1, H2, H3
- Paragraphs
- Buttons
- Cards
- Section backgrounds
- Image treatments
- CTA blocks
- FAQ blocks
- Testimonial cards
- Color swatches
- Font examples
- Responsive examples

## Browser Validation

Open the browser and validate:

- Global colors are visible in Gutenberg.
- Typography appears correctly.
- Body text is readable.
- Headings use the correct font or fallback.
- Button styles are consistent.
- Design System page looks correct.
- Frontend and editor styles are aligned.
- Mobile typography is readable.
- No console errors.

## Done Criteria

Phase 3 is complete only when:

- Brand colors exist in WordPress.
- Typography is configured or documented.
- Design System page exists.
- Browser validation is completed.

---

# Phase 4 — Section Migration and Patterns

## Goal

Rebuild the static design section by section using Gutenberg, Kadence Blocks, and patterns.

## Migration Rules

Do not paste the entire `index.html` into a Custom HTML block.

For each section:

1. Recreate structure with Gutenberg native blocks first.
2. Use Kadence Blocks only where native blocks are insufficient.
3. Use CSS only for design refinements not achievable with blocks.
4. Use JavaScript only for real interactions.
5. Keep text, images, buttons, and links editable from Gutenberg.
6. Convert reusable sections into Block Patterns.
7. Convert global repeated sections into Synced Patterns.

## Recommended Patterns

| Pattern | Purpose | Type |
|---|---|---|
| Hero Premium | Main home hero | Editable Pattern |
| Hero Internal | Inner page hero | Editable Pattern |
| Services Grid | Service cards | Editable Pattern |
| Benefits Section | Value proposition | Editable Pattern |
| Process Section | Step-by-step explanation | Editable Pattern |
| Testimonials | Social proof | Editable Pattern |
| FAQ Section | Frequently asked questions | Editable Pattern |
| Final CTA | Main conversion block | Synced Pattern |
| WhatsApp CTA | Reusable contact CTA | Synced Pattern |
| Logo Strip | Partners, credibility, logos | Editable or Synced |
| Blog Preview | Latest posts or content | Editable Pattern |
| Future Product Highlight | WooCommerce-ready promo | Editable Pattern |

## CSS Rules

Use namespaced classes:

```css
.inside-section
.inside-card
.inside-hero
.inside-cta
.inside-grid
.inside-button
.inside-testimonial
.inside-faq
```

Avoid generic classes:

```css
.card
.button
.section
.container
grid
```

Avoid global selectors that can break plugins:

```css
button { all: unset; }
div { margin: 0; }
* { transition: all 0.3s ease; }
```

## Browser Validation

After each major migrated section, open the browser and validate:

- Section looks close to the original design.
- Section is editable in Gutenberg.
- No broken spacing.
- No broken images.
- Buttons and links work.
- Desktop view works.
- Tablet view works.
- Mobile view works.
- Editor view is not broken.
- CSS does not affect unrelated sections.
- Console has no critical errors.

Do not migrate the next section until the current section is visually stable.

## Done Criteria

Phase 4 is complete only when:

- Main sections are rebuilt.
- Important reusable sections are patterns.
- Global repeated sections are synced patterns.
- The page is editable from Gutenberg.
- Browser validation has been completed after every major section.

---

# Phase 5 — Interactions, Optimization, QA and Handoff

## Goal

Add only the necessary interactions, optimize assets, validate the full website, and document the handoff.

## JavaScript Rules

Use JavaScript only when CSS, Gutenberg, or Kadence Blocks cannot solve the behavior.

Good JS use cases:

- Menu interaction not handled by theme.
- Lightweight scroll reveal.
- Toggle behavior.
- Slider interaction if truly necessary.
- Small page-specific interactions.

Avoid JS for:

- Simple hover effects.
- Basic styling.
- Layout fixes.
- Replacing Gutenberg structure.
- WooCommerce cart/checkout manipulation.
- Global scripts needed on only one page.

Do not paste `<script>` tags into Gutenberg blocks.

Preferred approach:

- Child theme JS file with `wp_enqueue_script()`.
- Small custom plugin if functionality is plugin-like.
- WPCode only for very small temporary snippets.

Example:

```php
function inside_enqueue_assets() {
    wp_enqueue_script(
        'inside-site',
        get_stylesheet_directory_uri() . '/assets/js/site.js',
        array(),
        filemtime(get_stylesheet_directory() . '/assets/js/site.js'),
        array(
            'in_footer' => true,
            'strategy'  => 'defer'
        )
    );
}
add_action('wp_enqueue_scripts', 'inside_enqueue_assets');
```

## Image Optimization

Use EWWW Image Optimizer.

Recommended:

- Optimize images on upload.
- Enable WebP if supported.
- Resize oversized images.
- Avoid excessive compression.
- Keep high-quality hero images visually clean.
- Add descriptive alt text.

## No Cache Plugin for Now

Do not install or configure a cache plugin at this stage.

Still optimize by:

- Reducing unnecessary plugins.
- Avoiding heavy sliders.
- Avoiding global scripts.
- Optimizing images.
- Using CSS for simple effects.
- Avoiding excessive DOM nesting.

## WooCommerce-Ready Compatibility

Even if WooCommerce is not active, keep the site ready for it.

Do:

- Use namespaced CSS.
- Avoid global form resets.
- Avoid global button resets.
- Keep buttons accessible.
- Keep form fields accessible.
- Avoid JavaScript that assumes all pages have the same structure.

Do not do:

```css
button { all: unset; }
input, select, textarea { border: none; outline: none; }
[class*="button"] { background: black; }
```

## Final QA Checklist

Open the browser and validate:

- Home page loads correctly.
- Sandbox page works.
- Design System page works.
- Header works.
- Footer works.
- Navigation works.
- Mobile menu works.
- All migrated sections are visible.
- All important buttons work.
- All important links work.
- Images load.
- Fonts load or fallbacks are acceptable.
- No critical console errors.
- No broken layout on desktop.
- No broken layout on tablet.
- No broken layout on mobile.
- Gutenberg editor opens.
- Site Editor opens.
- Kadence Blocks remain editable.
- EWWW Image Optimizer remains active.
- No cache plugin was added.
- No parent theme files were modified.
- CSS is scoped.
- JS is scoped and loaded only where needed.
- No obvious WooCommerce compatibility risks.

## Handoff Documentation

Create or update documentation:

```text
/docs/editing-guide.md
/docs/patterns-guide.md
/docs/css-classes.md
/docs/js-guide.md
/docs/compatibility-notes.md
```

Document:

- How to edit pages.
- How to edit patterns.
- Which patterns are synced.
- Which CSS classes exist.
- Where custom CSS lives.
- Where custom JS lives.
- Which plugins are required.
- Which plugins are intentionally not used.
- Known limitations.
- Rollback steps.

## Done Criteria

Phase 5 is complete only when:

- All required interactions work.
- Images are optimized.
- Full browser QA is completed.
- Documentation exists.
- The website remains editable from Gutenberg.
- The implementation is WooCommerce-ready.
- No unnecessary plugins were added.

---

# 5. Plugin Policy

Use only what is necessary.

## Required / Recommended Plugins

| Plugin | Purpose | Rule |
|---|---|---|
| Kadence Blocks | Advanced Gutenberg design blocks | Main block plugin |
| EWWW Image Optimizer | Free image compression | Required for image optimization |
| Rank Math or Yoast SEO | SEO | Choose one only |
| Fluent Forms | Forms | Use if native/contact solution is insufficient |
| FluentSMTP or WP Mail SMTP | Email delivery | Use if forms or transactional emails exist |
| WPCode or Code Snippets | Small snippets | Use only for small controlled snippets |
| Redirection | Redirects and 404s | Use when needed |
| UpdraftPlus | Backups | Recommended before major changes |
| Wordfence or Solid Security | Security | Configure carefully |

## Avoid

- Elementor.
- Multiple block libraries.
- Multiple SEO plugins.
- Cache plugin for now.
- Heavy slider plugins unless truly necessary.
- Nulled themes or plugins.
- Plugins that duplicate Kadence Blocks features.
- Plugins that lock content into shortcodes.

---

# 6. Slider Policy

Do not use a slider unless it has a clear purpose.

Preferred order:

1. Static Gutenberg/Kadence section.
2. Kadence carousel/slider if sufficient.
3. Dedicated slider plugin only if truly needed.

If a dedicated slider is required, consider:

```text
Smart Slider 3
```

Rules:

- Use only where needed.
- Do not load it globally if avoidable.
- Optimize all slider images with EWWW.
- Keep animations subtle.
- Test mobile performance.
- Keep plugin updated.
- Never use nulled versions.

---

# 7. AI Output Requirements

When helping with this project, always structure responses like this:

```markdown
## Recommended Approach

Explain the safest Gutenberg-first implementation.

## WordPress / Gutenberg Structure

List the blocks or templates to use.

## Kadence Blocks Usage

Explain where Kadence is needed.

## Pattern Strategy

Say whether this should be a normal pattern or synced pattern.

## CSS Needed

Provide minimal, namespaced CSS only if required.

## JavaScript Needed

Provide JS only if required.

## Browser Validation

State exactly what must be opened and tested in the browser.

## Compatibility Notes

Mention Gutenberg, Twenty Twenty-Five, Kadence, WooCommerce-ready, plugin safety.

## Rollback Notes

Explain how to undo the change if it causes issues.
```

---

# 8. Final Rule

Every phase must protect this balance:

```text
Accurate visual migration
+ Gutenberg editability
+ Twenty Twenty-Five compatibility
+ Kadence Blocks maintainability
+ WooCommerce-ready CSS
+ Minimal custom code
+ Browser validation at every stage
+ Long-term handoff
```

If there is a conflict between copying the static design exactly and preserving WordPress/Gutenberg compatibility, prioritize compatibility unless the user explicitly approves the trade-off.
