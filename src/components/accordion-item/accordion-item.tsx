import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";
import { IconType, Color, Size } from "../icon/icon";
import { mode } from "../accordion/accordion";

@Component({
  tag: "gxg-accordion-item",
  styleUrl: "accordion-item.scss",
  shadow: true
})
export class AccordionItem {
  /**
   * The state of the toggle. Whether is disabled or not.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The aesthetical mode
   */
  @Prop({ reflect: true }) mode: mode = "classical";

  /**
   * The toggle id
   */
  @Prop() itemId!: string;

  /**
   * The toggle label
   */
  @Prop() itemTitle: string;

  /**
   * The toggle state
   */
  @Prop({ reflect: true }) status: status = "closed";

  @Event() accordionItemClicked: EventEmitter;
  @Event() accordionItemLoaded: EventEmitter;

  itemClickedHandler() {
    this.accordionItemClicked.emit(this.itemId);
  }

  printIcon() {
    let iType: IconType;
    let iColor: Color;
    let iSize: Size;
    if (this.status === "open" && !this.disabled) {
      if (this.mode === "classical" || this.mode === "boxed") {
        iType = "chevron-up";
        iColor = "alwaysblack";
      } else {
        //item alternate
        iType = "chevron-up";
        iColor = "negative";
      }
    } else {
      //item closed
      if (this.mode === "classical" || this.mode === "boxed") {
        if (this.disabled) {
          iType = "chevron-down";
          iColor = "negative";
        } else {
          //item not disabled
          iType = "chevron-down";
          iColor = "alwaysblack";
        }
      } else {
        //item alternate
        iType = "chevron-down";
        iColor = "negative";
      }
    }
    if (this.mode === "classical" || this.mode === "boxed") {
      iSize = "regular";
    } else {
      iSize = "small";
    }
    return (
      <span class="icon-wrapper">
        <gxg-icon
          slot="icon"
          size={iSize}
          type={iType}
          color={iColor}
        ></gxg-icon>
      </span>
    );
  }

  componentDidLoad() {
    if (!this.itemId) {
      console.warn("gxg-accordion-item 'itemId' property is mandatory.");
    }
    this.accordionItemLoaded.emit(this.itemId);
  }

  render() {
    return (
      <div
        class={{
          item: true,
          "item--disabled": this.disabled === true
        }}
      >
        <header
          class="item__header"
          onClick={this.itemClickedHandler.bind(this)}
        >
          <div class="item__header__title">{this.itemTitle}</div>
          {this.printIcon()}
        </header>
        {this.status === "open" && !this.disabled ? (
          <div class="item__container">
            <slot></slot>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export type status = "open" | "closed";
