import { Component, Prop, h, Host, Watch, getAssetPath } from "@stencil/core";

@Component({
  tag: "gxg-progress-bar",
  styleUrl: "progress-bar.scss",
  shadow: true,
  assetsDirs: ["progress-bar-assets"],
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

  /**
   * The presence of this attribute removes the sound that plays when the progress-bar finishes
   */
  @Prop() silent = false;

  @Watch("value")
  watchValue() {
    if (this.value === 100 && !this.silent) {
      const audio = new Audio(getAssetPath("./progress-bar-assets/done.mp3"));
      setTimeout(function () {
        audio.play();
      }, 500);
    }
  }

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
          <gxg-label class="label">{this.label}</gxg-label>
          <span class="outer-bar">
            <span class="inner-bar" style={{ width: this.value + "%" }}></span>
          </span>
        </div>
      </Host>
    );
  }
}
