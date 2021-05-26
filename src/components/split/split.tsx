import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "gxg-split",
  styleUrl: "split.scss",
  shadow: true,
})
export class GxgSplit {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
