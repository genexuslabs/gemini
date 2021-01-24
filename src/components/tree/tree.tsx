import { Component, Host, Element, State, h } from "@stencil/core";
@Component({
  tag: "gxg-tree",
  styleUrl: "tree.scss",
  shadow: true
})
export class GxgTree {
  @Element() el: HTMLElement;
  @State() nestedTree = false;

  componentWillLoad() {
    //Check if this tree is nested
    const parentElementTagName = this.el.parentElement.tagName;
    if (parentElementTagName === "GXG-TREE-ITEM") {
      this.nestedTree = true;
    }
  }

  render() {
    return (
      <Host
        class={{
          "nested-tree": this.nestedTree
        }}
      >
        <ul>
          <slot></slot>
        </ul>
      </Host>
    );
  }
}
