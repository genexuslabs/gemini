import { Component, Element, Prop, h } from "@stencil/core";

@Component({
  tag: "gxg-droplist",
  styleUrl: "droplist.scss",
  shadow: true
})
export class Droplist {
  /**
   * The state of the toggle. Whether is disabled or not.
   * Possible values: false, true
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The toggle label
   */
  @Prop() label = "Label";

  @Element() el: HTMLElement;

  componentDidLoad() {
    function dragstartHandler(ev) {
      console.log("dragging...");
      console.log(ev);
    }

    const listItems = document.querySelectorAll("gxg-droplist-item");
    listItems.forEach(listItem => {
      listItem.setAttribute("draggable", "true");
      listItem.addEventListener("dragstart", dragstartHandler, false);
    });
  }

  render() {
    return (
      <ul class="drop-list">
        <slot></slot>
      </ul>
    );
  }
}
