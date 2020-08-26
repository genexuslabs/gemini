import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-column",
  styleUrl: "column.scss",
  shadow: true
})
export class Column {
  /**
   * The column width value
   */
  @Prop({ reflect: true }) width: WidthType = "fluid";

  render() {
    return (
      <Host class="column">
        <div part="inner-container" class="inner-container">
          <slot></slot>
        </div>
      </Host>
    );
  }
}

export type WidthType =
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
