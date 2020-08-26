import { Component, Prop, h, Host } from "@stencil/core";

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
   * The label
   */
  @Prop() label: string;

  /**
   * This presence of this property removes the border under the text
   */
  @Prop({ reflect: true }) noBorder = false;

  render() {
    return (
      <Host role="tooltip">
        <span class="tooltip">
          <slot></slot>
          <div class="tooltiptext">
            <span class="tooltiptext__content">{this.label}</span>
          </div>
        </span>
      </Host>
    );
  }
}

export type position = "top" | "right" | "bottom" | "left";
