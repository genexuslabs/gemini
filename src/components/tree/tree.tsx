import {
  Component,
  Host,
  Element,
  State,
  h,
  Prop,
  Listen,
} from "@stencil/core";
@Component({
  tag: "gxg-tree",
  styleUrl: "tree.scss",
  shadow: true,
})
export class GxgTree {
  @Element() el: HTMLElement;

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
  }

  @Listen("liItemClicked")
  liItemClickedHandler() {
    //Remove focus from tree-items
    const treeItems = this.el.querySelectorAll("gxg-tree-item");
    treeItems.forEach((treeItem) => {
      treeItem.setAttribute("focused", "false");
    });
  }

  render() {
    return this.mainTree ? (
      <Host
        class={{
          "nested-tree": this.nestedTree,
          "main-tree": this.mainTree,
        }}
      >
        <div class="main-tree-container">
          <ul>
            <slot></slot>
          </ul>
        </div>
      </Host>
    ) : (
      <Host
        class={{
          "nested-tree": this.nestedTree,
          "main-tree": this.mainTree,
        }}
      >
        <ul>
          <slot></slot>
        </ul>
      </Host>
    );
  }
}
