import { Component, Element, Host, Prop, getAssetPath, h } from "@stencil/core";

/*********************************
CONSTANTS
*********************************/

const COLOR_MAPPINGS = {
  alwaysblack: "color-always-black",
  disabled: "color-primary-disabled",
  ondisabled: "color-on-disabled",
  error: "ds-alert-color--dark",
  negative: "color-on-primary",
  onbackground: "color-on-background",
  indeterminate: "color-primary-active",
  "primary-enabled": "color-primary-enabled",
  "primary-active": "color-primary-active",
  "primary-hover": "color-primary-hover",
  success: "ds-success-color--dark",
  warning: "ds-warning-color--dark",
  mercury: "mer-icon__primary",
  "mercury-primary": "mer-icon__primary",
  "mercury-on-primary": "mer-text__on-primary",
  "mercury-text-on-message": "mer-text__on-message",
  "mercury-neutral": "mer-icon__neutral"
};

@Component({
  tag: "gxg-icon",
  styleUrl: "icon.scss",
  shadow: true,
  assetsDirs: ["icon-assets"]
})
export class GxgIcon {
  @Element() element: HTMLElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/
  /**
   * The color of the icon.
   */
  @Prop() color: Color;

  /**
   * The size of the icon. Possible values: regular, small.
   */
  @Prop() size: Size = "regular";

  /**
   * The type of icon.
   */
  @Prop() type;

  /*********************************
  METHODS
  *********************************/

  getSrcPath() {
    return getAssetPath(`./icon-assets/${this.type}.svg`);
  }

  iconSize() {
    if (this.size === "regular") {
      return "var(--ds-icon-size--regular)";
    } else if (this.size === "small") {
      return "var(--ds-icon-size--small)";
    }
  }

  render() {
    return (
      <Host
        class={{
          "icon-size--regular": this.size === "regular",
          "icon-size--small": this.size === "small"
        }}
      >
        <ch-icon
          style={{
            "--icon-color": this.mapColorToCssVar(COLOR_MAPPINGS[this.color]),
            "--icon-size": this.iconSize()
          }}
          auto-color={this.color === "auto"}
          src={this.getSrcPath()}
          part="ch-icon"
        ></ch-icon>
      </Host>
    );
  }

  private mapColorToCssVar(color: string): string {
    //return `var(--color-on-background)`;
    return `var(--gxg-icon-color, var(--${color}))`;
  }
}

export type Color =
  | "primary-enabled"
  | "primary-active"
  | "primary-hover"
  | "onbackground"
  | "indeterminate"
  | "negative"
  | "disabled"
  | "ondisabled"
  | "error"
  | "success"
  | "warning"
  | "alwaysblack"
  | "auto"
  | "mercury"
  | "mercury-primary"
  | "mercury-on-primary"
  | "mercury-text-on-message"
  | "mercury-neutral";

export type Size = "regular" | "small";
