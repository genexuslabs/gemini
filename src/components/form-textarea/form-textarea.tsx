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
   * If textarea display is block
   */
  @Prop() displayBlock = false;

  /**
   * If textarea is disabled
   */
  @Prop() disabled = false;

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
   * The textarea placeholder
   */
  @Prop() rows = 3;

  /**
   * The textarea value
   */
  @Prop({ reflect: true }) value: string;

  /**
   * If textarea has warnings
   */
  @Prop() warning = false;

  /**
   * The textarea width
   */
  @Prop() width = "240px";

  updateTextareaValue() {
    this.value = this.textArea.value;
  }

  render() {
    return (
      <Host
        value={this.value}
        style={{
          width: this.width
        }}
      >
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
            onKeyUp={this.updateTextareaValue.bind(this)}
          >
            {this.value}
          </textarea>
        </div>
        <div class="messages-wrapper"></div>
      </Host>
    );
  }
}
