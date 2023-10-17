import {
  Component,
  h,
  Host,
  Element,
  State,
  Listen,
  Watch,
  Prop,
  Method,
} from "@stencil/core";
import { TabsPosition } from "../tabs/tabs";
import { exportParts } from "../../common/export-parts";

@Component({
  tag: "gxg-tab-bar",
  styleUrl: "tab-bar.scss",
  shadow: true,
})
export class GxgTabBar {
  private parts = {
    buttonMenu: "button-menu",
  };
  private exportparts: string;

  constructor() {
    this.detectClickOutsideTabBarMenu =
      this.detectClickOutsideTabBarMenu.bind(this);
  }
  // Indicate that name should be a public property on the component
  // @Prop() name: string;

  /**
   * Hides the tab-bar
   */
  @Prop() readonly hidden = false;

  @Element() el: HTMLGxgTabBarElement;
  tabBar!: HTMLUListElement;
  tabBarMenu!: HTMLUListElement;
  tabBarMenuToggleButton!: HTMLGxgButtonElement;
  @State() appendedButtons = 0;

  /*tab bar menu*/
  @State() tabBarMenuHeight = "auto";
  @State() tabBarMenuWidth = "auto";
  @State() tabBarMenuCollapsed = true;
  @State() tabBarMenuPosition: TabsPosition;
  private lastAddedOrRemovedTabBarButtonWidth = 0;

  /**
   * The presence of this attribute displays a border-bottom line on the tab bar
   */
  @Prop() readonly displayBorder = false;

  /**
   * The presence of this attribute with display a scrollbar if the buttons total width is greater than the tab-bar width.
   */
  @Prop({ reflect: true }) readonly scrollable = false;

  /**
   * Reading direction
   */
  @State() rtl = false;

  private openMenu(event) {
    event.stopPropagation();
    this.tabBarMenuCollapsed = false;
    document.addEventListener("click", this.detectClickOutsideTabBarMenu);
  }

  @Watch("tabBarMenuCollapsed")
  tabBarMenuCollapsedHandler(menuCollapsed: boolean) {
    this.evaluateMenuButtonsTabIndex(menuCollapsed);
    this.setFocus(menuCollapsed);
  }

  private evaluateMenuButtonsTabIndex = (menuCollapsed: boolean) => {
    if (menuCollapsed) {
      this.disableTabIndex();
    } else {
      this.enableTabIndex();
    }
  };

  private setFocus = (menuCollapsed: boolean) => {
    if (menuCollapsed) {
      this.tabBarMenuToggleButton.focus();
    } else {
      const menuButtons = this.el.querySelectorAll("[slot=tab-menu]");
      if (menuButtons.length) {
        (menuButtons[0] as HTMLGxgButtonElement).focus();
      }
    }
  };

  @Method()
  async appendTabButtons() {
    if (!this.scrollable) {
      const numberOfButtons = this.el.querySelectorAll("gxg-tab-button").length;
      for (let i = 0; i <= numberOfButtons; i++) {
        this.appendTabItemsToMenu();
      }
    }
  }

  @Listen("tabActivated")
  tabActivatedHandler() {
    this.tabBarMenuCollapsed = true;
  }

  @Listen("PrevOrNextTab")
  PrevOrNextTabHandler(e) {
    const tabEnabledButtons: HTMLGxgTabButtonElement[] = [];
    const allTabButtons = this.el.querySelectorAll("gxg-tab-button");

    if (allTabButtons) {
      allTabButtons.forEach((tabButton) => {
        if (!tabButton.disabled && !tabButton.hidden) {
          tabEnabledButtons.push(tabButton);
        }
      });
    }

    const arrowPressed: string = e.detail["arrowPressed"];
    const targetButton: HTMLGxgTabButtonElement = e.target;
    const clickedButtonIndex = tabEnabledButtons.findIndex((button) => {
      return button === targetButton;
    });

    let destinationTab: HTMLGxgTabButtonElement;
    if (arrowPressed === "ArrowLeft" && clickedButtonIndex !== -1) {
      destinationTab = tabEnabledButtons[clickedButtonIndex - 1];
    } else if (arrowPressed === "ArrowRight" && clickedButtonIndex !== -1) {
      destinationTab = tabEnabledButtons[clickedButtonIndex + 1];
    }
    if (destinationTab) {
      destinationTab.tabButtonClick();
    }
  }

