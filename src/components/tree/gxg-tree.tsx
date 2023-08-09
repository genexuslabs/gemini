import {
  Component,
  Element,
  State,
  h,
  Prop,
  Listen,
  Method,
  Host,
} from "@stencil/core";
import { GxgTreeItemData } from "../tree-item/gxg-tree-item";
import { renderTreeItems } from "../tree/renderTreeItems";
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
   * Set this attribute if you want all the items to have a checkbox.
   */
  @Prop({ mutable: true }) checkbox = true;

  /**
   * Set this attribute if you want all the items to be checked by default.
   */
  @Prop({ mutable: true, reflect: true }) checked = false;

  /**
   * Set this attribute if you want all the items to be opened by default.
   */
  @Prop() opened = true;

  /**
   * Set this attribute if you want all the items checkboxes to be toggled when the parent tree item checkbox is toggled.
   */
  @Prop() toggleCheckboxes = false;

  //STATE
  @State() nestedTree = false;

  componentWillLoad() {
    //Check if this tree is nested
    const parentElementTagName = this.el.parentElement?.tagName;
    if (parentElementTagName === "GXG-TREE-ITEM") {
      this.nestedTree = true;
    }
    //this.initialConfig();
    this.initialConfig();
  }
  private initialConfig = () => {
    const parent = this.el.parentElement;
    if (parent?.tagName === "GXG-TREE-ITEM") {
      const treeItem = parent as HTMLGxgTreeItemElement;
      this.checkbox =
        treeItem.checkbox !== undefined ? treeItem.checkbox : this.checkbox;
      this.checked =
        treeItem.checked !== undefined ? treeItem.checked : this.checked;
      this.opened =
        treeItem.opened !== undefined ? treeItem.opened : this.opened;
      this.toggleCheckboxes =
        treeItem.toggleCheckboxes !== undefined
          ? treeItem.toggleCheckboxes
          : this.toggleCheckboxes;
    }
  };

  @Listen("liItemClicked")
  liItemClickedHandler() {
    //Remove 'selected' state from previous selected item
    const gxgTreeItems = this.el.querySelectorAll("gxg-tree-item");
    gxgTreeItems.forEach((item) => {
      item.selected = false;
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
   *
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
   * @description Inserts a new tree set of items.
   * @returns A boolean, indicating if the tree items could be inserted or not, because the 'nodeId' was found or not.
   */
  @Method()
  async insertTreeItems(
    nodeId: string,
    treeItemsModel: GxgTreeItemData[],
    mode: TreeItemsInsertionMode = "after"
  ): Promise<boolean> {
    if (treeItemsModel?.length && nodeId) {
      const node = this.el.querySelector(`#${nodeId}`);
      if (!node) {
        return false;
      }
      const renderedItems = renderTreeItems(treeItemsModel, false, true);
      if (renderedItems) {
        (node as HTMLGxgTreeItemElement).treeModel = renderedItems as HTMLGxgTreeElement;
        /*Como inserto en el nodo renderedItems ?*/
      }
      return true;
    }
    return false;
  }

  /**
   * @description Deletes a node, along will all the children nodes de node contains.
   * @returns A boolean, indicating if the node could be deleted or not, because the 'nodeId' was found or not.
   */
  @Method()
  async deleteNode(nodeId: string): Promise<boolean> {
    if (nodeId) {
      const node = this.el.querySelector(`#${nodeId}`);
    }
    return true;
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
    return (
      <Host>
        <div
          class={{
            tree: true,
          }}
        >
          <ul ref={(el) => (this.ulTree = el as HTMLElement)}>
            <slot></slot>
          </ul>
        </div>
      </Host>
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
export type TreeItemsInsertionMode = "before" | "after" | "inside";
