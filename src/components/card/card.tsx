import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-card",
  styleUrl: "card.scss",
  shadow: true
})
export class Card {
  /**
   * The card box-shadow
   */
  @Prop({ reflect: true }) elevation: elevation = "01";

  /**
   * The background color
   */
  @Prop({ reflect: true }) background: background = "surface";

  /**
   * The card padding (internal spacing)
   */
  @Prop({ reflect: true }) padding: padding = "xs";

  /**
   * The component min. height
   */
  @Prop() minHeight = "auto";

  /**
   * The component max. width
   */
  @Prop() maxWidth = "100%";

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

export type elevation = "01" | "03";

export type padding = "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";

export type background = "surface" | "gray-01";
