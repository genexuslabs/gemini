import { Component, Prop, h, Host } from "@stencil/core";

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
  @Prop() type = "primary-text-only";

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
          "button--primary-text-only": this.type === "primary-text-only",
          "button--primary-text-icon": this.type === "primary-text-icon",
          "button--primary-icon-only": this.type === "primary-icon-only",
          "button--secondary-text-only": this.type === "secondary-text-only",
          "button--secondary-icon-only": this.type === "secondary-icon-only",
          "button--icon-only button--icon-only--secondary":
            this.type === "icon-only-secondary",
          "button--outlined": this.type === "outlined",
          "button--disabled": this.disabled === true
        }}
      >
        <button class="button-native" disabled={this.disabled === true}>
          <slot name="icon" />
          <slot />
        </button>
      </Host>
    );
  }
}
