import { Component, Prop } from "@stencil/core";

@Component({
  tag: "gxg-progress-bar",
  styleUrl: "progress-bar.scss",
  shadow: true
})
export class ProgressBar {
  /**
   * The state of the toggle. Whether is disabled or not.
   * Possible values: false, true
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The progress-bar label
   */
  @Prop() label = "Label";

  /**
   * The progress-bar label
   */
  @Prop() value = 0;

  /**
   * The progress-bar width
   */
  @Prop() width = "200px";

  /**
   * The progress-bar width
   */
  @Prop() progress = 0;

  render() {
    return (
      <Host class={{}}>
        <div class="outer-wrapper">
          <label class="label">{this.label}</label>
          <span class="outer-bar" style={{ width: this.width }}>
            <span
              class="inner-bar"
              style={{ width: this.progress + "%" }}
            ></span>
          </span>
        </div>
      </Host>
    );
  }
}
