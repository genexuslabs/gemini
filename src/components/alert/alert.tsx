import { Component, Element, Host, Prop, h, Watch } from "@stencil/core";

@Component({
  tag: "gxg-alert",
  styleUrl: "alert.scss",
  shadow: true
})
export class Alert {
  @Element() el: HTMLElement;

  constructor() {
    this.setAlertInactive = this.setAlertInactive.bind(this);
  }

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * Wether the alert is active (visible) or not (not visible).
   */
  @Prop({ reflect: true }) active = false;

  /**
   * The amount of miliseconds the alert is visible before hidding under the document.
   */
  @Prop() activeTime: ActiveTime;

  /**
   * The alert position.
   */
  @Prop() position: AlertPosition = "left";

  /**
   * The alert title (optional)
   */
  @Prop() alertTitle = "05";

  /**
   * The type of alert
   */
  @Prop() type: AlertType = "more-info";

  /**
   * The alert left position value
   */
  @Prop() left = "0";

  /**
   * The alert right position value
   */
  @Prop() right = "0";

  /**
   * The alert bottom position value
   */
  @Prop() bottom = "0";

  /**
   * The alert width
   */
  @Prop() width = "350px";

  /*********************************
  METHODS
  *********************************/

  componentDidLoad() {
    this.el.removeAttribute("hidden");
  }

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

  printTitle() {
    if (this.alertTitle !== undefined) {
      return <h2 class="alert-message--title">{this.alertTitle}</h2>;
    }
  }

  setAlertInactive() {
    this.active = false;
    this.el.removeAttribute("role");
  }

  @Watch("active")
  validateName(newValue: boolean) {
    if (newValue === true) {
      this.el.setAttribute("role", "alert");
      setTimeout(() => {
        this.setAlertInactive();
      }, parseInt(getComputedStyle(document.documentElement).getPropertyValue("--timing-" + this.activeTime)));
    }
  }

  render() {
    return (
      <Host
        hidden
        style={{
          width: this.width,
          left: this.left,
          right: this.right,
          transform:
            this.position === "center"
              ? "translateY(-" + this.bottom + ") translateX(-50%)"
              : "translateY(-" + this.bottom + ")"
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
              {this.printTitle()}
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

export type AlertPosition = "left" | "center" | "right";

export type ActiveTime = "04" | "05" | "06" | "07" | "08" | "09" | "10";
