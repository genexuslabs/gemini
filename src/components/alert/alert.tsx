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
   * Wether the alert is active (visible) or not (not visible).
   */
  @Prop({ reflect: true }) active = false;

  /**
   * The number of miliseconds the alert is visible before hidding under the document.
   */
  @Prop() activeTime: ActiveTime = "regular";

  /**
   * The alert position.
   */
  @Prop() position: AlertPosition = "left";

  /**
   * The alert title (optional)
   */
  @Prop() alertTitle: string;

  /**
   * The type of alert
   */
  @Prop() type: AlertType = "more-info";

  /**
   * This property makes the component full-width
   */
  @Prop() fullWidth = false;

  /**
   * The alert right position value
   */
  @Prop() leftRight: Spacing = "xs";

  /**
   * The alert bottom position value
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

  render() {
    let lateralSpacingValue;
    if (this.leftRight === "0") {
      lateralSpacingValue = "0";
    } else {
      const bodyComputedStyles = getComputedStyle(document.body);
      lateralSpacingValue = bodyComputedStyles
        .getPropertyValue("--spacing-lay-" + this.leftRight)
        .replace(/\s/g, "");
    }

    let bottomSpacingValue;
    if (this.bottom === "0") {
      bottomSpacingValue = "0";
    } else {
      const bodyComputedStyles = getComputedStyle(document.body);
      bottomSpacingValue = bodyComputedStyles
        .getPropertyValue("--spacing-lay-" + this.bottom)
        .replace(/\s/g, "");
    }

    return (
      <Host
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
              onClick={this.setAlertInactive.bind(this)}
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

export type ActiveTime =
  | "xxslow"
  | "xslow"
  | "slow"
  | "regular"
  | "fast"
  | "xfast"
  | "xxfast";

export type Spacing = "0" | "xs" | "s" | "m" | "l" | "xl";
