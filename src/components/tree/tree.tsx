import { Component, h } from "@stencil/core";

@Component({
  tag: "gxg-tree",
  styleUrl: "tree.scss",
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
