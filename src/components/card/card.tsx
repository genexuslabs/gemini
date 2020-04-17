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
  @Prop() shadow = 1;

  @Prop() width: string;
  @Prop() height: string;

  render() {
    return (
      <Host
        class={{
          card: true
        }}
        style={{ width: this.width, height: this.height }}
      >
        <slot></slot>
      </Host>
    );
  }
}
