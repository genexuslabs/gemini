import { Component, Element, Prop, h, Host } from "@stencil/core";
import state from "../store";
@Component({
  tag: "gxg-pill",
  styleUrl: "pill.scss",
  shadow: true,
})
export class GxgPill {
  @Element() el: HTMLElement;

  /**
   * The presence of this attribute disables the pillgit a
   */
  @Prop() disabled = false;

  /**
   * The icon
   */
  @Prop() icon: string = undefined;

  /**
   * The presence of this attribute sets auto-height. Usefull when the text overflows.
   */
  @Prop() heightAuto = false;

  /**
   * The type of pill
   */
  @Prop({ reflect: true }) type: PillType = "static";

  removeButtonFunc() {
    this.el.classList.add("hide");
    setTimeout(() => {
      this.el.remove();
    }, 250);
  }

  iconType() {
    if (this.icon !== undefined) {
      return this.icon;
    } else {
      console.log("empty icon");
      return "gemini-tools/empty";
    }
  }
  iconColor() {
    if (this.disabled) {
      return "disabled";
    } else {
      return "success";
    }
  }

  render() {
    return (
      <Host
        tabindex="0"
        class={{
          "no-icon": this.icon === undefined,
          "has-icon": this.icon !== undefined,
          large: state.large,
        }}
      >
        <gxg-icon
          class="custom"
          type={this.iconType()}
          size="regular"
          color={this.iconColor()}
        ></gxg-icon>

        <span class="title">
          <slot></slot>
        </span>
        {this.type === "button-with-action" ||
        this.type === "static-with-action" ? (
          <gxg-icon
            class="clear-button"
            type="gemini-tools/close"
            size="small"
            color="onbackground"
            onClick={this.removeButtonFunc.bind(this)}
          ></gxg-icon>
        ) : null}
      </Host>
    );
  }
}

export type PillType =
  | "static"
  | "static-with-action"
  | "button"
  | "button-with-action";
