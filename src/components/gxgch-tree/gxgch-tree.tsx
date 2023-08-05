import {
  Component,
  Element,
  State,
  h,
  Prop,
  Listen,
  Method,
} from "@stencil/core";
import { GxgChTreeItem } from "../gxgch-tree-item/gxgch-tree-item";

@Component({
  tag: "gxgch-tree",
  styleUrl: "gxgch-tree.scss",
  shadow: true,
})
export class GxgChTree {
  @Element() el: HTMLGxgchTreeElement;
  ulTree!: HTMLElement;

  //PROPS
  /**
   * Set this attribute if you want all this tree tree-items to have a checkbox
   */
  @Prop() readonly checkbox: boolean = false;

  /**
   * Set this attribute if you want all this tree tree-items to have the checkbox checked
   */
  @Prop() readonly checked: boolean = false;

  /**
   * Set this attribute if you want all the childen item's checkboxes to be checked when the parent item checkbox is checked, or to be unchecked when the parent item checkbox is unckecked.
   */
  @Prop({ mutable: true }) toggleCheckboxes = false;

  //STATE
  @State() nestedTree = false;
  @State() mainTree = false;

  componentWillLoad() {
    //Check if this tree is nested
    const parentElementTagName = this.el.parentElement.tagName;
    if (parentElementTagName === "GXGCH-TREE-ITEM") {
      this.nestedTree = true;
    }
    //if this is the main tree...
    const parentTreeTagName = this.el.parentElement.tagName;
    if (parentTreeTagName !== "GXGCH-TREE-ITEM") {
      this.mainTree = true;
    }
  }

  @Listen("liItemClicked")
  liItemClickedHandler() {
    //Remove 'selected' state from previous selected item
    const chTreeItems = this.el.querySelectorAll("gxgch-tree-item");
    chTreeItems.forEach((chTreeItem) => {
      ((chTreeItem as unknown) as GxgChTreeItem).selected = false;
    });
  }

  @Listen("toggleIconClicked")
  toggleIconClickedHandler() {
    //Update not leaf tree items vertical line height
    const treeItems = this.el.querySelectorAll("gxgch-tree-item.not-leaf");
    treeItems.forEach((treeItem) => {
      ((treeItem as unknown) as GxgChTreeItem).updateTreeVerticalLineHeight();
    });
  }

  /**
   * @returns an array of the gxgch-tree-items that are checked. Each array item is an object with "id" and "innerText".
   */
  @Method()
  async getChecked(): Promise<checkedChTreeItem[]> {
    const allTreeItems = this.el.querySelectorAll("gxgch-tree-item");
    const checkedTreeItems: checkedChTreeItem[] = [];
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

export type checkedChTreeItem = {
  id: string;
};
