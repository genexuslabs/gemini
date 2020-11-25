import { Component, Prop, h, Host, Element, Listen } from "@stencil/core";

@Component({
  tag: "gxg-menu",
  styleUrl: "menu.scss",
  shadow: true
})
export class GxgMenu {
  @Element() el: HTMLElement;

  /**
   * The menu title
   */
  @Prop() menuTitle: string;

  /**
   * Provide this attribute if you are using this menu on the tabs component
   */
  @Prop({ reflect: true }) tabs: boolean;

  @Listen("menuItemActive")
  menuItemActiveHandler(event: CustomEvent) {
    const children = Array.from(this.el.querySelectorAll("gxg-menu-item"));

    children.forEach(element => {
      element.removeAttribute("active");
      if (event.detail === element.getAttribute("label")) {
        element.setAttribute("active", "active");
      }
    });
  }

  printTitle() {
    if (
      this.menuTitle !== "undefined" &&
      this.menuTitle.replace(/\s/g, "") !== ""
    ) {
      return (
        <header class="menu__header">
          <h1 class="menu__header__title">{this.menuTitle}</h1>
        </header>
      );
    }
  }

  render() {
    return (
      <Host>
        {this.printTitle()}
        <ul class="menuList">
          <slot></slot>
        </ul>
      </Host>
    );
  }
}
