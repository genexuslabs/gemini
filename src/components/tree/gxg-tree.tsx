import {
  Component,
  Element,
  h,
  Prop,
  Listen,
  Method,
  Host,
  Event,
  EventEmitter,
} from "@stencil/core";
import {
  GxgTreeItemData,
  GxgTreeItemSelectedData,
} from "../tree-item/gxg-tree-item";
@Component({
  tag: "gxg-tree",
  styleUrl: "gxg-tree.scss",
  shadow: true,
})
export class GxgTree {
  /*
INDEX:
1.OWN PROPERTIES 
2.REFERENCE TO ELEMENTS
3.STATE() VARIABLES
4.PUBLIC PROPERTY API | WATCH'S
5.EVENTS (EMIT)
6.COMPONENT LIFECYCLE METHODS
7.LISTENERS
8.PUBLIC METHODS API
9.LOCAL METHODS
10.RENDER() FUNCTION
*/

  // 1.OWN PROPERTIES //

  private masterTree = false;

  // 2. REFERENCE TO ELEMENTS //

  @Element() el: HTMLGxgTreeElement;
  ulTree!: HTMLElement;

  // 3.STATE() VARIABLES //

  // 4.PUBLIC PROPERTY API | WATCH'S //

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

  /**
   * Set this attribute if you want to allow multi selection of the items. This property should only be set on the master tree.
   */
  @Prop() multiSelection = false;

  // 5.EVENTS (EMIT) //

  @Event() treeItemStateChanged: EventEmitter<GxgTreeItemData>;

  // 6.COMPONENT LIFECYCLE METHODS //

  componentWillLoad(): void {
    this.initialConfig();
    this.evaluateIsMasterTree();
  }

  // 7.LISTENERS //

  @Listen("selectionChanged")
  selectionChangedHandler(e: CustomEvent<GxgTreeItemSelectedData>): void {
    //Unselect all items, except the one that triggered this event. This action should be done once, by the master tree.
    if (
      (this.masterTree && !this.multiSelection) ||
      (this.masterTree && this.multiSelection && !e.detail.ctrlKey)
    ) {
      const allChildren = this.el.querySelectorAll("gxg-tree-item");
      if (allChildren?.length) {
        Array.from(allChildren).forEach((item) => {
          item.selected = false;
        });
      }
    }
  }

  @Listen("checkboxToggled")
  checkboxToggledHandler(e) {
    if (this.masterTree) {
    }
    //this.evaluateCheckboxStatus();
  }

  // 8.PUBLIC METHODS API //

  /**
   * Returns an array of the selected tree-items, providing the id, checked status, selected status, and label.
   */
  @Method()
  async getCheckedItems(
    idsArray?: (string | number)[]
  ): Promise<GxgTreeItemSelectedData[]> {
    const allTreeItems = Array.from(this.el.querySelectorAll("gxg-tree-item"));
    const checkedTreeItems: GxgTreeItemSelectedData[] = [];
    if (idsArray?.length) {
      idsArray.forEach((id) => {
        const found = allTreeItems.find((item) => id === item.id);
        found &&
          checkedTreeItems.push({
            id: found.id,
            label: found.label,
            checked: found.checked,
            selected: found.selected,
          });
      });
    } else {
      allTreeItems.forEach((item) => {
        item.checked &&
          checkedTreeItems.push({
            id: item.id,
            label: item.label,
            checked: item.checked,
            selected: item.selected,
          });
      });
    }
    return checkedTreeItems;
  }

  /**
   * Returns an array of the selected tree-items, providing the id, checked status, selected status, and label.
   */
  @Method()
  async getSelectedItems(): Promise<GxgTreeItemData[]> {
    const selectedItems: GxgTreeItemData[] = [];
    const allItems = this.el.querySelectorAll("gxg-tree-item");
    if (allItems?.length) {
      Array.from(allItems).forEach((item) => {
        if (item.selected) {
          selectedItems.push({
            id: item.id,
            label: item.label,
            checked: item.checked,
            selected: item.selected,
          });
        }
      });
    }
    return selectedItems;
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

  // 9.LOCAL METHODS //

  /**
   * This method evaluates if this tree is the master tree
   */
  private evaluateIsMasterTree = () => {
    const grandFather = this.el.parentElement?.parentElement;
    if (grandFather === undefined || grandFather.nodeName !== "GXG-TREE") {
      this.masterTree = true;
    }
  };

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

  private emitTreeItemNewState = () => {
    // this.treeItemStateChanged.emit({ console.log("hola")});
  };

  // 10.RENDER() FUNCTION //

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

export type ToggledGxgTreeItem = {
  id: string;
  opened: boolean;
};
export type TreeItemsInsertionMode = "before" | "after" | "inside";
