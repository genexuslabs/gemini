import { Component, Host, Prop, h } from "@stencil/core";

@Component({
  tag: "gxg-unnamed-item",
  styleUrl: "gxg-unnamed-item.scss",
  shadow: true
})
export class GxgUnnamedItem {
  /**
   * The icon (optional)
   */
  @Prop() icon = undefined;

  render() {
    return (
      <Host>
        {this.icon !== undefined ? (
          <gxg-icon size="small" type={this.icon}></gxg-icon>
        ) : null}
        <slot></slot>
      </Host>
    );
  }
}
