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
   * The presence of this attribute disables the drag and drop functionality.
   */
  @Prop() disable = true;

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
    if (!this.disable) {
      const boxes = this.el.querySelectorAll("*");
      boxes.forEach((item) => {
        if (event.detail === item.getAttribute("id")) {
          item.setAttribute("active", "active");
        } else {
          item.removeAttribute("active");
        }
      });
    }
  }

  private dndCleanup: Function;

  getDraggableElements() {
    if (!this.disable) {
      return this.el.querySelectorAll("gxg-drag-box");
    }
  }

  componentWillLoad() {
    if (!this.disable) {
      this.dndCleanup = makeDraggable(this);
    }

    const dragBoxes = this.el.querySelectorAll("gxg-drag-box");

    //If disable, set disabled to each drag-box
    if (this.disable) {
      dragBoxes.forEach((dragBox) => {
        dragBox.disabled = true;
      });
    }

    //Set padding to each of the drag-boxes
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
    if (!this.disable) {
      this.dndCleanup();
    }
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
