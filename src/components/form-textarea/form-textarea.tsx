import { Component, Host, Prop, h } from "@stencil/core";
import { formMessage } from "../../common.js";

@Component({
  tag: "gxg-form-textarea",
  styleUrl: "form-textarea.scss",
  shadow: true
})
export class FormTextarea {
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
  @Prop() error = false;

  /**
   * If textarea is full width
   */
  @Prop({ reflect: true }) fullWidth = false;

  /**
   * The textarea id
   */
  @Prop() textareaId: string;

  /**
   * The textarea label
   */
  @Prop() label: string;

  /**
   * The textarea name
   */
  @Prop() name: string;

  /**
   * The textarea placeholder
   */
  @Prop() placeholder: string;

  /**
   * Number of cols
   */
  @Prop() rows = 4;

  /**
   * The textarea value
   */
  @Prop({ reflect: true }) value: string;

  /**
   * If textarea has warnings
   */
  @Prop() warning = false;

  /*********************************
  METHODS
  *********************************/
  updateTextareaValue() {
    this.value = this.textArea.value;
  }

  render() {
    return (
      <Host role="textbox" aria-label={this.label}>
        <div class="form-element-wrapper">
          <label
            class={{
              label: true
            }}
            htmlFor={this.textareaId}
          >
            {this.label}
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
            onInput={this.updateTextareaValue.bind(this)}
            onChange={this.updateTextareaValue.bind(this)}
            value={this.value}
          ></textarea>
        </div>
        {formMessage()}
      </Host>
    );
  }
}
