import { Component, Element, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-pill",
  styleUrl: "pill.scss",
  shadow: true
})
export class Pill {
  @Element() el: HTMLElement;

  /**
   * The presence of this attribute disables the pillgit a
   */
  @Prop() disabled = false;

  /**
   * The icon
   */
  @Prop() icon: PillIconType = "gemini-tools/pill-filled";

  /**
   * The presence of this attribute ads a close button that when clicked, removes the pill
   */
  @Prop({ reflect: true }) type: PillType = "static";

  removeButtonFunc() {
    this.el.classList.add("hide");
    setTimeout(() => {
      this.el.remove();
    }, 250);
  }

  render() {
    return (
      <Host tabindex="0">
        {this.disabled ? (
          <gxg-icon
            type={this.icon}
            size="small"
            color="onbackground"
          ></gxg-icon>
        ) : (
          <gxg-icon type={this.icon} size="small" color="success"></gxg-icon>
        )}

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
export type PillIconType =
  | "gemini-tools/pill-filled"
  | "gemini-tools/pill-outlined";
