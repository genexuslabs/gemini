import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-card",
  styleUrl: "card.scss",
  shadow: true
})
export class Card {
  /**
   * The card box-shadow value
   * possible values: from 1 to 8
   */
  @Prop() shadow: ShadowType = 1;

  @Prop() width = "100%";

  render() {
    return (
      <Host
        class={{
          card: true
        }}
        style={{ width: this.width }}
      >
        <slot></slot>
      </Host>
    );
  }
}

export type ShadowType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
