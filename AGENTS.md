# AGENTS.md

# IMPORTANT

- Use as much as possible the MCP .codex/config.toml.
- Use wp CLI

## Project Context

I am working on a WordPress website using Gutenberg as the main editor.

I currently have an existing static design built with:

- `Design/index.html`
- `Design/styles.css`
- `Design/script.js`

The goal is to copy the visual design as closely as possible into WordPress while keeping the site editable, maintainable, performant, and compatible with WordPress, Gutenberg, Twenty Twenty-Five, Kadence Blocks, WooCommerce in the future, and other current or future plugins.

The website must remain easy to edit later from Gutenberg by a non-technical person.

## Main Goal

Rebuild the existing static HTML/CSS/JS design inside WordPress using a Gutenberg-first approach.

The final result should:

- Look as close as possible to the original static design.
- Use Gutenberg blocks whenever possible.
- Use Kadence Blocks for advanced visual sections.
- Use Twenty Twenty-Five as the base Block Theme.
- Preserve compatibility with WordPress updates.
- Preserve compatibility with Gutenberg.
- Preserve future compatibility with WooCommerce, even if WooCommerce is not used yet.
- Avoid fragile custom code.
- Avoid unnecessary plugins.
- Avoid editing the parent theme directly.
- Keep most content editable from Gutenberg.
- Use custom CSS and JavaScript only when needed.
- Keep all customizations organized and documented.

---

# Technology Decisions

## Theme

Use:

```text
Twenty Twenty-Five
```

Reason:

Twenty Twenty-Five is a modern WordPress Block Theme, compatible with Full Site Editing. It allows editing global templates, template parts, headers, footers, pages, archives, and layouts from the Site Editor.

The project should use Twenty Twenty-Five as the parent theme and should not modify it directly.

If code-level customization is required, create a child theme.

---

## Main Block Plugin

Use:

```text
Kadence Blocks
```

Reason:

Kadence Blocks extends Gutenberg with more advanced layout and design controls while keeping the site editable from the block editor.

Use Kadence Blocks for:

- Advanced sections
- Hero layouts
- Cards
- Grids
- Accordions
- Tabs
- Testimonials
- CTAs
- Responsive layouts
- Visual sections that Gutenberg core blocks cannot handle well

Do not use Kadence Blocks unnecessarily for simple content that can be handled by native Gutenberg blocks.

---

## Image Optimization Plugin

Use:

```text
EWWW Image Optimizer
```

Reason:

The project should use a free image optimization plugin. EWWW Image Optimizer will be used to compress images, optimize uploads, and help improve page speed.

Preferred configuration:

- Optimize images on upload.
- Enable WebP if supported by the hosting setup.
- Resize very large images automatically.
- Avoid aggressive compression that visibly damages quality.
- Do not rely on a cache plugin for now.

---

## Cache Plugin

Do not use a cache plugin for now.

The website should still be built with performance in mind:

- Optimized images.
- Minimal plugins.
- Clean CSS.
- Minimal JavaScript.
- Avoid heavy sliders unless necessary.
- Avoid loading scripts globally when only needed on one page.
- Use native blocks and Kadence Blocks efficiently.

A cache plugin can be added later if needed.

---

## WooCommerce

WooCommerce is not required right now.

However, all decisions must remain compatible with WooCommerce in the future.

This means:

- Do not write CSS that globally breaks buttons, forms, grids, product cards, or layout elements.
- Do not reset all elements aggressively.
- Do not use overly broad selectors.
- Do not manipulate WooCommerce-like structures with JavaScript.
- Keep styles namespaced.
- Avoid conflicts with WooCommerce blocks.
- Preserve WordPress and Gutenberg conventions.

---

# Core Strategy

The strategy is:

```text
Gutenberg-first
Kadence Blocks for advanced design
Twenty Twenty-Five as Block Theme
Global Styles and theme.json for design system
Patterns for reusable sections
Synced Patterns for global reusable elements
Minimal custom CSS
Minimal custom JavaScript
No parent theme modifications
WooCommerce-compatible architecture
```

