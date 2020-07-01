import { Component, Host, Prop, h, Event, EventEmitter } from "@stencil/core";
import {
  requiredLabel,
  formMessage,
  formHandleChange,
  FormComponent
} from "../../common";

@Component({
  tag: "gxg-form-textarea",
  styleUrl: "form-textarea.scss",
  shadow: true
})
export class FormTextarea implements FormComponent {
  isRequiredError = false;

  //A reference to the input
  textArea!: HTMLTextAreaElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * Number of cols
   */
  @Prop() cols = 40;

  /**
   * If textarea is disabled
   */
  @Prop() disabled = false;

  /**
   * If textarea display is block
   */
  @Prop() displayBlock = false;

  /**
   * If textarea has errors
   */
  @Prop({ mutable: true }) error = false;

  /**
   * If textarea is full width
   */
  @Prop({ reflect: true }) fullWidth = false;

  /**
   * Optional required message
   */
  @Prop({ mutable: true }) requiredMessage: string;

  /**
   * The textarea id
   */
  @Prop() textareaId: string;

  /**
   * The textarea label
   */
  @Prop({ reflect: true }) label = "hey";

  /**
   * The textarea name
   */
  @Prop() name: string;

  /**
   * The textarea placeholder
   */
  @Prop() placeholder = "hola";

  /**
   * Number of rows
   */
  @Prop() rows = 4;

  /**
   * If required
   */
  @Prop() required = false;

  /**
   * The textarea value
   */
  @Prop({ reflect: true }) value: string;

  /**
   * If textarea has warnings
   */
  @Prop() warning = false;

  @Event() input: EventEmitter;

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
      <Host role="textbox" aria-label={this.label}>
        <label
          class={{
            label: true
          }}
          htmlFor={this.textareaId}
        >
          {this.label}
          {requiredLabel(this)}
        </label>

        <textarea
          cols={this.cols}
          rows={this.rows}
          ref={el => (this.textArea = el as HTMLTextAreaElement)}
          class={{
            textarea: true,
            "textarea--error": this.error === true,
            "textarea--warning": this.warning === true
          }}
          id={this.textareaId}
          name={this.name}
          placeholder={this.placeholder}
          disabled={this.disabled}
          onInput={this.handleInput.bind(this)}
          onChange={this.handleChange.bind(this)}
          value={this.value}
          required={this.required}
        ></textarea>

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
