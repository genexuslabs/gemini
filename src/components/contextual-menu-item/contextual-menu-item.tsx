import { Component, Prop, h, Host, Element } from "@stencil/core";

@Component({
  tag: "gxg-contextual-menu-item",
  styleUrl: "contextual-menu-item.scss",
  shadow: true
})
export class ContextualMenuItem {
  @Element() el: HTMLElement;

  /**
   * Optional icon
   */
  @Prop() icon: string = null;

  printIcon() {
    if (this.icon !== null) {
      return (
        <gxg-icon
          size="regular"
          type={this.icon}
          color="onbackground"
        ></gxg-icon>
      );
    }
  }

  subMenuIcon() {
    const contextualMenuSubmenu = this.el.querySelector(
      "gxg-contextual-menu-submenu"
    );
    if (contextualMenuSubmenu !== null) {
      return (
        <gxg-icon
          class="show-more"
          size="regular"
          type="navigation/arrow-right"
          color="onbackground"
        ></gxg-icon>
      );
    }
  }

  render() {
    return (
      <Host>
        <li
          class={{
            "contextual-menu-item": true,
            "contextual-menu-item--no-icon": this.icon === null
          }}
        >
          {this.printIcon()}
          <slot></slot>
          {this.subMenuIcon()}
        </li>
      </Host>
    );
  }
}
