# gxg-test

<!-- Auto Generated Below -->

## Properties

| Property   | Attribute  | Description                                                                          | Type      | Default |
| ---------- | ---------- | ------------------------------------------------------------------------------------ | --------- | ------- |
| `checkbox` | `checkbox` | Set this attribute if you want all this tree tree-items to have a checkbox           | `boolean` | `false` |
| `checked`  | `checked`  | Set this attribute if you want all this tree tree-items to have the checkbox checked | `boolean` | `false` |

## Dependencies

### Depends on

- [gxg-modal](../modal)
- [gxg-button](../button)

### Graph

```mermaid
graph TD;
  gxg-tree --> gxg-modal
  gxg-tree --> gxg-button
  gxg-modal --> gxg-button
  gxg-button --> gxg-icon
  style gxg-tree fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
