import { Component, Element, Prop, h, Host } from "@stencil/core";
import { IconType } from "../icon/icon";

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
  @Prop() icon: IconType = "pill-filled";

  /**
   * The presence of this attribute ads a close button that when clicked, removes the pill
   */
  @Prop() removeButton = false;

  /**
   * The label
   */
  @Prop() label: string;

  removeButtonFunc() {
    this.el.classList.add("hide");
    setTimeout(() => {
      this.el.remove();
    }, 250);
  }

  render() {
    return (
      <Host>
        {this.disabled ? (
          <gxg-icon
            type={this.icon}
            size="small"
            color="onbackground"
          ></gxg-icon>
        ) : (
          <gxg-icon type={this.icon} size="small" color="success"></gxg-icon>
        )}

        <span class="title">{this.label}</span>
        {this.removeButton ? (
          <gxg-icon
            class="clear-button"
            type="close"
            size="small"
            color="onbackground"
            onClick={this.removeButtonFunc.bind(this)}
          ></gxg-icon>
        ) : null}
      </Host>
    );
  }
}