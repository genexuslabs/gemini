import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "gxg-separator",
  styleUrl: "separator.scss",
  shadow: true
})
export class Separator {
  /**
   * The hr style
   */
  @Prop({ reflect: true }) type = "solid";

  render() {
    return <hr></hr>;
  }
}

export type type = "solid" | "dashed";
