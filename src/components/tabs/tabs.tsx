import {
  Component,
  Element,
  Listen,
  Host,
  h,
  Prop,
  Method,
  Watch
} from "@stencil/core";
import { GxgTab } from "../tab/tab";

@Component({
  tag: "gxg-tabs",
  styleUrl: "tabs.scss",
  shadow: true
})
export class GxgTabs {
  @Element() el: HTMLGxgTabsElement;

  @Prop() position: TabsPosition = "top";
  @Prop({ reflect: true }) height = "100%";
  @Prop() maxHeight = "100%";
  @Prop() minWidth = "200px";
  @Prop() tabBarBorder = false;
  @Prop() noBorder = false;
  @Prop() buttonsBorderAbove = false;

  /**
   * The presence of this attribute removes the background color (only for mercury)
   */
  @Prop({ reflect: true }) noBackground = false;

  /**
   * The presence of this attribute removes each tab .container padding
   */
  @Prop() noPadding = false;

  /**
   * The presence of this attribute will make buttons and tabs reduced, meaning that the font size and padding, will be smaller. Also, the icons in the buttons will not be displayed.
   */
  @Prop({ reflect: true }) reduced = false;

  /**
   * The actual active tab, and tab-button
   */
  @Prop() activeTab: string;
  @Watch("activeTab")
  watchActiveTabHandler(activeTab: string) {
    if (activeTab?.length > 0) {
      this.activateTab();
    }
  }

  @Listen("tabActivated")
  tabActivatedHandler(event) {
    event.stopPropagation();
    this.updateActiveChildren(event.target.tab, "gxg-tab-button");
    this.updateActiveChildren(event.target.tab, "gxg-tab");
  }

  componentWillLoad() {
    this.configureTabs();
    this.evaluateReduced();
    this.activateTab();
  }

  private evaluateReduced = () => {
    if (this.reduced) {
      //tab buttons
      const gxgTabButtons = Array.from(
        this.el.querySelectorAll("gxg-tab-button")
      );
      gxgTabButtons.forEach(tabButton => {
        tabButton.reduced = true;
      });
      //tabs
      const gxgTabs = Array.from(this.el.querySelectorAll("gxg-tab"));
      gxgTabs.forEach(tab => {
        tab.reduced = true;
      });
    }
  };

  updateActiveChildren(activeTab: string, tagName: string) {
    let children;
    if (tagName === "gxg-tab") {
      children = this.el.querySelectorAll(":scope > gxg-tab");
    } else if (tagName === "gxg-tab-button") {
      const tabBar = this.el.querySelector(":scope > gxg-tab-bar");
      children = tabBar.querySelectorAll(":scope > gxg-tab-button");
    }
    for (const child of children) {
      child.isSelected = activeTab === child.tab;
    }
  }

  configureTabs() {
    const tabs = this.el.querySelectorAll("gxg-tab");
    if (this.noPadding) {
      tabs.forEach(tab => {
        (tab as unknown as GxgTab).noPadding = true;
      });
    }
    if (this.buttonsBorderAbove) {
      const tabButtons = this.el.querySelectorAll("gxg-tab-button");
      tabButtons.forEach(tabButton => (tabButton.borderAbove = true));
    }
  }

  @Method()
  async setActiveTab(tab: string) {
    if (tab) {
      const tabEl = this.getTab(tab);
      if (!tabEl?.disabled) {
        this.updateActiveChildren(tab, "gxg-tab-button");
        this.updateActiveChildren(tab, "gxg-tab");
      }
    }
  }

  /**
   * Sets the first tab that is not disabled and hidden as the active tab
   */
  @Method()
  async setFirstActiveTab() {
    const allTabs = Array.from(this.el.querySelectorAll("gxg-tab-button"));
    const firstEnabledTab = allTabs.find(tab => !tab.hidden && !tab.disabled);
    if (firstEnabledTab && firstEnabledTab.tab) {
      this.updateActiveChildren(firstEnabledTab.tab, "gxg-tab-button");
      this.updateActiveChildren(firstEnabledTab.tab, "gxg-tab");
    }
  }

  private getTab = (tab: string): HTMLGxgTabButtonElement => {
    return this.el.querySelector(`gxg-tab-button[key=${tab}]`);
  };

  private activateTab = () => {
    //buttons
    const tabButtons: HTMLGxgTabButtonElement[] = Array.from(
      this.el.querySelectorAll("gxg-tab-button")
    );
    tabButtons.forEach(tabButton => {
      if (tabButton.tab !== this.activeTab) {
        tabButton.isSelected = false;
      } else {
        tabButton.isSelected = true;
      }
    });
    //tabs
    const tabs: HTMLGxgTabElement[] = Array.from(
      this.el.querySelectorAll("gxg-tab")
    );
    tabs.forEach(tab => {
      if (tab.tab !== this.activeTab) {
        tab.isSelected = false;
      } else {
        tab.isSelected = true;
      }
    });
  };

  render() {
    return (
      <Host
        style={{
          height: this.height,
          maxHeight: this.maxHeight,
          minWidth: this.minWidth
        }}
      >
        <div
          class={{
            "main-container": true,
            "main-container--no-border": this.noBorder
          }}
        >
          {this.position === "bottom"
            ? [
                <div class="tabs-container">
                  <slot></slot>
                </div>,
                <div class="tab-bar-container">
                  <slot name="tab-bar-container" />
                </div>
              ]
            : [
                <div class="tab-bar-container">
                  <slot name="tab-bar-container" />
                </div>,
                <div class="tabs-container">
                  <slot></slot>
                </div>
              ]}
        </div>
      </Host>
    );
  }
}

export type TabsPosition =
  | "top"
  | "bottom"
  | "left-rotated"
  | "left-stacked"
  | "right-rotated"
  | "right-stacked";
