import { Component, Prop, h, Element } from "@stencil/core";

@Component({
  tag: "gxg-stack",
  styleUrl: "stack.scss",
  shadow: true,
})
export class GxgStack {
  @Element() el: HTMLElement;

  /**
   * The spacing value between each stack row
   */
  @Prop({ reflect: true }) space: Space = "xs";

  /**
   * The spacing value between each gxg-column (if any present)
   */
  @Prop({ reflect: true }) columnsSpace: Space = "xs";

  render() {
    return <slot></slot>;
  }

  componentWillLoad() {
    if (this.columnsSpace !== undefined) {
      this.assignColumnsSpace();
    }
  }

  private assignColumnsSpace = () => {
    const gxgColumns: HTMLGxgColumnsElement[] = Array.from(
      this.el.querySelectorAll("gxg-columns")
    );
    gxgColumns.forEach((gxgColumn) => {
      gxgColumn.space = this.columnsSpace;
    });
  };
}

export type Space = "xs" | "s" | "m" | "l" | "xl";
