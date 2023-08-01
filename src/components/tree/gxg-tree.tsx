import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "gxg-tree",
  styleUrl: "gxg-tree.scss",
  shadow: true,
})
export class GxgTree {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
