import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-box",
  styleUrl: "box.scss",
  shadow: true
})
export class Box {
  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * This property makes the component full-width
   */
  @Prop() fullWidth = false;

  /**
   * The component height
   */
  @Prop() height = "auto";

  /*The card padding (internal spacing)*/
  @Prop() padding: paddingType = "xs";

  /**
   * The component width
   */
  @Prop() width = "200px";

  /*********************************
  METHODS
  *********************************/
  widthFunc() {
    if (this.fullWidth) {
      return "100%";
    } else {
      return this.width;
    }
  }

  render() {
    return (
      <Host
        class={{
          card: true
        }}
        style={{ width: this.widthFunc(), height: this.height }}
      >
        <slot></slot>
      </Host>
    );
  }
}

export type paddingType = "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";
