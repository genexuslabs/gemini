import { Component, Element, h, Host, Prop, State } from "@stencil/core";
import state from "../store";

@Component({
  tag: "gxg-button-group",
  styleUrl: "button-group.scss",
  shadow: true,
})
export class GxgButtonGroup {
  @Element() el: HTMLElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
  The button-group title
  */
  @Prop() buttonGroupTitle: string;

  /**
  The button group title alignment
  */
  @Prop({ reflect: true }) titleAlignment: TitleAlignment = "left";

  /**
  The id of the button that you would like to be active by default
  */
  @Prop() defaultSelectedBtnId: string;

  /**
  Wether the button group is disabled or not
  */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The presence of this attribute makes the component full-width
   */
  @Prop({ reflect: true }) fullWidth = false;

  /**
   * The presence of this attribute makes the button group outlined
   */
  @Prop({ reflect: true }) outlined = false;

  /**
  The value of the current selected button
  */
  @State() value = "";

  /**
   * Reading direction
   */
  @State() rtl = false;

  componentDidLoad() {
    //Reading Direction
    const dirHtml = document
      .getElementsByTagName("html")[0]
      .getAttribute("dir");
    const dirBody = document
      .getElementsByTagName("body")[0]
      .getAttribute("dir");
    if (dirHtml === "rtl" || dirBody === "rtl") {
      this.rtl = true;
    }
  }

  /*********************************
  METHODS
  *********************************/

  componentWillLoad() {
    if (!this.disabled) {
      this.setInitialActiveValue();
    }

    if (this.disabled) {
      this.value = null;
    }

    //if disabled, set buttons tabindex equal to "-1"
    if (this.disabled) {
      const buttonsHtmlCollection = this.el.children;
      Array.from(buttonsHtmlCollection).forEach(function (button) {
        button.setAttribute("tab-index", "-1");
        (button as HTMLElement).style.pointerEvents = "none";
      });
    }
  }

  setActiveButton(event: MouseEvent) {
    const buttonsHtmlCollection = this.el.children;
    Array.from(buttonsHtmlCollection).forEach(function (button) {
      button.removeAttribute("data-active");
      button.setAttribute("aria-pressed", "false");
    });
    (event.target as HTMLElement).setAttribute("data-active", "");
    (event.target as HTMLElement).setAttribute("aria-pressed", "true");
    this.value = (event.target as HTMLButtonElement).value;
  }

  setInitialActiveValue() {
    let buttonValue = "";
    //get id of all buttons into array
    const buttonsHtmlCollection = this.el.children;
    const buttonsIdsArray = [];
    Array.from(buttonsHtmlCollection).forEach((button) => {
      const b = button as HTMLElement;
      b.setAttribute("tabindex", "0");
      if (b.getAttribute("id") !== "") {
        buttonsIdsArray.push(b.getAttribute("id"));
      }
    });

    //if defaultSelectedBtnId is equal to any id of the array, set that button as active
    if (
      this.defaultSelectedBtnId === undefined ||
      this.defaultSelectedBtnId.replace(/\s/g, "") === "" ||
      !buttonsIdsArray.includes(this.defaultSelectedBtnId)
    ) {
      // defaultSelectedBtnId is not part of any button id
      //By default, set the first button as the active button
      this.el.children[0].setAttribute("data-active", "");
      buttonValue = this.el.children[0].getAttribute("value");
      this.el.children[0].setAttribute("aria-pressed", "true");
    } else {
      if (buttonsIdsArray.includes(this.defaultSelectedBtnId)) {
        Array.from(buttonsHtmlCollection).forEach((button) => {
          const b = button as HTMLElement;

          if (b.id == this.defaultSelectedBtnId) {
            //set the value to the active button value
            buttonValue = this.defaultSelectedBtnId = b.getAttribute("value");
            b.setAttribute("data-active", "");
            b.setAttribute("aria-pressed", "true");
          }
        });
      }
    }
    this.value = buttonValue;
  }

  detectFocus(event) {
    if (this.el === document.activeElement) {
      const buttonsHtmlCollection = this.el.children;
      const n = buttonsHtmlCollection.length;
      if (event.keyCode === 9 && event.shiftKey) {
        //set focus to the last button
        (buttonsHtmlCollection.item(n) as HTMLElement).focus();
      } else if (event.keyCode === 9) {
        //set focus to the first button
        (buttonsHtmlCollection.item(0) as HTMLElement).focus();
      }
    }
  }

  tabIndex() {
    if (this.disabled) {
      return "-1";
    } else {
      return "0";
    }
  }

  render() {
    let header = null;
    if (this.buttonGroupTitle !== undefined) {
      header = (
        <header class="button-group-header">
          <label class="button-group-header-title">
            {this.buttonGroupTitle}
          </label>
        </header>
      );
    }
    return (
      <Host
        tabindex={this.tabIndex()}
        role="group"
        aria-label={this.buttonGroupTitle}
        class={{
          "button-group": true,
          rtl: this.rtl,
          large: state.large,
        }}
        value={this.value}
        title-alignment={this.titleAlignment}
        onKeyUp={this.detectFocus.bind(this)}
      >
        {header}
        <div
          class="button-group-container"
          onClick={this.setActiveButton.bind(this)}
        >
          {this.disabled ? <div class="disabled-layer"></div> : null}
          <slot />
        </div>
      </Host>
    );
  }
}

export type TitleAlignment = "left" | "center" | "right";