The project should not recreate the static HTML file directly as one giant Custom HTML block.

Instead, analyze the HTML and convert it into editable WordPress/Gutenberg sections.

---

# Migration Approach

## Step 1: Analyze the Static Files

Before writing WordPress code, analyze:

- `index.html`
- `styles.css`
- `script.js`

Identify:

- Global layout
- Header
- Navigation
- Hero section
- Content sections
- Cards
- Buttons
- Forms
- Sliders
- Animations
- Footer
- Reusable components
- Repeated patterns
- CSS variables
- Typography
- Colors
- Spacing
- Responsive breakpoints
- JavaScript interactions

Then decide which parts should become:

- Gutenberg native blocks
- Kadence Blocks
- Block Patterns
- Synced Patterns
- Global Styles
- Custom CSS
- Custom JavaScript
- Custom block, only if absolutely necessary

---

# What Should Be Editable from Gutenberg

The following should remain editable from Gutenberg whenever possible:

- Page titles
- Section headings
- Paragraphs
- Images
- Buttons
- Links
- Cards
- Services
- FAQs
- Testimonials
- CTAs
- Hero content
- Blog sections
- Landing page sections
- Repeated content sections
- Future WooCommerce-related sections

Avoid hardcoding content in PHP, CSS, or JavaScript unless absolutely necessary.

---

# What Should Go Into Global Styles / theme.json

Use Global Styles and/or `theme.json` for:

- Color palette
- Typography
- Font sizes
- Spacing scale
- Layout widths
- Button styles
- Link styles
- Border radius values
- Base block spacing
- Editor design controls
- Reusable design tokens

Do not duplicate global design decisions in many CSS files if they can be handled by Global Styles or `theme.json`.

---

# Recommended Design Tokens

Define a clean visual system.

Example structure:

```text
Colors:
- Primary
- Secondary
- Accent
- Background
- Surface
- Text
- Muted text
- Border

Typography:
- Heading font
- Body font
- Small text
- Display text

Spacing:
- xs
- sm
- md
- lg
- xl
- 2xl

Radii:
- sm
- md
- lg
- xl
- 2xl

Shadows:
- soft
- medium
- premium
```

Use WordPress presets when possible:

```css
var(--wp--preset--color--primary)
var(--wp--preset--spacing--medium)
var(--wp--preset--font-size--large)
```

---

# Recommended Structure

If a child theme is needed, use this structure:

```text
twentytwentyfive-child/
├── style.css
├── functions.php
├── theme.json
├── assets/
│   ├── css/
│   │   ├── base.css
│   │   ├── components.css
│   │   ├── patterns.css
│   │   ├── utilities.css
│   │   └── woocommerce-ready.css
│   └── js/
│       ├── site.js
│       ├── animations.js
│       ├── navigation.js
│       └── interactions.js
├── patterns/
│   ├── hero-premium.php
│   ├── services-grid.php
│   ├── process-section.php
│   ├── testimonials.php
│   ├── faq-section.php
│   ├── final-cta.php
│   └── product-ready-section.php
└── docs/
    ├── editing-guide.md
    ├── patterns-guide.md
    ├── css-classes.md
    ├── js-guide.md
    └── compatibility-notes.md
```

If no child theme is required yet, keep custom CSS and JS minimal and document where they are stored.

---

# Block Usage Rules

## Use Native Gutenberg Blocks For

- Headings
- Paragraphs
- Images
- Lists
- Buttons
- Columns
- Groups
- Cover blocks
- Media & Text
- Query Loop
- Navigation
- Simple layouts
- Simple CTAs
- Blog sections

## Use Kadence Blocks For

- Advanced rows
- Advanced grids
- Premium hero sections
- Cards with complex layout
- Accordions
- Tabs
- Advanced buttons
- Testimonials
- Icon boxes
- Responsive control
- More complex spacing
- More visual sections

