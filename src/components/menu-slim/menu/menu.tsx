/* STENCIL IMPORTS */
import {
  Component,
  Prop,
  h,
  Host,
  Element,
  Listen,
  Watch,
} from "@stencil/core";
/* OTHER LIBRARIES IMPORTS */
/* CUSTOM IMPORTS */
import { detectClickOutside } from "../../../common/detect-click-outside";
import { MenuItemSelected, MenuItemFocusChange } from "../item/item";
import { KeyboardKeys as KK } from "../../../common/types";

@Component({
  tag: "gxg-menu-slim",
  styleUrl: "menu.scss",
  shadow: true,
})
export class GxgMenuSlim {
  /*
INDEX:
1.OWN PROPERTIES 
2.REFERENCE TO ELEMENTS
3.STATE() VARIABLES
4.PUBLIC PROPERTY API | WATCH'S
5.EVENTS (EMIT)
6.COMPONENT LIFECYCLE EVENTS
7.LISTENERS
8.PUBLIC METHODS API
9.LOCAL METHODS
10.RENDER() FUNCTION
*/

  // 1.OWN PROPERTIES //

  private _menuHeight = "0px";

  /**
   * The delay in milliseconds that the menu will remain visible after mouseout event fires.
   */
  private _mouseOutDelay = 1000;

  /**
   * It holds a reference to the 'mouseOutTimeout' timeout set using the setTimeout function
   */
  private mouseOutTimeout: ReturnType<typeof setTimeout>;

  /**
   * The menu height transition timing.
   */
  private _transitionDuration = 200;

  /**
   * The enabled (not disabled) menu items
   */
  private _enabledItems: HTMLGxgMenuSlimItemElement[] = [];

  // 2.REFERENCE TO ELEMENTS //

  @Element() el: HTMLGxgMenuSlimElement;
  innerWrapper!: HTMLDivElement;

  // 3.STATE() VARIABLES //

  // 4.PUBLIC PROPERTY API | WATCH'S //

  /**
   * The menu title
   */
  @Prop() readonly menuTitle: string;

  /**
   * Provide this attribute if you are using this menu on the tabs component
   */
  @Prop({ reflect: true }) readonly tabs: boolean;

  /**
   * Hides or show the menu with an animation
   */
  @Prop() readonly hidden = true;

  /**
   * Hides the menu when an item is selected.
   */
  @Prop() readonly hideOnSelect = true;

  @Watch("hidden")
  hiddenHandler(hidden): void {
    if (hidden) {
      this._menuHeight = "0px";
      this.el.setAttribute("tabindex", "-1");
      this.removeDetectClickOutside();
      this.removeMouseOut();
      this.removeMouseEnter();
    } else {
      this._menuHeight = this.innerWrapper.offsetHeight + "px";
      this.el.removeAttribute("tabindex");
      setTimeout(() => {
        this.setFocusFirstItem();
        this.attachDetectClickOutside();
        this.attachMouseOut();
        this.attachMouseEnter();
      }, this._transitionDuration);
    }
  }

  /**
   * Prevents the menu-item's text from wrapping into more than one line, adding an ellipsis at the end.
   */
  @Prop() readonly ellipsis = true;

  // 5.EVENTS (EMIT) //

  // 6.COMPONENT LIFECYCLE EVENTS //

  componentWillLoad(): void {
    this.assignEllipsis();
    /*Prevent this.mouseOutTimeout firing on page load*/
    clearTimeout(this.mouseOutTimeout);
    this.getEnabledItems();
  }

  disconnectedCallback(): void {
    this.removeDetectClickOutside();
    this.removeMouseOut();
    this.removeMouseEnter();
  }

  // 7.LISTENERS //

  @Listen("itemSelected")
  itemSelectedHandler(itemSelected: CustomEvent<MenuItemSelected>): void {
    /*Remove 'active' from every item, except from the clicked one*/
    const menuItems: HTMLGxgMenuSlimItemElement[] = Array.from(
      this.el.querySelectorAll("gxg-menu-slim-item")
    );
    menuItems.forEach((menuItem) => {
      if (itemSelected.detail.ref !== menuItem) {
        menuItem.active = false;
      }
    });
    /*Hide menu*/
    if (this.hideOnSelect) {
      this.hidden = true;
    }
  }

