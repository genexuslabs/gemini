import {
  Component,
  Prop,
  h,
  Host,
  Element,
  Event,
  EventEmitter
} from "@stencil/core";
import { IconType, Color, Size } from "../icon/icon";
import { mode } from "../accordion/accordion";

@Component({
  tag: "gxg-accordion-item",
  styleUrl: "accordion-item.scss",
  shadow: true
})
export class AccordionItem {
  @Element() el: HTMLElement;

  /**
   * If this attribute is present the accordion-item will be disabled and not focusable
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The accordion flavor
   */
  @Prop({ reflect: true }) mode: mode = "classical";

  /**
   * The accordion id
   */
  @Prop() itemId!: string;

  /**
   * The accordion title
   */
  @Prop() itemTitle: string;

  /*The accoridion padding (internal spacing)*/
  @Prop({ reflect: true }) padding: padding = "s";

  /**
   * Set the status to "open" if you want the accordion-item open by default
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

  handlerOnKeyDown(event) {
    if (event.keyCode == 13 && document.activeElement === this.el) {
      //enter key was pressed
      if (this.status === "closed") {
        this.status = "open";
      } else {
        this.status = "closed";
      }
    }
  }

  render() {
    return (
      <Host
        onKeyDown={this.handlerOnKeyDown.bind(this)}
        tabindex={!this.disabled ? 0 : -1}
      >
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
      </Host>
    );
  }
}

export type status = "open" | "closed";

export type padding = "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";
