# gxgch-tree

<!-- Auto Generated Below -->

## Properties

| Property           | Attribute           | Description                                                                                                          | Type      | Default |
| ------------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `checkbox`         | `checkbox`          | Set this attribute if you want all the items to have a checkbox.                                                     | `boolean` | `true`  |
| `checked`          | `checked`           | Set this attribute if you want all the items to be checked by default.                                               | `boolean` | `false` |
| `opened`           | `opened`            | Set this attribute if you want all the items to be opened by default.                                                | `boolean` | `true`  |
| `toggleCheckboxes` | `toggle-checkboxes` | Set this attribute if you want all the items checkboxes to be toggled when the parent tree item checkbox is toggled. | `boolean` | `false` |

## Methods

### `deleteNode(nodeId: string) => Promise<boolean>`

#### Returns

Type: `Promise<boolean>`

### `getChecked(idsArray?: (string | number)[]) => Promise<CheckedGxgTreeItem[]>`

#### Returns

Type: `Promise<CheckedGxgTreeItem[]>`

### `insertTreeItems(nodeId: string, treeItemsModel: GxgTreeItemData[], mode?: TreeItemsInsertionMode) => Promise<boolean>`

#### Returns

Type: `Promise<boolean>`

### `toggleItems(ids: string[], open?: boolean) => Promise<ToggledGxgTreeItem[]>`

#### Returns

Type: `Promise<ToggledGxgTreeItem[]>`

## Dependencies

### Used by

- [gxg-test](../test)
- [gxg-tree](.)

### Depends on

- [gxg-tree](.)
- [gxg-tree-item](../tree-item)

### Graph

```mermaid
graph TD;
  gxg-tree --> gxg-tree
  gxg-tree-item --> gxg-icon
  gxg-tree-item --> ch-form-checkbox
  gxg-icon --> ch-icon
  gxg-test --> gxg-tree
  style gxg-tree fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
