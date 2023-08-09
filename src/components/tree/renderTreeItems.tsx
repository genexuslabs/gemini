/* eslint-disable @typescript-eslint/no-use-before-define */
import { h } from "@stencil/core";
import { GxgTreeItemData } from "../tree-item/gxg-tree-item";

export const renderTreeItems = (
  treeItemsModel: GxgTreeItemData[],
  firstCall = true,
  id
): HTMLGxgTreeItemElement[] | HTMLGxgTreeElement => {
  if (treeItemsModel?.length) {
    if (firstCall) {
      console.log("first call");
      return treeItemsModel.map((item: GxgTreeItemData) => {
        return renderTreeItem(item);
      });
    } else {
      return (
        <gxg-tree slot="tree" data-id={id} key={`tree-${id}`}>
          {treeItemsModel.map((item: GxgTreeItemData) => {
            return renderTreeItem(item);
          })}
        </gxg-tree>
      );
    }
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
      {[
        item.name,
        item.items?.length && renderTreeItems(item.items, false, item.id),
      ]}
    </gxg-tree-item>
  );
};
