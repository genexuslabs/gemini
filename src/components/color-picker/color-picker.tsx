import {
  Component,
  h,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import Pickr from "@simonwep/pickr";

@Component({
  tag: "gxg-color-picker",
  styleUrl: "color-picker.scss",
  shadow: true,
})
export class GxgColorPicker {
  @Element() element: HTMLElement;
  private pickr: Pickr;

  /**
  The label of the color picker (optional)
  */
  @Prop({ mutable: true }) label = undefined;

  /**
  The color value, such as "red", #CCDDEE, or rgba(220,140,40,.5)
  */
  @Prop({ mutable: true, reflect: true }) value = "white";
  @State() colorRepresentation: "HEXA" | "RGBA" = "HEXA";
  @State() colorInputValue = "";

  @State() colorObject: any; // rename to "Pickr.HSVaColor" when this commit is published in a new npm version: https://github.com/Simonwep/pickr/commit/3a6181fed3cc9c0423a8ebd76bde58ca1e7bd891#diff-573ce24aa615d6a8c9a110355faf562bR101

  //Events
  @Event()
  save: EventEmitter;

  @Event()
  nameInputEvent: EventEmitter;

  @Event()
  change: EventEmitter;

  private colorChangedFromInput = false;

  //Lyfe cycles
  componentDidLoad() {
    //Detect color representation
    if (this.value.includes("rgb")) {
      this.colorRepresentation = "RGBA";
    } else if (this.value.includes("#")) {
      this.colorRepresentation = "HEXA";
    }

    const colorPickerEl = this.element.shadowRoot.querySelector(
      ".color-picker"
    ) as HTMLElement;
    const colorPickerMainCtEl = this.element.shadowRoot.querySelector(
      ".color-picker-main-container"
    ) as HTMLElement;

    this.pickr = new Pickr({
      el: colorPickerEl,
      theme: "nano", // or 'monolith', or 'nano'
      container: colorPickerMainCtEl,
      inline: true,
      showAlways: true,
      default: this.value,
      // useAsButton: true,
      components: {
        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
          // hex: true,
          // rgb: true,
          input: false,
          // save: true
        },
      },
    });

    this.pickr.on("change", (color) => {
      this.colorObject = color;
      if (this.colorRepresentation === "HEXA") {
        this.value = this.colorObject.toHEXA().toString();
      } else if (this.colorRepresentation === "RGBA") {
        this.value = this.colorObject.toRGBA().toString(0);
      }
      this.change.emit(this.value);
    });

    this.pickr.on("show", () => {
      this.colorObject = this.pickr.getColor();
    });

    const options = {
      root: document.querySelector("body"),
      rootMargin: "0px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(() => {
      this.pickr.setColor(this.value); //We have to set the color by force, because we need to get the color at this time, and pickr seems to defer it.
    }, options);
    observer.observe(this.element);
  }

  componentDidUnload() {
    this.pickr.destroy();
  }

  @Watch("value")
  watchHandler(newValue) {
    this.pickr.setColor(newValue);
  }

  //Button Methods
  handleHexaButtonClick() {
    this.colorChangedFromInput = false;
    this.colorRepresentation = "HEXA";
    this.value = this.colorObject.toHEXA().toString();
    this.change.emit(this.value);
  }
  handleRgbaButtonClick() {
    this.colorChangedFromInput = false;
    this.colorRepresentation = "RGBA";
    this.value = this.colorObject.toRGBA().toString(0);
    this.change.emit(this.value);
  }
  handleTitleValueChange(ev: InputEvent) {
    const element = ev.target as HTMLInputElement;
    this.label = element.value;
  }
  handleColorValueChange(ev: InputEvent) {
    this.colorChangedFromInput = true;
    const element = ev.target as HTMLInputElement;
    this.colorInputValue = element.value;
    this.pickr.setColor(element.value);
  }
  colorValue() {
    if (!this.colorChangedFromInput) {
      //We only want to update the color value on the input if the pick was changed directly by handling the color picker window, not by changing the input color value
      if (this.colorObject === undefined) {
        return "";
      }
      if (this.colorRepresentation === "HEXA") {
        return this.colorObject.toHEXA().toString();
      } else if (this.colorRepresentation === "RGBA") {
        return this.colorObject.toRGBA().toString(0);
      }
    }
    this.colorChangedFromInput = true;
    return this.colorInputValue;
  }

  setActiveButton() {
    if (this.value.includes("rgb")) {
      return "rgba";
    } else {
      return "hexa";
    }
  }

  render() {
    return (
      <Host>
        {this.label ? <gxg-label>{this.label}</gxg-label> : null}
        <div
          class={{
            "color-picker-main-container": true,
          }}
          id="color-picker-main-container"
        >
          <div class="color-picker"></div>
          <div class="cp-gxg-buttons before-color-value" slot="editable">
            <gxg-button-group default-selected-btn-id={this.setActiveButton()}>
              <button id="rgba" onClick={this.handleRgbaButtonClick.bind(this)}>
                RGBA
              </button>
              <button id="hexa" onClick={this.handleHexaButtonClick.bind(this)}>
                HEXA
              </button>
            </gxg-button-group>
          </div>
          <input
            type="text"
            name="cp-color-value"
            id="cp-color-value"
            value={this.colorValue()}
            class="color-picker-main-container-textbox"
            onInput={this.handleColorValueChange.bind(this)}
          />
        </div>
      </Host>
    );
  }
}