  appendTabItemsToMenu() {
    //This function appends tab-buttons into a tab-menu, as long as the tab-buttons are too tight
    const gxgTabsPosition = (this.el.parentElement as HTMLGxgTabsElement)
      .position;
    const buttonHeight = this.el.children.item(0).clientHeight;
    let sizeReference: number;
    if (gxgTabsPosition === "top" || gxgTabsPosition === "bottom") {
      sizeReference = this.el.parentElement.offsetWidth;
    } else if (gxgTabsPosition === "right" || gxgTabsPosition === "left") {
      sizeReference = this.el.parentElement.offsetHeight;
    }
    const tabBarWidth = this.tabBar.offsetWidth;
    if (tabBarWidth + 20 > sizeReference) {
      const tabButtons = this.el.querySelectorAll(
        "gxg-tab-button[slot='tab-bar']"
      );
      //get the last item of the nodeList
      const lastTabButton = tabButtons[tabButtons.length - 1];
      if (lastTabButton) {
        this.lastAddedOrRemovedTabBarButtonWidth = (
          lastTabButton as HTMLElement
        ).offsetWidth;
        //add "menu-button" class to button component, in order to stylize the buttons inside the menu differently
        lastTabButton.classList.add("menu-button");
        lastTabButton.setAttribute("slot", "tab-menu");
        this.appendedButtons++;
      }
      //}
    } else if (
      tabBarWidth + 20 + this.lastAddedOrRemovedTabBarButtonWidth <
      sizeReference
    ) {
      const menuButtons = this.el.querySelectorAll("[slot=tab-menu]");
      const menuFirstButton = menuButtons[0];
      if (menuFirstButton) {
        menuFirstButton.classList.remove("menu-button");
        menuFirstButton.setAttribute("slot", "tab-bar");
        this.lastAddedOrRemovedTabBarButtonWidth = (
          menuFirstButton as HTMLElement
        ).offsetWidth;

        this.appendedButtons--;
      }
    }
    if (gxgTabsPosition === "right" || gxgTabsPosition === "left") {
      this.tabBarMenuHeight = this.appendedButtons * buttonHeight + "px";
    }
    this.evaluateMenuButtonsTabIndex(this.tabBarMenuCollapsed);
  }

  componentWillLoad() {
    this.attachExportParts();
  }
  private attachExportParts = (): void => {
    const part = this.el.getAttribute("part");
    const exportPartsResult = exportParts(part, this.parts);
    exportPartsResult.length && (this.exportparts = exportPartsResult);
  };

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

    if (!this.scrollable) {
      const myObserver = new ResizeObserver((entries) => {
        entries.forEach(() => {
          //get any button space between text and button border
          this.appendTabItemsToMenu();
        });
      });
      myObserver.observe(this.el.parentElement);

      //Collapse buttons if they dont't fit in the available space already

      const numberOfButtons = this.el.querySelectorAll("gxg-tab-button").length;
      for (let i = 0; i <= numberOfButtons; i++) {
        this.appendTabItemsToMenu();
      }
    }

    //Tabbar menu on bottom
    const gxgTabsPosition = this.el.parentElement.getAttribute("position");
    if (gxgTabsPosition === "bottom") {
      this.tabBarMenuPosition = "bottom";
    }
    //Tabbar menu on right
    if (gxgTabsPosition === "right") {
      this.tabBarMenuPosition = "right";
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
            onClick={this.openMenu.bind(this)}
            type="tertiary"
            icon="gemini-tools/show-more-vertical"
            ref={(el) =>
              (this.tabBarMenuToggleButton = el as HTMLGxgButtonElement)
            }
            part={this.parts.buttonMenu}
          ></gxg-button>
        </div>
      );
    }
  }

  detectClickOutsideTabBarMenu(event) {
    const x = event.x;
    const y = event.y;

    //card main container coordinates
    const tabBarMenuClientRect = this.tabBarMenu.getBoundingClientRect();

    if (
      x > tabBarMenuClientRect.left &&
      x < tabBarMenuClientRect.right &&
      y > tabBarMenuClientRect.top &&
      y < tabBarMenuClientRect.bottom
    ) {
      //Click happened inside the menu
    } else {
      //Click happened outside the menu
      this.tabBarMenuCollapsed = true;
    }
  }

  disconnectedCallback() {
    document.removeEventListener("click", this.detectClickOutsideTabBarMenu);
  }

  private enableTabIndex = () => {
    const allButtons = this.el.querySelectorAll("gxg-tab-button");
    allButtons.forEach((button) => {
      button.removeAttribute("tabindex");
    });
  };

  private disableTabIndex = () => {
    const menuButtons = this.el.querySelectorAll("[slot=tab-menu]");
    menuButtons.forEach((button) => {
      button.setAttribute("tabindex", "-1");
    });
  };

  render() {
    return (
      <Host
        class={{
          rtl: this.rtl,
          "gxg-tab-bar": true,
          "gxg-tab-bar--hidden": this.hidden,
        }}
        exportParts={this.exportparts ? this.exportparts : null}
      >
        <nav
          class={{
            nav: true,
            "nav--border": this.displayBorder,
          }}
        >
          <ul
            class="tab-bar"
            ref={(el) => (this.tabBar = el as HTMLUListElement)}
          >
            <slot name="tab-bar"></slot>
          </ul>
          {this.renderTabBarMenu()}
          <ul
            class={{
              "tab-bar-menu": true,
              "tab-bar-menu--collapsed": this.tabBarMenuCollapsed,
              top: this.tabBarMenuPosition === "top",
              right: this.tabBarMenuPosition === "right",
              bottom: this.tabBarMenuPosition === "bottom",
              left: this.tabBarMenuPosition === "left",
            }}
            style={{
              "--tabBarMenuHeight": this.tabBarMenuHeight,
              "--tabBarMenuWidth": this.tabBarMenuWidth,
            }}
            ref={(el) => (this.tabBarMenu = el as HTMLUListElement)}
          >
            <slot name="tab-menu"></slot>
          </ul>
        </nav>
      </Host>
    );
  }
}
