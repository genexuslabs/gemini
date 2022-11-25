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
import { Color } from "../icon/icon";
import { GxgListBox } from "../list-box/list-box";
import state from "../store";

@Component({
  tag: "gxg-list-box-item",
  styleUrl: "list-box-item.scss",
  shadow: true,
})
export class GxgListboxItem {
  @Element() el: HTMLElement;
  /**
   * Any icon that belongs to Gemini icon library: https://gx-gemini.netlify.app/?path=/story/icons
   */
  @Prop() icon: string = undefined;

  /**
   * The presence of this attribute sets this item as selected
   */
  @Prop({ reflect: true }) selected = false;

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
  @Event() KeyPressed: EventEmitter;

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

  /**
   * (This prop is for internal use).
   */
  @Prop() iconColor: Color = "auto";

  @State() checkbox = false;

  componentWillLoad() {
    this.checkbox = ((this.el
      .parentElement as unknown) as GxgListBox).checkboxes;

    if (this.selected) {
      this.iconColor = "negative";
    }
  }

  componentDidLoad() {
    this.itemLoaded.emit();
  }

  itemClickedFunc(e) {
    const index = this.el.getAttribute("index");
    this.itemClicked.emit({
      index: parseInt(index, 10),
      crtlKey: e.ctrlKey,
      cmdKey: e.metaKey,
      shiftKey: e.shiftKey,
    });
  }

  onKeyDown(e) {
    e.stopPropagation();
    if (e.code === "ArrowDown" || e.code === "ArrowUp" || e.code === "Enter") {
      e.preventDefault();
      const index = this.el.getAttribute("index");
      this.KeyPressed.emit({
        index: parseInt(index, 10),
        crtlKey: e.ctrlKey,
        cmdKey: e.metaKey,
        shiftKey: e.shiftKey,
        eCode: e.code,
      });
    }
  }

  onMouseOver() {
    this.iconColor = "negative";
  }

  onMouseOut() {
    const itemIsSelected = this.el.classList.contains("selected");
    if (!itemIsSelected) {
      this.iconColor = "auto";
    }
  }

  render() {
    return (
      <Host
        class={{
          "has-icon": this.icon !== undefined,
          "no-checkbox": !this.checkbox,
          large: state.large,
          selected: this.selected,
        }}
        onClick={this.itemClickedFunc.bind(this)}
        onKeyDown={this.onKeyDown.bind(this)}
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseOut={this.onMouseOut.bind(this)}
      >
        <div class="container">
          {this.checkbox ? (
            <gxg-form-checkbox checked={this.selected}></gxg-form-checkbox>
          ) : null}
          {this.icon !== undefined ? (
            <gxg-icon
              class="icon"
              color={this.iconColor}
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