## Use Block Patterns For

- Hero sections
- Services grid
- About sections
- Process sections
- Benefit sections
- FAQ sections
- Testimonials
- Pricing sections
- Final CTA
- Contact sections
- Future WooCommerce promotional sections

## Use Synced Patterns For

Use synced patterns only when the content should update globally everywhere.

Examples:

- Global CTA
- WhatsApp contact block
- Footer CTA
- Newsletter signup block
- Announcement banner
- Trust badges
- Contact information block

Do not use synced patterns for sections that need to be different on every page.

---

# Recommended Patterns

| Pattern Name             | Purpose                                 | Type               |
| ------------------------ | --------------------------------------- | ------------------ |
| Hero Premium             | Main page hero                          | Editable Pattern   |
| Hero Internal            | Inner page hero                         | Editable Pattern   |
| Services Grid            | Service cards                           | Editable Pattern   |
| Benefits Section         | Value proposition                       | Editable Pattern   |
| Process Section          | Step-by-step explanation                | Editable Pattern   |
| Testimonials             | Social proof                            | Editable Pattern   |
| FAQ Section              | Frequently asked questions              | Editable Pattern   |
| Final CTA                | Main conversion block                   | Synced Pattern     |
| WhatsApp CTA             | Reusable contact block                  | Synced Pattern     |
| Logo Strip               | Trust logos / partners                  | Editable or Synced |
| Blog Preview             | Latest posts                            | Editable Pattern   |
| Future Product Highlight | WooCommerce-ready product/service promo | Editable Pattern   |

---

# CSS Rules

## CSS Philosophy

Use custom CSS only for what Gutenberg and Kadence Blocks cannot do cleanly.

Custom CSS should be:

- Minimal
- Modular
- Namespaced
- Documented
- Responsive
- Compatible with Gutenberg
- Compatible with WooCommerce
- Compatible with future plugins

## CSS Naming

Use project-specific class prefixes.

Preferred:

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

Avoid generic classes like:

```css
.card
.button
.section
.container
.grid
```

These may conflict with themes or plugins.

## Avoid Broad Selectors

Avoid:

```css
div {
  margin: 0;
}

button {
  all: unset;
}

a {
  color: inherit;
}

.wp-block-group * {
  box-sizing: border-box;
}
```

Prefer targeted selectors:

```css
.inside-card {
  border-radius: var(--wp--custom--radius--xl);
}

.inside-card .wp-block-heading {
  margin-bottom: var(--wp--preset--spacing--small);
}
```

## Avoid `!important`

Do not use `!important` unless absolutely necessary.

Only use it when:

- A third-party plugin injects styles that cannot be overridden normally.
- There is no better selector strategy.
- It is documented with a comment.
- It is isolated to a specific component.

Example:

```css
/* Exception: required to override third-party plugin inline-like button style */
.inside-special-section .wp-block-button__link {
  background-color: var(--wp--preset--color--primary) !important;
}
```

---

# JavaScript Rules

## JavaScript Philosophy

Use JavaScript only when CSS, Gutenberg, or Kadence Blocks cannot solve the behavior.

Preferred JavaScript uses:

- Small interactions
- Scroll effects
- Toggle behavior
- Lightweight animations
- Page-specific interactions

Avoid JavaScript for:

- Simple hover effects
- Basic styling
- Layout fixes
- Things CSS can solve
- Replacing Gutenberg structure
- Manipulating WooCommerce checkout/cart in fragile ways

## How to Add JavaScript

Do not paste `<script>` tags into Gutenberg blocks.

Use one of these approaches:

1. Child theme with `wp_enqueue_script()`
2. A small custom plugin
3. Custom block `viewScript` only if the JavaScript belongs to a reusable block

Preferred approach for project JS:

```text
/assets/js/site.js
/assets/js/animations.js
/assets/js/interactions.js
```

