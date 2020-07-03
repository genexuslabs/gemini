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
  @Prop() maxWidth = "100%";

  /*********************************
  METHODS
  *********************************/

  render() {
    return (
      <Host
        class={{
          card: true
        }}
        style={{ maxWidth: this.maxWidth, height: this.height }}
      >
        <slot></slot>
      </Host>
    );
  }
}

export type boxShadow = "xxs" | "xs" | "s" | "m" | "l";

export type padding = "xs" | "s" | "m" | "l";
