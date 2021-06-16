# gxg-listbox-item

<!-- Auto Generated Below -->

## Properties

| Property    | Attribute    | Description                                                                                    | Type                                                                                                                                      | Default     |
| ----------- | ------------ | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `icon`      | `icon`       | Any icon that belongs to Gemini icon library: https://gx-gemini.netlify.app/?path=/story/icons | `string`                                                                                                                                  | `undefined` |
| `iconColor` | `icon-color` | (This prop is for internal use).                                                               | `"alwaysblack" \| "auto" \| "disabled" \| "error" \| "negative" \| "onbackground" \| "ondisabled" \| "primary" \| "success" \| "warning"` | `"auto"`    |
| `value`     | `value`      | The item value. If value is not provided, the value will be the item innerHTML.                | `any`                                                                                                                                     | `undefined` |

## Events

| Event             | Description                       | Type               |
| ----------------- | --------------------------------- | ------------------ |
| `checkboxClicked` | (This event is for internal use.) | `CustomEvent<any>` |
| `itemClicked`     | (This event is for internal use.) | `CustomEvent<any>` |

## Dependencies

### Depends on

- [gxg-icon](../icon)

### Graph

```mermaid
graph TD;
  gxg-listbox-item --> gxg-icon
  gxg-icon --> ch-icon
  style gxg-listbox-item fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
