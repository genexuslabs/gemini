import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "gxg-droplist-item",
  styleUrl: "droplist-item.scss",
  shadow: true
})
export class DroplistItem {
  /**
   * The state of the toggle. Whether is disabled or not.
   * Possible values: false, true
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The toggle label
   */
  @Prop() label = "Label";

  render() {
    return (
      <li class="list-item">
        <gxg-icon
          type="chevron-right"
          color="onbackground"
          size="small"
        ></gxg-icon>
        <slot></slot>
      </li>
    );
  }
}
