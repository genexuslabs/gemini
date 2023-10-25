# gxg-tree-view

<!-- Auto Generated Below -->

## Properties

| Property                     | Attribute           | Description                                                                                                                                                                                                                                   | Type                                                                                                       | Default                        |
| ---------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `checkDroppableZoneCallback` | --                  | Callback that is executed when an element tries to drop in another item of the tree. Returns whether the drop is valid.                                                                                                                       | `(dropInformation: TreeXDropCheckInfo) => Promise<boolean>`                                                | `undefined`                    |
| `checkbox`                   | `checkbox`          | Set this attribute if you want display a checkbox in all items by default.                                                                                                                                                                    | `boolean`                                                                                                  | `false`                        |
| `checked`                    | `checked`           | Set this attribute if you want the checkbox to be checked in all items by default. Only works if `checkbox = true`                                                                                                                            | `boolean`                                                                                                  | `false`                        |
| `cssClass`                   | `css-class`         | A CSS class to set as the `ch-tree-x` element class.                                                                                                                                                                                          | `string`                                                                                                   | `"tree-view"`                  |
| `dragDisabled`               | `drag-disabled`     | This attribute lets you specify if the drag operation is disabled in all items by default. If `true`, the items can't be dragged.                                                                                                             | `boolean`                                                                                                  | `DEFAULT_DRAG_DISABLED_VALUE`  |
| `dropDisabled`               | `drop-disabled`     | This attribute lets you specify if the drop operation is disabled in all items by default. If `true`, the items won't accept any drops.                                                                                                       | `boolean`                                                                                                  | `DEFAULT_DROP_DISABLED_VALUE`  |
| `dropItemsCallback`          | --                  | Callback that is executed when a list of items request to be dropped into another item.                                                                                                                                                       | `(dataTransferInfo: TreeXDataTransferInfo) => Promise<{ acceptDrop: boolean; items?: TreeXItemModel[]; }>` | `undefined`                    |
| `editableItems`              | `editable-items`    | This attribute lets you specify if the edit operation is enabled in all items by default. If `true`, the items can edit its caption in place.                                                                                                 | `boolean`                                                                                                  | `DEFAULT_EDITABLE_ITEMS_VALUE` |
| `lazyLoadTreeItemsCallback`  | --                  | Callback that is executed when a item request to load its subitems.                                                                                                                                                                           | `(treeItemId: string) => Promise<TreeXItemModel[]>`                                                        | `undefined`                    |
| `modifyItemCaptionCallback`  | --                  | Callback that is executed when a item request to modify its caption.                                                                                                                                                                          | `(treeItemId: string, newCaption: string) => Promise<TreeXOperationStatusModifyCaption>`                   | `undefined`                    |
| `multiSelection`             | `multi-selection`   | Set this attribute if you want to allow multi selection of the items.                                                                                                                                                                         | `boolean`                                                                                                  | `false`                        |
| `noPadding`                  | `no-padding`        | Removes the default padding on '.ch-tree-x-container' (Added by Gemini)                                                                                                                                                                       | `boolean`                                                                                                  | `false`                        |
| `showLines`                  | `show-lines`        | `true` to display the relation between tree items and tree lists using lines.                                                                                                                                                                 | `"all" \| "last" \| "none"`                                                                                | `"all"`                        |
| `sortItemsCallback`          | --                  | Callback that is executed when the treeModel is changed to order its items.                                                                                                                                                                   | `(subModel: TreeXItemModel[]) => void`                                                                     | `undefined`                    |
| `toggleCheckboxes`           | `toggle-checkboxes` | Set this attribute if you want all the children item's checkboxes to be checked when the parent item checkbox is checked, or to be unchecked when the parent item checkbox is unchecked. This attribute will be used in all items by default. | `boolean`                                                                                                  | `false`                        |
| `treeModel`                  | --                  | This property lets you define the model of the ch-tree-x control.                                                                                                                                                                             | `TreeXItemModel[]`                                                                                         | `[]`                           |

## Events

| Event                 | Description                                                                            | Type                                                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `checkedItemsChange`  | Fired when the checked items change.                                                   | `CustomEvent<Map<string, TreeXItemModelExtended>>`                                                                    |
| `itemContextmenu`     | Fired when an element displays its contextmenu.                                        | `CustomEvent<{ id: string; itemRef: HTMLChTreeXListItemElement; metadata: string; contextmenuEvent: PointerEvent; }>` |
| `itemOpenReference`   | Fired when the user interacts with an item in a way that its reference must be opened. | `CustomEvent<{ id: string; leaf: boolean; metadata: string; }>`                                                       |
| `selectedItemsChange` | Fired when the selected items change.                                                  | `CustomEvent<Map<string, TreeXListItemSelectedInfo>>`                                                                 |

## Methods

### `loadLazyContent(itemId: string, items?: TreeXItemModel[], downloading?: boolean, lazy?: boolean) => Promise<void>`

Given an item id, an array of items to add, the download status and the
lazy state, updates the item's UI Model.

#### Returns

Type: `Promise<void>`

### `scrollIntoVisible(treeItemId: string) => Promise<void>`

Given an item id, it displays and scrolls into the item view.

#### Returns

Type: `Promise<void>`

### `toggleItems(treeItemIds: string[], expand?: boolean) => Promise<TreeXListItemExpandedInfo[]>`

This method is used to toggle a tree item by the tree item id/ids.

#### Returns

Type: `Promise<TreeXListItemExpandedInfo[]>`

### `updateAllItemsProperties(properties: { expanded?: boolean; checked?: boolean; }) => Promise<void>`

Given a subset of item's properties, it updates all item UI models.

#### Returns

Type: `Promise<void>`

### `updateItemsProperties(items: string[], properties: TreeXItemModel) => Promise<void>`

Given a item list and the properties to update, it updates the properties
of the items in the list.

#### Returns

Type: `Promise<void>`

### `updateValidDropZone(requestTimestamp: number, newContainerId: string, draggedItems: GxDataTransferInfo[], validDrop: boolean) => Promise<void>`

Update the information about the valid droppable zones.

#### Returns

Type: `Promise<void>`

## Dependencies

### Depends on

- ch-tree-x-list-item
- ch-tree-x

### Graph

```mermaid
graph TD;
  gxg-tree-view --> ch-tree-x-list-item
  gxg-tree-view --> ch-tree-x
  ch-tree-x-list-item --> ch-checkbox
  style gxg-tree-view fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
