import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop
} from "@stencil/core";

@Component({
  tag: "gxg-drag-box",
  styleUrl: "drag-box.scss",
  shadow: true
})
export class DragBox {
  /**
   * The presence of this attribute makes this box active
   */
  @Prop({ reflect: true }) active = false;

  /**
   * The presence of this attribute adds a "delete" button that you can press to delete the box
   */
  @Prop() deletable = false;

  /**
   * The padding (internal spacing)
   */
  @Prop({ reflect: true }) padding: Padding;

  /**
   * The title
   */
  @Prop() title: string;

  @Element() el: HTMLElement;
  @Event() clicked: EventEmitter;

  /**
   * This event fires when a box has been deleted
   */
  @Event() deleted: EventEmitter;

  clickedHandler() {
    this.clicked.emit(this.el.getAttribute("id"));
  }

  deleteHandler(event) {
    event.stopPropagation();
    this.deleted.emit("box was deleted");
    this.el.classList.add("hide");
    setTimeout(() => {
      this.el.remove();
    }, 250);
  }

  componentDidLoad() {
    if (this.title !== undefined) {
      const title = this.el.shadowRoot.querySelector(
        ".container-content__title"
      );
      this.el.prepend(title);
    }
  }

  render() {
    return (
      <Host onClick={this.clickedHandler.bind(this)}>
        <span class="border"></span>
        <div class="drag-icon-container">
          <gxg-icon size="regular" type="drag"></gxg-icon>
        </div>
        <div class="container-content">
          {this.title !== undefined ? (
            <span class="container-content__title">{this.title}</span>
          ) : null}
          <slot></slot>
        </div>
        <div class="delete-button-container">
          {this.deletable ? (
            <gxg-button
              onClick={this.deleteHandler.bind(this)}
              type="secondary-icon-only"
              icon="deleted"
            ></gxg-button>
          ) : null}
        </div>
      </Host>
    );
  }
}

export type Padding = "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";
