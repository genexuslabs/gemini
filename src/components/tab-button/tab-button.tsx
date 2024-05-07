import {
  Component,
  Prop,
  h,
  Event,
  EventEmitter,
  Element,
  Host,
  Method,
  Watch
} from "@stencil/core";
import state from "../store";
import { exportParts } from "../../common/export-parts";
@Component({
  tag: "gxg-tab-button",
  styleUrl: "tab-button.scss",
  shadow: { delegatesFocus: true }
})
export class GxgTabButton {
  private parts = {
    button: "button"
  };
  private exportparts: string;

  @Element() el: HTMLElement;
  tabButton!: HTMLButtonElement;

  /**
   * Hides the tab button
   */
  @Prop() hidden = false;

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

  /**
   * Displays the border above
   */
  @Prop({ reflect: true }) borderAbove: boolean = false;

  /**
   * Stylize the button for the gxg-tab-bar "stacked" version.
   */
  @Prop() stackedStyle: boolean = false;

  /**
   * The presence of this attribute will hide the icon, and reduce the font size a little bit.
   */
  @Prop() reduced: boolean = false;

  /**
   * If true, the tab-button border indicator will not be displayed
   */
  @Prop({ reflect: true }) noIndicator: boolean = false;

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

  @Watch("hidden")
  hiddenHandler(hidden: boolean) {
    if (hidden) {
      this.el.setAttribute("tabindex", "-1");
    } else {
      this.el.removeAttribute("tabindex");
    }
  }

  buttonClickHandler() {
    this.isSelected = true;
    const index = parseInt(this.el.getAttribute("data-index"), 10);
    this.tabActivated.emit({
      tab: this.tab,
      index: index
    });
  }

  buttonKeyDownHandler(e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      this.PrevOrNextTab.emit({
        originTab: this.tab,
        arrowPressed: e.key
      });
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  }

  printIcon() {
    if (this.icon !== null) {
      if (this.disabled) {
        return (
          <gxg-icon
            size="small"
            color="disabled"
            type={this.icon}
            part="icon"
          ></gxg-icon>
        );
      }
      return <gxg-icon size="small" type={this.icon} part="icon"></gxg-icon>;
    }
  }

  componentWillLoad() {
    this.attachExportParts();
    this.hiddenHandler(this.hidden);
  }
  private attachExportParts = (): void => {
    const part = this.el.getAttribute("part");
    const exportPartsResult = exportParts(part, this.parts);
    exportPartsResult.length && (this.exportparts = exportPartsResult);
  };

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
          mercury: state.mercury,
          stacked: this.stackedStyle
        }}
        exportParts={this.exportparts ? this.exportparts : null}
      >
        <li class="tab-item">
          <button
            disabled={this.disabled}
            class={{
              "tab-button": true,
              "tab-button--hidden": this.hidden,
              "tab-button--selected": this.isSelected === true,
              "tab-button--text-icon":
                this.tabLabel !== null && this.icon !== null,
              large: state.large,
              "tab-button--border-above": this.borderAbove,
              "tab-button--reduced": this.reduced,
              "tab-button--stacked-style": this.stackedStyle
            }}
            onClick={this.buttonClickHandler.bind(this)}
            onKeyDown={this.buttonKeyDownHandler.bind(this)}
            ref={el => (this.tabButton = el as HTMLButtonElement)}
            part={this.parts.button}
          >
            {!this.reduced && this.printIcon()}
            <span class="tab-button__text" part="button-text">
              {this.tabLabel}
            </span>
          </button>
          <slot></slot>
        </li>
      </Host>
    );
  }
}
