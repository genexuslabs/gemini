import {
  Component,
  Element,
  State,
  h,
  Prop,
  Listen,
  Method,
} from "@stencil/core";
import { GxgTreeItem } from "../gxg-tree-item/gxg-tree-item";

@Component({
  tag: "gxg-tree",
  styleUrl: "gxg-tree.scss",
  shadow: true,
})
export class GxgTree {
  @Element() el: HTMLGxgTreeElement;
  ulTree!: HTMLElement;

  //STATE
  @State() nestedTree = false;
  @State() mainTree = false;

  componentWillLoad() {
    //Check if this tree is nested
    const parentElementTagName = this.el.parentElement.tagName;
    if (parentElementTagName === "GXG-TREE-ITEM") {
      this.nestedTree = true;
    }
    //if this is the main tree...
    const parentTreeTagName = this.el.parentElement.tagName;
    if (parentTreeTagName !== "GXG-TREE-ITEM") {
      this.mainTree = true;
    }
  }

  @Listen("liItemClicked")
  liItemClickedHandler() {
    //Remove 'selected' state from previous selected item
    const gxgTreeItems = this.el.querySelectorAll("gxg-tree-item");
    gxgTreeItems.forEach((gxgTreeItem) => {
      ((gxgTreeItem as unknown) as GxgTreeItem).selected = false;
    });
  }

  @Listen("toggleIconClicked")
  toggleIconClickedHandler() {
    //Update not leaf tree items vertical line height
    const treeItems = this.el.querySelectorAll("gxg-tree-item.not-leaf");
    treeItems.forEach((treeItem) => {
      ((treeItem as unknown) as GxgTreeItem).updateTreeVerticalLineHeight();
    });
  }

  /**
   * @returns an array of the gxg-tree-items that are checked. Each array item is an object with "id" and "innerText".
   */
  @Method()
  async getChecked(): Promise<CheckedGxgTreeItem[]> {
    const allTreeItems = this.el.querySelectorAll("gxg-tree-item");
    const checkedTreeItems: CheckedGxgTreeItem[] = [];
    if (allTreeItems.length) {
      allTreeItems.forEach((treeItem) => {
        if (treeItem.checked) {
          checkedTreeItems.push({ id: treeItem.id });
        }
      });
    }
    return checkedTreeItems;
  }

  render() {
    return this.mainTree ? (
      <div
        class={{
          tree: true,
          "main-tree": true,
        }}
      >
        <div class="main-tree-container">
          <ul ref={(el) => (this.ulTree = el as HTMLElement)}>
            <slot></slot>
          </ul>
        </div>
      </div>
    ) : (
      <div
        class={{
          tree: true,
          "nested-tree": true,
        }}
      >
        <ul ref={(el) => (this.ulTree = el as HTMLElement)}>
          <slot></slot>
        </ul>
      </div>
    );
  }
}

export type CheckedGxgTreeItem = {
  id: string;
};
