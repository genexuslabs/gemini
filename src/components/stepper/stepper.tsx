import { Component, Prop } from "@stencil/core";

@Component({
  tag: "gxg-stepper",
  styleUrl: "stepper.scss",
  shadow: true
})
export class Stepper {
  /**
   * The state of the toggle. Whether is disabled or not.
   * Possible values: false, true
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The toggle label
   */
  @Prop() label = "Label";

  /**
   * The toggle vaule
   */
  @Prop({ reflect: true }) value = 0;

  minus() {
    if (this.value >= 1) {
      this.value = this.value - 1;
    }
  }

  plus() {
    this.value = this.value + 1;
  }

  render() {
    return (
      <Host class={{}}>
        <label class="label">{this.label}</label>
        <div class="outer-wrapper">
          <button class="button button--minus" onClick={this.minus.bind(this)}>
            -
          </button>
          <span class="value-container">
            <span class="value-container__value">{this.value}</span>
          </span>
          <button class="button button--plus" onClick={this.plus.bind(this)}>
            +
          </button>
        </div>
      </Host>
    );
  }
}
