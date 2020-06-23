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
  @Prop() message = "Label";

  /**
   * The toggle width
   */
  @Prop({ reflect: true }) widthAuto: boolean;

  /**
   * This presence of this property removes the border under the text
   */
  @Prop({ reflect: true }) noBorder = false;

  render() {
    return (
      <span class="tooltip">
        <slot></slot>
        <span class="tooltiptext">{this.message}</span>
      </span>
    );
  }
}

export type position = "top" | "right" | "bottom" | "left";
