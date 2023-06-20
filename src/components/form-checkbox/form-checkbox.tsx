import {
  Component,
  Element,
  Host,
  Prop,
  h,
  Event,
  EventEmitter,
  Watch,
  Method,
} from "@stencil/core";
import { formMessageLogic } from "../../common/form";
import { FormComponent } from "../../common/interfaces";
import { formClasses } from "../../common/classes-names";
import state from "../store";

@Component({
  tag: "gxg-form-checkbox",
  styleUrl: "form-checkbox.scss",
  shadow: { delegatesFocus: true },
})
export class GxgFormCheckbox implements FormComponent {
  @Element() el: HTMLElement;

  //A reference to the input
  checkboxInput!: HTMLInputElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * The checkbox id
   */
  @Prop() checkboxId: string;

  /**
   * The presence of this attribute makes the checkbox checked by default
   */
  @Prop({ reflect: false }) checked = false;

  /**
   * The presence of this attribute makes the checkbox indeterminate
   */
  @Prop({ reflect: true }) indeterminate = false;

  /**
   * The presence of this attribute disables the checkbox
   */
  @Prop() disabled = false;

  /**
   * The checkbox label
   */
  @Prop() label: string | undefined = undefined;

  /**
   * The checkbox value
   */
  @Prop() value: string;

  /**
   * The checkbox name
   */
  @Prop() name: string;

  /**
   * The checkbox icon
   */
  @Prop() iconName: string = undefined;

  @Event() change: EventEmitter;

  /*VALIDATION*/

  /**
   * The presence of this attribute makes the commbo required
   */
  @Prop({ reflect: true }) required = false;

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
   * The presence of this attribute will check the input validity on every user input
   *
   */
  @Prop() validateOnChange = false;

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
   * The logic for displaying or hidding the validation messages
   *
   */
  formMessageLogic = formMessageLogic;

  /*********************************
  METHODS
  *********************************/

  @Method()
  async validate(): Promise<void> {
    this.handleValidation();
  }

  handleValidation = (): void => {
    this.handleError();
    this.handleWarning();
  };
  handleError = (): void => {
    const hasError =
      (this.required && !this.checked) ||
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

  compontentDidLoad() {
    if (this.checked && this.disabled) {
      this.checked = false;
      this.checkboxInput.removeAttribute("checked");
    }
  }

  changed() {
    this.checked = this.checkboxInput.checked;
  }

  @Watch("checked")
  checkedHandler() {
    this.change.emit({
      "checkbox id": this.checkboxId,
      "checkbox value": this.checked,
    });
    if (this.validateOnChange) {
      this.handleValidation();
    }
  }

  handlerOnKeyUp(event) {
    if (event.code == "Enter") {
      this.checked = !this.checked;
    }
  }

  private handleGxgLabelClick = () => {
    this.checkboxInput.click();
  };

  ariaChecked() {
    if (this.checked) {
      return "true";
    } else {
      return "false";
    }
  }

  handleInputClick(e) {
    e.stopPropagation();
  }

  icon() {
    if (this.iconName) {
      return (
        <gxg-icon type={this.iconName} color="auto" size="small"></gxg-icon>
      );
    }
  }

  render() {
    return (
      <Host
        role="checkbox"
        value={this.value}
        aria-checked={this.ariaChecked}
        aria-label={this.label}
        class={{
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
        <div class="gxg-form-checkbox__wrapper">
          {this.label ? (
            <gxg-label class="label" onClick={this.handleGxgLabelClick}>
              <input
                ref={(el) => (this.checkboxInput = el as HTMLInputElement)}
                type="checkbox"
                checked={this.checked}
                class="input"
                id={this.checkboxId}
                name={this.name}
                value={this.value}
                disabled={this.disabled}
                onChange={this.changed.bind(this)}
                onKeyUp={this.handlerOnKeyUp.bind(this)}
                tabindex="0"
                onClick={this.handleInputClick}
              ></input>
              <span
                class={{
                  checkmark: true,
                  "no-label": !this.label,
                  "has-icon": !!this.iconName,
                  "form-element": true,
                }}
                role="checkbox"
              ></span>
              {this.icon()}
              {this.label}
            </gxg-label>
          ) : null}
        </div>
        {this.formMessageLogic(this)}
      </Host>
    );
  }
}
