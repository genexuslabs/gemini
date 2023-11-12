import {
  Component,
  Host,
  Element,
  Prop,
  h,
  Event,
  EventEmitter,
  Watch,
  State,
} from "@stencil/core";
import {
  requiredLabel,
  formMessageLogic,
  formTooltipLogic,
} from "../../common/form";
import state from "../store";
import { FormComponent } from "../../common/interfaces";
import { formClasses } from "../../common/classesNames";
import { exportParts } from "../../common/export-parts";
import { ValidationStatus, LabelPosition } from "../../common/types";
import { commonClassesNames } from "../../common/classesNames";
@Component({
  tag: "gxg-form-textarea",
  styleUrl: "form-textarea.scss",
  shadow: { delegatesFocus: true },
})
export class GxgFormTextarea implements FormComponent {
  private parts = {
    textarea: "textarea",
  };
  private exportparts: string;

  @Element() el: HTMLElement;
  //A reference to the input
  textArea!: HTMLTextAreaElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * The presence of this attribute forces the textarea to be as tall as an input text. When the textarea gets focus, it ais as tall as the "height: property.
   */
  @Prop({ reflect: true }) singleLine = false;

  /**
   * This property it is for using the textarea for the ai-assistant in ide-web (Mercury).
   */
  @Prop({ reflect: true }) ai = false;

  /**
   * The presence of this attribute displays a tooltip message, instead of a block message below the control
   */
  @Prop() toolTip = false;

  /**
   * The presence of this attribute gives the component error styles
   */
  @Prop({ mutable: true }) error = false;

  /**
   * The textarea label
   */
  @Prop({ reflect: true }) label: string;

  /**
   * The label position
   */
  @Prop({ reflect: true }) labelPosition: LabelPosition = "above";

  /**
   * The label width
   */
  @Prop() labelWidth;

  /**
   * Centers the label
   */
  @Prop() centerLabel = false;

  /**
   * The max-width
   */
  @Prop() maxWidth = "100%";

  /**
   * The max-height
   */
  @Prop() maxHeight: string;

  /**
   * The textarea height
   */
  @Prop() height = "auto";

  /**
   * The textarea placeholder
   */
  @Prop() placeholder: string;

  /**
   * The textarea value
   */
  @Prop({ reflect: true }) value: string;

  /**
   * The number of rows
   */
  @Prop() rows = 4;

  /**
   * The presence of this attribute gives the component warning styles
   */
  @Prop() warning = false;

  /**
   * The presence of this attribute will show a validation message if the input has an error
   */
  @Prop() hideValidationMessage = false;

  /**
   * Returns the textarea value
   */
  @Event() input: EventEmitter;

  /**
   * Returns the textarea value
   */
  @Event() change: EventEmitter;

  /**
   * Emits the enter keydown event. It emits the actual textarea value. Used for the Ai-Assistant
   */
  @Event() enter: EventEmitter;

  /**
   * Emits the ArrowUp keydown event. Only available if ai is true.
   */
  @Event() arrowUpPressed: EventEmitter;

  /*********************************
  PROPERTIES FOR VALIDATION 
  *********************************/

  /**
   * The presence of this attribute makes the component disabled
   */
  @Prop() disabled = false;

  /*VALIDATION*/

  formMessageLogic = formMessageLogic;

  /**
   * Make the radio-buttons required
   */
  @Prop() required = false;

  /**
   * The validation status
   */
  @Prop({ mutable: true }) validationStatus: ValidationStatus = "indeterminate";

  /**
   * The required message if this input is required and no value is provided (optional). If this is not provided, the default browser required message will show up
   *
   */
  @Prop({ mutable: true }) validationMessage: string;

  /**
   * An informative message to help the user filling the information
   *
   */
  @Prop() informationMessage: string;

  /**
   * Allow or not text area resize
   *
   */
  @Prop() resize = false;

  /*********************************
  STATE
  *********************************/
  @State() shrink = false;

  /*********************************
  METHODS
  *********************************/

  componentWillLoad() {
    this.attachExportParts();
    if (this.singleLine) {
      this.blurHandler();
    }
  }

  private attachExportParts = (): void => {
    const part = this.el.getAttribute("part");
    const exportPartsResult = exportParts(part, this.parts);
    exportPartsResult.length && (this.exportparts = exportPartsResult);
  };

  updateTextareaValue(): void {
    this.value = this.textArea.value;
  }

  handleInput = (e: KeyboardEvent): void => {
    e.stopPropagation();
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;
    this.input.emit(this.value);

    if (state.mercury && this.ai) {
      const offset = this.textArea.offsetHeight - this.textArea.clientHeight;
      this.textArea.style.height = "auto";
      this.textArea.style.height = this.textArea.scrollHeight + offset + "px";
    }
  };

  handleChange(): void {
    //formHandleValidation(this, e.target);
    this.change.emit(this.value);
  }

  private focusHandler = () => {
    if (this.singleLine) {
      this.shrink = false;
    }
  };

  private blurHandler = () => {
    if (this.singleLine) {
      this.shrink = true;
    }
  };

  private keyDownHandler = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && this.ai) {
      e.preventDefault();
      this.enter.emit(this.textArea.value);
      this.textArea.style.height = "auto";
    } else if (e.key === "ArrowUp" && this.ai) {
      this.arrowUpPressed.emit();
    }
  };

  render(): void {
    return (
      <Host
        role="textbox"
        aria-label={this.label}
        style={{ maxWidth: this.maxWidth }}
        class={{
          textarea: true,
          large: state.large,
          mercury: state.mercury,
          shrink: this.singleLine && this.shrink,
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
        {this.label ? (
          <gxg-label
            labelPosition={this.labelPosition}
            center={this.centerLabel}
            width={this.labelWidth}
          >
            {this.label}
            {requiredLabel(this)}
          </gxg-label>
        ) : null}

        <div class="textarea-wrapper" part="textarea-wrapper">
          <textarea
            ref={(el) => (this.textArea = el as HTMLTextAreaElement)}
            class={{
              "form-element": true,
              textarea: true,
              "textarea--resize": this.resize,
            }}
            placeholder={this.placeholder}
            disabled={this.disabled}
            onInput={this.handleInput}
            onChange={this.handleChange.bind(this)}
            value={this.value}
            rows={state.mercury && this.ai ? 1 : this.rows}
            required={this.required}
            style={{ height: this.height, maxHeight: this.maxHeight }}
            part="textarea"
            onFocus={this.focusHandler}
            onBlur={this.blurHandler}
            onKeyDown={this.keyDownHandler}
          ></textarea>
          {this.toolTip ? formTooltipLogic(this, true) : null}
        </div>
        {!this.toolTip ? formMessageLogic(this) : null}
      </Host>
    );
  }
}
