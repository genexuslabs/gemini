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
  private getSelectedItemsHandler = () => {
    (async () => {
      const selected = await this.tree.getSelectedItems();
      console.log(selected);
    })();
  };
  private getCheckedItemsHandler = () => {
    (async () => {
      const checked = await this.tree.getCheckedItems();
      console.log(checked);
    })();
  };
  private deleteNodeHandler = () => {
    this.treeItemsModel = [];
  };

  render() {
    if (this.buttonTestExportParts) {
      return <gxg-button part="exterior-part">Export parts tests</gxg-button>;
    } else if (this.treeItemsModel) {
      return [
        <gxg-tree
          id="masterTree"
          checked
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
          <gxg-button type="outlined" onClick={this.getSelectedItemsHandler}>
            Get Selected Items
          </gxg-button>
          <gxg-button type="outlined" onClick={this.getCheckedItemsHandler}>
            Get Checked Items
          </gxg-button>
          <gxg-button type="outlined" onClick={this.deleteNodeHandler}>
            Delete Tree
          </gxg-button>
        </div>,
      ];
    } else {
      return <slot></slot>;
    }
  }
}
