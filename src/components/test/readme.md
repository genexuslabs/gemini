# gxg-test

<!-- Auto Generated Below -->

## Properties

| Property                | Attribute                 | Description | Type      | Default    |
| ----------------------- | ------------------------- | ----------- | --------- | ---------- |
| `name`                  | `name`                    |             | `string`  | `"Andres"` |
| `show`                  | `show`                    |             | `boolean` | `false`    |
| `showValidationMessage` | `show-validation-message` |             | `boolean` | `false`    |

## Dependencies

### Depends on

- [gxg-modal](../modal)
- [gxg-button](../button)
- [gxg-select](../form-select)
- [gxg-option](../form-option)

### Graph

```mermaid
graph TD;
  gxg-test --> gxg-modal
  gxg-test --> gxg-button
  gxg-test --> gxg-select
  gxg-test --> gxg-option
  gxg-modal --> gxg-button
  gxg-button --> gxg-icon
  gxg-icon --> ch-icon
  style gxg-test fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
