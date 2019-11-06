import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-button",
  styleUrl: "button.scss",
  shadow: true
})
export class MyComponent {
  /**
   * The kind of button
   * Possible values: primary, secondary, text-only, icon-only
   */

  @Prop() type = "primary";
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
          "button--primary": this.type === "primary",
          "button--outlined": this.type === "outlined",
          "button--text-only": this.type === "text-only",
          "button--icon-only": this.type === "icon-only",
          "button--icon-only button--icon-only--secondary":
            this.type === "icon-only-secondary",
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
