import { Component, Element, State, h, Prop, Listen } from "@stencil/core";
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
  //MODAL
  @State() showModal = false;

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
    //Show Modal
    this.showModal = true;
  }

  @Listen("liItemClicked")
  liItemClickedHandler() {
    //Remove focus from tree-items
    const treeItems = this.el.querySelectorAll("gxg-tree-item");
    treeItems.forEach((treeItem) => {
      treeItem.setAttribute("focused", "false");
    });
  }

  closeModal() {
    this.showModal = false;
  }

  render() {
    return this.mainTree ? (
      [
        <gxg-modal
          padding="m"
          modal-title="Interacting with the gxg-tree"
          visible={this.showModal}
        >
          <ol>
            <li>
              Use the <em>Down arrow</em> to navigate down the tree.
            </li>
            <li>
              Use the <em>Up arrow</em> to navigate up the tree.
            </li>
            <li>
              Hold <em>Shift</em> and press <em>Down arrow</em> or{" "}
              <em>Up arrow</em> to go to the next or previous sibling,
              respectively.
            </li>
            <li>
              Use the <em>Left</em> or <em>Right</em> arrows to
              collapse/uncollapse a tree.
            </li>
            <li>
              Press <em>Enter</em> key to check/uncheck a checkbox.
            </li>
          </ol>
          <gxg-button
            slot="footer"
            type="primary-text-only"
            role="button"
            class="button button--primary-text-only hydrated"
            onClick={this.closeModal.bind(this)}
          >
            Got it!
          </gxg-button>
        </gxg-modal>,
        <div
          class={{
            tree: true,
            "main-tree": true,
          }}
        >
          <div class="main-tree-container">
            <ul>
              <slot></slot>
            </ul>
          </div>
        </div>,
      ]
    ) : (
      <div
        class={{
          tree: true,
          "nested-tree": true,
        }}
      >
        <ul>
          <slot></slot>
        </ul>
      </div>
    );
  }
}
