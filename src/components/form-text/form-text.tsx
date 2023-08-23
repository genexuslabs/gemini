import {
  Component,
  Prop,
  Element,
  h,
  Host,
  Event,
  EventEmitter,
  State,
  Watch,
  Method,
} from "@stencil/core";
import { requiredLabel, formMessageLogic } from "../../common/form";
import { FormComponent } from "../../common/interfaces";
import { formClasses } from "../../common/classesNames";
import { commonClassesNames } from "../../common/classesNames";
import state from "../store";
import { exportParts } from "../../common/export-parts";
import { ValidationStatus } from "../../common/types";

@Component({
  tag: "gxg-form-text",
  styleUrl: "form-text.scss",
  shadow: { delegatesFocus: true },
})
export class GxgFormText implements FormComponent {
  private parts = {
    input: "input",
  };
  private valueBeforeDisabled;
  private exportparts: string;
  @Element() el: HTMLElement;
  textInput!: HTMLInputElement;

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
   * The presence of this attribute makes the input readonly
   */
  @Prop() readonly = false;

  /**
   * The input icon (optional)
   */
  @Prop() icon = null;

  /**
   * If true, it will position the cursor at the end when the input is focused.
   */
  @Prop() cursorEnd = false;

  /**
   * The input icon side
   */
  @Prop({ reflect: true }) iconPosition: IconPosition = null;

  /**
   * The input label
   */
  @Prop() label: string;

  /**
   * The label position
   */
  @Prop({ reflect: true }) labelPosition: LabelPosition = "above";

  /**
   * The presence of this attribute hides the border.
   */
  @Prop() borderless = false;

  /**
   * The presence of this attribute hides the border, and sets the background to transparent when the element has no focus
   */
  @Prop({ reflect: true }) minimal = false;

  /**
   * The presence of this attribute sets the text color to white. Usefull when "minimal" attribute is applied and the background behind the input is dark
   */
  @Prop({ reflect: true }) overDarkBackground = false;

  /**
   * The input placeholder
   */
  @Prop() placeholder: string;

  /**
   * The presence of this attribute makes this input required
   */
  @Prop({ reflect: true }) required = false;

  /**
   * Centers the label
   */
  @Prop() centerLabel = false;

  /**
   * The label width
   */
  @Prop() labelWidth;

  /**
   * Prevent "valueChanged" event from being emitted (helpful for cases where the event causes a conflict )
   */
  @Prop() preventValueChangedEmit = false;

  /**
   * Prevent "value" from being changed when the input is disabled (helpful for cases where this component is used inside another component and this behavior causes conflicts. )
   */
  @Prop() preventValueChangeOnDisabled = false;

  /* VALIDATION */

  /**
   * The validation status
   *
   */
  @Prop({ mutable: true }) validationStatus: ValidationStatus = "indeterminate";

  /**
   * The message to display when validation fails (error)
   *
   */
  @Prop() validationMessage: string;

  /**
   * An informative message to help the user filling the information
   *
   */
  @Prop() informationMessage: string;

  /**
   * The input value
   */
  @Prop({ reflect: true }) value: string;

  /**
   * The input max. width
   */
  @Prop() maxWidth = "100%";

  /**
   * The input width
   */
  @Prop() width = "100%";

  /**
   * The text style
   */
  @Prop({ reflect: true }) textStyle: Style = "regular";

  /**
   * The presence of this attribute sets the input type as password
   */
  @Prop() password = false;

  /**
   * The input max. length
   */
  @Prop() maxLength: string = undefined;

  /**
   * The input min. length
   */
  @Prop() minLength: string = undefined;

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

  /**
   * The clear button was clicked
   */
  @Event() valueChanged: EventEmitter<string>;

  @State() cursorInside = false;
  @State() inputSize = "auto";
  @State() mouseCoordinates: object = {
    x: null,
    y: null,
  };

  /**
   * Reading direction
   */
  @State() rtl = false;

  @Watch("value")
  watchHandler(newValue): void {
    if (!this.preventValueChangedEmit) {
      this.valueChanged.emit(newValue);
    }
    if (this.minimal) {
      this.updateGhostSpan();
    }
  }

