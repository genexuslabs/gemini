import { Component, Element, h, Host, Prop, State } from "@stencil/core";

@Component({
  tag: "gxg-button-group",
  styleUrl: "button-group.scss",
  shadow: true
})
export class ButtonGroup {
  @Element() el: HTMLElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
  The title that will show up above the buttons group
  */
  @Prop() buttonGroupTitle: string;

  /**
  The id of the button that you would like to show active by default
  */
  @Prop() defaultSelectedBtnId: string;

  /**
  Wether the button group is disabled or not.
  */
  @Prop() disabled = false;

  /**
   * This property makes the component full-width
   */
  @Prop() fullWidth = false;

  /**
  The value of the current selected button
  */
  @State() value = "";

  /**
  The main title alignment
  */
  @Prop() titleAlignment: TitleAlignment = "left";

  /*********************************
  METHODS
  *********************************/

  componentDidLoad() {
    this.setInitialActiveValue();

    if (this.disabled) {
      this.value = null;
    }
  }

  setActiveButton(event: MouseEvent) {
    const buttonsHtmlCollection = this.el.children;
    Array.from(buttonsHtmlCollection).forEach(function(button) {
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
    Array.from(buttonsHtmlCollection).forEach(button => {
      const b = button as HTMLElement;
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
        Array.from(buttonsHtmlCollection).forEach(button => {
          const b = button as HTMLElement;
          b.setAttribute("tabindex", "0");
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

  render() {
    let header = null;
    if (this.buttonGroupTitle !== "") {
      header = (
        <header class="button-group-header">
          <h1 class="button-group-header-title">{this.buttonGroupTitle}</h1>
        </header>
      );
    }
    return (
      <Host
        role="group"
        aria-label={this.buttonGroupTitle}
        class={{
          "button-group": true
        }}
        value={this.value}
        title-alignment={this.titleAlignment}
      >
        {header}
        <div
          class="button-group-container"
          onClick={this.setActiveButton.bind(this)}
        >
          <slot />
        </div>
      </Host>
    );
  }
}

export type TitleAlignment = "left" | "center" | "right";
