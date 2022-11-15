import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "gxg-paginator",
  styleUrl: "gxg-paginator.scss",
  shadow: false,
})
export class GxgPaginator {
  @Prop() activePage: number;
  @Prop() totalPages: number;

  render() {
    return (
      <Host>
        <ch-paginator>
          <slot></slot>
        </ch-paginator>
      </Host>
    );
  }
}
