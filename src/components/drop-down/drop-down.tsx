import { Component, Host, h, Prop, Element, State } from "@stencil/core";

@Component({
  tag: "gxg-drop-down",
  styleUrl: "drop-down.scss",
  shadow: true,
})
export class GxgDropDown {
  @Element() el: HTMLElement;

  /**
   * the component width
   */
  @Prop() width = "240px";

  /**
   * the component max. height
   */
  @Prop() maxHeight = "120px";

  /**
   * Displayes the content
   */
  @Prop() showContent = false;

  @State() selectedValue = "Select item";

  toggleContent() {
    if (this.showContent === true) {
      this.showContent = false;
    } else {
      this.showContent = true;
    }
  }

  detectClickOutsideDropDown(event) {
    const dropDownMainContainer = this.el.shadowRoot.querySelector(
      ".main-container"
    ) as HTMLElement;

    const x = event.x;
    const y = event.y;

    //Contextual menu coordinates
    const dropDownMainContainerArea = dropDownMainContainer.getBoundingClientRect();
    if (
      x > dropDownMainContainerArea.left &&
      x < dropDownMainContainerArea.right &&
      y > dropDownMainContainerArea.top &&
      y < dropDownMainContainerArea.bottom
    ) {
      //Click happened inside the combo
    } else {
      this.showContent = false;
      //Click happened outside the combo
    }
  }

  componentDidLoad() {
    document.addEventListener(
      "click",
      this.detectClickOutsideDropDown.bind(this)
    );

    //Emmit the data-value for the selected node/item
    const slottedContent = this.el.querySelectorAll("*");
    slottedContent.forEach((node) => {
      node.addEventListener("click", (e) => {
        this.selectedValue = e.target["dataset"].value;
      });
    });
  }
  componentDidUnload() {
    document.removeEventListener("click", this.detectClickOutsideDropDown);
  }

  render() {
    return (
      <Host>
        <div class={{ "main-container": true }} style={{ width: this.width }}>
          <div
            class={{
              "select-container": true,
              "nothing-selected": this.selectedValue === "Select item",
            }}
            onClick={() => this.toggleContent()}
          >
            {this.selectedValue}
            <gxg-button
              class={{ "arrow-down-icon": true }}
              icon="navigation/arrow-down"
              type="tertiary"
            ></gxg-button>
            <span class="layer"></span>
          </div>
          {this.showContent ? (
            <div
              class={{
                "content-container": true,
              }}
              style={{
                maxHeight: this.maxHeight,
              }}
            >
              <slot></slot>
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}
