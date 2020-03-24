import { Component, Host, Prop, h } from "@stencil/core";
import { IconType } from "../icon/icon";

@Component({
  tag: "gxg-form-input",
  styleUrl: "form-input.scss",
  shadow: true
})
export class FormInput {
  //A reference to the input
  textInput!: HTMLInputElement;

  /**
   * If input has errors
   */
  @Prop() error = false;

  /**
   * If input is disabled
   */
  @Prop() disabled = false;

  /**
   * Input icon
   * possible values: the same as the values for the icon component
   */
  @Prop() icon: IconType;

  /**
   * Input icon side
   * possible values: left, right
   */
  @Prop() iconSide = "left";

  /**
   * The input id
   */
  @Prop() inputId: string;

  /**
   * Wether the input is inline or block
   */
  @Prop({ reflect: true }) inline = false;

  /**
   * The input label
   */
  @Prop() label: string;

  /**
   * The input label position
   * possible values: top, left
   */
  @Prop() labelPosition = "left";

  /**
   * The input name
   */
  @Prop() name: string;

  /**
   * The kind of input
   * Possible values: checkbox
   */
  @Prop() type: string;

  /**
   * The input value
   */
  @Prop({ reflect: true }) value: string;

  /**
   * The input placeholder
   */
  @Prop() placeholder: string;

  /**
   * If input has warning
   */
  @Prop() warning = false;

  updateInputValue() {
    //set the input value to the gxg-input component, so the user can catch the value
    this.value = this.textInput.value;
  }

  inputIcon() {
    if (this.icon) {
      console.log("this.icon");
      if (this.warning) {
        console.log("this.warning");
        return (
          <gxg-icon
            slot="icon"
            type={this.icon}
            size="small"
            color="warning"
          ></gxg-icon>
        );
      }
      if (this.error) {
        console.log("this.error");
        return (
          <gxg-icon
            slot="icon"
            type={this.icon}
            size="small"
            color="error"
          ></gxg-icon>
        );
      }
      return (
        <gxg-icon
          slot="icon"
          type={this.icon}
          size="small"
          style={{ opacity: "0.5" }}
        ></gxg-icon>
      );
    }
  }

  render() {
    return (
      <Host value={this.value}>
        <div class="form-element-wrapper">
          <label
            class={{
              label: true,
              inline: this.inline,
              "label--above": this.labelPosition === "above"
            }}
            htmlFor={this.inputId}
          >
            {this.label}
          </label>
          <div class="inner-wrapper">
            <input
              ref={el => (this.textInput = el as HTMLInputElement)}
              class={{
                input: true,
                "input--error": this.error === true,
                "input--warning": this.warning === true
              }}
              type={this.type}
              id={this.inputId}
              name={this.name}
              placeholder={this.placeholder}
              disabled={this.disabled}
              onKeyUp={this.updateInputValue.bind(this)}
            ></input>
            {this.inputIcon()}
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}

export type labelPosition = "left" | "above";
