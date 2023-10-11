import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-tooltip",
  styleUrl: "tooltip.scss",
  shadow: true,
})
export class GxgTooltip {
  /**
   the tooltip position
   */
  @Prop({ reflect: true }) position: position = "top";

  /**
   * The label
   */
  @Prop() label: string;

  /**
   * The alignment
   */
  @Prop({ reflect: true }) alignEnd = false;

  /**
   * Displays the tool-tip as flex
   */
  @Prop({ reflect: true }) flex = false;

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
