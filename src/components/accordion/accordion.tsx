import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "gxg-accordion",
  styleUrl: "accordion.scss",
  shadow: true
})
export class Accordion {
  /**
   * The state of the toggle. Whether is disabled or not.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The aesthetical mode
   */
  @Prop({ reflect: true }) mode: modeType = "classical";

  /**
   * The toggle label
   */
  @Prop() tabTitle = "tab";

  /**
   * The toggle state
   */
  @Prop() open = false;

  @Event() tabClicked: EventEmitter;

  tabClickedHandler() {
    this.tabClicked.emit(this.tabTitle);
  }

  printIcon() {
    if (this.open === true) {
      if (this.mode === "classical") {
        return <gxg-icon slot="icon" type="chevron-up" size="small"></gxg-icon>;
      } else {
        //tab alternate
        return (
          <gxg-icon
            slot="icon"
            type="chevron-up"
            size="small"
            color="negative"
          ></gxg-icon>
        );
      }
    } else {
      //tab closed
      if (this.mode === "classical") {
        if (this.disabled) {
          return (
            <gxg-icon
              slot="icon"
              type="chevron-down"
              size="small"
              color="negative"
            ></gxg-icon>
          );
        } else {
          //tab not disabled
          return (
            <gxg-icon slot="icon" type="chevron-down" size="small"></gxg-icon>
          );
        }
      } else {
        //tab alternate
        return (
          <gxg-icon
            slot="icon"
            type="chevron-down"
            size="small"
            color="negative"
          ></gxg-icon>
        );
      }
    }
  }

  render() {
    return (
      <div
        class={{
          tab: true,
          "tab--closed": this.open === false,
          "tab--open": this.open === true,
          "tab--disabled": this.disabled === true
        }}
      >
        <header class="tab__header" onClick={this.tabClickedHandler.bind(this)}>
          <div class="tab__header__title">{this.tabTitle}</div>
          {this.printIcon()}
        </header>
        {this.open === true ? (
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
