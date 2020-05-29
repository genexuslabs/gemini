import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-column",
  styleUrl: "column.scss",
  shadow: true
})
export class Column {
  /*The column width*/
  @Prop({ reflect: true }) width: WidthType = "fluid";

  render() {
    return (
      <Host
        class={{
          column: true
        }}
      >
        <slot></slot>
      </Host>
    );
  }
}

export type WidthType = "1/2" | "1/3" | "1/4" | "1/5" | "fluid" | "content";
