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
   * If select is full width
   */
  @Prop({ reflect: true }) fullWidth = false;

  /**
   * The label
   */
  @Prop() label = "Label";

  /**
   * The max value
   */
  @Prop() max = 120;

  /**
   * The initial value
   */
  @Prop({ reflect: true }) value = 0;

  /**
   * The slider width
   */
  @Prop() width = "200px";

  componentDidLoad() {
    const rangeSlider = this.el.shadowRoot.getElementById("rs-range-line");
    const rangeBullet = this.el.shadowRoot.getElementById("rs-bullet");
    const actualValue = this.el.shadowRoot.getElementById("actual-value");
    const gxgSlider = this.el;

    function calculateWidth(width) {
      width = parseInt(width.replace("px", ""));
      return width - 22;
    }

    //Resize Observer
    const myObserver = new ResizeObserver(entries => {
      entries.forEach(() => {
        this.width =
          this.el.shadowRoot.querySelector(".range-slider").clientWidth + "";

        const sliderWidth = this.width;
        const bulletPosition =
          this.value / parseInt(rangeSlider.getAttribute("max"));
        rangeBullet.style.left =
          bulletPosition * calculateWidth(sliderWidth) + "px";
      });
    });

    myObserver.observe(this.el.shadowRoot.querySelector(".range-slider"));

    //verify initial value
    if (this.value > this.max) {
      this.value = this.max;
    }

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

      rangeSlider.setAttribute("value", this.value + "");
      gxgSlider.setAttribute("value", this.value);
    }
    const showSliderVal = showSliderValue.bind(this);
    showSliderVal();
    rangeSlider.setAttribute("value", this.value + "");
    rangeSlider.setAttribute("width", this.width);
  }

  render() {
    return (
      <Host
        class={{
          disabled: this.disabled
        }}
      >
        <div class="container">
          <div class="range-slider">
            <span id="rs-bullet" class="rs-label">
              0
            </span>
            <input
              id="rs-range-line"
              class="rs-range"
              type="range"
              min="0"
              max={this.max}
              style={{ width: this.width }}
              slider-width={this.width}
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
