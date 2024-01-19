import {
  Component,
  Element,
  Listen,
  Host,
  h,
  State,
  Prop,
  Method
} from "@stencil/core";
import state from "../store";
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

  /**
   * The presence of this attribute removes the background color (only for mercury)
   */
  @Prop({ reflect: true }) noBackground = false;

  /**
   * The presence of this attribute removes each tab .container padding
   */
  @Prop() noPadding = false;

  @State() activeTab = "";

  @Listen("tabActivated")
  tabActivatedHandler(event) {
    event.stopPropagation();
    this.updateActiveChildren(event.target.tab, "gxg-tab-button");
    this.updateActiveChildren(event.target.tab, "gxg-tab");
  }

  componentWillLoad() {
    this.configureTabs();
  }

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

  private getTab = (tab: string): HTMLGxgTabButtonElement => {
    return this.el.querySelector(`gxg-tab-button[key=${tab}]`);
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

export type TabsPosition = "top" | "bottom" | "left" | "right";
