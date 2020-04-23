import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";
import { IconType } from "../icon/icon";

@Component({
  tag: "gxg-tab-button",
  styleUrl: "tab-button.scss",
  shadow: true
})
export class TabButton {
  // Indicate that name should be a public property on the component
  @Prop() tabLabel: string = null;
  @Prop() tab: string = null;
  @Prop() isSelected = false;
  @Prop() disabled = false;
  @Prop() icon: IconType = null;

  //Events
  @Event()
  tabActivated: EventEmitter;

  //Click functions
  tabButtonClicked() {
    this.isSelected = true;
    this.tabActivated.emit();
  }
  printIcon() {
    if (this.icon !== null) {
      if (this.disabled) {
        return <gxg-icon color="disabled" type={this.icon}></gxg-icon>;
      }
      return <gxg-icon type={this.icon}></gxg-icon>;
    }
  }
  render() {
    return (
      <li class="tab-item">
        <button
          disabled={this.disabled}
          class={{
            "tab-button": true,
            "tab-button--selected": this.isSelected === true,
            "tab-button--text-icon":
              this.tabLabel !== null && this.icon !== null
          }}
          onClick={this.tabButtonClicked.bind(this)}
        >
          {this.printIcon()}
          {/* <gxg-icon type={this.icon}></gxg-icon> */}
          <span class="tab-button__text">{this.tabLabel}</span>
        </button>
        <slot></slot>
      </li>
    );
  }
}