Scripts should be loaded with `defer` when possible.

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
            'strategy'  => 'defer',
        )
    );
}
add_action('wp_enqueue_scripts', 'inside_enqueue_assets');
```

## JavaScript Safety

Use safe selectors:

```js
const elements = document.querySelectorAll(".inside-animate");
if (!elements.length) return;
```

Avoid generic selectors:

```js
document.querySelectorAll(".button");
document.querySelectorAll(".wp-block-button");
```

Prefer project-specific classes.

---

# Plugin Strategy

Use as few plugins as possible.

## Required / Recommended Plugins, try to select free or freemium alternatives

| Plugin                      | Purpose                            | Notes                                   |
| --------------------------- | ---------------------------------- | --------------------------------------- |
| Kadence Blocks              | Main advanced Gutenberg blocks     | Primary design plugin                   |
| EWWW Image Optimizer        | Image compression and optimization | Free image optimization plugin          |
| Fluent Forms                | Forms and lead capture             | Use only if native forms are not enough |
| Rank Math or Yoast SEO      | SEO management                     | Choose one only                         |
| WPCode or Code Snippets     | Small snippets                     | Use for small controlled code           |
| FluentSMTP or WP Mail SMTP  | Email deliverability               | Useful for forms and future WooCommerce |
| Redirection                 | Manage redirects and 404s          | Useful for SEO and migrations           |
| UpdraftPlus                 | Backups                            | Recommended before major changes        |
| Wordfence or Solid Security | Security                           | Configure carefully                     |

## Not Used For Now

Do not use a cache plugin for now.

Avoid installing:

- Multiple block plugins at the same time
- Multiple SEO plugins
- Multiple performance plugins
- Heavy animation plugins unless necessary
- Heavy slider plugins unless truly needed
- Plugins that duplicate Kadence Blocks features
- Plugins that lock content into shortcodes

---

# Slider Strategy

Do not use a slider unless it has a real purpose.

Preferred order:

1. Use Gutenberg/Kadence layout if a static section works.
2. Use Kadence carousel/slider features if enough.
3. Use a dedicated slider plugin only if highly customizable sliders are truly needed.

If a dedicated slider is needed, consider:

```text
Smart Slider 3
```

But use it carefully:

- Only on pages where needed.
- Optimize images before uploading.
- Avoid too many animations.
- Test mobile performance.
- Keep the plugin updated.
- Do not use nulled or pirated versions.

---

# WooCommerce Compatibility Rules

Even though WooCommerce is not used now, keep the site WooCommerce-ready.

Do:

- Use WordPress-friendly CSS.
- Use namespaced classes.
- Keep buttons accessible.
- Keep forms accessible.
- Avoid global resets.
- Avoid overriding all product-like cards globally.
- Avoid JavaScript that assumes page structure globally.
- Leave room for WooCommerce Blocks later.

Avoid:

```css
button {
  all: unset;
}

input,
select,
textarea {
  border: none;
  outline: none;
}

