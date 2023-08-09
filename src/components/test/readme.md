# gxg-test

<!-- Auto Generated Below -->

## Properties

| Property                | Attribute                  | Description | Type                | Default     |
| ----------------------- | -------------------------- | ----------- | ------------------- | ----------- |
| `buttonTestExportParts` | `button-test-export-parts` |             | `boolean`           | `false`     |
| `treeItemsModel`        | --                         |             | `GxgTreeItemData[]` | `undefined` |

## Shadow Parts

| Part              | Description |
| ----------------- | ----------- |
| `"exterior-part"` |             |

## Dependencies

### Depends on

- [gxg-button](../button)
- [gxg-tree](../tree)
- [gxg-tree-item](../tree-item)

### Graph

```mermaid
graph TD;
  gxg-test --> gxg-button
  gxg-test --> gxg-tree
  gxg-test --> gxg-tree-item
  gxg-button --> gxg-icon
  gxg-icon --> ch-icon
  gxg-tree --> gxg-tree
  gxg-tree --> gxg-tree-item
  gxg-tree-item --> gxg-icon
  gxg-tree-item --> ch-form-checkbox
  style gxg-test fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
