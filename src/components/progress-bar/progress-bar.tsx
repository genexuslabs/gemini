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
   * If select is full width
   */
  @Prop({ reflect: true }) fullWidth = false;

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
  @Prop() maxWidth = "100%";

  render() {
    return (
      <Host style={{ maxWidth: this.maxWidth }}>
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
