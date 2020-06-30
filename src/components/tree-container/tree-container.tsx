import { Component, h } from "@stencil/core";

@Component({
  tag: "gxg-tree-container",
  styleUrl: "tree-container.scss",
  shadow: true
})
export class TreeContainer {
  render() {
    return (
      <ul>
        <slot></slot>
      </ul>
    );
  }
}
