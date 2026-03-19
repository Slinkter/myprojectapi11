# Button Component

A generic, reusable button component with multiple variants and sizes.

## Usage

```jsx
import Button from "@shared/ui/Button";

<Button variant="primary" size="md" onClick={handleAction} ariaLabel="Execute action">
  Click Me
</Button>
```

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | (Required) | Content of the button. |
| `onClick` | `function` | `undefined` | Click handler. |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | HTML button type. |
| `variant` | `"primary" \| "secondary" \| "destructive" \| "outline" \| "ghost"` | `"primary"` | Visual style. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Button size. |
| `disabled` | `boolean` | `false` | Disabled state. |
| `className` | `string` | `""` | Additional CSS classes. |
| `ariaLabel` | `string` | `undefined` | Accessibility label. |

## Variants

- **Primary**: Main action (primary background).
- **Secondary**: Alternative action (secondary background).
- **Destructive**: Dangerous actions (red background).
- **Outline**: Less prominent actions (border).
- **Ghost**: Minimalist actions (no background).
