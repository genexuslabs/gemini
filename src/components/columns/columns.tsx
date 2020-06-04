import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-columns",
  styleUrl: "columns.scss",
  shadow: true
})
export class Columns {
  /**
   * The vertical alignment
   */
  @Prop({ reflect: true }) alignY: AlignY = "top";

  /**
   * The collapse breakpoint
   */
  @Prop({ reflect: true }) collapseBellow: CollapseBellow;

  /**
   * The spacing between columns
   */
  @Prop() space: Space = "none";

  render() {
    return (
      <Host class="columns">
        <div class="columns-container">
          <slot></slot>
        </div>
      </Host>
    );
  }
}

export type Space = "xs" | "s" | "m" | "none";
export type AlignY = "top" | "center" | "bottom";
export type CollapseBellow = "lg";