  @Listen("keyboardNavigation")
  keyboardNavigationHandler(
    triggeredItem: CustomEvent<MenuItemFocusChange>
  ): void {
    const triggeringItem: HTMLGxgMenuSlimItemElement = triggeredItem.detail.ref;
    const triggeringItemIndex = this._enabledItems.findIndex((item) => {
      return item === triggeringItem;
    });

    let newFocusedItem: HTMLGxgMenuSlimItemElement;
    if (
      triggeringItemIndex !== -1 &&
      triggeredItem.detail.key === KK.ARROW_UP
    ) {
      const prevItem = this._enabledItems[triggeringItemIndex - 1];
      if (prevItem?.active && prevItem.previousElementSibling) {
        newFocusedItem =
          prevItem.previousElementSibling as HTMLGxgMenuSlimItemElement;
      } else if (prevItem) {
        newFocusedItem = prevItem;
      }
    } else if (
      triggeringItemIndex !== -1 &&
      triggeredItem.detail.key === KK.ARROW_DOWN
    ) {
      const nextItem = this._enabledItems[triggeringItemIndex + 1];
      if (nextItem?.active && nextItem.nextElementSibling) {
        newFocusedItem =
          nextItem.nextElementSibling as HTMLGxgMenuSlimItemElement;
      } else if (nextItem) {
        newFocusedItem = nextItem;
      }
    }
    if (newFocusedItem) {
      newFocusedItem.focus();
    }
  }

  // 8.PUBLIC METHODS API //

  // 9.LOCAL METHODS //

  private setFocusFirstItem = (): void => {
    const firstItem = this.el.querySelector("gxg-menu-slim-item");
    firstItem.focus();
  };

  private assignEllipsis = (): void => {
    if (this.ellipsis) {
      const items = this.el.querySelectorAll("gxg-menu-slim-item");
      items &&
        items.forEach((item: HTMLGxgMenuSlimItemElement) => {
          item.ellipsis = true;
        });
    }
  };

  /*Mouse out handlers*/
  private attachMouseOut = (): void => {
    this.el.addEventListener("mouseout", this.detectMouseOut);
  };
  private removeMouseOut = (): void => {
    this.el.removeEventListener("mouseout", this.detectMouseOut);
  };
  private detectMouseOut = (e: MouseEvent): void => {
    const nodeName = (e.relatedTarget as HTMLElement).nodeName;
    if (
      nodeName !== "GXG-MENU" &&
      nodeName !== "GXG-MENU-LIST" &&
      nodeName !== "GXG-MENU-slim-ITEM"
    ) {
      //Mouse out
      this.startMouseOutTimeout();
    }
  };

  /*Mouse enter handlers*/
  private attachMouseEnter = (): void => {
    this.el.addEventListener("mouseenter", this.detectMouseEnter);
  };
  private removeMouseEnter = (): void => {
    this.el.removeEventListener("mouseenter", this.detectMouseEnter);
  };
  private detectMouseEnter = (): void => {
    //Mouse enter
    this.clearMouseOutTimeout();
  };

  /**
   * @description
   */
  private startMouseOutTimeout(): void {
    this.mouseOutTimeout = setTimeout(() => {
      this.hidden = true;
    }, this._mouseOutDelay);
  }
  private clearMouseOutTimeout(): void {
    clearTimeout(this.mouseOutTimeout);
  }

  /*Detect click outside*/
  private attachDetectClickOutside = () => {
    document.addEventListener("click", this.detectClickOutside);
  };
  private removeDetectClickOutside = () => {
    document.removeEventListener("click", this.detectClickOutside);
  };
  /*Detect click outside*/
  private detectClickOutside = (e): void => {
    const clickedOutside = detectClickOutside(e, this.el);
    if (clickedOutside) {
      this.hidden = true;
    } else {
      this.hidden = false;
    }
  };

  /**
   * @description It renders the menu title, which is optional.
   */
  private renderTitle(): HTMLElement {
    return this.menuTitle ? (
      <header class="menu__header" part="header">
        <h1 class="menu__header__title" part="title">
          {this.menuTitle}
        </h1>
      </header>
    ) : null;
  }

  private getEnabledItems = () => {
    const enabledItems = this.el.querySelectorAll("gxg-menu-slim-item");
    enabledItems.forEach((menuItem: HTMLGxgMenuSlimItemElement) => {
      if (!menuItem.disabled) {
        this._enabledItems.push(menuItem);
      }
    });
  };

  // 10.RENDER() FUNCTION //

  render() {
    return (
      <Host tabindex="-1">
        <div
          class={{
            "outer-wrapper": true,
          }}
          style={{
            height: this._menuHeight,
            transitionDuration: `${this._transitionDuration}ms`,
          }}
          part="outer-wrapper"
        >
          <div
            class="inner-wrapper"
            ref={(el) => (this.innerWrapper = el as HTMLDivElement)}
            part="inner-wrapper"
          >
            {this.renderTitle()}
            <div class="lists-wrapper" part="lists-wrapper">
              <slot></slot>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