[class*="button"] {
  background: black;
}
```

These can break WooCommerce checkout, cart, forms, payment buttons, and plugins.

---

# Accessibility Requirements

All implementation should consider accessibility.

Required:

- Correct heading hierarchy.
- Buttons should be buttons or links correctly.
- Images should have meaningful alt text.
- Color contrast must be readable.
- Do not remove focus outlines unless replacing them with accessible focus states.
- Navigation must be keyboard-friendly.
- Forms must have labels.
- Animations should not be excessive.
- Avoid autoplay sliders unless user can pause them.

---

# SEO Requirements

The migration should preserve or improve SEO.

Do:

- Use semantic headings.
- Use proper WordPress page structure.
- Avoid one giant image replacing real text.
- Avoid one giant Custom HTML block.
- Use optimized images.
- Use descriptive alt text.
- Use clean URLs.
- Use internal links.
- Keep page speed reasonable.
- Use Rank Math or Yoast, not both.

---

# Performance Requirements

Because no cache plugin is used for now, performance must be handled through good implementation.

Do:

- Optimize images with EWWW Image Optimizer.
- Avoid unnecessary scripts.
- Avoid loading slider scripts globally.
- Avoid multiple block libraries.
- Avoid heavy animations.
- Use CSS for simple effects.
- Use SVG icons carefully.
- Avoid giant background videos unless necessary.
- Use responsive images.
- Keep DOM structure reasonable.

---

# How to Convert the Existing HTML Design

When converting `index.html`, do not simply paste the entire HTML into a Custom HTML block.

Instead:

## 1. Break the page into sections

Example:

```text
Header
Hero
Trust logos
Services
Benefits
Process
Testimonials
FAQ
CTA
Footer
```

## 2. Decide block strategy per section

For each section, decide:

```text
Native Gutenberg block?
Kadence Block?
Pattern?
Synced Pattern?
Custom CSS?
Custom JS?
```

## 3. Rebuild section by section

Use Gutenberg and Kadence Blocks to recreate the structure visually.

## 4. Move reusable CSS into modular files

Convert global styles from `styles.css` into:

```text
base.css
components.css
patterns.css
utilities.css
```

## 5. Move JavaScript carefully

Convert `script.js` into:

```text
site.js
animations.js
interactions.js
```

Only keep JS that is still needed after rebuilding with Gutenberg/Kadence.

## 6. Register patterns if needed

If sections are reused, convert them into WordPress Block Patterns.

## 7. Test responsive behavior

Test:

- Desktop
- Tablet
- Mobile
- WordPress editor view
- Frontend view

## 8. Document everything

Document:

- Which patterns exist
- Which CSS classes are available
- Which JS files exist
- Which plugins are required
- How to edit each section

---

# Decision Table

| Need                            | Recommended Solution             |
| ------------------------------- | -------------------------------- |
| Edit full site visually         | Twenty Twenty-Five Site Editor   |
| Create normal page content      | Native Gutenberg blocks          |
| Create advanced visual sections | Kadence Blocks                   |
| Reuse sections                  | Block Patterns                   |
| Reuse global content everywhere | Synced Patterns                  |
| Define global design            | Global Styles / theme.json       |
| Add premium visual polish       | Namespaced CSS                   |
| Add simple animation            | CSS first                        |
| Add real interaction            | JS loaded with wp_enqueue_script |
| Add small PHP customization     | WPCode or Code Snippets          |
| Add organized theme-level code  | Child theme                      |
| Optimize images                 | EWWW Image Optimizer             |
| Add ecommerce later             | WooCommerce Blocks               |
| Improve SEO                     | Rank Math or Yoast               |
| Improve email delivery          | FluentSMTP or WP Mail SMTP       |

---

# Things To Avoid

Avoid:

- Editing Twenty Twenty-Five parent theme files.
- Pasting the whole `index.html` into a Custom HTML block.
- Using too many plugins.
- Installing multiple block libraries.
- Using Elementor for this project.
- Using cache plugin for now.
- Using global CSS resets that break plugins.
- Using `!important` as normal practice.
- Using JavaScript to fix layout problems.
- Using shortcodes for core layout sections.
- Creating custom blocks too early.
- Hardcoding text that should be editable.
- Breaking WooCommerce compatibility with global CSS.
- Loading slider or animation scripts on every page.
- Using one-off CSS classes that are not documented.

---

# Expected Output From AI Assistance

When helping with this project, the AI should always provide solutions in this format:

## 1. Gutenberg Structure

Explain which blocks to use.

## 2. Kadence Blocks Usage

Explain where Kadence Blocks are needed.

## 3. Pattern Strategy

Explain whether the section should become a pattern or synced pattern.

## 4. CSS Needed

Provide minimal, namespaced CSS only if needed.

## 5. JavaScript Needed

Provide JS only if necessary.

## 6. Compatibility Notes

Explain any WordPress, Gutenberg, WooCommerce, or plugin compatibility concerns.

## 7. Editing Instructions

Explain how a non-technical person can edit the section later.

---

# Final Architecture

The final architecture should be:

```text
Twenty Twenty-Five
+
Gutenberg Site Editor
+
Kadence Blocks
+
Global Styles
+
theme.json when needed
+
Block Patterns
+
Synced Patterns
+
EWWW Image Optimizer
+
Minimal CSS
+
Minimal JS
+
WooCommerce-ready structure
```

The main goal is not only to copy the visual design.

The main goal is to copy the visual design in a WordPress-native, Gutenberg-editable, plugin-compatible, WooCommerce-ready, maintainable way.

# Brand Palette and Typography

Self-hosted en /assets/fonts/ (recomendado): registradas vía theme.json con bloque fontFace (WordPress 6.5+ tiene Font Library nativa).
O Adobe Fonts para Codec Pro (con el snippet <link> correspondiente).
font-display: swap siempre.
Subsetting a Latin si no necesitas otros alfabetos.
Preload solo de la fuente de body en weight regular.

## Official Brand Color Palette

Use this exact color palette for the WordPress/Gutenberg implementation.

```css
:root {
  --inside-color-light-background: #e4e4e4;
  --inside-color-primary-green: #134840;
  --inside-color-gold: #c3b26f;
  --inside-color-deep-navy: #051647;
  --inside-color-dark-neutral: #1e1e22;
}

