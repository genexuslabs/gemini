import {
  Component,
  Host,
  h,
  Prop,
  Element,
  State,
  Event,
  EventEmitter,
  Watch,
} from "@stencil/core";

@Component({
  tag: "gxg-drop-down",
  styleUrl: "drop-down.scss",
  shadow: true,
})
export class GxgDropDown {
  @Element() el: HTMLElement;

  /**
   * the dropdown width
   */
  @Prop() width = "240px";

  /**
   * the dropdown max. height
   */
  @Prop() maxHeight = "120px";

  /**
   * the dropdown label (optional)
   */
  @Prop() label = "";

  /**
   * the dropdown icon (optional)
   */
  @Prop() icon = "";

  /**
   * Displays the dropdown content
   */
  @Prop() showContent = false;

  @State() initialButtonText = "";

  @State() detectClickOutsideDropDownVar = this.detectClickOutsideDropDown.bind(
    this
  );

  /**
   * This events gets fired when the dropdown is opened
   */
  @Event() opened: EventEmitter;

  /**
   * This events gets fired when the dropdown is closed
   */
  @Event() closed: EventEmitter;

  componentWillLoad() {
    const slotButton = this.el.querySelector("[slot=button]");
    if (slotButton === null) {
      this.initialButtonText = "Select item";
    }
  }

  toggleContent() {
    if (this.showContent === true) {
      this.showContent = false;
      document.removeEventListener("click", this.detectClickOutsideDropDownVar);
    } else {
      this.showContent = true;
      setTimeout(
        function () {
          document.addEventListener(
            "click",
            this.detectClickOutsideDropDownVar
          );
        }.bind(this),
        100
      );
    }
  }

  detectClickOutsideDropDown(event) {
    const dropDownContentContainer = this.el.shadowRoot.querySelector(
      ".content-container"
    ) as HTMLElement;

    const x = event.x;
    const y = event.y;

    //Contextual menu coordinates
    const dropDownContentContainerArea = dropDownContentContainer.getBoundingClientRect();
    if (
      x > dropDownContentContainerArea.left &&
      x < dropDownContentContainerArea.right &&
      y > dropDownContentContainerArea.top &&
      y < dropDownContentContainerArea.bottom
    ) {
      //Click happened inside the dropdown
    } else {
      this.showContent = false;
      document.removeEventListener("click", this.detectClickOutsideDropDownVar);
      //Click happened outside the dropdown
    }
  }

  componentDidUnload() {
    document.removeEventListener("click", this.detectClickOutsideDropDown);
  }

  @Watch("showContent")
  watchHandler(newValue: boolean) {
    console.log("newValue", newValue);
    if (newValue === true) {
      console.log("emmit opened");
      this.opened.emit(true);
    } else {
      console.log("emmit closed");
      this.closed.emit(true);
    }
  }

  render() {
    return (
      <Host>
        <div class={{ "main-container": true }} style={{ width: this.width }}>
          {this.label !== "" ? (
            <label class={{ label: true }}>{this.label}</label>
          ) : null}
          <div
            class={{
              "select-container": true,
              "nothing-selected": this.initialButtonText === "Select item",
              focus: this.showContent,
            }}
            onClick={() => this.toggleContent()}
          >
            {this.icon !== "" ? (
              <gxg-icon
                class="icon"
                type={this.icon}
                color="auto"
                size="small"
              ></gxg-icon>
            ) : null}
            {this.initialButtonText !== "" ? this.initialButtonText : null}
            <slot name="button"></slot>
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
