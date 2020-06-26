import { Component, h } from "@stencil/core";

@Component({
  tag: "gxg-tree-item",
  styleUrl: "tree-item.scss",
  shadow: true
})
export class TreeItem {
  render() {
    return (
      <li>
        <slot></slot>
      </li>
    );
  }
}
