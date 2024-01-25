import { Component, Host, h, Prop } from "@stencil/core";
import state from "../store";
import { LabelPosition } from "../../common/types";

@Component({
  tag: "gxg-label",
  styleUrl: "gxg-label.scss",
  shadow: true
})
export class GxgLabel {
  /*********************************
  PROPERTIES & STATE
  *********************************/

  /*
   * The label position (This will not position the label itself, just the margin).
   */
  @Prop() labelPosition: LabelPosition = "start";

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
  @Prop() center: boolean = undefined;

  /*
   * The name for the target element
   */
  @Prop() for: string;

  /*
   * The label width
   */
  @Prop() width = "auto";

  /*
   * The label size
   */
  @Prop() size: size = "regular";

  /*
   * An optional label tooltip (Useful if the label is too long).
   */
  @Prop() tooltip: string;

  componentWillLoad() {
    if (
      (this.center === undefined && this.labelPosition === "start") ||
      (this.center === undefined && this.labelPosition === "end")
    ) {
      this.center = true;
    } else if (
      (this.center === undefined && this.labelPosition === "above") ||
      (this.center === undefined && this.labelPosition === "below")
    ) {
      this.center = false;
    }
  }

  render() {
    return (
      <Host
        class={{
          large: state.large,
          "gxg-label--no-margin": this.noMargin,
          "gxg-label--center": this.center,
          "gxg-label--regular": this.size === "regular",
          "gxg-label--large": this.size === "large",
          [`position-${this.labelPosition}`]: true
        }}
        style={{
          width: this.width
        }}
      >
        <label htmlFor={this.for}>
          {this.tooltip ? (
            <gxg-tooltip label={this.tooltip}>
              <slot></slot>
            </gxg-tooltip>
          ) : null}
          <slot></slot>
        </label>
      </Host>
    );
  }
}

export type size = "regular" | "large";
