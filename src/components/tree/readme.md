# gxgch-tree

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                                                | Type      | Default |
| ------------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `checkbox`         | `checkbox`          | Set this attribute if you want all the items to have a checkbox.                                                           | `boolean` | `true`  |
| `checked`          | `checked`           | Set this attribute if you want all the items to be checked by default.                                                     | `boolean` | `false` |
| `multiSelection`   | `multi-selection`   | Set this attribute if you want to allow multi selection of the items. This property should only be set on the master tree. | `boolean` | `false` |
| `opened`           | `opened`            | Set this attribute if you want all the items to be opened by default.                                                      | `boolean` | `true`  |
| `toggleCheckboxes` | `toggle-checkboxes` | Set this attribute if you want all the items checkboxes to be toggled when the parent tree item checkbox is toggled.       | `boolean` | `false` |


## Events

| Event                  | Description | Type                                                             |
| ---------------------- | ----------- | ---------------------------------------------------------------- |
| `treeItemStateChanged` |             | `CustomEvent<{ itemData: GxgTreeItemData; emittedBy: string; }>` |


## Methods

### `getCheckedItems(idsArray?: (string | number)[]) => Promise<GxgTreeItemSelectedData[]>`

Returns an array of the selected tree-items, providing the id, checked status, selected status, and label.

#### Returns

Type: `Promise<GxgTreeItemSelectedData[]>`



### `getSelectedItems() => Promise<GxgTreeItemData[]>`

Returns an array of the selected tree-items, providing the id, checked status, selected status, and label.

#### Returns

Type: `Promise<GxgTreeItemData[]>`



### `toggleItems(ids: string[], open?: boolean) => Promise<ToggledGxgTreeItem[]>`



#### Returns

Type: `Promise<ToggledGxgTreeItem[]>`

a boolean value indicating if the selected tree-item is open or not, after the method was called.


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
