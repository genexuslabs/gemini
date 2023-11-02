import {
  Component,
  Host,
  h,
  Prop,
  Element,
  Event,
  EventEmitter,
  State,
  Listen,
  Watch,
} from "@stencil/core";
import state from "../store";
import { commonClassesNames } from "../../common/classesNames";
import { CheckboxInfo } from "../form-checkbox/form-checkbox";
import { exportParts } from "../../common/export-parts";

@Component({
  tag: "gxg-list-box-item",
  styleUrl: "list-box-item.scss",
  shadow: true,
})
export class GxgListboxItem {
  private parts = {
    checkbox: "checkbox",
  };
  private exportparts: string;

  @Element() el: HTMLElement;

  /**
   * The presence of this attribute disabled the list-box-item
   */
  @Prop({ reflect: true }) disabled: boolean;

  /**
   * Any icon that belongs to Gemini icon library: https://gx-gemini.netlify.app/?path=/story/icons
   */
  @Prop() icon: string = undefined;

  /**
   * The presence of this attribute sets this item as selected
   */
  @Prop({ reflect: true }) selected = false;

  /**
   * This property is for internal use
   */
  @Prop({ reflect: true }) siblingIsSelected = false;

  /**
   * The presence of this attribute sets this item as highlighted
   */
  @Prop({ reflect: true }) highlighted = false;

  /**
   * The presence of this attribute sets this item as active (it is as if it was focused)
   * Only one item at a time should be active.
   */
  @Prop({ reflect: true }) active = false;

  /**
   * This property is set by the list-box item. It should not be set by the user.
   */
  @Prop({ reflect: true }) index: number = null;

  /**
   * The presence of this attribute emits the 'checkboxChanged' event every time a checkbox value is changed.
   */
  @Prop() emitCheckboxChange = true;

  /**
   * (This event is for internal use.)
   */
  @Event() itemClicked: EventEmitter<ItemClicked>;

  /**
   * (This event is for internal use.)
   */
  @Event() itemLoaded: EventEmitter;

  /**
   * (This event is for internal use.)
   */
  @Event() itemSelected: EventEmitter;

  /**
   * (This event is for internal use.)
   */
  @Event() checkboxStateChanged: EventEmitter<ItemChecked>;

  /**
   * The item value. If value is not provided, the value will be the item innerHTML.
   */
  @Prop() value: any = undefined;

  /**
   * The presence of this attribute will add a checkbox to the item.
   */
  @Prop() checkbox = false;

  /**
   * The presence of this attribute will make the checkbox checked.
   */
  @Prop() checked = false;

  @Watch("selected")
  watchPropHandler() {
    this.itemSelected.emit();
  }

  @State() mouseOver = false;

  @Listen("change")
  checkboxChangedHandler(e: CustomEvent<CheckboxInfo>): void {
    const checked = e.detail.value;
    this.emitCheckboxChange &&
      this.checkboxStateChanged.emit({
        checkedItem: this.el as HTMLGxgListBoxItemElement,
        checked: checked,
      });
  }
  handleCheckboxClick = (e): void => {
    e.stopPropagation();
    (e.target as HTMLGxgFormCheckboxElement).checked
      ? (this.checked = true)
      : (this.checked = false);
  };

  iconColor() {
    if (this.disabled) {
      return "disabled";
    } else if (this.selected) {
      return "primary-enabled";
    } else {
      return "auto";
    }
  }

  componentWillLoad() {
    this.attachExportParts();
  }
  private attachExportParts = (): void => {
    const part = this.el.getAttribute("part");
    const exportPartsResult = exportParts(part, this.parts);
    exportPartsResult.length && (this.exportparts = exportPartsResult);
  };

  componentDidLoad() {
    this.itemLoaded.emit();
  }

  itemClickedFunc(e) {
    this.itemClicked.emit({
      clickedItem: this.el as HTMLGxgListBoxItemElement,
      ctrlKey: e.ctrlKey,
      cmdKey: e.metaKey,
      shiftKey: e.shiftKey,
      index: this.index,
    });
  }

  onMouseOver() {
    this.mouseOver = true;
  }

  onMouseOut() {
    this.mouseOver = false;
  }

  render() {
    return (
      <Host
        class={{
          "has-icon": this.icon !== undefined,
          "no-checkbox": !this.checkbox,
          large: state.large,
          [commonClassesNames["DISABLED_CLASS"]]: this.disabled,
        }}
        onClick={this.itemClickedFunc.bind(this)}
        // onMouseOver={this.onMouseOver.bind(this)}
        // onMouseOut={this.onMouseOut.bind(this)}
        exportParts={this.exportparts ? this.exportparts : null}
      >
        <div class={{ container: true, "form-element": true }}>
          {this.checkbox && !this.disabled ? (
            <gxg-form-checkbox
              tabindex="-1"
              checked={this.checked}
              onClick={this.handleCheckboxClick}
              disabled={this.disabled}
              part={this.parts.checkbox}
            ></gxg-form-checkbox>
          ) : null}
          {this.icon !== undefined ? (
            <gxg-icon
              class="icon"
              color={this.iconColor()}
              size="regular"
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

export type ItemClicked = {
  clickedItem: HTMLGxgListBoxItemElement;
  ctrlKey: boolean;
  cmdKey: boolean;
  shiftKey: boolean;
  index: number;
};
export type ItemChecked = {
  checkedItem: HTMLGxgListBoxItemElement;
  checked: boolean;
};
