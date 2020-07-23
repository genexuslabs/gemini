import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "gxg-drag-box",
  styleUrl: "drag-box.scss",
  shadow: true
})
export class DragBox {
  /**
   * The padding (internal spacing)
   */
  @Prop({ reflect: true }) padding: Padding;

  /**
   * The presence of this attibute gives the box a blue border on the top side
   */
  @Prop({ reflect: true }) border = false;

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

export type Padding = "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";
