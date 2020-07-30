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
   * The presence of this attribute makes the accordion-item disabled and not focusable
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The accordion flavor (No need to set this attribute on each of the the accordion-item's, only once at gxg-accordion)
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

  /*The accordion padding (internal spacing)*/
  @Prop({ reflect: true }) padding: padding = "s";

  /**
   * Set the status to "open" if you want the accordion-item open by default
   */
  @Prop({ reflect: true }) status: status = "closed";

  @Event() accordionItemClicked: EventEmitter;
  @Event() accordionItemLoaded: EventEmitter;
  @Event() accordionTitleClicked: EventEmitter;

  itemClickedHandler() {
    this.accordionItemClicked.emit(this.itemId);
  }
  titleClickedHandler() {
    this.accordionTitleClicked.emit("title clicked");
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
      <gxg-icon slot="icon" size={iSize} type={iType} color={iColor}></gxg-icon>
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
            <div class="item__header__title-subtitle">
              <div
                class="item__header__title-subtitle__title"
                onClick={this.titleClickedHandler.bind(this)}
              >
                {this.itemTitle}
              </div>
              {this.mode === "classical" || this.mode === "boxed" ? (
                <div class="item__header__title-subtitle__subtitle">
                  <slot name="subtitle"></slot>
                </div>
              ) : null}
            </div>
            <div class="item__header__meta-icon-wrapper">
              {this.mode === "boxed" ? (
                <div class="item__header__meta-icon-wrapper__meta">
                  <slot name="meta"></slot>
                </div>
              ) : null}
              <div class="item__header__meta-icon-wrapper__icon">
                {this.printIcon()}
              </div>
            </div>
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
