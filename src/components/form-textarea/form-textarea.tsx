import {
  Component,
  Host,
  Element,
  Prop,
  h,
  Event,
  EventEmitter,
  Watch,
} from "@stencil/core";
import {
  requiredLabel,
  //formHandleValidation,
  //FormComponent,
} from "../../common/form";
import state from "../store";
import { formMessageLogic } from "../../common/form";
import { FormComponent } from "../../common/interfaces";
import { formClasses } from "../../common/classesNames";
import { exportParts } from "../../common/export-parts";
import { ValidationStatus, LabelPosition } from "../../common/types";
import { commonClassesNames } from "../../common/classesNames";
@Component({
  tag: "gxg-form-textarea",
  styleUrl: "form-textarea.scss",
  shadow: true,
})
export class GxgFormTextarea implements FormComponent {
  private parts = {
    textarea: "textarea",
  };
  private valueBeforeDisabled;
  private exportparts: string;

  @Element() el: HTMLElement;
  //A reference to the input
  textArea!: HTMLTextAreaElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

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
  METHODS
  *********************************/

  @Watch("disabled")
  disabledHandler(newValue): void {
    if (newValue === true) {
      this.valueBeforeDisabled = this.value;
      this.value = null;
    } else {
      this.value = this.valueBeforeDisabled;
    }
  }

  componentWillLoad() {
    this.attachExportParts();
  }

  private attachExportParts = (): void => {
    const part = this.el.getAttribute("part");
    const exportPartsResult = exportParts(part, this.parts);
    exportPartsResult.length && (this.exportparts = exportPartsResult);
  };

  updateTextareaValue(): void {
    this.value = this.textArea.value;
  }

  handleInput(e): void {
    //formHandleValidation(this, e.target);
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;
    this.input.emit(this.value);
  }

  handleChange(): void {
    //formHandleValidation(this, e.target);
    this.change.emit(this.value);
  }

  render(): void {
    return (
      <Host
        role="textbox"
        aria-label={this.label}
        style={{ maxWidth: this.maxWidth }}
        class={{
          textarea: true,
          large: state.large,
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

        <textarea
          ref={(el) => (this.textArea = el as HTMLTextAreaElement)}
          class={{
            "form-element": true,
            textarea: true,
            "textarea--resize": this.resize,
          }}
          placeholder={this.placeholder}
          disabled={this.disabled}
          onInput={this.handleInput.bind(this)}
          onChange={this.handleChange.bind(this)}
          value={this.disabled ? null : this.value}
          rows={this.rows}
          required={this.required}
          style={{ height: this.height }}
          part={this.parts.textarea}
        ></textarea>

        {formMessageLogic(this)}
      </Host>
    );
  }
}
