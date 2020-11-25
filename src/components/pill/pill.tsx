import { Component, Element, Prop, h, Host } from "@stencil/core";
@Component({
  tag: "gxg-pill",
  styleUrl: "pill.scss",
  shadow: true
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
  @Prop() icon: string;

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
    if (this.type === "button") {
      return "gemini-tools/pill-outlined";
    } else if (this.type === "button-with-action") {
      return "gemini-tools/pill-filled";
    } else {
      return this.icon;
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
      <Host tabindex="0">
        <gxg-icon
          type={this.iconType()}
          size="small"
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
