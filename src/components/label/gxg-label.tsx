import { Component, Host, h, Prop } from "@stencil/core";
import state from "../store";

@Component({
  tag: "gxg-label",
  styleUrl: "gxg-label.scss",
  shadow: true,
})
export class GxgLabel {
  /*********************************
  PROPERTIES & STATE
  *********************************/

  /*
   * The label position (This will not position the label itself, just the margin).
   */
  @Prop() labelPosition: "above" | "end" | "below" | "start" = "above";

  /*
   * The presence of this attribute removes the margin
   */
  @Prop() noMargin = false;

  render() {
    return (
      <Host
        class={{
          large: state.large,
          "no-margin": this.noMargin,
          [`position-${this.labelPosition}`]: true,
        }}
      >
        <label>
          <slot></slot>
        </label>
      </Host>
    );
  }
}
