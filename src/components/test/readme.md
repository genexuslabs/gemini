# gxg-test

<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description | Type      | Default    |
| -------- | --------- | ----------- | --------- | ---------- |
| `name`   | `name`    |             | `string`  | `"Andres"` |
| `show`   | `show`    |             | `boolean` | `false`    |

## Methods

### `close() => Promise<void>`

#### Returns

Type: `Promise<void>`

### `open() => Promise<void>`

#### Returns

Type: `Promise<void>`

### `setFocus() => Promise<void>`

#### Returns

Type: `Promise<void>`

## Dependencies

### Depends on

- ch-grid
- ch-grid-columnset
- ch-grid-column

### Graph

```mermaid
graph TD;
  gxg-test --> ch-grid
  gxg-test --> ch-grid-columnset
  gxg-test --> ch-grid-column
  ch-grid --> ch-grid-settings
  ch-grid --> ch-grid-settings-columns
  ch-grid-settings --> ch-window
  ch-grid-column --> ch-grid-column-resize
  style gxg-test fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
