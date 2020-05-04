import { Component, Element, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-stepper",
  styleUrl: "stepper.scss",
  shadow: true
})
export class Stepper {
  /*********************************
  PROPERTIES & STATE
  *********************************/

  @Element() el: HTMLElement;

  plusButton!: HTMLButtonElement;
  minusButton!: HTMLButtonElement;

  /**
   * The state of the toggle. Whether is disabled or not.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Inline-flex display
   */
  @Prop() inlineFlex = false;

  /**
   * The toggle label
   */
  @Prop() label = "Label";

  /**
   * The initial vaule
   */
  @Prop({ reflect: true }) value = 0;

  /**
   * The max value
   */
  @Prop({ reflect: true }) max = 10000;

  /**
   * The min value
   */
  @Prop({ reflect: true }) min = 0;

  /*********************************
  METHODS
  *********************************/

  componentDidLoad() {
    //disabled
    if (this.disabled) {
      this.plusButton.setAttribute("disabled", "disabled");
      this.minusButton.setAttribute("disabled", "disabled");
    }
    //initial value
    if (this.value < this.min || this.value > this.max) {
      this.value = this.min;
    }
    //min value
    if (this.value === this.min) {
      this.minusButton.setAttribute("disabled", "disabled");
    }
    //max value
    if (this.value === this.max) {
      this.plusButton.setAttribute("disabled", "disabled");
    }
  }

  minus() {
    if (this.value === this.max) {
      this.plusButton.removeAttribute("disabled");
    }
    if (this.value >= this.min) {
      this.value = this.value - 1;
    }
    if (this.value === this.min) {
      this.minusButton.setAttribute("disabled", "disabled");
    }
  }

  plus() {
    if (this.value === this.min) {
      this.minusButton.removeAttribute("disabled");
    }
    if (this.value <= this.max) {
      this.value = this.value + 1;
    }
    if (this.value === this.max) {
      this.plusButton.setAttribute("disabled", "disabled");
    }
  }

  render() {
    return (
      <Host class={{}}>
        <label class="label">{this.label}</label>
        <div class="outer-wrapper">
          <button
            ref={el => (this.minusButton = el as HTMLButtonElement)}
            class="button button--minus"
            onClick={this.minus.bind(this)}
            tabindex="0"
          >
            -
          </button>
          <span class="value-container">
            <span class="value-container__value">{this.value}</span>
          </span>
          <button
            ref={el => (this.plusButton = el as HTMLButtonElement)}
            class="button button--plus"
            onClick={this.plus.bind(this)}
            tabindex="0"
          >
            +
          </button>
        </div>
      </Host>
    );
  }
}
