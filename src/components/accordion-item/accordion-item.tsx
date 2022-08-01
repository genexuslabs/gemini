import {
  Component,
  Prop,
  h,
  Host,
  Element,
  Event,
  EventEmitter,
  State,
} from "@stencil/core";
import { Color } from "../icon/icon";
import { mode } from "../accordion/accordion";

@Component({
  tag: "gxg-accordion-item",
  styleUrl: "accordion-item.scss",
  shadow: true,
})
export class GxgAccordionItem {
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

  /**
   * The accordion subtitle (optional)
   */
  @Prop() itemSubtitle: string = null;

  /**
   * The accordion title icon
   */
  @Prop() titleIcon: string = null;

  /**
   * Set the status to "open" if you want the accordion-item open by default
   */
  @Prop({ reflect: true }) status: status = "closed";

  /**
   * The presence of this attribue adds a border to the accordion item.
   */
  @Prop() hasBorder = false;

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

  /*
   *If this accordion is nested into an accordion-item
   */
  @State() nestedAccordion = false;

  /*
   *accordion min-height
   */
  @State() minHeight = null;

  /*
   *accordion mode
   */
  @State() accordionMode = null;

  /*
   * Has slotted meta
   */
  @State() hasSlottedMeta = null;

  itemClickedHandler(e) {
    if (e.detail != 0) {
      this.accordionItemClicked.emit(this.itemId);
    }
  }
  titleClickedHandler() {
    this.accordionTitleClicked.emit("title clicked");
  }

  printIcon() {
    let iType;
    let iColor: Color;
    if (this.status === "open" && !this.disabled) {
      iType = "navigation/chevron-up";
      if (this.mode === "classical") {
        iColor = "alwaysblack";
      } else if (this.mode === "boxed" || this.mode === "minimal") {
        iColor = "onbackground";
      } else {
        iColor = "negative";
      }
    } else {
      //item closed
      iType = "navigation/chevron-down";
      if (this.mode === "classical") {
        if (this.disabled) {
          iColor = "ondisabled";
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
    return (
      <gxg-icon
        slot="icon"
        size="regular"
        type={iType}
        color={iColor}
      ></gxg-icon>
    );
  }

  componentWillLoad() {
    if (!this.itemId) {
      console.warn("gxg-accordion-item 'itemId' property is mandatory.");
    }
    this.accordionItemLoaded.emit(this.itemId);

    const slottedMeta = this.el.querySelector("[slot=meta]");
    if (slottedMeta !== null) {
      this.hasSlottedMeta = true;
    }
  }

  componentDidLoad() {
    //Get accordion mode
    this.accordionMode = this.el.parentElement.getAttribute("mode");

    //Detect if this accordion-item has an accordion in it
    const accordion = this.el.querySelector("gxg-accordion");
    if (accordion !== null) {
      this.nestedAccordion = true;
    }

    //Detect click on input ".outer-wrapper"
    const gxgFormText = this.el.shadowRoot.querySelector("gxg-form-text");
    if (gxgFormText !== null) {
      const outerWrapper = gxgFormText.shadowRoot.querySelector(
        ".outer-wrapper"
      );
      outerWrapper.addEventListener(
        "click",
        function (e) {
          if (!e.path[0].classList.contains("input")) {
            this.status = "closed";
          }
        }.bind(this)
      );
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

  changedTitleHandler(event) {
    if (this.editableTitle) {
      this.itemTitle = event.detail;
      this.titleChanged.emit(this.itemTitle);
    }
  }

  keyDownHandler(e) {
    if (e.code === "Enter") {
      this.accordionItemClicked.emit(this.itemId);
    }
  }

  itemSubtitleTrimmed(subtitle) {
    if (subtitle.length > 50) {
      return subtitle;
    } else {
      return "";
    }
  }

  render() {
    return (
      <Host
        class={{
          "nested-acordion": this.nestedAccordion,
          "has-subtitle": this.itemSubtitle !== null,
        }}
      >
        {
          //disabled layer prevents interacting with the component and enables to use "not-allowed" cursor
          this.disabled ? <div class="disabled-layer"></div> : null
        }
        <div
          class={{
            item: true,
            "item--disabled": this.disabled === true,
          }}
        >
          <header class="item__header">
            <div
              class="item__header__button"
              id={"accordion-" + this.itemId}
              onClick={this.itemClickedHandler.bind(this)}
              tabindex={!this.disabled ? 0 : -1}
              aria-expanded={this.ariaExpanded()}
              aria-controls={this.itemId}
              aria-disabled={this.ariaDisabled()}
              onKeyDown={this.keyDownHandler.bind(this)}
            >
              {this.editableTitle &&
              (this.mode === "classical" || this.mode === "boxed") ? (
                //div.cover prevents the editable-title to be edited when the accordion-item is closed
                <div
                  class={{
                    cover: true,
                    hidden: this.status === "open",
                  }}
                ></div>
              ) : null}

              <div class="item__header__button__title-subtitle">
                <h1
                  class="item__header__button__title-subtitle__title"
                  onClick={this.titleClickedHandler.bind(this)}
                >
                  {this.titleIcon !== null &&
                  (this.accordionMode === "classical" ||
                    this.accordionMode === "boxed") ? (
                    <div class="item__header__button__title-subtitle__title__icon">
                      <gxg-icon
                        size="regular"
                        type={this.titleIcon}
                        color={this.disabled ? "ondisabled" : "auto"}
                      ></gxg-icon>
                    </div>
                  ) : null}
                  {this.editableTitle &&
                  (this.mode === "classical" || this.mode === "boxed") ? (
                    //editable title should only be available for "classical" or "boxed" modes
                    <gxg-form-text
                      onChange={(event) => this.changedTitleHandler(event)}
                      minimal
                      over-dark-background={
                        true
                          ? this.disabled && this.mode === "classical"
                          : false
                      }
                      value={this.itemTitle}
                      onClick={this.gxgFormTextClickedHandler.bind(this)}
                      text-style="title-02"
                      class="input"
                    ></gxg-form-text>
                  ) : (
                    this.itemTitle
                  )}
                </h1>
                {(this.mode === "classical" || this.mode === "boxed") &&
                this.itemSubtitle !== null ? (
                  <h2
                    class="item__header__button__title-subtitle__subtitle"
                    title={this.itemSubtitleTrimmed(this.itemSubtitle)}
                  >
                    {this.itemSubtitle.length > 50
                      ? this.itemSubtitle.slice(0, 50) + "..."
                      : this.itemSubtitle}
                  </h2>
                ) : null}
              </div>
              <div class="item__header__button__meta-icon-wrapper">
                {this.hasSlottedMeta &&
                (this.mode === "classical" || this.mode === "boxed") ? (
                  <div class="item__header__button__meta-icon-wrapper__meta">
                    <slot name="meta"></slot>
                  </div>
                ) : null}
                <div class="item__header__button__meta-icon-wrapper__icon">
                  {this.printIcon()}
                </div>
              </div>
            </div>
          </header>
          {this.status === "open" && !this.disabled ? (
            <main
              class="item__container"
              id={this.itemId}
              role="region"
              aria-labelledby={"accordion-" + this.itemId}
            >
              <slot></slot>
            </main>
          ) : (
            ""
          )}
        </div>
      </Host>
    );
  }
}

export type status = "open" | "closed";
