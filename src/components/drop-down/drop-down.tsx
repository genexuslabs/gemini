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
   * the dropdown height
   */
  @Prop() height = "auto";

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
   * The container 'items container' position
   */
  @Prop() position: "top" | "bottom" = "bottom";

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

  componentDidUpdate() {
    const contentContainerIsOverflowing = this.contentContainerOverflows();
    if (contentContainerIsOverflowing) {
      this.el.classList.add("position-top");
      this.el.classList.remove("position-bottom");
    } else {
      this.el.classList.add("position-bottom");
      this.el.classList.remove("position-top");
    }
  }

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

  detectMouseScrollFunc(e) {
    if (e.target === document) {
      this.showContent = false;
    }
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
    if (e.key === "ArrowDown") {
      this.showContent = true;
    } else if (e.key === "Enter") {
      this.toggleContent();
    } else if (e.key === "Escape") {
      this.showContent = false;
    } else if (e.key === "Tab") {
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
    this.myObserver.observe(this.el);
  }

  repositionContentContainer() {
    //redefine .main-container width
    const gxgDropDownWidth = this.el.clientWidth;
    this.contentContainer.style.width = gxgDropDownWidth + "px";
    //redefine .content-container "top" value
    const gxgDropDownCoordinates = this.el.getBoundingClientRect();
    const gxgDropDownY = gxgDropDownCoordinates.y;
    const gxgDropDownHeight = gxgDropDownCoordinates.height;
    this.contentContainer.style.top = gxgDropDownY + gxgDropDownHeight + "px";
  }

  contentContainerOverflows() {
    const viewportHeight = window.innerHeight;
    const dropdownBottom = this.el.getBoundingClientRect().bottom;
    const contentContainerHeight = this.contentContainer.clientHeight;
    const result = dropdownBottom + contentContainerHeight;

    const itOverflows = true ? result > viewportHeight : false;
    return itOverflows;
  }

  render() {
    return (
      <Host
        class={{
          large: state.large,
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
              height: this.height,
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
