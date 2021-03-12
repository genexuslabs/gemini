import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "gxg-unnamed",
  styleUrl: "gxg-unnamed.scss",
  shadow: true
})
export class GxgUnnamed {
  render() {
    return (
      <Host>
        <header class="header">
          <gxg-button icon="gemini-tools/close" type="tertiary"></gxg-button>
        </header>
        <main class="main">
          <slot></slot>
        </main>
      </Host>
    );
  }
}
