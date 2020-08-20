import { Component, Element, Host, Prop, h, Watch } from "@stencil/core";

@Component({
  tag: "gxg-alert",
  styleUrl: "alert.scss",
  shadow: true
})
export class Alert {
  @Element() el: HTMLElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * Wether the alert is active (visible) or hidden
   */
  @Prop({ reflect: true }) active = false;

  /**
   * The amount of time the alert is visible before hidding under the document
   */
  @Prop() activeTime: ActiveTime = "regular";

  /**
   * The alert position on the X axis
   */
  @Prop() position: AlertPosition = "left";

  /**
   * The alert title (optional)
   */
  @Prop() alertTitle: string;

  /**
   * The alert flavor
   */
  @Prop() type: AlertType = "notice";

  /**
   * The presence of this attribute makes the component full-width
   */
  @Prop() fullWidth = false;

  /**
   * The spacing between the alert, and the left or right side of the document
   */
  @Prop() leftRight: Spacing = "xs";

  /**
   * The spacing between the alert and the bottom side of the document
   */
  @Prop() bottom: Spacing = "xs";

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
    if (this.type === "notice") return "negative";
    if (this.type === "error") return "error";
    if (this.type === "warning") return "warning";
    if (this.type === "success") return "success";
  }

  closeIconColor(): "onbackground" | "negative" {
    if (this.type === "notice") {
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
    console.log("close");
    this.active = false;
    this.el.removeAttribute("role");
  }

  @Watch("active")
  validateName(newValue: boolean) {
    //timing
    let timingValue;
    switch (this.activeTime) {
      case "xxslow":
        timingValue = "10";
        break;
      case "xslow":
        timingValue = "09";
        break;
      case "slow":
        timingValue = "08";
        break;
      case "regular":
        timingValue = "07";
        break;
      case "fast":
        timingValue = "06";
        break;
      case "xfast":
        timingValue = "05";
        break;
      case "xxfast":
        timingValue = "04";
        break;
      default:
        timingValue = "04";
    }
    if (newValue === true) {
      this.el.setAttribute("role", "alert");
      setTimeout(() => {
        this.setAlertInactive();
      }, parseInt(getComputedStyle(document.documentElement).getPropertyValue("--timing-" + timingValue)));
    }
  }

  defineWidth() {
    if (this.fullWidth) {
      const lateralSpacingComputedValue = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--spacing-lay-" + this.leftRight);
      //remove "px" to multiply, since we want the spacing value from left, and from right.
      const lateralSpacingComputedValueInt =
        parseInt(lateralSpacingComputedValue.replace("px", ""), 10) * 2;

      return "calc(100% - " + lateralSpacingComputedValueInt + "px)";
    } else {
      return this.width;
    }
  }

  alertHidden() {
    if (this.active) {
      return "false";
    } else {
      return "true";
    }
  }

  render() {
    let lateralSpacingValue;
    if (this.leftRight === "no-space") {
      lateralSpacingValue = "0";
    } else {
      const bodyComputedStyles = getComputedStyle(document.body);
      lateralSpacingValue = bodyComputedStyles
        .getPropertyValue("--spacing-lay-" + this.leftRight)
        .replace(/\s/g, "");
    }

    let bottomSpacingValue;
    if (this.bottom === "no-space") {
      bottomSpacingValue = "0";
    } else {
      const bodyComputedStyles = getComputedStyle(document.body);
      bottomSpacingValue = bodyComputedStyles
        .getPropertyValue("--spacing-lay-" + this.bottom)
        .replace(/\s/g, "");
    }

    return (
      <Host
        role="alert"
        aria-hidden={this.alertHidden()}
        hidden
        style={{
          width: this.defineWidth(),
          left: lateralSpacingValue,
          right: lateralSpacingValue,
          transform:
            this.position === "center"
              ? "translateY(-" + bottomSpacingValue + ") translateX(-50%)"
              : "translateY(-" + bottomSpacingValue + ")"
        }}
      >
        <div
          class={{
            "alert-message": true,
            "alert-message--notice": this.type === "notice",
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
              type="tertiary"
              icon="close"
              always-black
              onClick={this.setAlertInactive.bind(this)}
            ></gxg-button>
          </div>
        </div>
      </Host>
    );
  }
}

export type AlertType = "notice" | "error" | "warning" | "success";

export type AlertPosition = "left" | "center" | "right";

export type ActiveTime =
  | "xxslow"
  | "xslow"
  | "slow"
  | "regular"
  | "fast"
  | "xfast"
  | "xxfast";

export type Spacing = "no-space" | "xs" | "s" | "m" | "l" | "xl";
