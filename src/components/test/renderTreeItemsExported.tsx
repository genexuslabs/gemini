/* eslint-disable @typescript-eslint/no-use-before-define */
import { h } from "@stencil/core";

export const renderTreeItemsExported = (model, firstCall) => {
  if (firstCall) {
    return model.map((item) => {
      //return renderTreeItem(item);
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
          hola
          {/* {[item.name, item.items && renderTree(item.items, false)]} */}
        </gxg-tree-item>
      );
    });
  }
  // else {
  //   return (
  //     <gxg-tree slot="tree">
  //       {model.map((item: GxgTreeItemData) => {
  //         return renderTreeItem(item);
  //       })}
  //     </gxg-tree>
  //   );
  // }
  // const tree = model.map((item) => {
  //   if (true) {
  //     return <gxg-tree-item left-icon="general/generator">dura</gxg-tree-item>;
  //   }
  // });
  // return tree;
  // return [
  //   <gxg-tree-item>dura</gxg-tree-item>,
  //   <gxg-tree-item>blanda</gxg-tree-item>,
  // ];
};

const renderTreeItem = (item) => {
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
      slot="model"
    >
      hola
      {/* {[item.name, item.items && renderTree(item.items, false)]} */}
    </gxg-tree-item>
  );
};
