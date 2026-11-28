---
name: "Cábala Viajera"
description: "An editorial outdoor journal design system with warm parchment surfaces, deep pine ink, terracotta accents, and classic serif headlines."
---

## Overview

Cábala Viajera is an independent backpackers travel journal designed for unhurried longform reading, trail dispatches, and field photography. The aesthetic pairs warm, sunlit sandstone paper surfaces with vibrant trail-orange (`#FF6212`) and deep espresso-earth ink, evoking dog-eared field notebooks and classic print travel magazines. The layout prioritizes generous whitespace, clear typographic hierarchy, and photography that breathes without heavy chrome or synthetic gradients.

## Colors

The palette draws from canyon sandstone, trail markers, and unbleached field paper. **Trail Orange (`#FF6212`)** serves as the primary interactive anchor, paired with deep espresso ink (`#1A0800`) for high-contrast button labels, and **Burnt Ochre (`#9A4520`)** for category tags and metadata. Surfaces step gently from warm sunlit paper (`#FFF8F6`) to crisp card paper (`#FFFFFF`) and soft sandstone (`#FFF1EC`) to separate sections without harsh borders.

- **Primary:** Vibrant trail orange (`#FF6212`) for primary actions, navigation focus, and key highlights.
- **Secondary:** Burnt ochre (`#9A4520`) for route tags, field-note callouts, and accent badges.
- **Surfaces:** Warm sunlit paper ground paired with pure white and soft sandstone containers for quiet visual separation.

```yaml
colors:
  light:
    primary: "#FF6212"
    on-primary: "#1A0800"
    primary-container: "#D04B00"
    on-primary-container: "#060606"
    secondary: "#9A4520"
    on-secondary: "#FFFFFF"
    secondary-container: "#FFDBCE"
    on-secondary-container: "#370E00"
    tertiary: "#00629D"
    on-tertiary: "#FFFFFF"
    tertiary-container: "#CFE5FF"
    on-tertiary-container: "#001D34"
    error: "#BA1A1A"
    on-error: "#FFFFFF"
    error-container: "#FFDAD6"
    on-error-container: "#93000A"
    background: "#FFF8F6"
    on-background: "#271813"
    surface: "#FFF8F6"
    surface-dim: "#F0D4CB"
    surface-bright: "#FFF8F6"
    surface-container-lowest: "#FFFFFF"
    surface-container-low: "#FFF1EC"
    surface-container: "#FFE9E2"
    surface-container-high: "#FFE2D9"
    surface-container-highest: "#F9DDD3"
    on-surface: "#271813"
    surface-variant: "#FFDBCE"
    on-surface-variant: "#5A4137"
    outline: "#8F7065"
    outline-variant: "#E3BFB2"
    inverse-surface: "#3D2D26"
    inverse-on-surface: "#FFEDE7"
    inverse-primary: "#FFB599"
  dark:
    primary: "#FF6212"
    on-primary: "#1A0800"
    primary-container: "#A73A00"
    on-primary-container: "#FFEDE7"
    secondary: "#FFB599"
    on-secondary: "#5A1C00"
    secondary-container: "#7B2E0A"
    on-secondary-container: "#FFDBCE"
    tertiary: "#99CBFF"
    on-tertiary: "#003355"
    tertiary-container: "#004A78"
    on-tertiary-container: "#CFE5FF"
    error: "#FFB4AB"
    on-error: "#690005"
    error-container: "#93000A"
    on-error-container: "#FFDAD6"
    background: "#1E100B"
    on-background: "#F9DDD3"
    surface: "#1E100B"
    surface-dim: "#1E100B"
    surface-bright: "#47352F"
    surface-container-lowest: "#180B06"
    surface-container-low: "#271813"
    surface-container: "#2B1C16"
    surface-container-high: "#362620"
    surface-container-highest: "#42312A"
    on-surface: "#F9DDD3"
    surface-variant: "#5A4137"
    on-surface-variant: "#E3BFB2"
    outline: "#AA8A7E"
    outline-variant: "#5A4137"
    inverse-surface: "#F9DDD3"
    inverse-on-surface: "#3D2D26"
    inverse-primary: "#A73A00"
```

## Typography

Editorial authority comes from **Crimson Pro**, an old-style serif with crisp serifs and generous proportions for display and section headlines. **Recursive** handles all body prose, navigation, and UI controls with clean humanist legibility. **Spline Sans Mono** marks trail coordinates, dates, reading times, and elevation figures with tabular precision.

