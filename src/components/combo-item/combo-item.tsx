import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  Element,
  State,
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
   * Any icon that belongs to Gemini icon library: https://gx-gemini.netlify.app/?path=/story/icons
   */
  @Prop() icon: string = undefined;

  /**
   * The item value. This is what the filter with search for. If value is not provided, the filter will search by the item innerHTML.
   */
  @Prop() value: any = undefined;

  /**
   * (This prop is for internal use).
   */
  @Prop() iconColor: Color = "auto";

  itemClickedFunc() {
    const index = this.el.getAttribute("index");
    const icon = this.el.getAttribute("icon");
    let value = this.value;
    if (value === undefined) {
      value = this.el.innerHTML;
    }
    this.itemClicked.emit({
      index: parseInt(index, 10),
      value: value.toString(),
      icon: icon,
    });
  }

  onKeyDown(e) {
    e.preventDefault();
    if (e.code === "ArrowDown") {
      const nextItem = this.el.nextElementSibling;
      if (nextItem !== null) {
        (nextItem as HTMLElement).focus();
      }
    } else if (e.code === "ArrowUp") {
      const prevItem = this.el.previousElementSibling;
      if (prevItem !== null) {
        (prevItem as HTMLElement).focus();
      }
    }
    if (e.code === "Enter") {
      this.itemClickedFunc();
    }
  }

  onMouseOver() {
    this.iconColor = "negative";
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
