# Select Component

A generic native select component styled for consistency.

## Usage

```jsx
import Select from "@shared/ui/Select";

const options = [
  { value: "inter", label: "Inter" },
  { value: "roboto", label: "Roboto" },
];

<Select 
  value={currentValue} 
  onChange={(e) => setValue(e.target.value)} 
  options={options} 
  ariaLabel="Select Font"
/>
```

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string \| number` | (Required) | Current value (controlled). |
| `onChange` | `function` | (Required) | Change handler. |
| `options` | `Array` | (Required) | Array of `{ value, label }` objects. |
| `className` | `string` | `""` | Additional CSS classes. |
| `ariaLabel` | `string` | `undefined` | Accessibility label. |
