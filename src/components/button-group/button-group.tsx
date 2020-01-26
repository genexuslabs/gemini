import { Element, Component, Host, Prop, h, State } from "@stencil/core";

@Component({
  tag: "gxg-button-group",
  styleUrl: "button-group.scss",
  shadow: true
})
export class ButtonGroup {
  /**
  The main title that will show up above the buttons group
  */
  @Prop() buttonGroupTitle: string;

  /**
  The main title alignment
  */
  @Prop() titleAlignment: "left" | "center" | "right" = "left";
  /**
  The id of the button that you would like to show active initially
  */
  @Prop() SelectedButtonId: string;

  @State() SelectedButtonValue = "";
  @Element()
  el: HTMLElement;

  //Button Methods
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

    //if SelectedButtonId is equal to any id of the array, set that button as active
    if (
      this.SelectedButtonId === undefined ||
      this.SelectedButtonId.replace(/\s/g, "") === "" ||
      !buttonsIdsArray.includes(this.SelectedButtonId)
    ) {
      // SelectedButtonId is not part of any button id
      //By default, set the first button as the active button
      this.el.children[0].setAttribute("data-active", "");
      buttonValue = this.el.children[0].getAttribute("value");
    } else {
      if (buttonsIdsArray.includes(this.SelectedButtonId)) {
        Array.from(buttonsHtmlCollection).forEach(button => {
          const b = button as HTMLElement;
          if (b.id == this.SelectedButtonId) {
            //set the value to the active button value
            buttonValue = this.SelectedButtonId = b.getAttribute("value");
            b.setAttribute("data-active", "");
          }
        });
      }
    }
    this.SelectedButtonValue = buttonValue;
  }

  setActiveButton(event: MouseEvent) {
    const buttonsHtmlCollection = this.el.children;
    Array.from(buttonsHtmlCollection).forEach(function(button) {
      button.removeAttribute("data-active");
    });
    (event.target as HTMLElement).setAttribute("data-active", "");
    this.SelectedButtonValue = (event.target as HTMLButtonElement).value;
  }

  componentDidLoad() {
    this.setInitialActiveValue();
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
        class={{
          "button-group": true
        }}
        button-value={this.SelectedButtonValue}
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
