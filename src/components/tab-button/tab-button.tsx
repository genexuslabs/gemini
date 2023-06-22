import {
  Component,
  Prop,
  h,
  Event,
  EventEmitter,
  Element,
  Host,
  Method,
  Watch,
} from "@stencil/core";
import state from "../store";

@Component({
  tag: "gxg-tab-button",
  styleUrl: "tab-button.scss",
  shadow: true,
})
export class GxgTabButton {
  @Element() el: HTMLElement;
  tabButton!: HTMLButtonElement;

  /**
   * The button label
   */
  @Prop() tabLabel: string = null;

  /**
   * The tab id. Must be unique, and match the "tab" value of the correlative "gxg-tab" element
   */
  @Prop({ reflect: true }) tab: string = null;

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
  @Event()
  PrevOrNextTab: EventEmitter;

  @Method()
  async tabButtonClick() {
    this.buttonClickHandler();
    this.tabButton.focus();
  }

  @Watch("isSelected")
  isSelectedHandler(newValue: boolean) {
    if (newValue) {
      this.el.removeAttribute("tabindex");
    } else {
      this.el.setAttribute("tabindex", "-1");
    }
  }

  buttonClickHandler() {
    this.isSelected = true;
    const index = parseInt(this.el.getAttribute("data-index"), 10);
    this.tabActivated.emit({
      tab: this.tab,
      index: index,
    });
  }
  buttonKeyDownHandler(e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      this.PrevOrNextTab.emit({
        originTab: this.tab,
        arrowPressed: e.key,
      });
    }
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
      <Host
        class={{
          large: state.large,
        }}
        tabindex={!this.isSelected ? "-1" : null}
      >
        <li class="tab-item">
          <button
            disabled={this.disabled}
            class={{
              "tab-button": true,
              "tab-button--selected": this.isSelected === true,
              "tab-button--text-icon":
                this.tabLabel !== null && this.icon !== null,
              large: state.large,
            }}
            onClick={this.buttonClickHandler.bind(this)}
            onKeyDown={this.buttonKeyDownHandler.bind(this)}
            ref={(el) => (this.tabButton = el as HTMLInputElement)}
          >
            {this.printIcon()}
            <span class="tab-button__text">{this.tabLabel}</span>
          </button>
          <slot></slot>
        </li>
      </Host>
    );
  }
}
