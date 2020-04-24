import { Component, Prop, h, Host, Element, Listen } from "@stencil/core";

@Component({
  tag: "gxg-menu",
  styleUrl: "menu.scss",
  shadow: true
})
export class Menu {
  @Element() el: HTMLElement;

  @Prop() title: string;
  @Prop() fullWidth: boolean;
  @Prop() tabs: boolean;
  @Prop() width: string;

  @Listen("menuItemActive")
  menuItemActiveHandler(event: CustomEvent) {
    const children = Array.from(this.el.querySelectorAll("gxg-menu-item"));
    console.log(children);

    children.forEach(element => {
      element.removeAttribute("active");
      if (event.detail === element.getAttribute("label")) {
        element.setAttribute("active", "active");
      }
    });
  }

  printTitle() {
    console.log("menu title");
    console.log(this.title);
    if (this.title !== undefined) {
      return (
        <header class="menu__header">
          <h1 class="menu__header__title">{this.title}</h1>
        </header>
      );
    }
  }

  render() {
    return (
      <Host style={{ width: this.width }}>
        {this.printTitle()}
        <ul class="menuList">
          <slot></slot>
        </ul>
      </Host>
    );
  }
}
