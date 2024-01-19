import { Component, Element, h, Host, Prop } from "@stencil/core";
import { Size } from "../icon/icon";
import { exportParts } from "../../common/export-parts";

@Component({
  tag: "gxg-button",
  styleUrl: "button.scss",
  shadow: { delegatesFocus: true }
})
export class GxgButton {
  private parts = {
    button: "button",
    caption: "caption"
  };
  private exportparts: string;

  @Element() el: HTMLGxgButtonElement;

  button!: HTMLButtonElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * The presence of this attribute with make the icon do a background color animation that will grab user attention
   */
  @Prop({ reflect: true }) grabAttention = false;

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
   * The presence of this attribute makes the button small (only for buttons that include an icon)
   */
  @Prop() small = false;

  /**
   * The button icon
   */
  @Prop() icon;

  /**
   * The presence of this attribute turns the icon white
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

  /**
   * Gives the button unselected styles
   */
  @Prop() unselected = false;

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
          size={this.iconSize()}
          part="icon"
        ></gxg-icon>
      );
    }
  }

  iconSize() {
    let iSize: Size;
    if (
      this.type === "secondary-icon-only" ||
      (this.type === "tertiary" && !this.small)
    ) {
      iSize = "regular";
    } else {
      iSize = "small";
    }
    return iSize;
  }

  clickHandler(e) {
    if (this.disabled) {
      e.preventDefault();
    }
  }

  render() {
    return (
      <Host
        role="button"
        class={{
          button: true,
          "button--primary": this.type.includes("primary"),
          "button--secondary": this.type.includes("secondary"),
          "button--tertiary": this.type.includes("tertiary"),
          "button--outlined": this.type.includes("outlined"),
          "button--has-icon": this.type.includes("icon"),
          "button--icon-only":
            this.type.includes("icon-only") || this.type === "tertiary",
          "button--disabled": this.disabled === true,
          "button--fullwidth": this.fullWidth === true,
          "button--fit": this.fit,
          "button--small": this.small,
          "button--unselected": this.unselected
        }}
        onClick={this.clickHandler.bind(this)}
        exportParts={this.exportparts ? this.exportparts : null}
      >
        {this.disabled ? <div class="disabled-layer"></div> : null}
        <button
          class={{
            "button-native": true,
            "gxg-text-general": true,
            "no-tab-index": this.noTabIndex
          }}
          disabled={this.disabled === true}
          ref={el => (this.button = el as HTMLButtonElement)}
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
