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
    //first, get the active tab, and set it´s outer-container overflow to hidden
    const activeTab = this.element.querySelector("gxg-tab[is-selected]");
    if (activeTab !== null) {
      const outerContainer = activeTab.shadowRoot.querySelector(
        ".outer-container"
      ) as HTMLElement;
      outerContainer.style.overflow = "hidden";
    }
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

      if (activeTab === child.tab) {
        let outerContainer = child.shadowRoot.querySelector(
          ".outer-container"
        ) as HTMLElement;

        if (child.tagName === "GXG-TAB") {
          outerContainer = child.shadowRoot.querySelector(
            ".outer-container"
          ) as HTMLElement;

          setTimeout(function() {
            outerContainer.style.overflow = "visible";
          }, 100);
        }
      }
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
