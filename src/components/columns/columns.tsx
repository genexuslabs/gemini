import { Component, Element, Prop, h, Host } from "@stencil/core";
// import { padding } from "../column/column";
@Component({
  tag: "gxg-columns",
  styleUrl: "columns.scss",
  shadow: true
})
export class Columns {
  @Element() el: HTMLElement;

  /**
   * The vertical alignment
   */
  @Prop({ reflect: true }) alignY: AlignY = "top";

  /**
   * The collapse breakpoint
   */
  @Prop({ reflect: true }) collapseBellow: CollapseBellow;

  // /*The padding to be applied to the child column components*/
  // @Prop({ reflect: true }) padding: padding = "xs";

  /**
   * The spacing between columns
   */
  @Prop({ reflect: true }) space: Space = "0";

  componentDidLoad() {
    // const columns = this.el.querySelectorAll("gxg-column");
    // columns.forEach(column => {
    //   column.setAttribute("padding", this.padding);
    // });
  }

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

export type Space = "0" | "xs" | "s" | "m" | "l" | "xl";
export type AlignY = "top" | "center" | "bottom";
export type CollapseBellow = "lg";
