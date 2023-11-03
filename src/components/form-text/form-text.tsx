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
import {
  requiredLabel,
  formMessageLogic,
  formTooltipLogic,
} from "../../common/form";
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
  private exportparts: string;
  @Element() el: HTMLElement;
  textInput!: HTMLInputElement;
  fileInputEl!: HTMLInputElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  private timeoutReference;

  /**
   * The presence of this attribute disables the tooltip. Useful for the combo-box.
   */
  @Prop() hideTooltip = false;

  /**
   * The presence of this attribute displays a tooltip message, instead of a block message below the control
   */
  @Prop() toolTip = false;

  /**
   * The presence of this attribute displays a clear (cross) button-icon on the right side
   */
  @Prop({ reflect: true }) clearButton = false;

  /**
   * The presence of this attribute activates a debounce for the valueChanged event. This will cause the event to be emitted after 'debounceDelay' time.
   */
  @Prop() debounce = false;

  /**
   * The debounce delay value. Only applies if 'debounce' is true.
   */
  @Prop() debounceDelay = 800;

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
  @Prop({ reflect: true }) labelPosition: LabelPosition = "start";

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
   * The type of input
   */
  @Prop() type: InputType = "text";

  /**
   * Allows multiple files if type is "file"
   */
  @Prop() multiple = false;

  /**
   * The file list that the user selected (only applies if the input type is "file")
   */
  @Prop({ mutable: true }) fileList: FileList;

  /**
   * The type of files the input accepts
   */
  @Prop() acceptFile: string;

  /**
   * Prevent "valueChanged" event from being emitted (helpful for cases where the event causes a conflict )
   */
  @Prop() preventValueChangedEmit = false;

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

  /**
   * File Selected
   */
  @Event() fileSelected: EventEmitter<FileList>;

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
    if (!this.preventValueChangedEmit && this.debounce) {
      clearTimeout(this.timeoutReference);
      this.timeoutReference = setTimeout(() => {
        this.valueChanged.emit(newValue);
      }, this.debounceDelay);
    } else if (!this.preventValueChangedEmit && !this.debounce) {
      this.valueChanged.emit(newValue);
    }
    if (this.minimal) {
      this.updateGhostSpan();
    }
    if (this.minimal) {
      this.updateGhostSpan();
    }
  }

  @Method()
  async selectInputText() {
    this.textInput.focus();
    this.textInput.select();
  }

  @Method()
  async openFile() {
    if (this.type === "file") {
      this.fileInputEl.click();
    }
  }

  @Method()
  async clearInput() {
    this.clearButtonFunc();
  }

  componentWillLoad() {
    this.evaluateIcon();
    this.attachExportParts();
    this.evaluateLabelAlignment();
  }
  private attachExportParts = (): void => {
    const part = this.el.getAttribute("part");
    const exportPartsResult = exportParts(part, this.parts);
    exportPartsResult.length && (this.exportparts = exportPartsResult);
  };

  private evaluateIcon = () => {
    if (this.type === "file") {
      this.icon = "controls/file-upload";
      this.iconPosition = "start";
      this.placeholder = this.placeholder || "Select a file";
    }
  };

  private evaluateLabelAlignment = () => {
    if (this.labelPosition === "start") {
      this.centerLabel = true;
    }
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
          color={this.disabled ? "disabled" : "auto"}
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

  private handleClick = () => {
    this.openFile();
  };

  private handleKeyDown = (e) => {
    if (e.key === "Enter" && this.type === "file") {
      this.textInput.click();
    }
  };

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
    this.clearButtonClicked.emit({ prevValue: this.value });
    this.value = "";
    if (this.type === "file") {
      this.fileList = null;
      this.fileInputEl.value = "";
    }
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

  evaluateType(): "password" | "text" {
    if (this.password) {
      return "password";
    } else {
      return "text";
    }
  }

  private inputFileChangedHandler = (e) => {
    const selectedFiles: FileList = e.target.files;
    this.fileList = selectedFiles;
    this.fileSelected.emit(selectedFiles);
    if (selectedFiles.length > 1) {
      this.value = `${selectedFiles.length} files chosen`;
    } else {
      this.value = selectedFiles[0].name;
    }
  };

  private renderInputFile = () => {
    if (this.type === "file") {
      return (
        <input
          class="input-file"
          type="file"
          multiple={this.multiple}
          accept={this.acceptFile}
          ref={(el) => (this.fileInputEl = el as HTMLInputElement)}
          onChange={this.inputFileChangedHandler}
          style={{ display: "none" }}
        ></input>
      );
    }
  };

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
          mercury: state.mercury,
          borderless: this.borderless,
          file: this.type === "file",
          tooltip: this.toolTip,
          "has-icon": this.icon,
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
              type={this.evaluateType()}
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
              readonly={
                "readonly" ? this.readonly || this.type === "file" : null
              }
              onClick={this.handleClick}
              onInput={this.handleInput.bind(this)}
              onKeyDown={this.handleKeyDown}
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
            {this.toolTip ? formTooltipLogic(this, this.hideTooltip) : null}
            {this.labelPosition === "start" && !this.toolTip
              ? formMessageLogic(this)
              : null}
            {this.renderInputFile()}
          </div>
        </div>
        {this.labelPosition === "above" && !this.toolTip
          ? formMessageLogic(this)
          : null}
      </Host>
    );
  }
}

export type IconPosition = "start" | "end";
export type InputType = "text" | "password" | "file";
export type LabelPosition = "start" | "above";
export type Style =
  | "regular"
  | "quote"
  | "title-01"
  | "title-02"
  | "title-03"
  | "title-04"
  | "title-05";
