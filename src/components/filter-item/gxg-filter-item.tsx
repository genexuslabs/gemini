import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  h,
} from "@stencil/core";

@Component({
  tag: "gxg-filter-item",
  styleUrl: "gxg-filter-item.scss",
  shadow: true,
})
export class GxgFilterItem {
  @Element() el: HTMLElement;

  /**
   * The id (required if you want to know that this item was clicked)
   */
  @Prop() id = undefined;

  /**
   * The type (optional)
   */
  @Prop() type = undefined;

  /**
   * Any icon that belongs to Gemini icon library: https://gx-gemini.netlify.app/?path=/story/icons
   */
  @Prop() icon: string = undefined;

  /**
   * This event is fired when the user clicks on an item. event.detail carries the item id, type, and text.
   */
  @Event() itemClickedEvent: EventEmitter;

  itemClicked() {
    this.itemClickedEvent.emit({
      "item-id": this.id,
      "item-text": this.el.innerHTML,
      "item-type": this.type,
    });
  }

  render() {
    return (
      <Host onClick={this.itemClicked.bind(this)} tabindex="0">
        {this.icon !== undefined ? (
          <gxg-icon color="auto" size="small" type={this.icon}></gxg-icon>
        ) : null}
        <div class="text">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
