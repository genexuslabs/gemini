import {
  Component,
  Event,
  EventEmitter,
  Prop,
  h,
  Host,
  Element,
} from "@stencil/core";
/* OTHER LIBRARIES IMPORTS */
/* CUSTOM IMPORTS */
import { commonClassesNames } from "../../common/classesNames";
import { Color as IconTypeColor } from "../icon/icon";
@Component({
  tag: "gxg-menu-item",
  styleUrl: "menu-item.scss",
  shadow: true,
})
export class GxgMenuItem {
  /*
INDEX:
1.OWN PROPERTIES 
2.REFERENCE TO ELEMENTS
3.STATE() VARIABLES
4.PUBLIC PROPERTY API | WATCH'S
5.EVENTS (EMIT)
6.METHODS
7.LISTENERS
8.PUBLIC METHODS API
9.LOCAL METHODS
10.RENDER() FUNCTION
*/

  // 1.OWN PROPERTIES //

  /**
   * The item label
   */
  @Prop() label: string;

  /**
   * The item iconType
   */
  @Prop() iconType: string;

  /**
   * Sets the item as active or not
   */
  @Prop({ reflect: true }) active = false;

  /**
   * The item identifier
   */
  @Prop() itemId: string;

  /**
   * Prevents the the text from wrapping into more than one line, adding an ellipsis at the end. This property is set and inherited one the menu.
   */
  @Prop() ellipsis = false;

  /**
   * Disables the item
   */
  @Prop() disabled = false;

  // 2. REFERENCE TO ELEMENTS //

  @Element() el: HTMLGxgMenuItemElement;
  listItem!: HTMLElement;

  // 3.STATE() VARIABLES //

  // 4.PUBLIC PROPERTY API | WATCH'S //

  // 5.EVENTS (EMIT) //

  /**
   * This events emits the item id, label, iconType, and a reference to itself
   */
  @Event() itemSelected: EventEmitter<MenuItemData>;

  // 6.METHODS //

  // 7.LISTENERS //

  // 8.PUBLIC METHODS API //

  // 9.LOCAL METHODS //

  // 10.RENDER() FUNCTION //

  private renderIcon(): HTMLGxgIconElement {
    return this.iconType ? (
      <gxg-icon
        slot="iconType"
        type={this.iconType}
        size="small"
        color={this.iconTypeColor()}
        part="icon"
      ></gxg-icon>
    ) : null;
  }

  private iconTypeColor = (): IconTypeColor => {
    if (this.disabled) {
      return "ondisabled";
    } else if (this.active) {
      return "negative";
    } else {
      return "disabled";
    }
  };

  private buttonClickedHandler = (): void => {
    this.active = true;
    this.itemSelected.emit({
      id: this.itemId,
      ref: this.el,
      label: this.label,
      iconType: this.iconType,
    });
  };

  render(): void {
    return (
      <Host>
        <li
          class={{
            "menu-item": true,
            "menu-item--shorter": this.iconType !== undefined,
            "menu-item--ellipsis": this.ellipsis,
            [commonClassesNames["DISABLED_CLASS"]]: this.disabled,
          }}
          ref={(el) => (this.listItem = el as HTMLElement)}
          part="item"
        >
          <button
            class="menu-item__button"
            onClick={this.buttonClickedHandler}
            part="button"
          >
            {this.renderIcon()}
            <span class="menu-item__label" part="label">
              {this.label}
            </span>
          </button>
        </li>
      </Host>
    );
  }
}

export type MenuItemData = {
  iconType?: string;
  id: string;
  label: string;
  ref: HTMLGxgMenuItemElement;
};
