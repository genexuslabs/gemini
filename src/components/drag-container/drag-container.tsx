import { Component, Element, h } from "@stencil/core";
import { makeDraggable } from "../../utils/makeDraggable";

@Component({
  tag: "gxg-drag-container",
  styleUrl: "drag-container.scss",
  shadow: true
})
export class DragContainer {
  @Element() el: HTMLElement;

  private dndCleanup: Function;

  componentDidLoad() {
    const dragabbleItems = this.el.querySelectorAll("gxg-drag-box");
    this.dndCleanup = makeDraggable(dragabbleItems);
  }

  disconnectedCallback() {
    this.dndCleanup();
  }

  render() {
    return (
      <div>
        <slot></slot>
      </div>
    );
  }
}
