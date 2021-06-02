import { Component, Host, h, getAssetPath, Prop } from "@stencil/core";

@Component({
  tag: "gxg-breadcrumbs",
  styleUrl: "breadcrumbs.scss",
  shadow: true,
  assetsDirs: ["breadcrumb-assets"],
})
export class GxgBreadcrumbs {
  @Prop() image = "breadcrumbs.png";

  render() {
    return (
      <Host>
        <slot></slot>
        <img
          style={{ "margin-left": "10px" }}
          src={getAssetPath(`./breadcrumb-assets/${this.image}`)}
        />
      </Host>
    );
  }
}
