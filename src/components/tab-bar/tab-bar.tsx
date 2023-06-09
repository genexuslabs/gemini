import { Component, h, Host, Element, State, Listen } from "@stencil/core";
import { GxgTabButton } from "../tab-button/tab-button";

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

  @Listen("PrevOrNextTab")
  PrevOrNextTabHandler(e) {
    const originTab = this.el.querySelector(
      `gxg-tab-button[tab='${e.detail["originTab"]}']`
    );
    console.log("originTab", e.detail["originTab"]);
    let destinationTab: GxgTabButton = null;

    if (e.detail["arrowPressed"] === "ArrowRight") {
      const nextTabButton = (originTab.nextElementSibling as unknown) as GxgTabButton;
      if (nextTabButton) {
        destinationTab = nextTabButton;
      }
    } else if (e.detail["arrowPressed"] === "ArrowLeft") {
      const prevTabButton = (originTab.previousElementSibling as unknown) as GxgTabButton;
      if (prevTabButton) {
        destinationTab = prevTabButton;
      }
    }
    if (destinationTab) {
      destinationTab.tabButtonClick();
    }
  }

  appendTabItemsToMenu() {
    //This function appends tab-buttons into a tab-menu, as long as the tab-buttons are too tight
    const gxgTabsPosition = this.el.parentElement.getAttribute("position");
    const buttonHeight = this.el.children.item(0).clientHeight;

    if (gxgTabsPosition === "top" || gxgTabsPosition === "bottom") {
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
    } else if (gxgTabsPosition === "left" || gxgTabsPosition === "right") {
      const gxgTabsHeight = this.el.parentElement.offsetHeight;
      const tabBarHeight = this.el.offsetWidth;

      if (tabBarHeight > gxgTabsHeight) {
        //tabBarHeight is higher than gxgTabsHeight
        const tabButtons = this.el.querySelectorAll("[slot=tab-bar]");
        //get the last item of the nodeList
        const lastTabButton = tabButtons[tabButtons.length - 1];
        //add "menu-button" class to button component, in order to stylize the buttons inside the menu differently
        lastTabButton.classList.add("menu-button");
        lastTabButton.setAttribute("slot", "tab-menu");
        this.appendedButtons++;
      } else {
        //tabBarHeight is lower than gxgTabsHeight
        const menuButtons = this.el.querySelectorAll("[slot=tab-menu]");
        const menuFirstButton = menuButtons[0];
        if (menuFirstButton !== undefined) {
          if (
            gxgTabsHeight >
            tabBarHeight +
              ((menuFirstButton as unknown) as HTMLElement).offsetWidth
          ) {
            menuFirstButton.classList.remove("menu-button");
            menuFirstButton.setAttribute("slot", "tab-bar");
            this.appendedButtons--;
          }
        }
      }
    }
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

    //Tabbar menu on bottom
    const gxgTabsPosition = this.el.parentElement.getAttribute("position");
    if (gxgTabsPosition === "bottom") {
      const tabBarMenu = this.el.shadowRoot.querySelector(".tab-bar-menu");
      tabBarMenu.classList.add("bottom");
    }
    //Tabbar menu on right
    if (gxgTabsPosition === "right") {
      const tabBarMenu = this.el.shadowRoot.querySelector(".tab-bar-menu");
      tabBarMenu.classList.add("right");
    }

    this.setIndexToTabButtons();
  }

  setIndexToTabButtons() {
    const tabButtons = this.el.querySelectorAll("gxg-tab-button");
    tabButtons.forEach((tabButton, index) => {
      tabButton.setAttribute("data-index", index.toString());
    });
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
        <nav
          class={{
            nav: true,
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
        </nav>
      </Host>
    );
  }
}
