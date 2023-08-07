import { Component, Element, h, Host, Prop, State } from "@stencil/core";
import { Color } from "../icon/icon";
import { Size } from "../icon/icon";
import state from "../store";
import { exportParts } from "../../common/export-parts";

@Component({
  tag: "gxg-button",
  styleUrl: "button.scss",
  shadow: { delegatesFocus: true },
})
export class GxgButton {
  private parts = {
    button: "button-part-1 button-part-2",
    caption: "caption",
  };
  private exportparts: string;

  @Element() el: HTMLElement;

  button!: HTMLButtonElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * The presence of this attribute makes the icon always black
   */
  @Prop() alwaysBlack = false;

  /**
   * The state of the button, whether it is disabled or not
   */
  @Prop() disabled = false;

  /**
   * The presence of this attribute will force the .native-button to be contained within the gxg-button host element
   */
  @Prop() fit = false;

  /**
   * The presence of this attribute makes the component full-width
   */
  @Prop() fullWidth = false;

  /**
   * The button icon
   */
  @Prop() icon;

  /**
   * The prescence of this attribute turns the icon white
   */
  @Prop() negative = false;

  /**
   * The kind of button
   */
  @Prop() type: ButtonType = "primary-text-only";

  /**
   * The presence of this attribute lets the button styles be editable from outside of the component by referencing the "native-button" part.
   */
  @Prop() buttonStylesEditable = false;

  @State() mouseEnter = false;
  @State() focusIn = false;

  private noTabIndex = false;

  /*********************************
  METHODS
  *********************************/

  componentWillLoad() {
    const tabIndex = this.el.getAttribute("tabindex");
    if (tabIndex === "-1") {
      this.noTabIndex = true;
    }
    this.attachExportParts();
  }

  private attachExportParts = (): void => {
    const part = this.el.getAttribute("part");
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const exportPartsResult = exportParts(part, this.parts);
    exportPartsResult.length && (this.exportparts = exportPartsResult);
  };

  componentDidLoad() {
    // Set aria-label to host
    if (
      this.type === "primary-icon-only" ||
      this.type === "secondary-icon-only"
      //If button type is icon-only, aria-label must be provided in order to inform the user the button purpose.
    ) {
      if (this.el.querySelector(":scope > [slot='icon']")) {
        //Also, an icon must be provided, in order to know the button purpose.
        //The icon purpose is defined from the icon "type" property.
        const iconAriaLabel = this.el
          .querySelector(":scope > [slot='icon']")
          .getAttribute("type");
        this.el.setAttribute("aria-label", iconAriaLabel);
      }
    }
    //Set a part attribute to the button if buttonStylesEditable is true
    if (this.buttonStylesEditable) {
      this.el.shadowRoot
        .querySelector("button")
        .setAttribute("part", "native-button");
    }
  }

  emptyDiv() {
    return <div style={{ height: "20px" }}></div>;
    //This is a workaround I found for alligning vertically the buttons that have no icon, with the buttons that do have icons.
  }

  regularIcon() {
    if (
      this.type !== "primary-text-only" &&
      this.type !== "secondary-text-only" &&
      this.icon !== undefined
    ) {
      return (
        <gxg-icon
          type={this.icon}
          color={this.iconColor()}
          size={this.iconSize()}
        ></gxg-icon>
      );
    }
  }

  iconSize() {
    let iSize: Size;
    if (this.type === "secondary-icon-only" || this.type === "tertiary") {
      iSize = "regular";
    } else {
      iSize = "small";
    }
    return iSize;
  }

  iconColor() {
    let iColor: Color;
    if (this.type.includes("primary")) {
      iColor = "negative";
      if (this.disabled) {
        iColor = "ondisabled";
      }
    } else if (this.type.includes("secondary")) {
      if (this.disabled) {
        iColor = "disabled";
      } else {
        if (this.mouseEnter) {
          iColor = "primary-hover";
        } else {
          if (this.focusIn) {
            iColor = "primary-active";
          } else {
            iColor = "primary-enabled";
          }
        }
      }
    } else if (this.type.includes("tertiary")) {
      if (this.disabled) {
        iColor = "disabled";
      } else {
        if (this.alwaysBlack) {
          iColor = "alwaysblack";
        } else if (this.negative) {
          iColor = "negative";
        } else {
          iColor = "onbackground";
        }
      }
    } else if (this.type.includes("outlined")) {
      iColor = "primary-active";
      if (this.disabled) {
        iColor = "ondisabled";
      }
    }
    return iColor;
  }

  clickHandler(e) {
    if (this.disabled) {
      e.preventDefault();
    }
  }

  onMouseEnter() {
    this.mouseEnter = true;
  }
  onMouseLeave() {
    this.mouseEnter = false;
  }
  onFocusIn() {
    this.focusIn = true;
    this.mouseEnter = false;
  }
  onFocusOut() {
    this.focusIn = false;
  }

  render() {
    return (
      <Host
        role="button"
        class={{
          button: true,
          "button--primary-text-only": this.type === "primary-text-only",
          "button--primary-text-icon": this.type === "primary-text-icon",
          "button--primary-icon-only": this.type === "primary-icon-only",
          "button--secondary-text-only": this.type === "secondary-text-only",
          "button--secondary-text-icon": this.type === "secondary-text-icon",
          "button--secondary-icon-only": this.type === "secondary-icon-only",
          "button--outlined": this.type === "outlined",
          "button--outlined-text-icon": this.type === "outlined-text-icon",
          "button--disabled": this.disabled === true,
          "button--tertiary": this.type === "tertiary",
          "button--fullwidth": this.fullWidth === true,
          "button--fit": this.fit,
          large: state.large,
        }}
        onClick={this.clickHandler.bind(this)}
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}
        onfocusin={this.onFocusIn.bind(this)}
        onfocusout={this.onFocusOut.bind(this)}
        exportParts={this.exportparts ? this.exportparts : null}
      >
        {this.disabled ? <div class="disabled-layer"></div> : null}
        <button
          class={{
            "button-native": true,
            "gxg-text-general": true,
            "no-tab-index": this.noTabIndex,
          }}
          disabled={this.disabled === true}
          ref={(el) => (this.button = el as HTMLButtonElement)}
          part={this.parts.button}
        >
          {this.emptyDiv()}
          {this.regularIcon()}
          {this.type.includes("text") || this.type === "outlined" ? (
            <span part={this.parts.caption} class="text">
              <slot />
            </span>
          ) : null}
        </button>
      </Host>
    );
  }
}

export type ButtonType =
  | "primary-text-only"
  | "primary-text-icon"
  | "primary-icon-only"
  | "secondary-text-only"
  | "secondary-text-icon"
  | "secondary-icon-only"
  | "outlined"
  | "outlined-text-icon"
  | "tertiary";
