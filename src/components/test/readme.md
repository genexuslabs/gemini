# gxg-test

<!-- Auto Generated Below -->

## Properties

| Property                    | Attribute                  | Description | Type                                                 | Default     |
| --------------------------- | -------------------------- | ----------- | ---------------------------------------------------- | ----------- |
| `buttonTestExportParts`     | `button-test-export-parts` |             | `boolean`                                            | `false`     |
| `lazyLoadTreeItemsCallback` | --                         |             | `(treeItemId: string) => Promise<GxgTreeItemData[]>` | `undefined` |
| `treeItemsModel`            | --                         |             | `GxgTreeItemData[]`                                  | `undefined` |

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
  gxg-tree-item --> gxg-icon
  gxg-tree-item --> gxg-form-checkbox
  gxg-form-checkbox --> gxg-icon
  gxg-form-checkbox --> gxg-label
  gxg-form-checkbox --> gxg-form-message
  gxg-label --> gxg-tooltip
  gxg-form-message --> gxg-icon
  style gxg-test fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
