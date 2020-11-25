import { Component, h, Host, Element } from "@stencil/core";

@Component({
  tag: "gxg-contextual-menu-submenu",
  styleUrl: "contextual-menu-submenu.scss",
  shadow: true
})
export class GxgContextualMenuSubmenu {
  @Element() el: HTMLElement;

  render() {
    return (
      <Host>
        <ul class="contextual-menu-submenu">
          <slot></slot>
        </ul>
      </Host>
    );
  }
}