  @Watch("disabled")
  disabledHandler(newValue): void {
    if (!this.preventValueChangeOnDisabled) {
      if (newValue === true) {
        this.valueBeforeDisabled = this.value;
        this.value = null;
      } else {
        this.value = this.valueBeforeDisabled;
      }
    }
  }

  @Method()
  async selectInputText() {
    this.textInput.focus();
    this.textInput.select();
  }

  componentWillLoad() {
    this.attachExportParts();
  }
  private attachExportParts = (): void => {
    const part = this.el.getAttribute("part");
    const exportPartsResult = exportParts(part, this.parts);
    exportPartsResult.length && (this.exportparts = exportPartsResult);
  };
  /*********************************
  METHODS
  *********************************/

  iconPositionFunc(): IconPosition {
    if (this.iconPosition !== null && this.icon !== null) {
      return this.iconPosition;
    }
  }

  inputIcon(): void {
    const iconSize = this.iconSize();
    if (this.iconPosition !== null && this.icon !== null) {
      if (this.validationStatus === "warning") {
        return (
          <gxg-icon
            class="custom-icon"
            type={this.icon}
            size={iconSize}
            color="warning"
          ></gxg-icon>
        );
      }
      if (this.validationStatus === "error") {
        return (
          <gxg-icon
            class="custom-icon"
            type={this.icon}
            size={iconSize}
            color="error"
          ></gxg-icon>
        );
      }
      return (
        <gxg-icon
          class="custom-icon"
          type={this.icon}
          size={iconSize}
          color="auto"
        ></gxg-icon>
      );
    }
  }

  handleInput(e): void {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.input.emit(target.value);
  }

  handleChange(e): void {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.change.emit(target.value);
  }

  onFocusHandler(): void {
    if (this.cursorEnd) {
      this.textInput.setSelectionRange(
        this.textInput.value.length,
        this.textInput.value.length
      );
    }
  }

  clearButtonFunc(): void {
    const value = (this.el.shadowRoot.querySelector("input").value = "");
    this.change.emit(value);
    this.clearButtonClicked.emit("clear button was clicked");
  }

