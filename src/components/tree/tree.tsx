import { Component, Element, h } from "@stencil/core";

@Component({
  tag: "gxg-tree",
  styleUrl: "tree.scss",
  shadow: true
})
export class TreeContainer {
  @Element() el: HTMLElement;

  componentDidLoad() {
    const treeItems = this.el.querySelectorAll(":scope > gxg-tree-item");
    treeItems.forEach(treeItem => {
      console.log(treeItem.clientWidth);
    });
  }

  render() {
    return (
      <ul>
        <slot></slot>
      </ul>
    );
  }
}