```yaml
typography:
  display-lg:
    fontFamily: "Crimson Pro"
    fontSize: 56px
    fontWeight: 600
    lineHeight: 62px
    letterSpacing: -0.75px
  display-lg-mobile:
    fontFamily: "Crimson Pro"
    fontSize: 32px
    fontWeight: 600
    lineHeight: 38px
    letterSpacing: -0.25px
  display-md:
    fontFamily: "Crimson Pro"
    fontSize: 44px
    fontWeight: 600
    lineHeight: 50px
    letterSpacing: -0.5px
  display-md-mobile:
    fontFamily: "Crimson Pro"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 34px
    letterSpacing: -0.25px
  headline-lg:
    fontFamily: "Crimson Pro"
    fontSize: 36px
    fontWeight: 600
    lineHeight: 42px
    letterSpacing: -0.25px
  headline-lg-mobile:
    fontFamily: "Crimson Pro"
    fontSize: 26px
    fontWeight: 600
    lineHeight: 32px
    letterSpacing: -0.15px
  headline-md:
    fontFamily: "Crimson Pro"
    fontSize: 26px
    fontWeight: 600
    lineHeight: 32px
    letterSpacing: -0.1px
  headline-sm:
    fontFamily: "Crimson Pro"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 28px
    letterSpacing: 0px
  title-lg:
    fontFamily: "Recursive"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 26px
    letterSpacing: 0px
  title-md:
    fontFamily: "Recursive"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 24px
    letterSpacing: 0px
  body-lg:
    fontFamily: "Recursive"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 28px
    letterSpacing: 0px
  body-md:
    fontFamily: "Recursive"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0px
  body-sm:
    fontFamily: "Recursive"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0.1px
  label-lg:
    fontFamily: "Recursive"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 20px
    letterSpacing: 0.1px
  label-md:
    fontFamily: "Recursive"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: 0.25px
  mono-sm:
    fontFamily: "Spline Sans Mono"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: 0.3px
```

## Layout & Spacing

The editorial grid uses a centered max-width container (`1200px` on desktop) with a 12-column CSS Grid on desktop (`24px` gutters) that collapses cleanly to 1 or 2 columns on tablet and mobile (`16px` gutters). An 8px base rhythm governs all spacing, with generous `48px` to `64px` vertical breathing room between the Hero, Latest Articles, and About the Writer sections.

```yaml
spacing:
  gutter-xs: 4px
  gutter-sm: 8px
  gutter-md: 16px
  gutter-lg: 24px
  gutter-xl: 32px
  section: 64px
  page-margin: 24px
```

## Elevation & Depth

Depth is conveyed through tonal surface stepping (`surface` → `surface-container-low` → `surface-container-lowest`) and subtle `1px` hairline `outline-variant` borders rather than heavy drop shadows. Photography carries natural visual weight; interactive cards lift slightly on hover with a soft, warm ambient shadow rather than glowing outlines.

## Shapes

Corners stay restrained and bookish. Editorial photography and article cards use `12px` (`md`) or `8px` (`DEFAULT`) radii to feel crisp like trimmed prints, while buttons and category tags use `full` pill or `8px` (`DEFAULT`) shapes.

```yaml
rounded:
  sm: 4px
  DEFAULT: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px
```

## Motion & Micro-interaction

Motion is unhurried and tactile. Hover states on article cards and buttons respond within `150ms` using `ease-out`, while image zoom transitions on featured cards ease smoothly over `300ms`. Nothing loops or bounces.

```yaml
motion:
  state-change:
    duration: 150ms
    delay: 0ms
    timingFunction: ease-out
  media-hover:
    duration: 300ms
    delay: 0ms
    timingFunction: cubic-bezier(0.2, 0, 0, 1)
```

## Voice & Content Strategy

- **Tone of voice:** Grounded, observant, and practical—written from the trail rather than a marketing desk. Avoids breathless travel clichés ("wanderlust", "hidden gem", "bucket list").
- **Capitalisation:** Sentence case for article titles, section headings, and buttons; uppercase monospace for region tags and metadata.
- **Button and action labels:** Clear verb-led actions ("Read dispatch", "Browse all trails", "View packing list").
- **Numbers, dates, and units:** Tabular numerals for reading times (`7 min read`), elevations (`3,420 m`), and dates (`Oct 14, 2026`).

## Components

Component implementations live as individual HTML sticker sheet files in
`components/`. Each file contains the canonical, styled HTML components with
`<!-- COMPONENT: name -->` comment markers. Read each file before use.

- **Button** → `@components/button.html` — `button-primary`, `button-icon`, `button-with-icon`
- **Card** → `@components/card.html` — `card-elevated`, `card-action`, `card-interactive`, `card-interactive-2`
- **Chip** → `@components/chip.html` — `chip-action`, `chip-input`, `chip-with-icon`
- **Typography** → `@components/typography.html` — `typography-display`, `typography-body`, `typography-label`
