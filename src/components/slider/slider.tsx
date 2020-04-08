import { Component, Prop, Element, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-slider",
  styleUrl: "slider.scss",
  shadow: true
})
export class Slider {
  @Element() el: HTMLElement;
  /**
   * The state of the toggle. Whether is disabled or not.
   * Possible values: false, true
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The slider label
   */
  @Prop() label = "Label";

  /**
   * The slider label
   */
  @Prop() min = "0";

  /**
   * The slider max value
   */
  @Prop() max = "120";

  /**
   * The slider value
   */
  @Prop({ reflect: true }) value = 0;

  /**
   * The slider width
   */
  @Prop() width = "200px";

  componentDidLoad() {
    function calculateWidth(width) {
      width = parseInt(width.replace("px", ""));
      return width - 22;
    }
    const rangeSlider = this.el.shadowRoot.getElementById("rs-range-line");
    const rangeBullet = this.el.shadowRoot.getElementById("rs-bullet");
    const actualValue = this.el.shadowRoot.getElementById("actual-value");

    function showSliderValue() {
      let sliderWidth = this.width;
      if (sliderWidth === 0) {
        sliderWidth = this.getAttribute("slider-width");
      }

      rangeSlider.addEventListener("input", showSliderValue, false);
      rangeBullet.innerHTML = this.value;
      const bulletPosition =
        this.value / parseInt(rangeSlider.getAttribute("max"));
      rangeBullet.style.left =
        bulletPosition * calculateWidth(sliderWidth) + "px";

      actualValue.innerHTML = this.value;
    }
    const showSliderVal = showSliderValue.bind(this);
    showSliderVal();
    rangeSlider.setAttribute("value", this.value + "");
    rangeSlider.setAttribute("width", this.width);
  }

  render() {
    return (
      <Host class={{}}>
        <div class="container">
          <div class="range-slider">
            <span id="rs-bullet" class="rs-label">
              0
            </span>
            <input
              id="rs-range-line"
              class="rs-range"
              type="range"
              min={this.min}
              max={this.max}
              style={{ width: this.width }}
              slider-width={this.width}
            />
          </div>

          <div class="box-value">
            <span id="actual-value">{this.value}</span>
          </div>
        </div>
      </Host>
    );
  }
}

export type type = "percentual" | "numeric";
