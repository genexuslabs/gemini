import { Component, Element, Listen, Prop, h, State } from "@stencil/core";

@Component({
  tag: "gxg-tabs",
  styleUrl: "tabs.scss",
  shadow: true
})
export class Tabs {
  @Element() element: HTMLGxgTabsElement;

  // Indicate that name should be a public property on the component
  @Prop() tab: string;

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
      <nav class="tabs-container">
        <slot></slot>
      </nav>
    );
  }
}
