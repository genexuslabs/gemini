import { Component, Host, Prop, h } from "@stencil/core";

@Component({
  tag: "gxg-button",
  styleUrl: "button.scss",
  shadow: true
})
export class Button {
  /**
   * The kind of button
   * Possible values: primary-text-only, primary-text-icon, primary-icon-only, secondary-text-only, secondary-icon-only, outlined
   */
  @Prop() type: ButtonType = "primary-text-only";

  /**
   * The state of the button. Whether is disabled or not.
   * Possible values: false, true
   */
  @Prop() disabled = false;

  render() {
    return (
      <Host
        class={{
          button: true,
          "button--primary button--primary-text-only":
            this.type === "primary-text-only",
          "button--primary button--primary-text-icon":
            this.type === "primary-text-icon",
          "button--primary button--primary-icon-only":
            this.type === "primary-icon-only",
          "button--secondary button--secondary-text-only":
            this.type === "secondary-text-only",
          "button--secondary button--secondary-text-icon":
            this.type === "secondary-text-icon",
          "button--secondary button--secondary-icon-only":
            this.type === "secondary-icon-only",
          "button--secondary button--icon-only button--icon-only--secondary":
            this.type === "icon-only-secondary",
          "button--outlined": this.type === "outlined",
          "button--disabled": this.disabled === true
        }}
      >
        <button
          class="button-native gxg-text-general"
          disabled={this.disabled === true}
        >
          <slot name="icon" />
          <slot />
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
  | "icon-only-secondary"
  | "outlined";
