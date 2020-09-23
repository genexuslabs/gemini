import {
  Component,
  Prop,
  Element,
  h,
  Host,
  Event,
  EventEmitter,
  State
} from "@stencil/core";
import {
  requiredLabel,
  formMessage,
  formHandleChange,
  FormComponent
} from "../../common";

@Component({
  tag: "gxg-form-text",
  styleUrl: "form-text.scss",
  shadow: true
})
export class FormText implements FormComponent {
  isRequiredError = false;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * The presence of this attribute displays a clear (cross) button-icon on the right side
   */
  @Prop() clearButton = false;

  /**
   * The presence of this attribute makes the input disabled
   */
  @Prop() disabled = false;

  /**
   * The presence of this attribute gives the component error styles
   */
  @Prop({ mutable: true }) error = false;

  /**
   * The input icon (optional)
   */
  @Prop() icon = null;

  /**
   * The input icon side
   */
  @Prop({ reflect: true }) iconPosition: IconPosition = null;

  /**
   * The input label
   */
  @Prop() label: string;

  /**
   * The presence of this attribute hides the border, and sets the background to transparent when the element has no focus
   */
  @Prop({ reflect: true }) minimal = false;

  /**
   * The input placeholder
   */
  @Prop() placeholder: string;

  /**
   * The presence of this attribute makes this input required
   */
  @Prop({ reflect: true }) required = false;

  /**
   * The required message if this input is required and no value is provided (optional). If this is not provided, the default browser required message will show up
   *
   */
  @Prop({ mutable: true }) requiredMessage: string;

  /**
   * The input value
   */
  @Prop({ reflect: true }) value: string;

  /**
   * The presence of this attribute gives the component warning styles
   */
  @Prop() warning = false;

  /**
   * The input max. width
   */
  @Prop() maxWidth = "100%";

  /**
   * The text style
   */
  @Prop({ reflect: true }) textStyle: Style = "regular";

  @Element() el: HTMLElement;

  /**
   * Returns the input value
   */
  @Event() input: EventEmitter;

  /**
   * Returns the input value
   */
  @Event() change: EventEmitter;

  /**
   * The clear button was clicked
   */
  @Event() clearButtonClicked: EventEmitter;

  @State() cursorInside = false;
  @State() inputSize = "auto";
  @State() mouseCoordinates: object = {
    x: null,
    y: null
  };

  /*********************************
  METHODS
  *********************************/

  iconPositionFunc() {
    if (this.iconPosition !== null && this.icon !== null) {
      return this.iconPosition;
    }
  }

  inputIcon() {
    if (this.iconPosition !== null && this.icon !== null) {
      if (this.warning) {
        return (
          <gxg-icon type={this.icon} size="small" color="warning"></gxg-icon>
        );
      }
      if (this.error) {
        return (
          <gxg-icon type={this.icon} size="small" color="error"></gxg-icon>
        );
      }
      return (
        <gxg-icon
          type={this.icon}
          size="small"
          style={{ opacity: "0.5" }}
        ></gxg-icon>
      );
    }
  }

  handleInput(e) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.input.emit(target.value);
    formHandleChange(this, e.target);

