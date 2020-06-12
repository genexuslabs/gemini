import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "gxg-hr",
  styleUrl: "hr.scss",
  shadow: true
})
export class Hr {
  /**
   * The state of the toggle. Whether is disabled or not.
   * Possible values: false, true
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The hr style
   */
  @Prop({ reflect: true }) type = "solid";

  render() {
    return <hr></hr>;
  }
}

export type type = "solid" | "dashed";
