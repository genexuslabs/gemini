import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  Element,
} from "@stencil/core";
import { Color } from "../icon/icon";
import state from "../store";

const ARROW_DOWN = "ArrowDown";
const ARROW_UP = "ArrowUp";

@Component({
  tag: "gxg-combo-box-item",
  styleUrl: "combo-box-item.scss",
  shadow: true,
})
export class GxgComboBoxItem {
  @Element() el: HTMLElement;

  /**
   * This event is triggered when the user clicks on an item. event.detail contains the item index, item value, and item icon.
   */
  @Event() itemSelected: EventEmitter<itemInformation>;

  /**
   *
   */
  @Event() itemDidLoad: EventEmitter;

  /**
   * This event is for internal use. This event is triggered when the user presses keyboard "arrow up" on the first item. This event is caputred on "combo" component
   * and then focus is set on "search" input.
   */
  @Event() keyDownPressed: EventEmitter;

  /**
   * Any icon that belongs to Gemini icon library: https://gx-gemini.netlify.app/?path=/story/icons
   */
  @Prop() icon: string = undefined;

  /**
   * The item value. If value is not provided, an automatic value will be generated with the innerText.
   */
  @Prop() value: ComboBoxItemValue;

  /**
   * (This prop is for internal use).
   */
  @Prop() index: number;

  /**
   * The presence of this attribute makes this combo-item disabled and not interactive.
   */
  @Prop() disabled = false;

  /**
   * The presence of this attribute makes this combo-item selected.
   */
  @Prop({ reflect: true }) selected = false;

  componentWillLoad() {
    this.setup();
  }

  componentDidLoad() {
    this.itemDidLoad.emit({
      value: this.value,
    });
  }

  private setup = () => {
    if (!this.value) {
      this.value = this.el.innerHTML;
    }
  };

  private itemSelectedHandler = () => {
    this.itemSelected.emit({
      el: this.el as HTMLGxgComboBoxItemElement,
      index: this.index,
      value: this.value,
    });
  };

  private keyDownHandler = (e: KeyboardEvent) => {
    e.preventDefault();
    console.log(e);
    //e.stopPropagation();
    // if (e.code === "ArrowDown") {
    //   let nextItem = this.el.nextElementSibling;
    //   while (nextItem !== null && nextItem.classList.contains("hidden")) {
    //     nextItem = nextItem.nextElementSibling;
    //   }
    //   if (nextItem) {
    //     (nextItem as HTMLElement).focus();
    //   }
    // } else if (e.code === "ArrowUp") {
    //   let prevItem = this.el.previousElementSibling;
    //   while (prevItem !== null && prevItem.classList.contains("hidden")) {
    //     prevItem = prevItem.previousElementSibling;
    //   }
    //   if (prevItem) {
    //     (prevItem as HTMLElement).focus();
    //   } else {
    //     this.keyDownComboItem.emit(e.code);
    //   }
    // } else if (e.code === "Enter") {
    //   this.itemSelectedHandler();
    // } else if (e.code === "Tab" || e.code === "Escape") {
    //   this.keyDownComboItem.emit(e.code);
    // }
  };

  private onMouseOverHandler = () => {
    console.log("mouse over");
  };

  private setIconColor = (): Color => {
    return this.disabled ? "ondisabled" : "auto";
  };

  // private onMouseOut = () => {
  //   const itemIsSelected = this.el.classList.contains("selected");
  //   if (!itemIsSelected) {
  //     this.iconColor = "auto";
  //   }
  // };

  render() {
    return (
      <Host
        onClick={this.itemSelectedHandler}
        onKeyDown={this.keyDownHandler}
        onMouseOver={this.onMouseOverHandler}
        class={{
          large: state.large,
          "no-icon": !this.icon,
          "gxg--disabled": this.disabled,
        }}
      >
        <div class={{ container: true }}>
          {this.icon ? (
            <gxg-icon
              color={this.setIconColor()}
              size={state.large ? "regular" : "small"}
              type={this.icon}
            ></gxg-icon>
          ) : null}
          <div class="description">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}

export type itemInformation = {
  el: HTMLGxgComboBoxItemElement;
  index: number;
  value: any;
};

export type ComboBoxItemValue = any;
