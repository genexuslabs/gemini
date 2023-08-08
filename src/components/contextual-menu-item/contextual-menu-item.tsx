import {
  Component,
  Prop,
  h,
  Host,
  Element,
  Event,
  EventEmitter,
} from "@stencil/core";

@Component({
  tag: "gxg-contextual-menu-item",
  styleUrl: "contextual-menu-item.scss",
  shadow: true,
})
export class ContextualMenuItem {
  @Element() el: HTMLElement;
  @Event() contextualMenuItemSelected: EventEmitter<string>;

  /**
   * Optional icon
   */
  @Prop() icon: string = null;

  /**
   * The id
   */
  @Prop() id: string;

  printIcon() {
    if (this.icon !== null) {
      return (
        <gxg-icon size="small" type={this.icon} color="onbackground"></gxg-icon>
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

  private clickHandler = () => {
    this.contextualMenuItemSelected.emit(this.id);
  };

  render() {
    return (
      <Host onClick={this.clickHandler}>
        <li
          class={{
            "contextual-menu-item": true,
            "contextual-menu-item--no-icon": this.icon === null,
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
