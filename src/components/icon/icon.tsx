import { Component, Element, Host, Prop, getAssetPath, h } from "@stencil/core";

/*********************************
CONSTANTS
*********************************/

const COLOR_MAPPINGS = {
  alwaysblack: "color-always-black",
  disabled: "color-primary-disabled",
  ondisabled: "color-on-disabled",
  error: "color-error-dark",
  negative: "color-on-primary",
  onbackground: "color-on-background",
  indeterminate: "color-primary-active",
  "primary-enabled": "color-primary-enabled",
  "primary-active": "color-primary-active",
  "primary-hover": "color-primary-hover",
  success: "color-success-dark",
  warning: "color-warning-dark",
  mercury: "gray-03",
};

@Component({
  tag: "gxg-icon",
  styleUrl: "icon.scss",
  shadow: true,
  assetsDirs: ["icon-assets"],
})
export class GxgIcon {
  @Element() element: HTMLElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/
  /**
   * The color of the icon.
   *
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
      return "16px";
    } else if (this.size === "small") {
      return "12px";
    }
  }

  render() {
    return (
      <Host>
        <ch-icon
          style={{
            "--icon-color": this.mapColorToCssVar(COLOR_MAPPINGS[this.color]),
            "--icon-size": this.iconSize(),
          }}
          auto-color={this.color === "auto"}
          src={this.getSrcPath()}
          part="ch-icon"
        ></ch-icon>
      </Host>
    );
  }

  private mapColorToCssVar(color: string): string {
    if (color) {
      return `var(--${color})`;
    } else {
      //default color
      return `var(--color-on-background)`;
    }
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
  | "mercury";

export type Size = "regular" | "small";
