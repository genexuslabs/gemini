import { Component, Host, Prop, h } from "@stencil/core";

@Component({
  tag: "gxg-filter-item",
  styleUrl: "gxg-filter-item.scss",
  shadow: true,
})
export class GxgFilterItem {
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

  //itemClicked() {}

  render() {
    return (
      <Host onClick={this.itemClicked.bind(this)} tabindex="0">
        <gxg-icon color="auto" size="small" type={this.icon()}></gxg-icon>
        <div class="text">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
