import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
} from "@stencil/core";

@Component({
  tag: "gxg-drag-box",
  styleUrl: "drag-box.scss",
  shadow: true,
})
export class GxgDragBox {
  /**
   * The presence of this attribute makes this box active
   */
  @Prop({ reflect: true }) active = false;

  /**
   * The presence of this attribute adds a "delete" button that, when pressed, triggers the "deleted" event
   */
  @Prop() deletable = false;

  /**
   * The padding (internal spacing) of the drag-box (Set it on the drag-container to apply the same padding to all of the gxg-drag-box items)
   */
  @Prop({ reflect: true }) padding: Padding = "s";

  /**
   * The title
   */
  @Prop() title: string;

  @Element() el: HTMLElement;

  /**
   * This event is for internal use
   */
  @Event() clicked: EventEmitter;

  /**
   * This event fires when the "delete" button is pressed
   */
  @Event() deleted: EventEmitter;

  clickedHandler() {
    this.clicked.emit(this.el.getAttribute("id"));
  }

  deleteHandler(event) {
    event.stopPropagation();
    this.deleted.emit("box was deleted");
  }

  handlerOnKeyDown(event) {
    if (event.keyCode == 13) {
      //enter key was pressed
      this.active = true;
      this.clicked.emit(this.el.getAttribute("id"));
    } else if (event.keyCode === 9 && event.shiftKey) {
      //tab and shift keys were pressed
      const previousElement = this.el.previousElementSibling as HTMLElement;
      event.preventDefault();
      previousElement.focus();
    } else if (event.keyCode == 9) {
      //only tab key was pressed
      if (!this.active) {
        const nextElement = this.el.nextElementSibling as HTMLElement;
        event.preventDefault();
        nextElement.focus();
      }
    }
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
      <Host
        tabindex="0"
        onClick={this.clickedHandler.bind(this)}
        onKeyDown={this.handlerOnKeyDown.bind(this)}
      >
        {this.active ? null : <div class="cover"></div>}
        <span class="border"></span>
        <div class="drag-icon-container">
          <gxg-icon size="regular" type="navigation/drag"></gxg-icon>
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
              button-styles-editable
              icon="gemini-tools/delete"
              onClick={this.deleteHandler.bind(this)}
              type="secondary-icon-only"
            ></gxg-button>
          ) : null}
        </div>
      </Host>
    );
  }
}

export type Padding = "0" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";
