import { Component, Prop, h, Host, Element } from "@stencil/core";

@Component({
  tag: "gxg-tooltip",
  styleUrl: "tooltip.scss",
  shadow: true,
})
export class GxgTooltip {
  @Element() el: HTMLGxgTooltipElement;
  tooltipTextEl!: HTMLDivElement;

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
   * Fixed positioned
   */
  @Prop({ reflect: true }) fixed = false;

  /**
   * Displays the tool-tip as flex
   */
  @Prop({ reflect: true }) flex = false;

  /**
   * This presence of this property removes the border under the text
   */
  @Prop({ reflect: true }) noBorder = false;

  componentWillLoad() {
    if (this.fixed) {
      this.el.addEventListener("mouseenter", this.mouseEnterHandler);
    }
  }

  private mouseEnterHandler = () => {
    const tooltipBC = this.el.getBoundingClientRect();
    const width = tooltipBC.width;
    const top = tooltipBC.top;
    const rightPosition =
      document.body.scrollWidth - tooltipBC.right + width - 3;
    this.tooltipTextEl.style.top = `${top}px`;
    this.tooltipTextEl.style.right = `${rightPosition}px`;
  };

  render() {
    return (
      <Host role="tooltip">
        <span class="tooltip">
          <slot></slot>

          <div
            class="tooltiptext"
            ref={(el) => (this.tooltipTextEl = el as HTMLDivElement)}
          >
            <span class="tooltiptext__content">{this.label}</span>
          </div>
        </span>
      </Host>
    );
  }
}

export type position = "top" | "right" | "bottom" | "left";
