import { Component, Element, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-tab",
  styleUrl: "tab.scss",
  shadow: true,
})
export class GxgTab {
  @Element() el: HTMLElement;

  /**
   * The tab id. Should match the "tab" value of the correlative "gxg-tab"
   */
  @Prop() tab: string;

  /**
   * The selected tab
   */
  @Prop({ reflect: true }) isSelected = false;

  render() {
    return (
      <Host class={{ open: this.isSelected, "not-selected": !this.isSelected }}>
        <div class="outer-container">
          <div class="inner-container">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
