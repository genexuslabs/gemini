import {
  Component,
  Host,
  h,
  Prop,
  Element,
  Event,
  EventEmitter,
  State,
} from "@stencil/core";
import { GxgListBox } from "../list-box/list-box";
import state from "../store";
import { commonClassesNames } from "../../common/classes-names";

@Component({
  tag: "gxg-list-box-item",
  styleUrl: "list-box-item.scss",
  shadow: true,
})
export class GxgListboxItem {
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
   * The presence of this attribute sets this item as highlighted
   */
  @Prop({ reflect: true }) highlighted = false;

  /**
   * This property is set by the list-box item. It should not be set by the user.
   */
  @Prop({ reflect: true }) index: number = null;

  /**
   * (This event is for internal use.)
   */
  @Event() itemClicked: EventEmitter;

  /**
   * (This event is for internal use.)
   */
  @Event() itemLoaded: EventEmitter;

  /**
   * (This event is for internal use.)
   */
  @Event() itemSelected: EventEmitter;

  /**
   * The item value. If value is not provided, the value will be the item innerHTML.
   */
  @Prop() value: any = undefined;

  @State() checkbox = false;

  @State() mouseOver = false;

  componentWillLoad() {
    this.checkbox = ((this.el
      .parentElement as unknown) as GxgListBox).checkboxes;
  }

  iconColor() {
    if (this.disabled) {
      return "disabled";
    } else if (this.selected || this.mouseOver) {
      return "negative";
    } else {
      return "auto";
    }
  }

  componentDidLoad() {
    this.itemLoaded.emit();
  }

  itemClickedFunc(e) {
    const index = this.el.getAttribute("index");
    this.itemClicked.emit({
      el: this.el,
      crtlKey: e.ctrlKey,
      cmdKey: e.metaKey,
      shiftKey: e.shiftKey,
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
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseOut={this.onMouseOut.bind(this)}
      >
        <div class="container disabled-element">
          {this.checkbox ? (
            <gxg-form-checkbox checked={this.selected}></gxg-form-checkbox>
          ) : null}
          {this.icon !== undefined ? (
            <gxg-icon
              class="icon"
              color={this.iconColor()}
              size="regular"
              type={this.icon}
            ></gxg-icon>
          ) : null}
          <slot></slot>
        </div>
      </Host>
    );
  }
}
