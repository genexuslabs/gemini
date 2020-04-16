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

  componentDidLoad() {
    const cmp = this.el;
    const menuItems = JSON.parse(cmp.getAttribute("items"));

    const arrayMenuItems = [];

    menuItems.forEach(function(menuItem) {
      const li = document.createElement("li");

      //label
      li.textContent = menuItem.label;

      //icon
      if (menuItem.icon !== undefined && menuItem.icon !== "") {
        const icon = document.createElement("gxg-icon");
        icon.setAttribute("type", menuItem.icon);
        icon.setAttribute("size", "small");
        li.insertBefore(icon, null);
      }
      arrayMenuItems.push(li);
    });
    arrayMenuItems.forEach(menuItem => {
      this.el.shadowRoot.querySelector(".menuList").appendChild(menuItem);
    });
  }

  printTitle() {
    console.log(this.menuTitle);
    if (this.menuTitle !== "" || this.menuTitle !== undefined) {
      return (
        <header class="menu__header">
          <h1 class="menu__header__title">{this.menuTitle}</h1>
        </header>
      );
    }
  }

  render() {
    return [this.printTitle(), <ul class="menuList"></ul>];
  }
}
