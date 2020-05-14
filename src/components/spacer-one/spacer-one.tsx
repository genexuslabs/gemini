import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-spacer-one",
  styleUrl: "spacer-one.scss",
  shadow: true
})
export class SpacerOne {
  /**
   * The spacing value, taken from the "token-spacing" global values
   */
  @Prop() space: string;

  render() {
    return (
      <Host
        class={{
          xxsmall: this.space === "xxsmall",
          xsmall: this.space === "xsmall",
          small: this.space === "small",
          medium: this.space === "medium",
          large: this.space === "large",
          xlarge: this.space === "xlarge",
          xxlarge: this.space === "xxlarge"
        }}
      ></Host>
    );
  }
}

export type space =
  | "xxsmall"
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge";
