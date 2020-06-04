import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";
import { IconType, Color } from "../icon/icon";

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
  @Prop({ reflect: true }) mode: modeType = "classical";

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
  @Prop() status: statusType = "closed";

  @Event() accordionItemClicked: EventEmitter;

  tabClickedHandler() {
    this.accordionItemClicked.emit(this.itemId);
  }

  printIcon() {
    let iType: IconType;
    let iColor: Color;
    if (this.status === "open" && !this.disabled) {
      if (this.mode === "classical") {
        iType = "chevron-up";
        iColor = "onbackground";
      } else {
        //tab alternate
        iType = "chevron-up";
        iColor = "negative";
      }
    } else {
      //tab closed
      if (this.mode === "classical") {
        if (this.disabled) {
          iType = "chevron-down";
          iColor = "negative";
        } else {
          //tab not disabled
          iType = "chevron-down";
          iColor = "onbackground";
        }
      } else {
        //tab alternate
        iType = "chevron-down";
        iColor = "negative";
      }
    }
    return (
      <gxg-icon slot="icon" size="small" type={iType} color={iColor}></gxg-icon>
    );
  }

  componentDidLoad() {
    if (!this.itemId) {
      console.warn("gxg-accordion-item 'itemId' property is mandatory.");
    }
  }

  render() {
    return (
      <div
        class={{
          tab: true,
          "tab--disabled": this.disabled === true
        }}
        onClick={this.tabClickedHandler.bind(this)}
      >
        <header class="tab__header">
          <div class="tab__header__title">{this.itemTitle}</div>
          {this.printIcon()}
        </header>
        {this.status === "open" && !this.disabled ? (
          <div class="tab__container">
            <slot></slot>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export type modeType = "classical" | "alternate";
export type statusType = "open" | "closed";
