import { Component, Prop, h, Element } from "@stencil/core";

@Component({
  tag: "gxg-menu",
  styleUrl: "menu.scss",
  shadow: true
})
export class Menu {
  @Element() el: HTMLElement;

  @Prop() menuTitle: string;
  @Prop() items: object;

  printTitle() {
    if (this.menuTitle !== "" || this.menuTitle !== undefined) {
      return (
        <header class="menu__header">
          <h1 class="menu__header__title">{this.menuTitle}</h1>
        </header>
      );
    }
  }

  render() {
    return [
      this.printTitle(),
      <ul class="menuList">
        <slot></slot>
      </ul>
    ];
  }
}
