/* eslint-disable @typescript-eslint/no-use-before-define */
import { h } from "@stencil/core";
import { GxgTreeItemData } from "../tree-item/gxg-tree-item";

export const renderTree = (
  model: GxgTreeItemData[],
  firstCall = true,
  masterTree: HTMLGxgTreeElement
): HTMLGxgTreeItemElement[] | HTMLGxgTreeElement => {
  if (firstCall) {
    return (
      <gxg-tree>
        {model.map((item: GxgTreeItemData) => {
          return renderTreeItem(item, masterTree);
        })}
      </gxg-tree>
    );
  } else {
    return (
      <gxg-tree slot="tree">
        {model.map((item: GxgTreeItemData) => {
          return renderTreeItem(item, masterTree);
        })}
      </gxg-tree>
    );
  }
};

const renderTreeItem = (
  item: GxgTreeItemData,
  masterTree
): HTMLGxgTreeItemElement => {
  return (
    <gxg-tree-item
      id={item.id}
      leftIcon={item.icon}
      checkbox={item.checkbox}
      checked={item.checked}
      disabled={item.disabled}
      indeterminate={item.indeterminate}
      opened={item.opened}
      selected={item.selected}
      masterTree={masterTree}
    >
      {[item.name, item.items && renderTree(item.items, false, masterTree)]}
    </gxg-tree-item>
  );
};