    if (this.minimal) {
      //Update ghost span content, and then get and apply the width from the ghost span
      const ghostSpan = document.querySelector(".ghost-span");
      ghostSpan.innerHTML = this.value;

      //Then get the ghost span width
      const ghostSpanWidth = (ghostSpan as HTMLElement).offsetWidth + 5;

      const input = this.el.shadowRoot.querySelector(
        ".input"
      ) as HTMLInputElement;

      //Finally set that width to the input!
      input.style.width = ghostSpanWidth + "px";
    }
  }

  handleChange(e) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.change.emit(target.value);
    formHandleChange(this, e.target);
  }

  clearButtonFunc() {
    const value = (this.el.shadowRoot.querySelector("input").value = "");
    this.change.emit(value);
    this.clearButtonClicked.emit("clear button was clicked");
  }

  mouseEnterHandler() {
    setTimeout(
      function() {
        const inputText = this.el.shadowRoot.querySelector(
          ".input"
        ) as HTMLInputElement;

        //Contextual menu coordinates
        const inputTextArea = inputText.getBoundingClientRect();
        if (
          this.mouseCoordinates.x > inputTextArea.left &&
          this.mouseCoordinates.x < inputTextArea.right &&
          this.mouseCoordinates.y > inputTextArea.top &&
          this.mouseCoordinates.y < inputTextArea.bottom
        ) {
          //Mouse pointer is inside the input text
          this.cursorInside = true;
        }
      }.bind(this),
      500
    );
  }
  mouseOutHandler() {
    this.cursorInside = false;
  }

  mouseMoveHandler(e) {
    this.mouseCoordinates["x"] = e.clientX;
    this.mouseCoordinates["y"] = e.clientY;
  }

  componentDidLoad() {
    console.log("form text loaded");
    if (this.minimal) {
      document.addEventListener("mousemove", this.mouseMoveHandler.bind(this));

      /**************
      GHOST SPAN
      Ghost span for the "minimal" type input, in order to make the input width fit the content
      **************/

      const input = this.el.shadowRoot.querySelector(
        ".input"
      ) as HTMLInputElement;
      const inputComputedStyles = window.getComputedStyle(input);

      const ghostSpan = document.createElement("span");
      ghostSpan.classList.add("ghost-span");

      //Set ghostSpan outside of the visible area
      ghostSpan.style.position = "fixed";
      ghostSpan.style.left = "-1000px";
      ghostSpan.style.top = "-1000px";
      ghostSpan.style.zIndex = "-1000";
      ghostSpan.style.opacity = "0";
      //Set input styles that affect the width to the ghost span
      ghostSpan.style.fontSize = inputComputedStyles.fontSize;
      ghostSpan.style.fontFamily = inputComputedStyles.fontFamily;
      ghostSpan.style.textTransform = inputComputedStyles.textTransform;
      ghostSpan.style.display = "inline-block";
      ghostSpan.style.paddingLeft = inputComputedStyles.paddingRight;
      ghostSpan.style.paddingRight = inputComputedStyles.paddingRight;
      ghostSpan.style.letterSpacing = inputComputedStyles.letterSpacing;
      ghostSpan.style.fontWeight = inputComputedStyles.fontWeight;
      const ghostSpanText = document.createTextNode(input.value);
      ghostSpan.appendChild(ghostSpanText);

      //Append ghost span to the body
      document.body.appendChild(ghostSpan);

      console.log("inputComputedStyles.textTransforms");
      console.log(inputComputedStyles.textTransform);

      //Then get the ghost span width
      const ghostSpanWidth = ghostSpan.offsetWidth + 5;
      //Finally set that width to the input!
      input.style.width = ghostSpanWidth + "px";
    }
  }

  componentDidUnload() {
    if (this.minimal) {
      document.removeEventListener("mousemove", this.mouseMoveHandler);
    }
  }

  render() {
    return (
      <Host
        role="textbox"
        aria-label={this.label}
        icon-position={this.iconPositionFunc()}
        style={{
          maxWidth: this.maxWidth
        }}
      >
        <div class="outer-wrapper">
          {this.label !== undefined ? (
            <label
              class={{
                label: true
              }}
            >
              {this.label}
              {requiredLabel(this)}
            </label>
          ) : (
            ""
          )}
          <div
            class={{
              "inner-wrapper": true,
              "clear-button": this.clearButton === true
            }}
          >
            <input
              part="input"
              type="text"
              value={this.value}
              class={{
                input: true,
                "input--error": this.error === true,
                "input--warning": this.warning === true,
                "cursor-inside": this.cursorInside
              }}
              placeholder={this.placeholder}
              disabled={this.disabled}
              onInput={this.handleInput.bind(this)}
              onChange={this.handleChange.bind(this)}
              required={this.required}
              onMouseEnter={this.mouseEnterHandler.bind(this)}
              onMouseOut={this.mouseOutHandler.bind(this)}
            ></input>
            {this.inputIcon()}
            {this.clearButton ? (
              <gxg-icon
                class="clear-button"
                type="gemini-tools/close"
                size="small"
                color="onbackground"
                onClick={this.clearButtonFunc.bind(this)}
              ></gxg-icon>
            ) : null}
          </div>
        </div>
        {formMessage(
          this.isRequiredError ? (
            <gxg-form-message type="error" key="required-error">
              {this.requiredMessage}
            </gxg-form-message>
          ) : null
        )}
      </Host>
    );
  }
}

export type IconPosition = "start" | "end";
export type Style =
  | "regular"
  | "quote"
  | "title-01"
  | "title-02"
  | "title-03"
  | "title-04"
  | "title-05";
