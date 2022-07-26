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
  @Event() itemSelected: EventEmitter;

  /**
   *
   */
  @Event() itemDidLoad: EventEmitter;

  /**
   * This event is for internal use. This event is triggered when the user presses keyboard "arrow up" on the first item. This event is caputred on "combo" component
   * and then focus is set on "search" input.
   */
  @Event() keyDownComboItem: EventEmitter;

  /**
   * Any icon that belongs to Gemini icon library: https://gx-gemini.netlify.app/?path=/story/icons
   */
  @Prop() icon: string = undefined;

  /**
   * The item value. If value is not provided, an automatic value will be generated with the innerText.
   */
  @Prop({ reflect: true }) value = undefined;

  /**
   * (This prop is for internal use).
   */
  @Prop() iconColor: Color = "auto";

  componentWillLoad() {
    this.el.tabIndex = 0; //Make the item focusable
    if (!this.value) {
      this.value = this.el.innerHTML;
    }
    this.setIndex();
  }

  componentDidLoad() {
    this.itemDidLoad.emit({
      value: this.value,
    });
  }

  setIndex() {
    const index = Array.from(this.el.parentElement.children).indexOf(this.el);
    this.el.setAttribute("index", index.toString());
  }

  itemSelectedFunc() {
    const index = this.el.getAttribute("index");
    const value = this.value;
    const description = this.el.innerHTML;
    const icon = this.el.getAttribute("icon");

    this.itemSelected.emit({
      index: parseInt(index, 10),
      value: value,
      description: description,
      icon: icon,
    });
  }

  onKeyDown(e) {
    e.preventDefault();
    if (e.code === "ArrowDown") {
      let nextItem = this.el.nextElementSibling;
      while (nextItem !== null && nextItem.classList.contains("hidden")) {
        nextItem = nextItem.nextElementSibling;
      }
      if (nextItem) {
        (nextItem as HTMLElement).focus();
      }
    } else if (e.code === "ArrowUp") {
      let prevItem = this.el.previousElementSibling;
      while (prevItem !== null && prevItem.classList.contains("hidden")) {
        prevItem = prevItem.previousElementSibling;
      }
      if (prevItem) {
        (prevItem as HTMLElement).focus();
      } else {
        this.keyDownComboItem.emit(e.code);
      }
    } else if (e.code === "Enter") {
      this.itemSelectedFunc();
    } else if (e.code === "Tab" || e.code === "Escape") {
      this.keyDownComboItem.emit(e.code);
    }
  }

  onMouseOver() {
    if (!this.el.classList.contains("exact-match")) {
      this.iconColor = "negative";
    }
  }
  onMouseOut() {
    const itemIsSelected = this.el.classList.contains("selected");
    if (!itemIsSelected) {
      this.iconColor = "auto";
    }
  }

  iconSize(): "regular" | "small" {
    if (state.large) {
      return "regular";
    } else {
      return "small";
    }
  }

  render() {
    return (
      <Host
        onClick={this.itemSelectedFunc.bind(this)}
        onKeyDown={this.onKeyDown.bind(this)}
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseOut={this.onMouseOut.bind(this)}
        class={{
          large: state.large,
          "no-icon": !this.icon,
        }}
      >
        <div class="container">
          {this.icon !== undefined ? (
            <gxg-icon
              color={this.iconColor}
              size={this.iconSize()}
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
