import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-progress-bar",
  styleUrl: "progress-bar.scss",
  shadow: true
})
export class ProgressBar {
  /**
   * The state of the toggle. Whether is disabled or not.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The label
   */
  @Prop() label = "Label";

  /**
   * The value (percentage)
   */
  @Prop({ reflect: true }) value = 0;

  /**
   * The width
   */
  @Prop() width = "200px";

  render() {
    return (
      <Host class={{}}>
        <div class="outer-wrapper">
          <label class="label">{this.label}</label>
          <span class="outer-bar" style={{ width: this.width }}>
            <span class="inner-bar" style={{ width: this.value + "%" }}></span>
          </span>
        </div>
      </Host>
    );
  }
}
