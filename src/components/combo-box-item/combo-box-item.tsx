import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  Element,
  State,
} from "@stencil/core";
import { Color } from "../icon/icon";
import state from "../store";
import { commonClassesNames } from "../../common/classesNames";

@Component({
  tag: "gxg-combo-box-item",
  styleUrl: "combo-box-item.scss",
  shadow: true,
})
export class GxgComboBoxItem {
  @Element() el: HTMLElement;

  /**
   * This event is triggered when the user clicks on an item. event.detail contains the item index, item value, and item icon.
   */
  @Event() itemSelected: EventEmitter<ItemInformation>;

  /**
   *
   */
  @Event() itemDidLoad: EventEmitter;

  /**
   * This event is for internal use. This event is triggered when the user presses keyboard "arrow up" on the first item. This event is caputred on "combo" component
   * and then focus is set on "search" input.
   */
  @Event() keyDownPressed: EventEmitter;

  /**
   * Any icon that belongs to Gemini icon library: https://gx-gemini.netlify.app/?path=/story/icons
   */
  @Prop() icon: string = undefined;

  /**
   * The item value. If value is not provided, an automatic value will be generated with the innerText.
   */
  @Prop() value: ComboBoxItemValue;

  /**
   * (This prop is for internal use).
   */
  @Prop({ reflect: true }) index: number;

  /**
   * The presence of this attribute makes this combo-item disabled and not interactive.
   */
  @Prop() disabled = false;

  /**
   * The presence of this attribute makes this combo-item selected.
   */
  @Prop({ reflect: true }) selected = false;

  /**
   * True if the text typed on the combo box input is equal to this combo box item text
   */
  @Prop({ reflect: true }) exactMatch = false;

  /**
   * This property hides the combo box item
   */
  @Prop({ reflect: true }) hidden = false;

  /**
   * The presence of this attribute makes this combo-item selected.
   */
  @State() iconColor: Color;

  componentWillLoad() {
    this.setup();
    this.disabled ? (this.iconColor = "ondisabled") : (this.iconColor = "auto");
  }

  componentDidLoad() {
    this.itemDidLoad.emit();
  }

  /*********************************
  WATCH
  *********************************/

  private setup = () => {
    if (!this.value) {
      this.value = this.el.innerHTML;
    }
  };

  private clickHandler = () => {
    this.itemSelected.emit({
      el: this.el as HTMLGxgComboBoxItemElement,
      index: this.index,
      value: this.value,
      icon: this.icon,
    });
  };

  iconColorHandler(): Color {
    if (this.disabled) {
      return "disabled";
    } else if (this.selected) {
      return "negative";
    } else {
      return "auto";
    }
  }

  render() {
    return (
      <Host
        onClick={this.clickHandler}
        class={{
          large: state.large,
          "no-icon": !this.icon,
          [commonClassesNames["DISABLED_CLASS"]]: this.disabled,
        }}
      >
        <div class={{ container: true, "form-element": true }}>
          {this.icon ? (
            <gxg-icon
              color={this.iconColorHandler()}
              size={state.large ? "regular" : "small"}
              type={this.icon}
            ></gxg-icon>
          ) : null}
          <div class="description">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}

export type ItemInformation = {
  el: HTMLGxgComboBoxItemElement;
  index: number;
  value: any;
  icon: string;
};

export type ComboBoxItemValue = any;
