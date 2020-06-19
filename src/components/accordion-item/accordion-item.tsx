import {
  Component,
  Prop,
  h,
  Event,
  Element,
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
  @Prop() open = false;

  @Event() accordionItemClicked: EventEmitter;
  @Event() accordionItemLoaded: EventEmitter;

  itemClickedHandler() {
    this.accordionItemClicked.emit(this.itemId);
  }

  printIcon() {
    const iType: IconType = "chevron-right";
    let iColor: Color;
    let iSize: Size;
    //icon color
    if (this.mode === "slim" || (this.disabled && this.mode == "classical")) {
      iColor = "negative";
    } else if (this.mode === "boxed" && this.disabled) {
      iColor = "disabled";
    } else {
      iColor = "onbackground";
    }
    //icon size
    if (this.mode === "boxed") {
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
    //Resize Observer
    const myObserver = new ResizeObserver(entries => {
      entries.forEach(() => {
        this.setMaxHeight();
      });
    });
    myObserver.observe(this.el);

    if (!this.itemId) {
      console.warn("gxg-accordion-item 'itemId' property is mandatory.");
    }
    this.accordionItemLoaded.emit(this.itemId);

    //Set max height
    this.setMaxHeight();
  }

  setMaxHeight() {
    //Set max-height to ".item__outer-container"
    let outerContainerMaxHeight = "0px";
    outerContainerMaxHeight =
      (this.el.shadowRoot.querySelector(
        ".item__inner-container"
      ) as HTMLElement).offsetHeight + "px";

    this.el.style.setProperty(
      "--outerContainerMaxHeight",
      outerContainerMaxHeight
    );
  }

  render() {
    return (
      <div
        class={{
          item: true,
          "item--disabled": this.disabled === true,
          "item--open": this.open === true && this.disabled === false
        }}
      >
        <header
          class="item__header"
          onClick={this.itemClickedHandler.bind(this)}
        >
          <div class="item__header__title">{this.itemTitle}</div>
          {this.printIcon()}
        </header>
        <div class="item__outer-container">
          <div class="item__inner-container">
            <slot></slot>
          </div>
        </div>
      </div>
    );
  }
}
