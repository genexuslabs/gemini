import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  Element,
} from "@stencil/core";

@Component({
  tag: "gxg-combo-item",
  styleUrl: "combo-item.scss",
  shadow: true,
})
export class GxgComboItem {
  @Element() el: HTMLElement;

  /**
   * This event is triggered when the user clicks on an item. event.detail contains the item index, item value, and item icon.
   */
  @Event() itemClicked: EventEmitter;

  /**
   * Any icon that belongs to Gemini icon library: https://gx-gemini.netlify.app/?path=/story/icons
   */
  @Prop() icon: string = undefined;

  /**
   * The item value. This is what the filter with search for. If value is not provided, the filter will search by the item innerHTML.
   */
  @Prop() value: any = undefined;

  itemClickedFunc() {
    const index = this.el.getAttribute("index");
    const icon = this.el.getAttribute("icon");
    let value = this.value;
    if (value === undefined) {
      value = this.el.innerHTML;
    }
    this.itemClicked.emit({
      index: parseInt(index, 10),
      value: value.toString(),
      icon: icon,
    });
  }

  render() {
    return (
      <Host onClick={this.itemClickedFunc.bind(this)}>
        <div class="content">
          {this.icon !== undefined ? (
            <gxg-icon color="auto" size="small" type={this.icon}></gxg-icon>
          ) : null}
          <slot></slot>
        </div>
      </Host>
    );
  }
}
