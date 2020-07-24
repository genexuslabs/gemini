import { Component, Prop, Element, h, Host, Watch } from "@stencil/core";

@Component({
  tag: "gxg-slider",
  styleUrl: "slider.scss",
  shadow: true
})
export class Slider {
  @Element() el: HTMLElement;

  /**
   * The state of the slider, whether is disabled or not.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The label
   */
  @Prop() label = "Label";

  /**
   * The max. value
   */
  @Prop() max = 100;

  /**
   * The initial value
   */
  @Prop({ reflect: true }) value = 0;

  /**
   * The slider max. width
   */
  @Prop() maxWidth = "100%";

  @Watch("value")
  watchHandler() {
    this.updateLabel();
  }

  componentDidLoad() {
    this.updateLabel();

    //Resize Observer
    const myObserver = new ResizeObserver(entries => {
      entries.forEach(() => {
        this.updateLabel();
      });
    });

    myObserver.observe(this.el.shadowRoot.querySelector(".range-slider"));
  }

  updateLabel() {
    const rangeLabel = this.el.shadowRoot.querySelector(".rs-label");
    const labelPosition = this.value / this.max;
    (rangeLabel as HTMLElement).style.left =
      labelPosition * this.calculateWidth() + "px";
    rangeLabel.innerHTML = this.value.toString();
    this.updateBoxValue();
  }
  updateBoxValue() {
    (this.el.shadowRoot.getElementById(
      "actual-value"
    ) as HTMLElement).innerHTML = this.value.toString();
  }

  calculateWidth() {
    return this.el.shadowRoot.querySelector(".range-slider").clientWidth - 22;
  }

  rangeSliderChanged() {
    this.value = parseInt(
      (this.el.shadowRoot.getElementById("rs-range-line") as HTMLInputElement)
        .value
    );
    this.updateLabel();
  }

  render() {
    return (
      <Host
        class={{
          disabled: this.disabled
        }}
        style={{ maxWidth: this.maxWidth }}
      >
        <div class="container">
          <div class="range-slider">
            <span class="rs-label">0</span>
            <input
              onInput={this.rangeSliderChanged.bind(this)}
              id="rs-range-line"
              class="rs-range"
              type="range"
              min="0"
              max={this.max}
              value={this.value}
            />
          </div>

          <div class="box-value">
            <span id="actual-value"></span>
          </div>
        </div>
      </Host>
    );
  }
}

export type type = "percentual" | "numeric";
