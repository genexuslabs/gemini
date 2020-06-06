import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "gxg-stack",
  styleUrl: "stack.scss",
  shadow: true
})
export class Stack {
  /**
   * The state of the toggle. Whether is disabled or not.
   * Possible values: false, true
   */
  @Prop({ reflect: true }) space: Space = "xs";

  /**
   * The toggle label
   */
  @Prop() label = "Label";

  render() {
    return <slot></slot>;
  }
}

export type Space = "xs" | "s" | "m" | "l" | "xl";
