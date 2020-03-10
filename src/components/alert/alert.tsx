import { Component, Host, Prop, h, Watch } from "@stencil/core";

@Component({
  tag: "gxg-alert",
  styleUrl: "alert.scss",
  shadow: true
})
export class Alert {
  constructor() {
    this.setAlertInactive = this.setAlertInactive.bind(this);
  }

  /**
   * The type of alert
   * Possible values: more-info, error, warning, success
   */
  @Prop() type: AlertType = "more-info";
  /**
   * The title
   */
  @Prop() alertTitle: string;
  /**
   * An attribute that determines wether the alert is active (visible) or not (not visible)
   *
   */
  @Prop({ reflect: true }) active: boolean;

  iconColor(): "onbackground" | "negative" | "error" | "success" | "warning" {
    if (this.type === "more-info") return "negative";
    if (this.type === "error") return "error";
    if (this.type === "warning") return "warning";
    if (this.type === "success") return "success";
  }

  closeIconColor(): "onbackground" | "negative" {
    if (this.type === "more-info") {
      return "negative";
    } else {
      return "onbackground";
    }
  }

  setAlertInactive() {
    this.active = false;
  }

  @Watch("active")
  validateName(newValue: boolean) {
    if (newValue === true) {
      setTimeout(() => {
        this.setAlertInactive();
      }, 3500);
    }
  }

  render() {
    return (
      <Host
        class={{
          active: this.active === true
        }}
      >
        <div
          class={{
            "alert-message": true,
            "alert-message--more-info": this.type === "more-info",
            "alert-message--error": this.type === "error",
            "alert-message--warning": this.type === "warning",
            "alert-message--success": this.type === "success"
          }}
        >
          <div class="alert-message--container">
            <div class="alert-message--icon">
              <gxg-icon
                color={this.iconColor()}
                slot="icon"
                type={this.type}
              ></gxg-icon>
            </div>
            <div class="alert-message-title-description">
              <h2 class="alert-message--title">{this.alertTitle}</h2>
              <p class="alert-message--description">
                <slot></slot>
              </p>
            </div>
          </div>
          <div class="alert-message-close">
            <gxg-button
              type="secondary-icon-only"
              onClick={this.setAlertInactive}
            >
              <gxg-icon
                slot="icon"
                color={this.closeIconColor()}
                type="close"
                style={{ "--color-on-background": "#000" }}
              ></gxg-icon>
            </gxg-button>
          </div>
        </div>
      </Host>
    );
  }
}

export type AlertType = "more-info" | "error" | "warning" | "success";
