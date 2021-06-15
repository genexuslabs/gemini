import {
  Component,
  Host,
  h,
  Prop,
  Element,
  Event,
  EventEmitter,
  State,
} from "@stencil/core";

@Component({
  tag: "gxg-listbox-item",
  styleUrl: "listbox-item.scss",
  shadow: true,
})
export class GxgListboxItem {
  @Element() el: HTMLElement;
  /**
   * Any icon that belongs to Gemini icon library: https://gx-gemini.netlify.app/?path=/story/icons
   */
  @Prop() icon: string = undefined;

  /**
   * (This event is for internal use.)
   */
  @Event() itemClicked: EventEmitter;

  /**
   * (This event is for internal use.)
   */
  @Event() checkboxClicked: EventEmitter;

  /**
   * The item value. If value is not provided, the value will be the item innerHTML.
   */
  @Prop() value: any = undefined;

  @State() checkboxes = false;

  componentWillLoad() {
    const listbox = this.el.parentElement;
    const listboxCheckboxes = listbox.getAttribute("checkboxes");
    if (listboxCheckboxes !== null) {
      this.checkboxes = true;

      const checkbox = this.el.querySelector("gxg-form-checkbox");
      checkbox.addEventListener("click", () => {
        const index = this.el.getAttribute("index");
        this.checkboxClicked.emit({
          index: parseInt(index, 10),
        });
      });
    }
  }

  itemClickedFunc(e) {
    console.log(e);
    if (!this.checkboxes) {
      const index = this.el.getAttribute("index");
      this.itemClicked.emit({
        index: parseInt(index, 10),
        crtlKey: e.ctrlKey,
        cmdKey: e.metaKey,
      });
    }
  }

  onKeyDown(e) {
    if (e.code === "ArrowDown") {
      const nextItem = this.el.nextElementSibling;
      if (nextItem !== null) {
        (nextItem as HTMLElement).focus();
      }
    } else if (e.code === "ArrowUp") {
      const prevItem = this.el.previousElementSibling;
      if (prevItem !== null) {
        (prevItem as HTMLElement).focus();
      }
    }
    if (e.code === "Enter") {
      const index = this.el.getAttribute("index");
      this.itemClicked.emit({
        index: parseInt(index, 10),
        crtlKey: e.ctrlKey,
      });
    }
  }

  render() {
    return (
      <Host
        class={{
          "has-icon": this.icon !== undefined,
          "no-checkbox": !this.checkboxes,
        }}
        onClick={this.itemClickedFunc.bind(this)}
        onKeyDown={this.onKeyDown.bind(this)}
      >
        <slot name="checkbox"></slot>
        {this.icon !== undefined ? (
          <gxg-icon
            class="icon"
            color="auto"
            size="regular"
            type={this.icon}
          ></gxg-icon>
        ) : null}
        <slot></slot>
      </Host>
    );
  }
}
