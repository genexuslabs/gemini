import { Component, h, Host, Element, State, Listen } from "@stencil/core";

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

  @Listen("tabActivated")
  tabActivatedHandler() {
    const tabMenuContainer = this.el.shadowRoot.querySelector(
      ".tab-bar-menu"
    ) as HTMLElement;
    tabMenuContainer.classList.add("tab-bar-menu--collapsed");
  }

  appendTabItemsToMenu() {
    //This function appends tab-buttons into a tab-menu, as long as the tab-buttons are too tight

    const buttonHeight = this.el.children.item(0).clientHeight;
    const tabBarWidth = ((this.el.shadowRoot.querySelector(
      ".tab-bar"
    ) as unknown) as HTMLElement).offsetWidth;
    const tabsWidth = this.el.parentElement.offsetWidth;

    if (tabBarWidth + 20 > tabsWidth) {
      const tabButtons = this.el.querySelectorAll("[slot=tab-bar]");
      //get the last item of the nodeList
      const lastTabButton = tabButtons[tabButtons.length - 1];
      //add "menu-button" class to button component, in order to stylize the buttons inside the menu differently
      lastTabButton.classList.add("menu-button");
      lastTabButton.setAttribute("slot", "tab-menu");
      this.appendedButtons++;
      //}
    } else {
      const menuButtons = this.el.querySelectorAll("[slot=tab-menu]");
      const menuFirstButton = menuButtons[0];
      if (menuFirstButton !== undefined) {
        if (
          tabsWidth >
          tabBarWidth +
            ((menuFirstButton as unknown) as HTMLElement).offsetWidth
        ) {
          menuFirstButton.classList.remove("menu-button");
          menuFirstButton.setAttribute("slot", "tab-bar");
          this.appendedButtons--;
        }
      }
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

    requestAnimationFrame(() => this.appendTabItemsToMenu());

    const myObserver = new ResizeObserver((entries) => {
      entries.forEach(() => {
        //get any button space between text and button border
        this.appendTabItemsToMenu();
      });
    });

    const tabs = this.el.parentElement;
    myObserver.observe(tabs);

    //Collapse buttons if they dont't fit in the available space already
    setTimeout(
      function () {
        const numberOfButtons = this.el.querySelectorAll("gxg-tab-button")
          .length;
        for (let i = 0; i <= numberOfButtons; i++) {
          this.appendTabItemsToMenu();
        }
      }.bind(this),
      100
    );
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
        </ul>
        {this.renderTabBarMenu()}
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
