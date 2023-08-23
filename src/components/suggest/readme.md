# gxg-suggest

<!-- Auto Generated Below -->

## Properties

| Property            | Attribute            | Description                                                | Type                                                   | Default           |
| ------------------- | -------------------- | ---------------------------------------------------------- | ------------------------------------------------------ | ----------------- |
| `disabled`          | `disabled`           | The presence of this attribute makes the suggest disabled. | `boolean`                                              | `false`           |
| `validationMessage` | `validation-message` | The message to display for the validation result.          | `string`                                               | `undefined`       |
| `validationStatus`  | `validation-status`  | The validation status                                      | `"error" \| "indeterminate" \| "success" \| "warning"` | `"indeterminate"` |

## Dependencies

### Depends on

- [gxg-form-message](../form-message)

### Graph

```mermaid
graph TD;
  gxg-suggest --> gxg-form-message
  gxg-form-message --> gxg-icon
  gxg-icon --> ch-icon
  style gxg-suggest fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
