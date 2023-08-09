import { Component, h, Host, Prop, Listen, Element } from "@stencil/core";
import { GxgTreeItemData } from "../tree-item/gxg-tree-item";
import { renderTreeItems } from "../tree/renderTreeItems";
@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true,
})
export class GxgTest {
  @Element() el: HTMLElement;
  tree!: HTMLGxgTreeElement;
  private previousTree;

  //Do not delete buttonTestExportParts property as this is for a specific purpose
  @Prop() buttonTestExportParts = false;
  //Do not delete treeModel property as this is for a specific purpose
  @Prop() treeItemsModel: GxgTreeItemData[];

  /*Gxg-Tree Methods*/
  private closeTreeNodeHandler = () => {
    this.tree.toggleItems(["number-1-1-2"], false);
  };
  private openTreeNodeHandler = () => {
    this.tree.toggleItems(["number-1-1-2"], true);
  };
  private toggleTreeNodeHandler = () => {
    this.tree.toggleItems(["number-1-1-2"]);
  };
  private getCheckedItemsHandler = () => {
    (async () => {
      const checked = await this.tree.getChecked();
      console.log(checked);
    })();
  };
  private insertNewItemHandler = () => {
    this.tree.insertTreeItems("number-1-2", [
      {
        id: "number-1-2-1",
        name: "number-1-2-1",
        icon: "general/java",
      },
      {
        id: "number-1-2-2",
        name: "number-1-2-1",
        icon: "general/launchpad",
      },
    ]);
  };
  private deleteNodeHandler = () => {
    this.tree.deleteNode("number-1-2");
  };

  render() {
    if (this.buttonTestExportParts) {
      return <gxg-button part="exterior-part">Export parts tests</gxg-button>;
    } else if (this.treeItemsModel) {
      return [
        <gxg-tree
          data-test="hola"
          ref={(el) => (this.tree = el as HTMLGxgTreeElement)}
        >
          {renderTreeItems(this.treeItemsModel, true, "master")}
        </gxg-tree>,
        <div class="tree-buttons">
          <gxg-button type="outlined" onClick={this.closeTreeNodeHandler}>
            Close 1-1-2
          </gxg-button>
          <gxg-button type="outlined" onClick={this.openTreeNodeHandler}>
            Open 1-1-2
          </gxg-button>
          <gxg-button type="outlined" onClick={this.toggleTreeNodeHandler}>
            Toggle 1-1-2
          </gxg-button>
          <gxg-button type="outlined" onClick={this.getCheckedItemsHandler}>
            Get checked
          </gxg-button>
          <gxg-button type="outlined" onClick={this.insertNewItemHandler}>
            Insert new node (item) under number-1-2
          </gxg-button>
          <gxg-button disabled type="outlined" onClick={this.deleteNodeHandler}>
            Delete node
          </gxg-button>
        </div>,
      ];
    } else {
      return <slot></slot>;
    }
  }
}
