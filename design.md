# LUXE JEWELS - Premium Design System

## Design Philosophy

### Visual Language
**Luxury Minimalism**: Clean, sophisticated interface that puts the jewelry at center stage. Every element serves a purpose while maintaining an air of exclusivity and premium quality.

**Emotional Resonance**: Design evokes feelings of desire, luxury, and trust through careful use of space, typography, and premium materials aesthetic.

**Mobile-First Elegance**: Optimized for mobile shopping with touch-friendly interactions and thumb-zone navigation considerations.

## Color Palette

### Primary Colors
- **Gold (#D4AF37)**: Primary brand color, used for CTAs, highlights, and premium elements
- **Rich Gold (#B8860B)**: Darker gold for depth and sophistication
- **Champagne Gold (#F7E7CE)**: Light gold for backgrounds and subtle accents

### Neutral Colors
- **Pure White (#FFFFFF)**: Primary background, card backgrounds
- **Charcoal (#2C2C2C)**: Primary text, high contrast elements
- **Soft Gray (#F8F8F8)**: Secondary backgrounds, dividers
- **Medium Gray (#666666)**: Secondary text, placeholders

### Accent Colors
- **Deep Black (#000000)**: Premium contrast, luxury feel
- **Warm White (#FEFEFE)**: Card backgrounds, clean sections

## Typography

### Primary Font: Playfair Display (Serif)
- **Usage**: Headings, brand elements, luxury emphasis
- **Weights**: Regular (400), Medium (500), Bold (700)
- **Character**: Elegant, sophisticated, editorial quality

### Secondary Font: Inter (Sans-serif)
- **Usage**: Body text, UI elements, navigation
- **Weights**: Light (300), Regular (400), Medium (500), Semibold (600)
- **Character**: Clean, readable, modern

### Font Hierarchy
- **H1**: Playfair Display Bold, 32px - Hero titles
- **H2**: Playfair Display Medium, 28px - Section headers
- **H3**: Playfair Display Regular, 24px - Card titles
- **Body**: Inter Regular, 16px - Main content
- **Small**: Inter Light, 14px - Secondary info
- **Button**: Inter Medium, 16px - CTAs

## Visual Effects & Animations

### Core Libraries Used
1. **Anime.js**: Smooth micro-interactions, button hover effects, loading animations
2. **Splide.js**: Product image carousels, category sliders
3. **ECharts.js**: Price trend charts, sales analytics
4. **Pixi.js**: Premium visual effects, gold particle animations
5. **Matter.js**: Physics-based interactions for product drops
6. **p5.js**: Creative background effects, jewelry sparkle animations

### Animation Principles
- **Subtle Luxury**: Gentle, refined animations that enhance rather than distract
- **Performance**: 60fps smooth animations with hardware acceleration
- **Purposeful**: Every animation serves a functional or emotional purpose

### Specific Effects
- **Gold Shimmer**: Subtle animated gradient on premium elements
- **Diamond Sparkle**: Particle effects on featured products
- **Smooth Transitions**: Page transitions with elegant easing
- **Hover States**: Gentle scale and shadow effects on interactive elements

## Component Design

### Cards
- **Border Radius**: 16px for modern, friendly feel
- **Shadow**: Subtle elevation with warm undertones
- **Padding**: 20px internal spacing for premium feel
- **Background**: Pure white with subtle gold border on selection

### Buttons
- **Primary**: Gold background, white text, 12px border radius
- **Secondary**: White background, gold border, gold text
- **Ghost**: Transparent background, gold text, gold border
- **Size**: 48px height for touch-friendly interaction

### Navigation
- **Bottom Tab Bar**: Fixed position with gold active states
- **Icons**: Custom-designed with jewelry theme
- **Typography**: Inter Medium, 12px labels
- **Background**: White with subtle shadow

### Product Grid
- **Aspect Ratio**: 4:5 for optimal jewelry display
- **Spacing**: 16px gap between items
- **Hover State**: Gentle scale (1.02x) with gold glow
- **Loading**: Skeleton with shimmer effect

## Layout Principles

### Spacing System
- **Base Unit**: 8px
- **Small**: 16px (2 units)
- **Medium**: 24px (3 units)
- **Large**: 32px (4 units)
- **XLarge**: 48px (6 units)

### Grid System
- **Mobile**: 16px margins, flexible content
- **Tablet**: 24px margins, 2-column grid
- **Desktop**: 32px margins, 3-4 column grid

### Content Hierarchy
1. **Hero Section**: Large imagery, minimal text
2. **Featured Products**: Prominent placement, large cards
3. **Categories**: Horizontal scroll, visual icons
4. **Product Grid**: Clean, organized, filterable

## Interactive Elements

### Touch Targets
- **Minimum Size**: 44px x 44px
- **Spacing**: 8px minimum between targets
- **Feedback**: Immediate visual response

### Gestures
- **Swipe**: Horizontal product browsing
- **Pinch**: Product image zoom
- **Tap**: Quick actions, selections
- **Long Press**: Context menus, quick add

### States
- **Default**: Clean, neutral appearance
- **Active**: Gold accent, subtle glow
- **Disabled**: 50% opacity, no interaction
- **Loading**: Shimmer effect, progress indicators

## Accessibility

### Color Contrast
- **Text on White**: Minimum 4.5:1 ratio
- **Gold on White**: 3:1 ratio for large text
- **Interactive Elements**: Clear visual distinction

### Typography
- **Minimum Size**: 14px for body text
- **Line Height**: 1.5x for optimal readability
- **Font Weight**: Regular (400) minimum for body text

### Interaction
- **Focus States**: Clear visual indicators
- **Touch Targets**: 44px minimum size
- **Error States**: Clear messaging, corrective actions