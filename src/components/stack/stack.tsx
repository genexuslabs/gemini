import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "gxg-stack",
  styleUrl: "stack.scss",
  shadow: true
})
export class GxgStack {
  /**
   * The spacing value
   */
  @Prop({ reflect: true }) space: Space = "xs";

  render() {
    return <slot></slot>;
  }
}

export type Space = "xs" | "s" | "m" | "l" | "xl";
