import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "gxg-tooltip",
  styleUrl: "tooltip.scss",
  shadow: true
})
export class Tooltip {
  /**
   the tooltip position
   */
  @Prop({ reflect: true }) position: position = "top";

  /**
   * The toggle label
   */
  @Prop() label = "Label";

  render() {
    return (
      <span class="tooltip">
        {this.label}
        <span class="tooltiptext">
          <slot></slot>
        </span>
      </span>
    );
  }
}

export type position = "top" | "right" | "bottom" | "left";
