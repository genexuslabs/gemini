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
   * The presence of this attribute adds a "delete" button to each child, that you can press to delete the item
   */
  @Prop() deletable = false;

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

  @Listen("clicked")
  clickedHandler(event) {
    const boxes = this.el.querySelectorAll("*");
    boxes.forEach(item => {
      if (event.detail === item.getAttribute("id")) {
        item.setAttribute("active", "active");
      } else {
        item.removeAttribute("active");
      }
    });
  }

  @Listen("itemDragEnter")
  handleItemDragEnter() {
    // const placeholder = this.el.shadowRoot.querySelector(".placeholder");
    // e.detail.parentElement.insertBefore(placeholder, e.detail);
    // placeholder.classList.add("visible");
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

    //Deletable button for each of the child items
    if (this.deletable) {
      const items = this.el.querySelectorAll("*");
      items.forEach(item => {
        item.setAttribute("deletable", "deletable");
      });
    }
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
