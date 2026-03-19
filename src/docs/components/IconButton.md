# IconButton Component

A circular button component optimized for displaying icons.

## Usage

```jsx
import IconButton from "@shared/ui/IconButton";
import { BsHeart } from "react-icons/bs";

<IconButton onClick={handleAction} ariaLabel="Save to favorites">
  <BsHeart />
</IconButton>
```

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | (Required) | Icon element (should be ~24x24px). |
| `onClick` | `function` | (Required) | Click handler. |
| `disabled` | `boolean` | `false` | Disabled state. |
| `className` | `string` | `""` | Additional CSS classes. |
| `ariaLabel` | `string` | (Required) | Accessibility label (ARIA label). |

## Styling

- Circular shape (`rounded-full`).
- Hover and tap animations using `framer-motion`.
- Consistent icon size (automatically forces `w-6 h-6` on child).
