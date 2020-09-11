import { Component, Prop, h, Host, Element, Watch } from "@stencil/core";

@Component({
  tag: "gxg-contextual-menu",
  styleUrl: "contextual-menu.scss",
  shadow: true
})
export class ContextualMenu {
  constructor() {
    this.detectClickOutsideMenu = this.detectClickOutsideMenu.bind(this);
  }

  /**
   * Visible status
   */
  @Prop({ reflect: true }) visible = false;

  private mouseCoordinates = {
    x: 0,
    y: 0
  };

  private contextualMenuSizes = {
    width: 0,
    height: 0
  };

  @Element() el: HTMLElement;

  @Watch("visible")
  watchHandler(newValue: boolean) {
    if (newValue) {
      //Get contextualMenu height and width
      const contextualMenuWidth = (this.contextualMenuSizes.width = this.el.offsetWidth);
      const contextualMenuHeight = (this.contextualMenuSizes.height = this.el.offsetHeight);

      //Get available height and width from the mouse pointer to the right and bottom side of the document body, respectively.
      const availableWidth = window.innerWidth - this.mouseCoordinates.x;
      const availableHeight = window.innerHeight - this.mouseCoordinates.y;

      const widthOverflow = availableWidth < contextualMenuWidth ? true : false;
      const heightOverflow =
        availableHeight < contextualMenuHeight ? true : false;

      //Set contextualMenu position
      this.el.setAttribute(
        "style",
        "left:" +
          this.mouseCoordinates.x +
          "px; top:" +
          this.mouseCoordinates.y +
          "px;"
      );
      if (widthOverflow) {
        this.el.classList.add("width-overflow");
      } else {
        this.el.classList.remove("width-overflow");
      }
      if (heightOverflow) {
        this.el.classList.add("height-overflow");
      } else {
        this.el.classList.remove("height-overflow");
      }
    }
  }

  detectClickOutsideMenu(event) {
    console.log("detect click outside");
    const contextualMenu = this.el.shadowRoot.querySelector(
      ".contextual-menu-list"
    ) as HTMLElement;

    const x = event.x;
    const y = event.y;

    //Contextual menu coordinates
    const contextualMenuArea = contextualMenu.getBoundingClientRect();

    if (
      x > contextualMenuArea.left &&
      x < contextualMenuArea.right &&
      y > contextualMenuArea.top &&
      y < contextualMenuArea.bottom
    ) {
      //Click happened inside the menu
    } else {
      //Click happened outside the menu
      console.log("clicked outside");
      this.visible = false;
    }
  }

  saveMouseCoordinates(e) {
    this.mouseCoordinates.x = e.clientX;
    this.mouseCoordinates.y = e.clientY;
  }

  componentDidLoad() {
    document.addEventListener("click", this.detectClickOutsideMenu);
    document.addEventListener(
      "mousemove",
      this.saveMouseCoordinates.bind(this)
    );
  }

  componentDidUnload() {
    document.removeEventListener("click", this.detectClickOutsideMenu);
  }

  render() {
    return (
      <Host>
        <ul class="contextual-menu-list">
          <slot></slot>
        </ul>
      </Host>
    );
  }
}
