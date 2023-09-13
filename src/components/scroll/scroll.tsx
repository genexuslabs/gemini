import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-scroll",
  styleUrl: "scroll.scss",
  shadow: true,
})
export class GxgScroll {
  render() {
    return (
      <Host class="gxg-scrollbar">
        <slot></slot>
      </Host>
    );
  }
}
