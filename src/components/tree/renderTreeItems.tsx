/* eslint-disable @typescript-eslint/no-use-before-define */
import { h } from "@stencil/core";
import { GxgTreeItemData } from "../tree-item/gxg-tree-item";

export const renderTreeItems = (
  treeItemsModel: GxgTreeItemData[],
  firstCall = true
): HTMLGxgTreeItemElement[] | HTMLGxgTreeElement => {
  if (treeItemsModel?.length) {
    if (firstCall) {
      return treeItemsModel.map((item: GxgTreeItemData) => {
        return renderTreeItem(item);
      });
    } else {
      return (
        <gxg-tree slot="tree">
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
  const lazy = !item.lazy ? false : true;
  return (
    <gxg-tree-item
      checkbox={item.checkbox}
      checked={item.checked}
      description={item.description}
      disabled={item.disabled}
      icon={item.icon}
      indeterminate={item.indeterminate}
      id={item.id}
      label={item.label}
      leaf={isLeaf && !lazy}
      numberOfChildren={childrenLength}
      opened={item.opened}
      selected={item.selected}
    >
      {[item.label, item.items?.length && renderTreeItems(item.items, false)]}
    </gxg-tree-item>
  );
};
