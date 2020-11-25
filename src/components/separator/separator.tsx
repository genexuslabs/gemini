import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "gxg-separator",
  styleUrl: "separator.scss",
  shadow: true
})
export class GxgSeparator {
  /**
   * The hr style
   */
  @Prop({ reflect: true }) type = "solid";

  /**
   * The hr top and bottom margin
   */
  @Prop({ reflect: true }) margin: margin = "xs";

  render() {
    return <hr></hr>;
  }
}

export type type = "solid" | "dashed";
export type margin = "xs" | "s" | "m" | "l" | "xl";
