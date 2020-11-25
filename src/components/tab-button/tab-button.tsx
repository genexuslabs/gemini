import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "gxg-tab-button",
  styleUrl: "tab-button.scss",
  shadow: true
})
export class GxgTabButton {
  /**
   * The button label
   */
  @Prop() tabLabel: string = null;

  /**
   * The tab id. Should match the "tab" value of the correlative "gxg-tab" element
   */
  @Prop() tab: string = null;

  /**
   * Provide this attribute to make this button selected by default
   */
  @Prop() isSelected = false;

  /**
   * Provide this attribute to make this button disabled
   */
  @Prop() disabled = false;

  /**
   * (Optional) provide an icon to this button
   */
  @Prop() icon: string = null;

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

  componentDidLoad() {
    //Set the active tab for this tab-button if this is selected by default
    if (this.isSelected) {
      this.tabActivated.emit();
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
