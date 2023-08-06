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

  //PROPS
  /**
   * Set this attribute if you want all the items to be opened by default.
   */
  @Prop() opened = true;

  /**
   * Set this attribute if you want all the items to have a checkbox.
   */
  @Prop({ mutable: true }) checkbox = true;

  /**
   * Set this attribute if you want all the items to be checked by default.
   */
  @Prop({ mutable: true }) checked = false;

  /**
   * Set this attribute if you want all the items checkboxes to be toggled when the parent tree item checkbox is toggled.
   */
  @Prop() toggleCheckboxes = false;

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
    const treeItems = this.el.querySelectorAll("gxg-tree-item");
    const notLeafTreeItems = Array.from(treeItems).filter((item) => {
      return !item.isLeaf;
    });
    notLeafTreeItems.forEach((treeItem) => {
      treeItem.updateTreeVerticalLineHeight();
    });
  }

  /**
   * @returns an array of the gxg-tree-items that are checked. Each array item is an object with "id" and "innerText". Optional array of ids can be passed to get the status of a particular set of items.
   */
  @Method()
  async getChecked(
    idsArray?: (string | number)[]
  ): Promise<CheckedGxgTreeItem[]> {
    const allTreeItems = Array.from(this.el.querySelectorAll("gxg-tree-item"));
    const checkedTreeItems: CheckedGxgTreeItem[] = [];
    if (idsArray?.length) {
      idsArray.forEach((id) => {
        const found = allTreeItems.find((item) => id === item.id);
        found &&
          checkedTreeItems.push({
            id: found.id,
            checked: found.checked,
          });
      });
    } else {
      allTreeItems.forEach((item) => {
        item.checked && checkedTreeItems.push({ id: item.id });
      });
    }
    return checkedTreeItems;
  }

  /**
   * @param ids: An array id the tree items to be toggled.
   * @param open: A boolean indicating that the tree item should be opened or closed. (optional)
   * @description This method is used to toggle a tree-item by the tree-item id/ids.
   * @returns a boolean value indicating if the selected tree-item is open or not, after the method was called.
   */
  @Method()
  async toggleItems(
    ids: string[],
    open?: boolean
  ): Promise<ToggledGxgTreeItem[]> {
    if (!ids?.length) {
      return [];
    }
    const allTreeItems = Array.from(this.el.querySelectorAll("gxg-tree-item"));
    const toggledTreeItems: ToggledGxgTreeItem[] = [];
    ids.forEach((id) => {
      const found = allTreeItems.find((item) => id === item.id);
      if (found && open === undefined) {
        found.opened = !found.opened;
      } else if (found && open && !found.opened) {
        found.opened = true;
      } else if (found && !open && found.opened) {
        found.opened = false;
      }
      if (found) {
        toggledTreeItems.push({
          id: found.id,
          opened: found.opened,
        });
      }
    });
    return toggledTreeItems;
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
  checked?: boolean;
};
export type ToggledGxgTreeItem = {
  id: string;
  opened: boolean;
};
