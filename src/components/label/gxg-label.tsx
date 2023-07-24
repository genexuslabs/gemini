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
   * The presence of this attribute styles the label as disabled
   */
  @Prop({ reflect: true }) disabled = false;

  /*
   * The presence of this attribute removes the margin
   */
  @Prop() noMargin = false;

  /*
   * Align the text to the middle
   */
  @Prop() center = false;

  /*
   * The label width
   */
  @Prop() width = "auto";

  render() {
    return (
      <Host
        class={{
          large: state.large,
          "gxg-label--no-margin": this.noMargin,
          "gxg-label--center": this.center,
          [`position-${this.labelPosition}`]: true,
        }}
        style={{
          width: this.width,
        }}
      >
        <label>
          <slot></slot>
        </label>
      </Host>
    );
  }
}
