import { Component, Host, h, Prop, getAssetPath, Element } from "@stencil/core";

@Component({
  tag: "gxg-paginator",
  styleUrl: "gxg-paginator.scss",
  shadow: false,
})
export class GxgPaginator {
  @Element() el!: HTMLElement;
  @Prop() activePage: number;
  @Prop() totalPages: number;

  componentWillLoad() {
    const iconsUrl = getAssetPath("./icon-assets/");
    this.el.style.setProperty(
      "--navigateFirstUrl",
      `url("${iconsUrl}navigation/arrow-left.svg")`
    );
    this.el.style.setProperty(
      "--navigatePrevUrl",
      `url("${iconsUrl}navigation/chevron-left.svg")`
    );
    this.el.style.setProperty(
      "--navigateLastUrl",
      `url("${iconsUrl}navigation/arrow-right.svg")`
    );
    this.el.style.setProperty(
      "--navigateNextUrl",
      `url("${iconsUrl}navigation/chevron-right.svg")`
    );
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
