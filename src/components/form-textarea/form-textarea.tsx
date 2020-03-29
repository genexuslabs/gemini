import { Component, Host, Prop, h } from "@stencil/core";

@Component({
  tag: "gxg-form-textarea",
  styleUrl: "form-textarea.scss",
  shadow: true
})
export class FormTextarea {
  //A reference to the input
  textArea!: HTMLTextAreaElement;

  /**
   * The textarea id
   */
  @Prop() inputId: string;

  /**
   * The textarea name
   */
  @Prop() name: string;

  /**
   * The textarea value
   */
  @Prop({ reflect: true }) value: string;

  /**
   * The textarea label
   */
  @Prop() label: string;

  /**
   * The textarea placeholder
   */
  @Prop() placeholder: string;

  /**
   * If textarea is disabled
   */
  @Prop() disabled = false;

  /**
   * If textarea has errors
   */
  @Prop() error = false;

  /**
   * If textarea has warnings
   */
  @Prop() warning = false;

  updateTextareaValue() {
    //set the textarea value to the gxg-textarea component, so the user can catch the value
    this.value = this.textArea.value;
  }

  render() {
    return (
      <Host value={this.value}>
        <div class="form-element-wrapper">
          <label
            class={{
              label: true
            }}
            htmlFor={this.inputId}
          >
            {this.label}
          </label>

          <textarea
            ref={el => (this.textArea = el as HTMLTextAreaElement)}
            class={{
              textarea: true,
              "textarea--error": this.error === true,
              "textarea--warning": this.warning === true
            }}
            id={this.inputId}
            name={this.name}
            placeholder={this.placeholder}
            disabled={this.disabled}
            onKeyUp={this.updateTextareaValue.bind(this)}
          ></textarea>
          <slot></slot>
        </div>
        <div class="messages-wrapper"></div>
      </Host>
    );
  }
}

export type labelPosition = "left" | "above";
