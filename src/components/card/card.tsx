import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-card",
  styleUrl: "card.scss",
  shadow: true,
})
export class GxgCard {
  /**
   * The card box-shadow
   */
  @Prop({ reflect: true }) elevation: elevation = "xs";

  /**
   * The background color
   */
  @Prop({ reflect: true }) background: background = "white";

  /**
   * The card padding
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
          card: true,
        }}
        style={{ maxWidth: this.maxWidth, minHeight: this.minHeight }}
      >
        <slot></slot>
      </Host>
    );
  }
}

export type elevation = "xs" | "m";

export type padding = "0" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";

export type background = "white" | "gray-01";
