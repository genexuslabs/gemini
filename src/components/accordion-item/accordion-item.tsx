import {
  Component,
  Prop,
  h,
  Host,
  Element,
  Event,
  EventEmitter,
  Listen
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
   * The presence of this attribute makes the accordion title editable
   */
  @Prop() editableTitle = false;

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
  @Prop({ reflect: true }) padding: padding = "xs";

  /**
   * Set the status to "open" if you want the accordion-item open by default
   */
  @Prop({ reflect: true }) status: status = "closed";

  /**
   * This event is for internal use
   */
  @Event() accordionItemClicked: EventEmitter;
  /**
   * This event is for internal use
   */
  @Event() accordionItemLoaded: EventEmitter;
  /**
   * Subscribe to this event to know when the "title" was clicked
   */
  @Event() accordionTitleClicked: EventEmitter;
  /**
   * If "editable-title" attribute is present, this event emmits the title value when it has changed
   */
  @Event() titleChanged: EventEmitter;

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
      iType = "chevron-up";
      if (this.mode === "classical") {
        iColor = "alwaysblack";
      } else if (this.mode === "boxed" || this.mode === "minimal") {
        iColor = "onbackground";
      } else {
        iColor = "negative";
      }
    } else {
      //item closed
      iType = "chevron-down";
      if (this.mode === "classical") {
        if (this.disabled) {
          iColor = "alwaysblack";
        } else {
          //item not disabled
          iColor = "alwaysblack";
        }
      } else if (this.mode === "boxed" || this.mode === "minimal") {
        if (this.disabled) {
          iColor = "disabled";
        } else {
          iColor = "onbackground";
        }
      } else {
        //item alternate
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

  componentWillLoad() {
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

  ariaExpanded() {
    if (this.status === "closed") {
      return "false";
    } else {
      return "true";
    }
  }

  ariaDisabled() {
    if (this.disabled) {
      return "true";
    } else {
      return "false";
    }
  }

  gxgFormTextClickedHandler(e) {
    e.stopPropagation();
  }

  textStyle() {
    if (this.mode === "classical") {
      return "title-05";
    } else if (this.mode === "slim" || this.mode === "minimal") {
      return "title-03";
    } else if (this.mode === "boxed") {
      return "title-02";
    }
  }

  @Listen("change")
  todoCompletedHandler(event) {
    this.itemTitle = event.detail;
    this.titleChanged.emit(this.itemTitle);
  }

  render() {
    return (
      <Host>
        <div
          class={{
            item: true,
            "item--disabled": this.disabled === true
          }}
        >
          <header class="item__header">
            <button
              class="item__header__button"
              id={"accordion-" + this.itemId}
              onClick={this.itemClickedHandler.bind(this)}
              tabindex={!this.disabled ? 0 : -1}
              onKeyDown={this.handlerOnKeyDown}
              aria-expanded={this.ariaExpanded()}
              aria-controls={this.itemId}
              aria-disabled={this.ariaDisabled()}
            >
              <div class="item__header__button__title-subtitle">
                <div
                  class="item__header__button__title-subtitle__title"
                  onClick={this.titleClickedHandler.bind(this)}
                >
                  {this.editableTitle ? (
                    <gxg-form-text
                      minimal
                      value={this.itemTitle}
                      onClick={this.gxgFormTextClickedHandler.bind(this)}
                      text-style={this.textStyle()}
                    ></gxg-form-text>
                  ) : (
                    this.itemTitle
                  )}
                </div>
                {this.mode === "classical" || this.mode === "boxed" ? (
                  <div class="item__header__button__title-subtitle__subtitle">
                    <slot name="subtitle"></slot>
                  </div>
                ) : null}
              </div>
              <div class="item__header__button__meta-icon-wrapper">
                {this.mode === "boxed" ? (
                  <div class="item__header__button__meta-icon-wrapper__meta">
                    <slot name="meta"></slot>
                  </div>
                ) : null}
                <div class="item__header__button__meta-icon-wrapper__icon">
                  {this.printIcon()}
                </div>
              </div>
            </button>
          </header>
          {this.status === "open" && !this.disabled ? (
            <div
              class="item__container"
              id={this.itemId}
              role="region"
              aria-labelledby={"accordion-" + this.itemId}
            >
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

export type padding = "0" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";
