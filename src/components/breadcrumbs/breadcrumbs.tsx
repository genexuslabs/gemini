import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "gxg-breadcrumbs",
  styleUrl: "breadcrumbs.scss",
  shadow: true,
})
export class GxgBreadcrumbs {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
