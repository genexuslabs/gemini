import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-spacer-layout",
  styleUrl: "spacer-layout.scss",
  shadow: true,
})
export class GxgSpacerLayout {
  /**
   * Add this attribute to make the spacer-layout full height
   */
  @Prop() fullHeight = false;

  /**
   * The spacing value, taken from the "token-spacing" global values
   */
  @Prop() space: Space = "xs";

  /**
   * The orientation
   */
  @Prop() orientation: Orientation = "horizontal";

  /**
   * Content justify
   */
  @Prop() justifyContent: JustifyContent = "start";

  render() {
    return (
      <Host
        class={{
          "flex-start": this.justifyContent === "start",
          "flex-end": this.justifyContent === "end",
          center: this.justifyContent === "center",
          "space-between": this.justifyContent === "space-between",
          "space-around": this.justifyContent === "space-around",
          horizontal: this.orientation === "horizontal",
          vertical: this.orientation === "vertical",
          xs: this.space === "xs",
          s: this.space === "s",
          m: this.space === "m",
          l: this.space === "l",
          xl: this.space === "xl",
        }}
      >
        <slot></slot>
      </Host>
    );
  }
}

export type Space = "xs" | "s" | "m" | "l" | "xl";
export type Orientation = "horizontal" | "vertical";
export type JustifyContent =
  | "start"
  | "end"
  | "center"
  | "space-between"
  | "space-around";
