import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-tree",
  styleUrl: "tree-container.scss",
  shadow: true
})
export class Tree {
  render() {
    return (
      <Host>
        <ul>
          <slot></slot>
        </ul>
      </Host>
    );
  }
}
