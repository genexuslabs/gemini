import { Component, Host, Prop, h } from "@stencil/core";
import state from "../store";
import { Color as IconColor } from "../icon/icon";
@Component({
  tag: "gxg-text",
  styleUrl: "text.scss",
  shadow: true,
})
export class GxgText {
  /**
   * The href (for "link" or "link-gray" types
   */
  @Prop() href: string;

  /**
   * Disables the interactive types of text
   */
  @Prop() disabled = false;

  /**
   * The target (for "link" or "link-gray" types
   * */
  @Prop() target: TargetType = "_self";

  /**
   * Text type
   */
  @Prop({ reflect: true }) type: TextType = "text-regular";

  /**
   * Text alignment
   */
  @Prop({ reflect: true }) textAlign: TextAlign = "start";

  /**
   * Text padding
   */
  @Prop({ reflect: true }) padding: TextPadding = "none";

  /**
   * Max. width
   */
  @Prop({ reflect: true }) maxWidth = "100%";

  /**
   * The gemini icon type
   */
  @Prop() icon: string;

  /**
   * The icon alignment on the vertical axis.
   */
  @Prop() iconAlign: "top" | "center" = "center";

  /**
   * It will force the icon color to be auto
   */
  @Prop() iconAuto = false;

  /**
   * Italic (only for mercury)
   */
  @Prop({ reflect: true }) italic = false;

  textType() {
    let text;
    switch (this.type) {
      case "text-regular":
        text = (
          <p style={{ maxWidth: this.maxWidth }} class="gxg-text">
            {<slot></slot>}
          </p>
        );
        break;
      case "text-gray":
        text = (
          <p style={{ maxWidth: this.maxWidth }} class="gxg-text--gray">
            {<slot></slot>}
          </p>
        );
        break;
      case "text-quote":
        text = (
          <q style={{ maxWidth: this.maxWidth }} class="gxg-quote">
            {<slot></slot>}
          </q>
        );
        break;
      case "text-link":
        text = (
          <a
            style={{ maxWidth: this.maxWidth }}
            href={this.href}
            target={this.target}
            class={{ "gxg-link": true, disabled: this.disabled }}
          >
            {<slot></slot>}
          </a>
        );
        break;
      case "text-link-no-line":
        text = (
          <a
            style={{ maxWidth: this.maxWidth }}
            href={this.href}
            target={this.target}
            class={{
              "gxg-link": true,
              "no-line": true,
              disabled: this.disabled,
            }}
          >
            {<slot></slot>}
          </a>
        );
        break;
      case "text-link-gray":
        text = (
          <a
            style={{ maxWidth: this.maxWidth }}
            href={this.href}
            target={this.target}
            class={{ "gxg-link-gray": true, disabled: this.disabled }}
          >
            {<slot></slot>}
          </a>
        );
        break;
      case "text-link-gray-no-line":
        text = (
          <a
            style={{ maxWidth: this.maxWidth }}
            href={this.href}
            target={this.target}
            class={{
              "gxg-link-gray": true,
              "no-line": true,
              disabled: this.disabled,
            }}
          >
            {<slot></slot>}
          </a>
        );
        break;
      case "text-alert-error":
        text = (
          <p style={{ maxWidth: this.maxWidth }} class="gxg-alert-error">
            {<slot></slot>}
          </p>
        );
        break;
      case "text-alert-warning":
        text = (
          <p style={{ maxWidth: this.maxWidth }} class="gxg-alert-warning">
            {<slot></slot>}
          </p>
        );
        break;
      case "text-alert-success":
        text = (
          <p style={{ maxWidth: this.maxWidth }} class="gxg-alert-success">
            {<slot></slot>}
          </p>
        );
        break;
      case "button-like":
        text = (
          <button class={{ "gxg-button-like": true, disabled: this.disabled }}>
            {<slot></slot>}
          </button>
        );
        break;
      default:
        text = (
          <p
            style={{ maxWidth: this.maxWidth }}
            class={{ "gxg-text": true, disabled: this.disabled }}
          >
            {<slot></slot>}
          </p>
        );
    }
    return text;
  }

  private evaluateIconColor = (): IconColor => {
    if (this.iconAuto) {
      return "auto";
    }
    if (state.mercury && this.type === "text-regular") {
      return "mercury";
    } else if (state.mercury && this.type === "text-link") {
      return "primary-enabled";
    }
    return "auto";
  };

  render() {
    return (
      <Host
        class={{
          large: state.large,
          mercury: state.mercury,
          icon: this.icon !== undefined,
          "icon--center": this.iconAlign === "center",
          "icon--top": this.iconAlign === "top",
        }}
      >
        <div class="wrapper">
          {this.icon ? (
            <gxg-icon
              type={this.icon}
              color={this.evaluateIconColor()}
            ></gxg-icon>
          ) : null}
          {this.textType()}
        </div>
      </Host>
    );
  }
}

export type TextType =
  | "text-regular"
  | "text-gray"
  | "text-quote"
  | "text-link"
  | "text-link-no-line"
  | "text-link-gray"
  | "text-link-gray-no-line"
  | "text-alert-error"
  | "text-alert-warning"
  | "text-alert-success"
  | "button-like";

export type TargetType = "_self" | "_blank";
export type TextAlign = "start" | "center" | "end";
export type TextPadding = "none" | "s" | "m";
