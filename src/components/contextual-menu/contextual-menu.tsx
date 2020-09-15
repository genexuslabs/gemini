import { Component, Prop, h, Host, Element, Watch, State } from "@stencil/core";

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
   * The presence of this attribute makes the menu visible
   */
  @Prop({ reflect: true }) visible = false;

  @State() widthOverflow: boolean;
  @State() heightOverflow: boolean;
  @State() firstRightClick = true;
  @State() topPosition: number;
  @State() leftPosition: number;

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
      const availableWidth = window.innerWidth - this.leftPosition;
      const availableHeight = window.innerHeight - this.topPosition;

      this.widthOverflow = availableWidth < contextualMenuWidth ? true : false;
      this.heightOverflow =
        availableHeight < contextualMenuHeight ? true : false;
    }
  }

  detectClickOutsideMenu(event) {
    //Get mouse coordinates
    this.topPosition = event.clientY;
    this.leftPosition = event.clientX;

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
      if (!this.firstRightClick) {
        this.visible = false;
        this.firstRightClick = true;
      } else if (this.visible) {
        this.firstRightClick = false;
      }
    }
  }

  saveMouseCoordinates(e) {
    this.topPosition = e.clientX;
    this.leftPosition = e.clientY;
  }

  componentDidLoad() {
    document.addEventListener("click", this.detectClickOutsideMenu);
    document.addEventListener("contextmenu", this.detectClickOutsideMenu);
  }

  componentDidUnload() {
    document.removeEventListener("click", this.detectClickOutsideMenu);
    document.removeEventListener("contextmenu", this.detectClickOutsideMenu);
  }

  render() {
    return (
      <Host
        visible={this.visible}
        class={{
          "width-overflow": this.widthOverflow,
          "height-overflow": this.heightOverflow
        }}
        style={{
          top: `${this.topPosition}px`,
          left: `${this.leftPosition}px`
        }}
      >
        <ul class="contextual-menu-list">
          <slot></slot>
        </ul>
      </Host>
    );
  }
}
