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
  const childrenLength = item.items ? item.items.length : 0;
  const isLeaf = childrenLength === 0 || item.leaf ? true : false;
  return (
    <gxg-tree-item
      checkbox={item.checkbox}
      checked={item.checked}
      disabled={item.disabled}
      icon={item.icon}
      id={item.id}
      indeterminate={item.indeterminate}
      key={`tree-item-${item.id}`}
      label={item.label}
      leaf={isLeaf}
      numberOfChildren={childrenLength}
      opened={item.opened}
      selected={item.selected}
    >
      {[
        item.label,
        item.items?.length && renderTreeItems(item.items, false, item.id),
      ]}
    </gxg-tree-item>
  );
};
