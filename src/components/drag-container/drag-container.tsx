import { Component, Prop, Element, h, Host } from "@stencil/core";
import { Padding } from "../drag-box/drag-box";
import { makeDraggable } from "../../utils/makeDraggable";

@Component({
  tag: "gxg-drag-container",
  styleUrl: "drag-container.scss",
  shadow: true
})
export class DragContainer {
  @Element() el: HTMLElement;

  /**
   * The max-width of the box container
   */
  @Prop() maxWidth = "100%";

  @Prop() padding: Padding;

  private dndCleanup: Function;

  componentDidLoad() {
    const dragabbleItems = this.el.querySelectorAll("gxg-drag-box");
    this.dndCleanup = makeDraggable(dragabbleItems);

    //Set padding to each of the drag-boxes
    const dragBoxes = this.el.querySelectorAll("gxg-drag-box");
    dragBoxes.forEach(dragBox => {
      if (dragBox.padding === undefined) {
        dragBox.setAttribute("padding", this.padding);
      }
    });
  }

  disconnectedCallback() {
    this.dndCleanup();
  }

  render() {
    return (
      <Host style={{ maxWidth: this.maxWidth }}>
        <slot></slot>
      </Host>
    );
  }
}
