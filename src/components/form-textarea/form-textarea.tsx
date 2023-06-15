import { Component, Host, Prop, h, Event, EventEmitter } from "@stencil/core";
import {
  requiredLabel,
  formMessage,
  formHandleChange,
  FormComponent,
} from "../../common";
import state from "../store";

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
   * The presence of this attribute makes the textarea disabled
   */
  @Prop() disabled = false;

  /**
   * The presence of this attribute gives the component error styles
   */
  @Prop({ mutable: true }) error = false;

  /**
   * The required message if this input is required and no value is provided (optional). If this is not provided, the default browser required message will show up
   */
  @Prop({ mutable: true }) validationMessage: string;

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
   * The presence of this attribute makes the textarea required
   */
  @Prop() required = false;

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
  METHODS
  *********************************/
  updateTextareaValue() {
    this.value = this.textArea.value;
  }

  handleInput(e) {
    formHandleChange(this, e.target);

    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;
    this.input.emit(this.value);
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
        style={{ maxWidth: this.maxWidth }}
        class={{
          large: state.large,
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

        {formMessage(
          this.hideValidationMessage ? (
            <gxg-form-message type="error" key="required-error">
              {this.validationMessage}
            </gxg-form-message>
          ) : null
        )}
      </Host>
    );
  }
}
