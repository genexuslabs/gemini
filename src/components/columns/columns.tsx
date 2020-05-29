import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-columns",
  styleUrl: "columns.scss",
  shadow: true
})
export class Columns {
  /**
   * The state of the toggle. Whether is disabled or not.
   * Possible values: false, true
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The spacing between columns
   */
  @Prop() space: SpaceType = "xs";

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

export type SpaceType = "xs" | "s" | "m";