  updateGhostSpan(): void {
    if (this.minimal) {
      //Update ghost span content, and then get and apply the width from the ghost span
      const ghostSpan = this.el.shadowRoot.querySelector(".ghost-span");
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

  mouseEnterHandler() {
    setTimeout(
      function () {
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
  mouseOutHandler(): void {
    this.cursorInside = false;
  }

  mouseMoveHandler(e): void {
    this.mouseCoordinates["x"] = e.clientX;
    this.mouseCoordinates["y"] = e.clientY;
  }

  componentDidLoad(): void {
    if (this.minimal) {
      document.addEventListener("mousemove", this.mouseMoveHandler.bind(this));

      /**************
      GHOST SPAN
      Ghost span for the "minimal" type input, in order to make the input width fit the content
      **************/

      const intersectionObserver = new IntersectionObserver(
        function (entries): void {
          // If intersectionRatio is 0, the target is out of view
          // and we do not need to do anything.
          if (entries[0].intersectionRatio <= 0) return;

          const input = this.el.shadowRoot.querySelector(
            ".input"
          ) as HTMLInputElement;
          const inputComputedStyles = window.getComputedStyle(input);

          const ghostSpan = this.el.shadowRoot.querySelector(
            ".ghost-span"
          ) as HTMLElement;

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

          //Then get the ghost span width
          const ghostSpanWidth = ghostSpan.offsetWidth + 5;

          input.style.width = "0px";

          //get inner-wrapper width
          const innerWrapperWidth =
            (this.el.shadowRoot.querySelector(".inner-wrapper") as HTMLElement)
              .offsetWidth - 5;

          //Finally set that width to the input!
          input.style.width = ghostSpanWidth + "px";
          input.style.maxWidth = innerWrapperWidth + "px";

          //Listen to resizeObserver to set the new max-width value on the on the input
          const resizeObserver = new ResizeObserver(() => {
            input.style.width = "0px";
            const innerWrapperWidth =
              (this.el.shadowRoot.querySelector(
                ".inner-wrapper"
              ) as HTMLElement).offsetWidth - 5;

            input.style.maxWidth = innerWrapperWidth + "px";
            input.style.width = ghostSpanWidth + "px";
          });
          const innerWrapper = this.el.shadowRoot.querySelector(
            ".inner-wrapper"
          );
          resizeObserver.observe(innerWrapper);
        }.bind(this)
      );
      // start observing
      intersectionObserver.observe(this.el.shadowRoot.querySelector(".input"));
    } // if (this.minimal)

    //Reading Direction
    const dirHtml = document
      .getElementsByTagName("html")[0]
      .getAttribute("dir");
    const dirBody = document
      .getElementsByTagName("body")[0]
      .getAttribute("dir");
    if (dirHtml === "rtl" || dirBody === "rtl") {
      this.rtl = true;
    }
  }

  componentDidUnload(): void {
    if (this.minimal) {
      document.removeEventListener("mousemove", this.mouseMoveHandler);
    }
  }

  iconSize(): "regular" | "small" {
    if (state.large) {
      return "regular";
    } else {
      return "small";
    }
  }

  type(): "password" | "text" {
    if (this.password) {
      return "password";
    } else {
      return "text";
    }
  }

  render(): void {
    return (
      <Host
        role="textbox"
        aria-label={this.label}
        icon-position={this.iconPositionFunc()}
        style={{
          width: this.width,
          maxWidth: this.maxWidth,
        }}
        class={{
          rtl: this.rtl,
          large: state.large,
          borderless: this.borderless,
          [formClasses["VALIDATION_INDETERMINATE_CLASS"]]:
            this.validationStatus === "indeterminate",
          [formClasses["VALIDATION_WARNING_CLASS"]]:
            this.validationStatus === "warning",
          [formClasses["VALIDATION_ERROR_CLASS"]]:
            this.validationStatus === "error",
          [formClasses["VALIDATION_SUCCESS_CLASS"]]:
            this.validationStatus === "success",
          [commonClassesNames["DISABLED_CLASS"]]: this.disabled,
        }}
        exportParts={this.exportparts ? this.exportparts : null}
      >
        {this.minimal ? <span class="ghost-span">{this.value}</span> : null}
        <div
          class={{
            "outer-wrapper": true,
          }}
        >
          {this.label ? (
            <gxg-label
              labelPosition={this.labelPosition}
              center={this.centerLabel}
              width={this.labelWidth}
            >
              {this.label}
              {requiredLabel(this)}
            </gxg-label>
          ) : (
            ""
          )}
          <div
            class={{
              "inner-wrapper": true,
              "clear-button": this.clearButton === true,
            }}
          >
            <input
              part={this.parts.input}
              type={this.type()}
              value={this.value}
              class={{
                input: true,
                "form-element": true,
                "cursor-inside": this.cursorInside,
                "clear-button": this.clearButton === true,
                "custom-icon": this.icon,
                "custom-icon--end": this.iconPosition === "end",
                "input--borderless": this.borderless,
              }}
              placeholder={this.placeholder}
              disabled={this.disabled}
              readonly={"readonly" ? this.readonly : null}
              onInput={this.handleInput.bind(this)}
              onChange={this.handleChange.bind(this)}
              onFocus={this.onFocusHandler.bind(this)}
              required={this.required}
              onMouseEnter={this.mouseEnterHandler.bind(this)}
              onMouseOut={this.mouseOutHandler.bind(this)}
              ref={(el) => (this.textInput = el as HTMLInputElement)}
              maxLength={this.maxLength ? parseInt(this.maxLength) : null}
              minLength={this.minLength ? parseInt(this.minLength) : null}
            ></input>
            {this.inputIcon()}
            {this.clearButton ? (
              <gxg-icon
                class="clear-button"
                type="gemini-tools/close"
                size={this.iconSize()}
                color="onbackground"
                onClick={this.clearButtonFunc.bind(this)}
              ></gxg-icon>
            ) : null}
            {this.labelPosition === "start" ? formMessageLogic(this) : null}
          </div>
        </div>
        {this.labelPosition === "above" ? formMessageLogic(this) : null}
      </Host>
    );
  }
}

export type IconPosition = "start" | "end";
export type LabelPosition = "start" | "above";
export type Style =
  | "regular"
  | "quote"
  | "title-01"
  | "title-02"
  | "title-03"
  | "title-04"
  | "title-05";
