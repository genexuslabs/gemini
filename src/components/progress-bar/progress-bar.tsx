import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-progress-bar",
  styleUrl: "progress-bar.scss",
  shadow: true
})
export class GxgProgressBar {
  /**
   * The state of the progress-bar, whether it is disabled or not.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The progress-bar label
   */
  @Prop() label = "Label";

  /**
   * The progress value (percentage)
   */
  @Prop({ reflect: true }) value = 0;

  /**
   * The max. width
   */
  @Prop() maxWidth = "100%";

  render() {
    return (
      <Host
        style={{ maxWidth: this.maxWidth }}
        role="progressbar"
        aria-valuenow={this.value}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div class="outer-wrapper">
          <label class="label">{this.label}</label>
          <span class="outer-bar">
            <span class="inner-bar" style={{ width: this.value + "%" }}></span>
          </span>
        </div>
      </Host>
    );
  }
}
