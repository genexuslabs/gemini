import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-card",
  styleUrl: "card.scss",
  shadow: true
})
export class Card {
  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * This property makes the component full-width
   */
  @Prop({ reflect: true }) fullWidth = false;

  @Prop({ reflect: true }) boxShadow: boxShadow = "xxs";

  /**
   * The component height
   */
  @Prop() height = "auto";

  /*The card padding (internal spacing)*/
  @Prop({ reflect: true }) padding: padding = "xs";

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

export type boxShadow = "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";

export type padding = "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";
