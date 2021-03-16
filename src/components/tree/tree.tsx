import { Component, Element, State, h, Prop, Listen } from "@stencil/core";
//import Sortable from "sortablejs";
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

  //STATE
  @State() nestedTree = false;
  @State() mainTree = false;

  componentWillLoad() {
    //Check if this tree is nested
    const parentElementTagName = this.el.parentElement.tagName;
    if (parentElementTagName === "GXG-TREE-ITEM") {
      this.nestedTree = true;
    }
    //if parent tree...
    const parentTreeTagName = this.el.parentElement.tagName;
    if (parentTreeTagName !== "GXG-TREE-ITEM") {
      this.mainTree = true;
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

    //Initialize sortable js
    // Sortable.create(this.ulTree, {
    //   group: "foo",
    //   animation: 100,
    // });
  }

  @Listen("toggleIconClicked")
  toggleIconClickedHandler() {
    //Update tree items that are not leaf vertical line height
    const treeItemsNotLeaf = this.el.querySelectorAll("gxg-tree-item");
    treeItemsNotLeaf.forEach((treeItemNotLeaf) => {
      treeItemNotLeaf.updateTreeVerticalLineHeight();
    });
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
