import {
  Component,
  Prop,
  Element,
  h,
  Host,
  Event,
  EventEmitter
} from "@stencil/core";
import { IconType } from "../icon/icon";
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
   * If input is disabled
   */
  @Prop() disabled = false;

  /**
   * If input has errors
   */
  @Prop({ mutable: true }) error = false;

  /**
   * If input is full width
   */
  @Prop({ reflect: true }) fullWidth = false;

  /**
   * Input icon
   * possible values: the same as the values for the icon component
   */
  @Prop() icon: IconType = null;

  /**
   * Input icon side
   * possible values: left, right
   */
  @Prop({ reflect: true }) iconPosition: IconPosition = null;

  /**
   * The input id
   */
  @Prop() inputId: string;

  /**
   * The input label
   */
  @Prop() label: string;

  /**
   * The input name
   */
  @Prop() name: string;

  /**
   * The input placeholder
   */
  @Prop() placeholder: string;

  /**
   * If required
   */
  @Prop({ reflect: true }) required = false;

  /**
   * Optional required message
   */
  @Prop({ mutable: true }) requiredMessage: string;

  /**
   * The input value
   */
  @Prop({ reflect: true }) value: string;

  /**
   * If this property is true, the border, the icon, and the background will be invisible.
   */
  @Prop({ reflect: true }) readOnly: false;

  /**
   * If input has warning
   */
  @Prop() warning = false;

  /**
   * input width
   */
  @Prop() width = "240px";

  @Element() el: HTMLElement;

  @Event() input: EventEmitter;

  @Event() change: EventEmitter;

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
    this.input.emit(this.value);

    formHandleChange(this, e.target);
  }

  handleChange(e) {
    formHandleChange(this, e.target);
    this.change.emit(this.value);
  }

  render() {
    return (
      <Host
        role="textbox"
        aria-label={this.label}
        icon-position={this.iconPositionFunc()}
        style={{
          width: this.width
        }}
      >
        <div class="outer-wrapper">
          <label
            class={{
              label: true
            }}
            htmlFor={this.inputId}
          >
            {this.label}
            {requiredLabel(this)}
          </label>
          <div class="inner-wrapper">
            <input
              type="text"
              value={this.value}
              class={{
                input: true,
                "input--error": this.error === true,
                "input--warning": this.warning === true
              }}
              id={this.inputId}
              name={this.name}
              placeholder={this.placeholder}
              disabled={this.disabled}
              onInput={this.handleInput.bind(this)}
              onChange={this.handleChange.bind(this)}
              required={this.required}
            ></input>
            {this.inputIcon()}
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

export type IconPosition = "left" | "right";
