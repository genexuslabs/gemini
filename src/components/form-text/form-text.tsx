import { Component, Prop, Element, h, Host } from "@stencil/core";
import { IconType } from "../icon/icon";
import { formMessage } from "../../common.js";

@Component({
  tag: "gxg-form-text",
  styleUrl: "form-text.scss",
  shadow: true
})
export class FormText {
  //A reference to the input
  textInput!: HTMLInputElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * If input is disabled
   */
  @Prop() disabled = false;

  /**
   * Wether the input is inline or block
   */
  @Prop({ reflect: true }) displayBlock = false;

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
  @Prop() icon: IconType = null;

  /**
   * Input icon side
   * possible values: left, right
   */
  @Prop({ reflect: true }) iconPosition: IconPositionType = null;

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
   * The input value
   */
  @Prop({ reflect: true }) value: string;

  /**
   * If input has warning
   */
  @Prop() warning = false;

  /**
   * input width
   */
  @Prop() width = "240px";

  @Element() el: HTMLElement;

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

  updateInputValue() {
    //set the input value to the gxg-input component, so the user can catch the value
    this.value = this.textInput.value;
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
              onInput={this.updateInputValue.bind(this)}
              onChange={this.updateInputValue.bind(this)}
            ></input>
            {this.inputIcon()}
          </div>
        </div>
        {formMessage()}
      </Host>
    );
  }
}

export type IconPositionType = "left" | "right";
