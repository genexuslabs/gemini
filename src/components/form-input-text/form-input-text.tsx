import { Component, Prop, Element } from "@stencil/core";
import { IconType } from "../icon/icon";

@Component({
  tag: "gxg-form-input-text",
  styleUrl: "form-input-text.scss",
  shadow: true
})
export class FormInputText {
  //A reference to the input
  textInput!: HTMLInputElement;

  /**
   * If input is disabled
   */
  @Prop() disabled = false;

  /**
   * If input has errors
   */
  @Prop() error = false;

  /**
   * If input is full width
   */
  @Prop({ reflect: true }) fullWidth = false;

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
  @Prop({ reflect: true }) displayBlock = false;

  /**
   * The input label
   */
  @Prop() label: string;

  /**
   * The input name
   */
  @Prop() name: string;

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

  /**
   * input width
   */
  @Prop() width = "240px";

  @Element() el: HTMLElement;

  componentDidLoad() {
    this.value = this.el.getAttribute("value");
  }

  updateInputValue() {
    //set the input value to the gxg-input component, so the user can catch the value
    this.value = this.textInput.value;
  }

  inputIcon() {
    if (this.icon) {
      if (this.warning) {
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
      <Host
        value={this.value}
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
          </label>
          <div class="inner-wrapper">
            <input
              type="text"
              ref={el => (this.textInput = el as HTMLInputElement)}
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
              onKeyUp={this.updateInputValue.bind(this)}
            ></input>
            {this.inputIcon()}
            <slot></slot>
          </div>
        </div>
        <div class="messages-wrapper"></div>
      </Host>
    );
  }
}

export type labelPosition = "left" | "above";
