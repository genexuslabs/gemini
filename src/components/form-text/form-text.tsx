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
  @Prop() icon: IconType = null;

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
  @Prop() minimal = true;

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

  @Element() el: HTMLElement;

  /**
   * Returns the input value
   */
  @Event() input: EventEmitter;

  /**
   * Returns the input value
   */
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
    this.input.emit(target.value);
    formHandleChange(this, e.target);
  }

  handleChange(e) {
    const target = e.target as HTMLInputElement;
    this.change.emit(target.value);
    formHandleChange(this, e.target);
  }

  clearButtonFunc() {
    this.el.shadowRoot.querySelector("input").value = "";
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
              type="text"
              value={this.value}
              class={{
                input: true,
                "input--error": this.error === true,
                "input--warning": this.warning === true
              }}
              placeholder={this.placeholder}
              disabled={this.disabled}
              onInput={this.handleInput.bind(this)}
              onChange={this.handleChange.bind(this)}
              required={this.required}
            ></input>
            {this.inputIcon()}
            {this.clearButton ? (
              <gxg-icon
                class="clear-button"
                type="close"
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

export type IconPosition = "left" | "right";
