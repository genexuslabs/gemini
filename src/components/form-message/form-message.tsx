import { Component, Host, Prop, h } from "@stencil/core";
import state from "../store";

@Component({
  tag: "gxg-form-message",
  styleUrl: "form-message.scss",
  shadow: true,
})
export class GxgFormMessage {
  /**
   * The type of message
   */
  @Prop() type: Message = "indeterminate";

  iconType() {
    if (this.type === "error") {
      return "gemini-tools/error";
    } else if (this.type === "warning") {
      return "gemini-tools/warning";
    } else if (this.type === "success") {
      return "gemini-tools/success";
    }
  }

  private iconColor = () => {
    if (
      this.type === "warning" ||
      this.type === "error" ||
      this.type === "success"
    ) {
      return this.type;
    } else {
      return "auto";
    }
  };

  render() {
    return (
      <Host
        class={{
          large: state.large,
        }}
      >
        {this.type !== "indeterminate" ? (
          <gxg-icon
            style={{ "--icon-size": "15px" }}
            slot="icon"
            size="small"
            type={this.iconType()}
            color={this.iconColor()}
          ></gxg-icon>
        ) : null}
        <slot></slot>
      </Host>
    );
  }
}

export type Message = "indeterminate" | "warning" | "error" | "success";
