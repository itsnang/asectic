# ui-component.md

This file provides guidance for UI component development and patterns in this streetwear e-commerce application.

## Context

Parse $ARGUMENTS to get the following values:

- [name]: Component file name from $ARGUMENTS, converted to kebab-case (e.g. user-profile.tsx) and Component name from $ARGUMENTS, converted to PascalCase.
- [summary]: Component summary from $ARGUMENTS

## Component Architecture

### Design System Foundation

**Shadcn/ui Configuration:**

- Style: "new-york" variant with modern aesthetics
- Base color: Gray with CSS variables for theming
- Icon library: Lucide React
- RSC: React Server Components enabled
- Tailwind CSS v4 with CSS variables for dynamic theming

### Theme System

**Dark/Light Mode:**

- `next-themes` integration with system preference detection
- CSS variables defined in `globals.css` with `@theme inline` directive
- Custom dark variant: `@custom-variant dark (&:is(.dark *))`
- Automatic theme switching without flash

**Color Tokens:**

- Primary system: `--color-primary`, `--color-primary-foreground`
- Semantic colors: `success`, `warning`, `info`, `brand`
- Extended palette: Chart colors (1-5), Sidebar colors
- All colors support dark mode variants automatically

## Component Patterns

### Base UI Components (shadcn/ui)

**Button Component:**

- Uses `class-variance-authority` for variants
- Supports `asChild` prop via Radix Slot for polymorphic behavior
- Variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
- Sizes: `default`, `sm`, `lg`, `icon`
- Focus management: `focus-visible:ring-ring/50 focus-visible:ring-[3px]`
- Error states: `aria-invalid:ring-destructive/20`

**Card Component:**

- Compound component pattern with semantic slots
- Components: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`
- Grid-based header with automatic action positioning
- Container queries: `@container/card-header`
- Data attributes: `data-slot="card"` for styling hooks

### Animation Components

**Custom Animation Library:**
Location: `src/components/animations/`

**Core Animations:**

- `FadeIn`: Directional fade with viewport intersection
- `BlurFade`: Blur + fade combination
- `StaggerContainer` + `StaggerItem`: Sequential animations
- `ScaleOnHover`: Hover scale effects
- `AnimatedText`: Text reveal animations

**FadeIn Pattern:**

```tsx
<FadeIn direction="up" delay={0.2} duration={0.6}>
  <Component />
</FadeIn>
```

**Animation Philosophy:**

- Viewport-based animations with `whileInView`
- Easing: `ease: "easeOut"` for natural motion
- Spring animations: `type: "spring", stiffness: 200`
- Performance: GPU acceleration with transforms

### Complex Component Example: HoodieCard

**Features Implemented:**

- Image crossfade on hover with AnimatePresence
- Micro-interactions: Heart animation, button scaling
- Dynamic badges with conditional styling
- Size selection with state management
- Gradient overlays and glow effects
- Hover state management with Framer Motion

**Interaction Patterns:**

- `whileHover`, `whileTap` for immediate feedback
- Staggered animations for lists (ratings stars)
- Complex state-dependent animations (liked heart)
- Backdrop blur effects: `backdrop-blur-sm`

## Component Development Guidelines

### Naming Conventions

**Files:**

- UI components: `kebab-case` (e.g., `hoodie-card.tsx`)
- Animation components: `kebab-case` (e.g., `fade-in.tsx`)
- Base components: `PascalCase` exports

**Component Structure:**

```tsx
interface ComponentProps {
  // Props with clear documentation
}

export function Component({ ...props }: ComponentProps) {
  // Implementation
}
```

### Styling Patterns

**Class Organization:**

1. Layout classes first
2. Responsive modifiers
3. State modifiers (hover, focus, etc.)
4. Dark mode variants
5. Animation classes last

**CSS Variable Usage:**

- Use semantic tokens: `text-foreground`, `bg-background`
- Custom properties: `--color-brand` for extended palette
- Gradient patterns: `from-primary/5 via-transparent to-brand/5`

### Animation Standards

**Motion Values:**

- Duration: `0.6s` for primary animations, `0.2-0.4s` for micro-interactions
- Easing: `[0.22, 1, 0.36, 1]` cubic-bezier for smooth motion
- Delays: Stagger by `0.05-0.1s` intervals
- Scale: `1.02-1.05` for hover, `0.95-0.98` for active

**Performance:**

- Use `transform` properties for animations
- Prefer `opacity` and `scale` over layout changes
- `will-change` only when necessary
- GPU acceleration via `transform3d`

## Integration with Forms

**Form Libraries:**

- React Hook Form + Zod validation
- TanStack Form for complex forms
- shadcn/ui form components with error handling

**Validation Patterns:**

- Schema-first with Zod
- Real-time validation feedback
- Error states with semantic colors
- Accessibility compliance (aria-invalid)

## Accessibility Standards

- Focus management with visible focus rings
- Semantic HTML structure
- ARIA attributes for dynamic content
- Screen reader friendly animations (prefer-reduced-motion)
- Color contrast compliance in both themes
- Keyboard navigation support
