import {
  Component,
  Prop,
  Element,
  h,
  Host,
  Event,
  EventEmitter,
  Listen,
} from "@stencil/core";
import { Padding } from "../drag-box/drag-box";
import { makeDraggable, DraggableComponent } from "../../utils/makeDraggable";

@Component({
  tag: "gxg-drag-container",
  styleUrl: "drag-container.scss",
  shadow: true,
})
export class GxgDragContainer implements DraggableComponent {
  @Element() el: HTMLElement;

  /**
   * The presence of this attribute adds a "delete" button to each gxg-drag-box. When pressed, the "deleted" event is emmited.
   */
  @Prop() deletable = false;

  /**
   * The max-width of the box container
   */
  @Prop() maxWidth = "100%";

  /**
   * The padding (internal spacing) of the gxg-drag-boxes
   */
  @Prop() padding: Padding = undefined;

  @Event() itemDragStart: EventEmitter;
  @Event() itemDrop: EventEmitter;
  @Event() itemDragOver: EventEmitter;
  @Event() itemDragLeave: EventEmitter;
  @Event() itemDragEnter: EventEmitter;

  @Listen("clicked")
  clickedHandler(event) {
    const boxes = this.el.querySelectorAll("*");
    boxes.forEach((item) => {
      if (event.detail === item.getAttribute("id")) {
        item.setAttribute("active", "active");
      } else {
        item.removeAttribute("active");
      }
    });
  }

  private dndCleanup: Function;

  getDraggableElements() {
    return this.el.querySelectorAll("gxg-drag-box");
  }

  componentDidLoad() {
    this.dndCleanup = makeDraggable(this);

    //Set padding to each of the drag-boxes
    const dragBoxes = this.el.querySelectorAll("gxg-drag-box");
    dragBoxes.forEach((dragBox) => {
      if (this.padding !== undefined) {
        dragBox.setAttribute("padding", this.padding);
      }
    });

    //Deletable button for each of the child items
    if (this.deletable) {
      const items = this.el.querySelectorAll("*");
      items.forEach((item) => {
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
