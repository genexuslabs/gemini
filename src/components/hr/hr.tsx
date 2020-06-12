import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "gxg-hr",
  styleUrl: "hr.scss",
  shadow: true
})
export class Hr {
  /**
   * The hr style
   */
  @Prop({ reflect: true }) type = "solid";

  render() {
    return <hr></hr>;
  }
}

export type type = "solid" | "dashed";
