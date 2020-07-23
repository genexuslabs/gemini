# gxg-color-picker

<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description                                                     | Type     | Default   |
| -------- | --------- | --------------------------------------------------------------- | -------- | --------- |
| `label`  | `label`   | The label of the color picker (optional)                        | `string` | `""`      |
| `value`  | `value`   | The color value, such as "red", #CCDDEE, or rgba(220,140,40,.5) | `string` | `"white"` |

## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `change`         |             | `CustomEvent<any>` |
| `nameInputEvent` |             | `CustomEvent<any>` |
| `save`           |             | `CustomEvent<any>` |

## Dependencies

### Depends on

- [gxg-button-group](../button-group)

### Graph

```mermaid
graph TD;
  gxg-color-picker --> gxg-button-group
  style gxg-color-picker fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