Headings / Titles:
Playfair Display

Body / UI / Navigation:
Codec Pro
```

CSS Font Variables
:root {
--inside-font-heading: "Playfair Display", Georgia, serif;
--inside-font-body: "Codec Pro", Inter, Arial, sans-serif;
}

body {
font-family: var(--inside-font-body);
color: var(--inside-color-dark-neutral);
background-color: var(--inside-color-light-background);
}

h1,
h2,
h3,
h4,
h5,
h6,
.wp-block-heading {
font-family: var(--inside-font-heading);
color: var(--inside-color-primary-green);
}

p,
li,
a,
button,
input,
textarea,
select {
font-family: var(--inside-font-body);
}
Gutenberg / WordPress Color Names

When configuring Global Styles or theme.json, use these names:

Light Background
Primary Green
Gold Accent
Deep Navy
Dark Neutral

```
Suggested theme.json Palette
{
"version": 3,
"settings": {
"color": {
"palette": [
{
"slug": "light-background",
"color": "#e4e4e4",
"name": "Light Background"
},
{
"slug": "primary-green",
"color": "#134840",
"name": "Primary Green"
},
{
"slug": "gold-accent",
"color": "#c3b26f",
"name": "Gold Accent"
},
{
"slug": "deep-navy",
"color": "#051647",
"name": "Deep Navy"
},
{
"slug": "dark-neutral",
"color": "#1e1e22",
"name": "Dark Neutral"
}
]
},
"typography": {
"fontFamilies": [
{
"fontFamily": "\"Playfair Display\", Georgia, serif",
"slug": "playfair-display",
"name": "Playfair Display"
},
{
"fontFamily": "\"Codec Pro\", Inter, Arial, sans-serif",
"slug": "codec-pro",
"name": "Codec Pro"
}
]
}
},
```

# You must NEVER:

- Modify the Twenty Twenty-Five parent theme.
- Modify WordPress core files.
- Suggest Elementor, Divi, WPBakery, Brizy, Oxygen, or any other page builder.
- Suggest GenerateBlocks, Stackable, Spectra, or any block plugin other than Kadence Blocks.
- Suggest installing a cache plugin (explicit project decision).
- Generate CSS with selectors deeper than 3 levels.
- Generate JavaScript that depends on jQuery unless strictly required.
- Hardcode editable content in PHP templates.

If a user request conflicts with these rules, do NOT silently comply.
State the conflict and propose the compliant alternative.
