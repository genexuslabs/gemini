import { Component, Prop, Element, h, Host } from "@stencil/core";
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

  /**
   * The presence of this attribute makes the component full-width
   */
  @Prop() fullWidth = false;

  private dndCleanup: Function;

  componentDidLoad() {
    const dragabbleItems = this.el.querySelectorAll("gxg-drag-box");
    this.dndCleanup = makeDraggable(dragabbleItems);

    if (this.fullWidth) {
      this.maxWidth = "100%";
    }
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
