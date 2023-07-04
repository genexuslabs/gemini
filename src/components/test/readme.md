# gxg-test

<!-- Auto Generated Below -->

## Properties

| Property                | Attribute                 | Description | Type      | Default    |
| ----------------------- | ------------------------- | ----------- | --------- | ---------- |
| `name`                  | `name`                    |             | `string`  | `"Andres"` |
| `show`                  | `show`                    |             | `boolean` | `false`    |
| `showValidationMessage` | `show-validation-message` |             | `boolean` | `false`    |

## Methods

### `validate() => Promise<boolean>`

#### Returns

Type: `Promise<boolean>`

## Dependencies

### Depends on

- [gxg-form-radio-group](../form-radio-group)
- [gxg-form-radio](../form-radio)

### Graph

```mermaid
graph TD;
  gxg-test --> gxg-form-radio-group
  gxg-test --> gxg-form-radio
  gxg-form-radio-group --> gxg-label
  gxg-form-radio-group --> gxg-form-message
  gxg-form-message --> gxg-icon
  gxg-icon --> ch-icon
  gxg-form-radio --> gxg-label
  style gxg-test fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
