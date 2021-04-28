import { Component, h, Host, Element, State } from "@stencil/core";

@Component({
  tag: "gxg-tab-bar",
  styleUrl: "tab-bar.scss",
  shadow: true,
})
export class GxgTabBar {
  constructor() {
    this.detectClickOutsideTabBarMenu = this.detectClickOutsideTabBarMenu.bind(
      this
    );
  }
  // Indicate that name should be a public property on the component
  // @Prop() name: string;

  @Element() el: HTMLElement;
  tabBarMenu!: HTMLElement;
  @State() appendedButtons = 0;
  @State() tabBarMenuHeight = "100px";

  /**
   * Reading direction
   */
  @State() rtl = false;

  toggleMenu(event) {
    event.stopPropagation();

    this.tabBarMenu.classList.toggle("tab-bar-menu--collapsed");

    document.addEventListener("click", this.detectClickOutsideTabBarMenu);
  }

  appendTabItemsToMenu() {
    //This function appends tab-buttons into a tab-menu, as long as the tab-buttons are too tight

    const buttonHeight = this.el.children.item(0).clientHeight;

    const calculateButtonPadding = () => {
      const buttonWidth = this.el.children.item(0).clientWidth;
      // let buttonHeight = this.el.children.item(0).clientHeight;
      const buttonTextWidth = this.el.children
        .item(0)
        .shadowRoot.querySelector(".tab-button__text").clientWidth;
      const buttonPadding = buttonWidth - buttonTextWidth;
      return buttonPadding;
    };

    if (calculateButtonPadding() < 40) {
      while (calculateButtonPadding() < 40) {
        //if button "padding" is lower than 10px, then, the buttons are too short.
        //it is time to cut off the LAST button, and put it into the menu!
        const tabButtons = this.el.querySelectorAll("[slot=tab-bar]");
        //get the last item of the nodeList
        const lastTabButton = tabButtons[tabButtons.length - 1];
        //add "menu-button" class to button component, in order to stylize the buttons inside the menu differently
        lastTabButton.classList.add("menu-button");
        lastTabButton.setAttribute("slot", "tab-menu");
        this.appendedButtons++;
      }
    } else if (calculateButtonPadding() > 35 && this.appendedButtons > 0) {
      //if there are buttons in the menu, cut off the first button, and append it into the last postition of the tab-bar

      const menuButtons = this.el.querySelectorAll("[slot=tab-menu]");
      const menuFirstButton = menuButtons[0];

      //remove "menu-button" class in order to remove styles that are specific for the buttons inside the menu
      menuFirstButton.classList.remove("menu-button");
      menuFirstButton.setAttribute("slot", "tab-bar");
      this.appendedButtons--;
    }

    //set inline height to the "tab-bar-menu" for the height css transition to work propperly
    this.tabBarMenuHeight = this.appendedButtons * buttonHeight + "px";
  }
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
    //Resize
    window.addEventListener("resize", () => {
      this.appendTabItemsToMenu();
    });

    requestAnimationFrame(() => this.appendTabItemsToMenu());

    for (let i = 1; i < 5; i++) {
      // It is neccessary to call this function a couple of times when the page loads, in the case the tab-buttons are too tight already (before the user resizes the window)
      //this.appendTabItemsToMenu();
    }

    const myObserver = new ResizeObserver((entries) => {
      entries.forEach(() => {
        //get any button space between text and button border
        this.appendTabItemsToMenu();
      });
    });

    const tabBar = this.el;
    myObserver.observe(tabBar);
  }

  renderTabBarMenu() {
    if (this.appendedButtons > 0) {
      return (
        <div class="tab-bar__menu">
          <gxg-button
            onClick={this.toggleMenu.bind(this)}
            type="tertiary"
            icon="gemini-tools/show-more-vertical"
          ></gxg-button>
        </div>
      );
    }
  }

  detectClickOutsideTabBarMenu(event) {
    const tabMenuContainer = this.el.shadowRoot.querySelector(
      ".tab-bar-menu"
    ) as HTMLElement;

    const x = event.x;
    const y = event.y;

    //card main container coordinates
    const tabMenu = tabMenuContainer.getBoundingClientRect();

    if (
      x > tabMenu.left &&
      x < tabMenu.right &&
      y > tabMenu.top &&
      y < tabMenu.bottom
    ) {
      //Click happened inside the menu
    } else {
      //Click happened outside the menu
      tabMenuContainer.classList.add("tab-bar-menu--collapsed");
    }
  }

  componentDidUnload() {
    document.removeEventListener("click", this.detectClickOutsideTabBarMenu);
  }

  render() {
    return (
      <Host
        class={{
          rtl: this.rtl,
        }}
      >
        <ul class="tab-bar">
          <slot name="tab-bar"></slot>
          {this.renderTabBarMenu()}
        </ul>
        <ul
          class="tab-bar-menu tab-bar-menu--collapsed"
          style={{ "--tabBarMenuHeight": this.tabBarMenuHeight }}
          ref={(el) => (this.tabBarMenu = el as HTMLElement)}
        >
          <slot name="tab-menu"></slot>
        </ul>
      </Host>
    );
  }
}
