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

- [gxg-tabs](../tabs)
- [gxg-tab-bar](../tab-bar)
- [gxg-tab-button](../tab-button)
- [gxg-tab](../tab)

### Graph

```mermaid
graph TD;
  gxg-test --> gxg-tabs
  gxg-test --> gxg-tab-bar
  gxg-test --> gxg-tab-button
  gxg-test --> gxg-tab
  gxg-tab-bar --> gxg-button
  gxg-button --> gxg-icon
  gxg-icon --> ch-icon
  gxg-tab-button --> gxg-icon
  style gxg-test fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
