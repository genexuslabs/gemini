import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-box",
  styleUrl: "box.scss",
  shadow: true
})
export class GxgBox {
  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * The background color
   */
  @Prop({ reflect: true }) background: background = "surface";

  /**
   * The border type
   */
  @Prop({ reflect: true }) border: border = "no-border";

  /*The box padding (internal spacing)*/
  @Prop({ reflect: true }) padding: padding = "xs";

  /**
   * The component min. height
   */
  @Prop() minHeight = "auto";

  /**
   * The component max. width
   */
  @Prop() maxWidth = "100%";

  /*********************************
  METHODS
  *********************************/

  render() {
    return (
      <Host
        role="article"
        class={{
          card: true
        }}
        style={{ maxWidth: this.maxWidth, minHeight: this.minHeight }}
      >
        <slot></slot>
      </Host>
    );
  }
}

export type padding = "0" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";

export type background = "surface" | "gray-01" | "gray-02";

export type border = "no-border" | "gray-03";
