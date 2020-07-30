import {
  Component,
  Prop,
  Element,
  h,
  Host,
  Event,
  EventEmitter,
  Listen
} from "@stencil/core";
import { Padding } from "../drag-box/drag-box";
import { makeDraggable, DraggableComponent } from "../../utils/makeDraggable";

@Component({
  tag: "gxg-drag-container",
  styleUrl: "drag-container.scss",
  shadow: true
})
export class DragContainer implements DraggableComponent {
  @Element() el: HTMLElement;

  /**
   * The max-width of the box container
   */
  @Prop() maxWidth = "100%";

  @Prop() padding: Padding;

  @Event() itemDragStart: EventEmitter;
  @Event() itemDrop: EventEmitter;
  @Event() itemDragOver: EventEmitter;
  @Event() itemDragLeave: EventEmitter;
  @Event() itemDragEnter: EventEmitter;

  @Listen("itemDragEnter")
  handleItemDragEnter(e) {
    const placeholder = this.el.shadowRoot.querySelector(".placeholder");
    e.detail.parentElement.insertBefore(placeholder, e.detail);
    placeholder.classList.add("visible");
  }

  private dndCleanup: Function;

  getDraggableElements() {
    return this.el.querySelectorAll("gxg-drag-box");
  }

  componentDidLoad() {
    this.dndCleanup = makeDraggable(this);

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
        <div class="placeholder"></div>
      </Host>
    );
  }
}
