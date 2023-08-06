/* eslint-disable @typescript-eslint/no-use-before-define */
import { h } from "@stencil/core";

export const renderTree = (
  model: GxgTreeItem[],
  isFirstCall = true
): HTMLGxgTreeElement => {
  if (isFirstCall) {
    return (
      <gxg-tree slot="tree">
        {model.map((item: GxgTreeItem) => {
          return renderTreeItem(item);
        })}
      </gxg-tree>
    );
  } else {
    return (
      <gxg-tree slot="tree">
        {model.map((item: GxgTreeItem) => {
          return renderTreeItem(item);
        })}
      </gxg-tree>
    );
  }
};

const renderTreeItem = (item: GxgTreeItem): HTMLGxgTreeItemElement => {
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
    >
      {[item.name, item.items && renderTree(item.items)]}
    </gxg-tree-item>
  );
};

export type GxgTreeItem = {
  checkbox?: boolean;
  checked?: boolean;
  disabled?: boolean;
  icon?: string;
  id: string;
  indeterminate?: boolean;
  items?: GxgTreeItem[];
  name: string;
  opened?: boolean;
  selected?: boolean;
};
