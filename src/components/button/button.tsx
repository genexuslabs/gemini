import { Component, Element, h, Host, Prop } from "@stencil/core";
import { IconType, Color } from "../icon/icon";

@Component({
  tag: "gxg-button",
  styleUrl: "button.scss",
  shadow: true
})
export class Button {
  @Element() el: HTMLElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * The state of the button, whether it is disabled or not
   */
  @Prop() disabled = false;

  /**
   * The presence of this attribute makes the component full-width
   */
  @Prop() fullWidth = false;

  /**
   * The button icon
   */
  @Prop() icon: IconType;

  /**
   * The kind of button
   */
  @Prop() type: ButtonType = "primary-text-only";

  /*********************************
  METHODS
  *********************************/

  componentDidLoad() {
    // Set aria-label to host
    if (
      this.type === "primary-icon-only" ||
      this.type === "secondary-icon-only"
      //If button type is icon-only, aria-label must be provided in order to inform the user the button purpose.
    ) {
      if (this.el.querySelector(":scope > [slot='icon']")) {
        //Also, an icon must be provided, in order to know the button purpose.
        //The icon purpose is defined from the icon "type" property.
        const iconAriaLabel = this.el
          .querySelector(":scope > [slot='icon']")
          .getAttribute("type");
        this.el.setAttribute("aria-label", iconAriaLabel);
      }
    }
  }

  ghostIcon() {
    if (
      this.type === "primary-text-only" ||
      this.type === "secondary-text-only"
    ) {
      return <gxg-icon class="ghost-icon" type="empty"></gxg-icon>;
      //This is a workaround I found for alligning vertically the buttons that have no icon, with the buttons that do have icons.
    }
  }
  regularIcon() {
    if (
      this.type !== "primary-text-only" &&
      this.type !== "secondary-text-only"
    ) {
      return <gxg-icon type={this.icon} color={this.iconColor()}></gxg-icon>;
    }
  }

  iconColor() {
    let iColor: Color;
    if (this.type.includes("primary")) {
      iColor = "negative";
    } else if (this.type.includes("secondary")) {
      iColor = "primary";
    } else {
      iColor = "onbackground";
    }
    return iColor;
  }

  render() {
    return (
      <Host
        role="button"
        class={{
          button: true,
          "button--primary-text-only": this.type === "primary-text-only",
          "button--primary-text-icon": this.type === "primary-text-icon",
          "button--primary-icon-only": this.type === "primary-icon-only",
          "button--secondary-text-only": this.type === "secondary-text-only",
          "button--secondary-text-icon": this.type === "secondary-text-icon",
          "button--secondary-icon-only": this.type === "secondary-icon-only",
          "button--outlined": this.type === "outlined",
          "button--disabled": this.disabled === true,
          "button--tertiary": this.type === "tertiary",
          "button--fullwidth": this.fullWidth === true
        }}
      >
        <button
          class="button-native gxg-text-general"
          disabled={this.disabled === true}
        >
          {this.ghostIcon()}
          {this.regularIcon()}

          <span class="text">
            <slot />
          </span>
        </button>
      </Host>
    );
  }
}

export type ButtonType =
  | "primary-text-only"
  | "primary-text-icon"
  | "primary-icon-only"
  | "secondary-text-only"
  | "secondary-text-icon"
  | "secondary-icon-only"
  | "outlined"
  | "tertiary";
