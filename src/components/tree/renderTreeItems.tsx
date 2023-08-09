/* eslint-disable @typescript-eslint/no-use-before-define */
import { h } from "@stencil/core";
import { GxgTreeItemData } from "../tree-item/gxg-tree-item";

export const renderTreeItems = (
  treeItemsModel: GxgTreeItemData[],
  firstCall = true,
  key: string = undefined
): HTMLGxgTreeItemElement[] | HTMLGxgTreeElement => {
  if (firstCall) {
    return treeItemsModel.map((item: GxgTreeItemData) => {
      return renderTreeItem(item);
    });
  } else {
    return (
      <gxg-tree slot="tree" key={`tree-${key}`}>
        {treeItemsModel.map((item: GxgTreeItemData) => {
          return renderTreeItem(item);
        })}
      </gxg-tree>
    );
  }
};

const renderTreeItem = (item: GxgTreeItemData): HTMLGxgTreeItemElement => {
  return (
    <gxg-tree-item
      key={`tree-item-${item.id}`}
      id={item.id}
      leftIcon={item.icon}
      checkbox={item.checkbox}
      checked={item.checked}
      disabled={item.disabled}
      indeterminate={item.indeterminate}
      opened={item.opened}
      selected={item.selected}
    >
      {[item.name, item.items && renderTreeItems(item.items, false, item.id)]}
    </gxg-tree-item>
  );
};
