# gxg-test

<!-- Auto Generated Below -->

## Properties

| Property                    | Attribute                  | Description | Type                                                 | Default     |
| --------------------------- | -------------------------- | ----------- | ---------------------------------------------------- | ----------- |
| `buttonTestExportParts`     | `button-test-export-parts` |             | `boolean`                                            | `false`     |
| `lazyLoadTreeItemsCallback` | --                         |             | `(treeItemId: string) => Promise<GxgTreeItemData[]>` | `undefined` |
| `showGrid`                  | `show-grid`                |             | `boolean`                                            | `false`     |
| `showGridData`              | `show-grid-data`           |             | `boolean`                                            | `false`     |
| `treeItemsModel`            | --                         |             | `GxgTreeItemData[]`                                  | `undefined` |

## Shadow Parts

| Part                            | Description |
| ------------------------------- | ----------- |
| `"ch-grid-pending-for-updates"` |             |
| `"exterior-part"`               |             |

## Dependencies

### Depends on

- [gxg-button](../button)
- [gxg-tree](../tree)
- [gxg-grid](../grid)
- ch-grid
- ch-grid-columnset
- ch-grid-column
- ch-grid-rowset-legend
- [gxg-tree-item](../tree-item)

### Graph

```mermaid
graph TD;
  gxg-test --> gxg-button
  gxg-test --> gxg-tree
  gxg-test --> gxg-grid
  gxg-test --> ch-grid
  gxg-test --> ch-grid-columnset
  gxg-test --> ch-grid-column
  gxg-test --> ch-grid-rowset-legend
  gxg-test --> gxg-tree-item
  gxg-button --> gxg-icon
  gxg-icon --> ch-icon
  ch-grid --> ch-grid-settings
  ch-grid --> ch-grid-settings-columns
  ch-grid-settings --> ch-window
  ch-window --> ch-window-close
  ch-grid-column --> ch-grid-column-settings
  ch-grid-column --> ch-grid-column-resize
  ch-grid-column-settings --> ch-window
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
