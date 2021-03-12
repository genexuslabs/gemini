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
  @Prop() type = undefined;

  icon() {
    let icon;
    switch (this.type) {
      case "webpanel":
        icon = "objects/webpanel";
        break;
      case "module":
        icon = "objects/module";
        break;
      case "theme":
        icon = "objects/themes";
        break;
      case "object":
        icon = "objects/object";
        break;
      default:
      // code block
    }
    return icon;
  }

  render() {
    return (
      <Host>
        <gxg-icon color="auto" size="small" type={this.icon()}></gxg-icon>
        <slot></slot>
      </Host>
    );
  }
}
