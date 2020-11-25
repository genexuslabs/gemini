import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "gxg-toolbar-item",
  styleUrl: "toolbar-item.scss",
  shadow: true
})
export class GxgToolbarItem {
  /**
   * The state of the toolbar-item, whether it is disabled or not
   */
  @Prop() disabled = false;

  /**
   * The toolbar-item icon
   */
  @Prop() icon: string = null;

  /**
   * The toolbar-item subtitle
   */
  @Prop() subtitle: string;

  /**
   * The toolbar-item title
   */
  @Prop() toolbarItemTitle: string;

  includeIcon() {
    if (this.icon !== null) {
      return (
        <gxg-icon slot="icon" type={this.icon} color="negative"></gxg-icon>
      );
    }
  }

  render() {
    return (
      <div
        class={{
          "toolbar-item": true,
          "toolbar-item--disabled": this.disabled === true
        }}
      >
        <div class="toolbar-item__label">
          <div class="toolbar-item__label__title">{this.toolbarItemTitle}</div>:
          <div class="toolbar-item__label__subtitle">{this.subtitle}</div>
        </div>
        {this.includeIcon()}
      </div>
    );
  }
}
