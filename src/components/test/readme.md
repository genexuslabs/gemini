# gxg-test

<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description | Type      | Default    |
| -------- | --------- | ----------- | --------- | ---------- |
| `name`   | `name`    |             | `string`  | `"Andres"` |
| `show`   | `show`    |             | `boolean` | `false`    |

## Dependencies

### Depends on

- [gxg-combo-box](../combo-box)
- [gxg-combo-box-item](../combo-box-item)
- [gxg-button](../button)

### Graph

```mermaid
graph TD;
  gxg-test --> gxg-combo-box
  gxg-test --> gxg-combo-box-item
  gxg-test --> gxg-button
  gxg-combo-box --> gxg-form-text
  gxg-combo-box --> gxg-button
  gxg-form-text --> gxg-icon
  gxg-form-text --> gxg-form-message
  gxg-icon --> ch-icon
  gxg-form-message --> gxg-icon
  gxg-button --> gxg-icon
  gxg-combo-box-item --> gxg-icon
  style gxg-test fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
