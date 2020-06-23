import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-drag-box",
  styleUrl: "drag-box.scss",
  shadow: true
})
export class DragBox {
  /**
   * The state of the toggle. Whether is disabled or not.
   * Possible values: false, true
   */
  @Prop() maxWidth: string;

  render() {
    return (
      <Host style={{ maxWidth: this.maxWidth }}>
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
