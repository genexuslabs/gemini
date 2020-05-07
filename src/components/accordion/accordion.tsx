import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "gxg-accordion",
  styleUrl: "accordion.scss",
  shadow: true
})
export class Accordion {
  /**
   * The state of the toggle. Whether is disabled or not.
   * Possible values: false, true
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The toggle label
   */
  @Prop() tabTitle = "tab";

  /**
   * The toggle state
   */
  @Prop() open = false;

  toggleTab() {
    if (this.open === false) {
      this.open = true;
    } else {
      this.open = false;
    }
  }

  render() {
    return (
      <div
        class={{
          tab: true,
          "tab--closed": this.open === false,
          "tab--open": this.open === true
        }}
        onClick={this.toggleTab.bind(this)}
      >
        <header class="tab__header">
          <div class="tab__header__title">{this.tabTitle}</div>
          {this.open === true ? (
            <gxg-icon slot="icon" type="chevron-up" size="small"></gxg-icon>
          ) : (
            <gxg-icon slot="icon" type="chevron-down" size="small"></gxg-icon>
          )}
        </header>
        {this.open === true ? (
          <div class="tab__container">
            <slot></slot>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
