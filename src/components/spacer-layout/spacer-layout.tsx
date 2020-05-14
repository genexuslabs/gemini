import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-spacer-layout",
  styleUrl: "spacer-layout.scss",
  shadow: true
})
export class SpacerLayout {
  /**
   * The spacing value, taken from the "token-spacing" global values
   */
  @Prop() space: string;

  /**
   * The orientation
   */
  @Prop() orientation = "horizontal";

  /**
   * Content justify
   */
  @Prop() justifyContent = "flex-start";

  render() {
    return (
      <Host
        class={{
          "flex-start": this.justifyContent === "flex-start",
          "flex-end": this.justifyContent === "flex-end",
          center: this.justifyContent === "center",
          "space-between": this.justifyContent === "space-between",
          "space-around": this.justifyContent === "space-around",
          horizontal: this.orientation === "horizontal",
          vertical: this.orientation === "vertical",
          xxsmall: this.space === "xxsmall",
          xsmall: this.space === "xsmall",
          small: this.space === "small",
          medium: this.space === "medium",
          large: this.space === "large",
          xlarge: this.space === "xlarge",
          xxlarge: this.space === "xxlarge"
        }}
      >
        <slot></slot>
      </Host>
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
export type orientation = "horizontal" | "vertical";
export type justifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around";
