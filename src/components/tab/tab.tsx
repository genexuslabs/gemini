import { Component, Element, Prop, h, Host } from "@stencil/core";
import state from "../store";

@Component({
  tag: "gxg-tab",
  styleUrl: "tab.scss",
  shadow: true
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
   * The presence of this attribute makes the container display flex
   */
  @Prop() flexContainer = false;

  /**
   * The presence of this attribute makes the display of the tab 'flex' only when is open
   */
  @Prop() flex = false;

  /**
   * The presence of this attribute makes the .container overflow property set to 'auto'
   */
  @Prop() overflowAuto = false;

  /**
   * The container flex-direction, if container is flex.
   */
  @Prop() flexDirection: TabContainerFlexDirection = "column";

  /**
   * The selected tab
   */
  @Prop({ reflect: true }) isSelected = false;

  /**
   * The presence of this attribute will make the font size smaller.
   */
  @Prop() reduced: boolean = false;

  render() {
    return (
      <Host
        class={{
          "overflow-auto": this.overflowAuto,
          flex: this.flex && this.isSelected,
          open: this.isSelected,
          "not-selected": !this.isSelected,
          "no-padding": this.noPadding,
          large: state.large,
          mercury: state.mercury
        }}
      >
        <div
          class={{
            container: true,
            "container--flex": this.flexContainer,
            "flex-column": this.flexDirection === "column",
            "flex-row": this.flexDirection === "row",
            "container--reduced": this.reduced
          }}
          part="container"
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}

export type TabContainerFlexDirection = "column" | "row";
