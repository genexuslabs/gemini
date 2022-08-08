import {
  Component,
  Element,
  Listen,
  Host,
  h,
  State,
  Prop,
} from "@stencil/core";
import { GxgTab } from "../tab/tab";

@Component({
  tag: "gxg-tabs",
  styleUrl: "tabs.scss",
  shadow: true,
})
export class GxgTabs {
  @Element() el: HTMLGxgTabsElement;

  @Prop() position: TabsPosition = "top";
  @Prop({ reflect: true }) height: Height = "auto";

  /**
   * The presence of this attribute removes each tab .container padding
   */
  @Prop() noPadding = false;

  @State() activeTab = "";

  @Listen("tabActivated")
  tabActivatedHandler(event) {
    this.updateActiveChildren(event.target.tab, "gxg-tab-button");
    this.updateActiveChildren(event.target.tab, "gxg-tab");
  }

  componentWillLoad() {
    this.configureTabs();
  }

  updateActiveChildren(activeTab: string, tagName: string) {
    const children = Array.from(
      this.el.querySelectorAll(tagName) as NodeListOf<
        HTMLGxgTabButtonElement | HTMLGxgTabElement
      >
    );
    for (const child of children) {
      child.isSelected = activeTab === child.tab;
    }
  }

  configureTabs() {
    const tabs = this.el.querySelectorAll("gxg-tab");
    if (this.noPadding) {
      tabs.forEach((tab) => {
        ((tab as unknown) as GxgTab).noPadding = true;
      });
    }
  }

  render() {
    return (
      <Host style={{ height: this.height }}>
        <div class="main-container">
          {this.position === "bottom"
            ? [
                <div class="tabs-container">
                  <slot></slot>
                </div>,
                <div class="tab-bar-container">
                  <slot name="tab-bar" />
                </div>,
              ]
            : [
                <div class="tab-bar-container">
                  <slot name="tab-bar" />
                </div>,
                <div class="tabs-container">
                  <slot></slot>
                </div>,
              ]}
        </div>
      </Host>
    );
  }
}

export type TabsPosition = "top" | "bottom" | "left" | "right";
export type Height = "auto" | "100%";
