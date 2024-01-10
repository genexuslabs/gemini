# gxg-test

<!-- Auto Generated Below -->


## Shadow Parts

| Part    | Description |
| ------- | ----------- |
| `"kbs"` |             |


## Dependencies

### Depends on

- [gxg-list-box](../list-box)
- [gxg-list-box-item](../list-box-item)

### Graph
```mermaid
graph TD;
  gxg-test --> gxg-list-box
  gxg-test --> gxg-list-box-item
  gxg-list-box --> gxg-button
  gxg-list-box --> gxg-form-message
  gxg-list-box --> gxg-tooltip
  gxg-list-box --> gxg-icon
  gxg-button --> gxg-icon
  gxg-icon --> ch-icon
  gxg-form-message --> gxg-icon
  gxg-list-box-item --> gxg-form-checkbox
  gxg-list-box-item --> gxg-icon
  gxg-form-checkbox --> gxg-icon
  gxg-form-checkbox --> gxg-label
  gxg-form-checkbox --> gxg-form-message
  gxg-form-checkbox --> gxg-tooltip
  gxg-label --> gxg-tooltip
  style gxg-test fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
