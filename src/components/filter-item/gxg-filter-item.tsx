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
   * The type (optional)
   */
  @Prop() type = undefined;

  /**
   * This event is fired when the user clicks on an item. event.detail carries the item type property, and text.
   */
  @Event() itemClickedEvent: EventEmitter;

  icon() {
    let icon;
    switch (this.type) {
      case "webpanel":
        icon = "objects/webpanel";
        break;
      case "module":
        icon = "objects/module";
        break;
      case "theme":
        icon = "objects/themes";
        break;
      case "object":
        icon = "objects/object";
        break;
      default:
      // code block
    }
    return icon;
  }

  itemClicked() {
    const itemText = this.el.innerHTML;
    const itemType = this.type;
    this.itemClickedEvent.emit({
      "item-text": itemText,
      "item-type": itemType,
    });
  }

  render() {
    return (
      <Host onClick={this.itemClicked.bind(this)} tabindex="0">
        <gxg-icon color="auto" size="small" type={this.icon()}></gxg-icon>
        <div class="text">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
