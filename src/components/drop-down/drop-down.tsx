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
import state from "../store";

@Component({
  tag: "gxg-drop-down",
  styleUrl: "drop-down.scss",
  shadow: true,
})
export class GxgDropDown {
  @Element() el: HTMLElement;

  /**
   * The dropdown width
   */
  @Prop() width = "240px";

  /**
   * The dropdown min-width
   */
  @Prop() minWidth = "0";

  /**
   * The codropdownmbo max-width
   */
  @Prop() maxWidth = "none";

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

  @State()
  detectClickOutsideDropDown = this.detectClickOutsideDropDownFunc.bind(this);

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
    } else {
      this.showContent = true;
    }
  }

  detectClickOutsideDropDownFunc(event) {
    console.log("hola");
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
      //Click happened outside the dropdown
    }
  }

  componentDidUnload() {
    document.removeEventListener("click", this.detectClickOutsideDropDown);
  }

  @Watch("showContent")
  watchHandler(newValue: boolean) {
    if (newValue === true) {
      this.opened.emit(true);
      document.addEventListener("click", this.detectClickOutsideDropDown, true);
    } else {
      this.closed.emit(true);
      document.removeEventListener(
        "click",
        this.detectClickOutsideDropDown,
        true
      );
    }
  }

  render() {
    return (
      <Host
        class={{
          large: state.large,
        }}
      >
        <div
          class={{ "main-container": true }}
          style={{
            width: this.width,
            minWidth: this.minWidth,
            maxWidth: this.maxWidth,
          }}
        >
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
