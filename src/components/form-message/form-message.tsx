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
  @Prop() type: Message;

  render() {
    return (
      <Host>
        <gxg-icon
          style={{ "--svg-icon-small-scale": "0.5", "--icon-size": "15px" }}
          slot="icon"
          size="small"
          type={this.type}
          color={this.type}
        ></gxg-icon>
        <slot></slot>
      </Host>
    );
  }
}

export type Message = "error" | "warning";
