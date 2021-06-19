import { Component, Element, State, h, Prop, Listen } from "@stencil/core";
import { GxgTreeItem } from "../tree-item/tree-item";

@Component({
  tag: "gxg-tree",
  styleUrl: "tree.scss",
  shadow: true,
})
export class GxgTree {
  @Element() el: HTMLElement;
  ulTree!: HTMLElement;

  //PROPS
  /**
   * Set this attribute if you want all this tree tree-items to have a checkbox
   */
  @Prop() checkbox = false;

  /**
   * Set this attribute if you want all this tree tree-items to have the checkbox checked
   */
  @Prop() checked = false;

  /**
   * Set this attribute if you want all the childen item's checkboxes to be checked when the parent item checkbox is checked, or to be unchecked when the parent item checkbox is unckecked.
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

    if (this.toggleCheckboxes) {
      //This property should be set one time on the mainTree by the developer using the component. If present, apply to all the child trees.
      const childrenTrees = this.el.querySelectorAll("gxg-tree");
      childrenTrees.forEach(function (tree) {
        ((tree as unknown) as GxgTree).toggleCheckboxes = true;
      });
    }
    //If this tree has been added with appendChild, set toggleCheckboxes to true if the parent tree toggleCheckboxes property is set to true
    const closestTree = this.el.parentElement.parentElement;
    if (closestTree !== null && closestTree.tagName === "GXG-TREE") {
      if (((closestTree as unknown) as GxgTree).toggleCheckboxes) {
        this.toggleCheckboxes = true;
      }
    }
  }

  componentDidLoad() {
    if (this.checkbox) {
      //Add a checkbox to all this tree direct tree-items children
      const directTreeItemChildren = this.el.querySelectorAll("gxg-tree-item");
      directTreeItemChildren.forEach((treeItem) => {
        treeItem.setAttribute("checkbox", "checkbox");
        //If checked attribute is present, also set the checkboxes to be checked
        if (this.checked) {
          treeItem.setAttribute("checked", "checked");
        }
      });
      //Finally, also check the parent tree-item that is above this tree
      const treeItemAboveTree = this.el.parentElement;
      treeItemAboveTree.setAttribute("checkbox", "checkbox");
      if (this.checked) {
        treeItemAboveTree.setAttribute("checked", "checked");
      }
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
    //Update tree items that are not leaf vertical line height
    const treeItemsNotLeaf = this.el.querySelectorAll("gxg-tree-item");
    treeItemsNotLeaf.forEach((treeItemNotLeaf) => {
      treeItemNotLeaf.updateTreeVerticalLineHeight();
    });
  }

  @Listen("checkboxClickedEvent")
  checkboxClickedEventHandler() {
    if (this.toggleCheckboxes) {
      const childTreeItems = this.el.querySelectorAll("gxg-tree-item");
      let allCheckboxesChecked = true;
      let allCheckboxesUnchecked = true;
      childTreeItems.forEach(function (treeItem) {
        if (treeItem.checked) {
          allCheckboxesUnchecked = false;
        } else {
          allCheckboxesChecked = false;
        }
      });
      const parentTreeItem = (this.el.parentElement as unknown) as GxgTreeItem;
      const tagName = ((parentTreeItem as unknown) as HTMLElement).tagName;
      if (tagName === "GXG-TREE-ITEM") {
        if (allCheckboxesChecked) {
          parentTreeItem.checked = true;
          parentTreeItem.indeterminate = false;
        } else if (allCheckboxesUnchecked) {
          parentTreeItem.checked = false;
          parentTreeItem.indeterminate = false;
        } else if (!allCheckboxesChecked && !allCheckboxesUnchecked) {
          parentTreeItem.checked = true;
          parentTreeItem.indeterminate = true;
        }
      }
    }
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
