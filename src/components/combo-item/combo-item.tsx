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

@Component({
  tag: "gxg-combo-item",
  styleUrl: "combo-item.scss",
  shadow: true,
})
export class GxgComboItem {
  @Element() el: HTMLElement;

  /**
   * This event is triggered when the user clicks on an item. event.detail contains the item index, item value, and item icon.
   */
  @Event() itemClicked: EventEmitter;

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
  @Prop({ reflect: true }) value: any = undefined;

  /**
   * (This prop is for internal use).
   */
  @Prop() iconColor: Color = "auto";

  componentWillLoad() {
    this.el.tabIndex = 0;
    if (!this.value) {
      this.value = this.el.innerHTML.toLocaleLowerCase().replace(" ", "-");
    }
  }

  itemClickedFunc() {
    const index = this.el.getAttribute("index");
    const value = this.value;
    const description = this.el.innerHTML;
    const icon = this.el.getAttribute("icon");

    this.itemClicked.emit({
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
      this.itemClickedFunc();
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

  render() {
    return (
      <Host
        onClick={this.itemClickedFunc.bind(this)}
        onKeyDown={this.onKeyDown.bind(this)}
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseOut={this.onMouseOut.bind(this)}
      >
        <div class="content">
          {this.icon !== undefined ? (
            <gxg-icon
              color={this.iconColor}
              size="small"
              type={this.icon}
            ></gxg-icon>
          ) : null}
          <slot></slot>
        </div>
      </Host>
    );
  }
}
