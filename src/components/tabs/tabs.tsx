import {
  Component,
  Element,
  Listen,
  Host,
  h,
  State,
  Prop,
} from "@stencil/core";

@Component({
  tag: "gxg-tabs",
  styleUrl: "tabs.scss",
  shadow: true,
})
export class GxgTabs {
  @Element() element: HTMLGxgTabsElement;

  @Prop() position: TabsPosition = "top";
  @Prop({ reflect: true }) height: Height = "auto";

  @State() activeTab = "";

  @Listen("tabActivated")
  tabActivatedHandler(event) {
    this.updateActiveChildren(event.target.tab, "gxg-tab-button");
    this.updateActiveChildren(event.target.tab, "gxg-tab");
  }

  updateActiveChildren(activeTab: string, tagName: string) {
    const children = Array.from(
      this.element.querySelectorAll(tagName) as NodeListOf<
        HTMLGxgTabButtonElement | HTMLGxgTabElement
      >
    );
    for (const child of children) {
      child.isSelected = activeTab === child.tab;
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
