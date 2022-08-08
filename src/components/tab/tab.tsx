import { Component, Element, Prop, h, Host } from "@stencil/core";
import state from "../store";

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
   * The presence of this attribute removes the tab .container padding
   */
  @Prop() noPadding = false;

  /**
   * The selected tab
   */
  @Prop({ reflect: true }) isSelected = false;

  render() {
    return (
      <Host
        class={{
          open: this.isSelected,
          "not-selected": !this.isSelected,
          "no-padding": this.noPadding,
          large: state.large,
        }}
      >
        <div class="container">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
