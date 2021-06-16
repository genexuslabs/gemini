# gxg-listbox

<!-- Auto Generated Below -->

## Properties

| Property     | Attribute    | Description                                                            | Type      | Default   |
| ------------ | ------------ | ---------------------------------------------------------------------- | --------- | --------- |
| `checkboxes` | `checkboxes` | The prescence of this attribute will display a checkbox for every item | `boolean` | `false`   |
| `theTitle`   | `the-title`  | The listbox title that appears on the header                           | `string`  | `""`      |
| `width`      | `width`      | The listbox width                                                      | `string`  | `"280px"` |

## Events

| Event              | Description                                                                                                                                                                                                                           | Type               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `selectionChanged` | This event emmits the items that are currently selected. event.detail contains the selected items as objects. Each object contains the item idex and the item value. If value was not provided, the value will be the item innerText. | `CustomEvent<any>` |

## Dependencies

### Depends on

- [gxg-form-checkbox](../form-checkbox)

### Graph

```mermaid
graph TD;
  gxg-listbox --> gxg-form-checkbox
  style gxg-listbox fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
