import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "gxg-suggest",
  styleUrl: "gxg-suggest.scss",
  shadow: false,
})
export class GxgSuggest {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
