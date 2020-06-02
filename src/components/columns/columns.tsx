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
  @Prop({ reflect: true }) alignY: AlignYType = "top";

  /**
   * The collapse breakpoint
   */
  @Prop({ reflect: true }) collapseBellow: CollapseBellowType;

  collapseBelow;

  /**
   * The spacing between columns
   */
  @Prop() space: SpaceType = "none";

  render() {
    return (
      <Host class={"columns"}>
        <div class="columns-container">
          <slot></slot>
        </div>
      </Host>
    );
  }
}

export type SpaceType = "xs" | "s" | "m" | "none";
export type AlignYType = "top" | "center" | "bottom";
export type CollapseBellowType = "lg";
