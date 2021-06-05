import { Component, Host, h, Element } from "@stencil/core";

@Component({
  tag: "gxg-breadcrumbs",
  styleUrl: "breadcrumbs.scss",
  shadow: true,
})
export class GxgBreadcrumbs {
  @Element() el: HTMLElement;

  componentWillLoad() {
    this.setIndexToBreadcrumb();
  }

  setIndexToBreadcrumb() {
    const breadcrumbs = this.el.querySelectorAll("gxg-breadcrumb");
    breadcrumbs.forEach((breadcrumb, index) => {
      breadcrumb.setAttribute("data-index", index.toString());
    });
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
