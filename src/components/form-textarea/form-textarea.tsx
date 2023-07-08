import {
  Component,
  Host,
  Prop,
  h,
  Event,
  EventEmitter,
  Method,
  Element,
} from "@stencil/core";
import {
  requiredLabel,
  formMessage,
  //formHandleValidation,
  //FormComponent,
} from "../../common/form";
import state from "../store";
import { formMessageLogic } from "../../common/form";
import { FormComponent } from "../../common/interfaces";
import { formClasses } from "../../common/classes-names";

@Component({
  tag: "gxg-form-textarea",
  styleUrl: "form-textarea.scss",
  shadow: true,
})
export class GxgFormTextarea implements FormComponent {
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
   *
   */
  @Prop({ mutable: true }) validationStatus:
    | "indeterminate"
    | "warning"
    | "error"
    | "success";

  /**
   * A function that will return true or false depending on wether the
   * error condition is met or not
   */
  @Prop() errorCondition: Function;

  /**
   * A function that will return true or false depending on wether the
   * warning condition is met or not
   */
  @Prop() warningCondition: Function;

  /**
   * The presence of this attribute will display validation styles, such as a red, orange, or green border dependening on the validation status
   *
   */
  @Prop() displayValidationStyles = false;

  /**
   * The presence of this attribute will display validation styles, such as a red, orange, or green border dependening on the validation status
   *
   */
  @Prop() displayValidationMessage = false;

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

  /*********************************
  METHODS
  *********************************/
  @Method()
  async validate(): Promise<boolean> {
    this.handleValidation();
    if (this.validationStatus === "error") {
      return false;
    } else {
      return true;
    }
  }
  handleValidation = (): void => {
    this.handleError();
    this.handleWarning();
  };
  handleError = (): void => {
    const hasError =
      (this.required && !this.textArea.value.length) ||
      (this.errorCondition && this.errorCondition());
    if (hasError) {
      this.validationStatus = "error";
    } else {
      this.validationStatus = "indeterminate";
    }
  };
  handleWarning = (): void => {
    const hasWarning = this.warningCondition && this.warningCondition();
    if (hasWarning) {
      this.validationStatus === "warning";
    } else {
      this.validationStatus === "indeterminate";
    }
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
          [formClasses["DISPLAY_VALIDATION_STYLES_CLASS"]]: this
            .displayValidationStyles,
          [formClasses["VALIDATION_INDETERMINATE_CLASS"]]:
            this.validationStatus === "indeterminate",
          [formClasses["VALIDATION_WARNING_CLASS"]]:
            this.validationStatus === "warning",
          [formClasses["VALIDATION_ERROR_CLASS"]]:
            this.validationStatus === "error",
          [formClasses["VALIDATION_SUCCESS_CLASS"]]:
            this.validationStatus === "success",
        }}
      >
        {this.label ? (
          <gxg-label
            class={{
              label: true,
            }}
          >
            {this.label}
            {requiredLabel(this)}
          </gxg-label>
        ) : (
          ""
        )}

        <textarea
          ref={(el) => (this.textArea = el as HTMLTextAreaElement)}
          class={{
            "form-element": true,
            textarea: true,
            "textarea--error": this.error === true,
            "textarea--warning": this.warning === true,
          }}
          placeholder={this.placeholder}
          disabled={this.disabled}
          onInput={this.handleInput.bind(this)}
          onChange={this.handleChange.bind(this)}
          value={this.value}
          rows={this.rows}
          required={this.required}
          style={{ height: this.height }}
        ></textarea>

        {formMessageLogic(this)}
      </Host>
    );
  }
}
