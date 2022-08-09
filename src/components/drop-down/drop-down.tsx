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
  shadow: { delegatesFocus: true },
})
export class GxgDropDown {
  @Element() el: HTMLElement;
  mainContainer!: HTMLDivElement;
  contentContainer!: HTMLDivElement;

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

  /**
   * Displays the dropdown .content-container above (usefull when there is no available space bellow/under the dropdown)
   */
  @Prop() above = false;

  @State() initialButtonText = "";
  @State()
  detectClickOutsideDropDown = this.detectClickOutsideDropDownFunc.bind(this);
  @State()
  detectMouseScroll = this.detectMouseScrollFunc.bind(this);
  @State() myObserver = null;

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

  componentDidLoad() {
    this.resizeObserver();
  }

  toggleContent() {
    if (this.showContent === true) {
      this.showContent = false;
    } else {
      this.showContent = true;
    }
  }

  detectClickOutsideDropDownFunc(event) {
    const dropDownContentContainer = this.el.shadowRoot.querySelector(
      ".select-container"
    ) as HTMLElement;
    const contentContainer = this.el.shadowRoot.querySelector(
      ".content-container"
    ) as HTMLElement;

    const x = event.x;
    const y = event.y;

    //Contextual menu coordinates
    const dropDownContentContainerArea = dropDownContentContainer.getBoundingClientRect();
    const contentContainerArea = contentContainer.getBoundingClientRect();
    if (
      (x > dropDownContentContainerArea.left &&
        x < dropDownContentContainerArea.right &&
        y > dropDownContentContainerArea.top &&
        y < dropDownContentContainerArea.bottom) ||
      (x > contentContainerArea.left &&
        x < contentContainerArea.right &&
        y > contentContainerArea.top &&
        y < contentContainerArea.bottom)
    ) {
      //Click happened inside the dropdown
    } else {
      this.showContent = false;
      //Click happened outside the dropdown
    }
  }

  detectMouseScrollFunc() {
    this.showContent = false;
  }

  disconnectedCallback() {
    document.removeEventListener(
      "click",
      this.detectClickOutsideDropDown,
      true
    );
    document.removeEventListener("scroll", this.detectMouseScroll, true);
    this.myObserver.unobserve(document.body);
  }

  @Watch("showContent")
  watchHandler(newValue: boolean) {
    if (newValue === true) {
      this.opened.emit(true);
      document.addEventListener("click", this.detectClickOutsideDropDown, true);
      document.addEventListener("scroll", this.detectMouseScroll, true);
      //Reposition .content-container, since it has fixed position
      this.repositionContentContainer();
    } else {
      this.closed.emit(true);
      document.removeEventListener(
        "click",
        this.detectClickOutsideDropDown,
        true
      );
      document.removeEventListener("scroll", this.detectMouseScroll, true);
    }
  }

  onKeyDown(e) {
    if (e.key === "Enter") {
      this.toggleContent();
    }
    if (e.key === "Escape") {
      this.showContent = false;
    }
    if (e.key === "Tab") {
      this.showContent = false;
    }
  }

  onKeyDownGxgButtonArrowDown(e) {
    if (e.key === "Enter") {
      this.toggleContent();
    }
  }

  resizeObserver() {
    this.myObserver = new ResizeObserver((entries) => {
      entries.forEach(() => {
        this.repositionContentContainer();
      });
    });

    this.myObserver.observe(document.body);
  }

  repositionContentContainer() {
    //redefine .main-container width
    const gxgDropDownWidth = this.el.clientWidth;
    this.mainContainer.style.width = gxgDropDownWidth + "px";
    //redefine .content-container "top" value
    const gxgDropDownCoordinates = this.el.getBoundingClientRect();
    const gxgDropDownY = gxgDropDownCoordinates.y;
    const gxgDropDownHeight = gxgDropDownCoordinates.height;
    this.contentContainer.style.top = gxgDropDownY + gxgDropDownHeight + "px";
  }

  render() {
    return (
      <Host
        class={{
          large: state.large,
          above: this.above,
        }}
        style={{
          width: this.width,
          minWidth: this.minWidth,
          maxWidth: this.maxWidth,
        }}
      >
        <div
          class={{ "main-container": true }}
          ref={(el) => (this.mainContainer = el as HTMLDivElement)}
        >
          {this.label !== "" ? (
            <label class={{ label: true }}>{this.label}</label>
          ) : null}
          <div
            tabIndex={0}
            class={{
              "select-container": true,
              "nothing-selected": this.initialButtonText === "Select item",
            }}
            onClick={this.toggleContent.bind(this)}
            onKeyDown={this.onKeyDown.bind(this)}
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
            <gxg-button
              class={{ "arrow-down-button": true }}
              icon="navigation/arrow-down"
              type="tertiary"
              onKeyDown={this.onKeyDownGxgButtonArrowDown.bind(this)}
              tabindex="-1"
            ></gxg-button>
          </div>

          <div
            class={{
              "content-container": true,
              "content-container--show": this.showContent,
            }}
            style={{
              maxHeight: this.maxHeight,
            }}
            ref={(el) => (this.contentContainer = el as HTMLDivElement)}
          >
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
