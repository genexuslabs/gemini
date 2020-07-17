import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-drag-box",
  styleUrl: "drag-box.scss",
  shadow: true
})
export class DragBox {
  render() {
    return (
      <Host>
        <div class="icon-container">
          <gxg-icon size="regular" type="drag"></gxg-icon>
        </div>
        <div class="content-container">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
