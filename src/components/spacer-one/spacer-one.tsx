import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-spacer-one",
  styleUrl: "spacer-one.scss",
  shadow: true
})
export class GxgSpacerOne {
  /**
   * The spacing value, taken from the "token-spacing" global values
   */
  @Prop() space: string;

  render() {
    return (
      <Host
        class={{
          xs: this.space === "xs",
          s: this.space === "s",
          m: this.space === "m",
          l: this.space === "l",
          xl: this.space === "xl"
        }}
      ></Host>
    );
  }
}

export type space = "xs" | "s" | "m" | "l" | "xl";
