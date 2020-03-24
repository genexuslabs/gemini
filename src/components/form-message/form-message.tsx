import { Component, Host, Prop, h } from "@stencil/core";

@Component({
  tag: "gxg-form-message",
  styleUrl: "form-message.scss",
  shadow: true
})
export class FormMessage {
  /**
   * The kind of message
   * Possible values: error, warning
   */
  @Prop() messageType: string;

  iconType(): "error" | "warning" {
    if (this.messageType === "error") {
      return "error";
    }
    if (this.messageType === "warning") {
      return "warning";
    }
  }

  render() {
    return (
      <Host
        class={{
          message: true,
          "message--error": this.messageType === "error",
          "message--warning": this.messageType === "warning"
        }}
      >
        <gxg-icon
          slot="icon"
          size="small"
          type={this.iconType()}
          color={this.iconType()}
        ></gxg-icon>
        <slot></slot>
      </Host>
    );
  }
}

export type messageType = "error" | "warning";
