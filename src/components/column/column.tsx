import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-column",
  styleUrl: "column.scss",
  shadow: true
})
export class Column {
  /*The column´s width*/
  @Prop({ reflect: true }) width: WidthType = "fluid";

  /**
   * Disable default flex display in order to make the gxg-spacer-layout "justify-content" property keep working properly
   */
  @Prop({ reflect: true }) noFlex = false;

  render() {
    return (
      <Host class="column">
        <slot></slot>
      </Host>
    );
  }
}

export type WidthType =
  | "1"
  | "1/2"
  | "1/3"
  | "1/4"
  | "1/5"
  | "2/3"
  | "2/5"
  | "3/4"
  | "3/5"
  | "4/5"
  | "fluid"
  | "content";
