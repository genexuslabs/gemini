import { Component, Host, Prop, h } from "@stencil/core";

@Component({
  tag: "gxg-form-message",
  styleUrl: "form-message.scss",
  shadow: true
})
export class GxgFormMessage {
  /**
   * The type of message
   */
  @Prop() type: Message;

  iconColor() {
    if (this.type === "error") {
      return "error";
    } else if (this.type === "warning") {
      return "warning";
    }
  }

  iconType() {
    if (this.type === "error") {
      return "gemini-tools/error";
    } else if (this.type === "warning") {
      return "gemini-tools/warning";
    }
  }

  render() {
    return (
      <Host>
        <gxg-icon
          style={{ "--icon-size": "15px" }}
          slot="icon"
          size="small"
          type={this.iconType()}
          color={this.iconColor()}
        ></gxg-icon>
        <slot></slot>
      </Host>
    );
  }
}

export type Message = "error" | "warning";
