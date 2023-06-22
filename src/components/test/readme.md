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

- [gxg-form-text](../form-text)
- [gxg-button](../button)

### Graph

```mermaid
graph TD;
  gxg-test --> gxg-form-text
  gxg-test --> gxg-button
  gxg-form-text --> gxg-icon
  gxg-form-text --> gxg-label
  gxg-form-text --> gxg-form-message
  gxg-icon --> ch-icon
  gxg-form-message --> gxg-icon
  gxg-button --> gxg-icon
  style gxg-test fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
