import { Component, Prop, h, Host, Element, State } from "@stencil/core";

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

  /**
   * Used to show/hide the tooltip (only used if 'fixed' is true) otherwise, it will show on hover.
   */
  @State() visible = false;

  componentWillLoad() {
    if (this.fixed) {
      this.el.addEventListener("mouseenter", this.mouseEnterHandler);
      this.el.addEventListener("mouseleave", this.mouseLeaveHandler);
      document.addEventListener("scroll", this.documentScrollHandler);
    }
  }

  private mouseEnterHandler = () => {
    const tooltipBC = this.el.getBoundingClientRect();
    const top = tooltipBC.top;
    const leftPosition = tooltipBC.left;
    const width = tooltipBC.width;
    console.log("width", width);
    console.log("leftPosition", leftPosition);
    this.tooltipTextEl.style.top = `${top}px`;
    this.tooltipTextEl.style.left = `${leftPosition + width}px`;
    this.visible = true;
  };

  private mouseLeaveHandler = () => {
    this.visible = false;
  };

  private documentScrollHandler = () => {
    this.visible = false;
  };

  render() {
    return (
      <Host role="tooltip">
        <span class={{ tooltip: true, "tooltip--visible": this.visible }}>
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
