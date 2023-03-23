import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  Element,
} from "@stencil/core";

@Component({
  tag: "gxg-options-item",
  styleUrl: "gxg-options-item.scss",
  shadow: true,
})
export class GxgOptionsItem {
  @Element() el: HTMLElement;
  @Event() keyDown: EventEmitter;
  @Event() optionSelected: EventEmitter;

  @Prop() disabled = false;

  keyDownHandler(e) {
    const enter = e.code === "Enter";
    if (enter) {
      //simulate click
      this.clickHandler(e);
    } else {
      const escape = e.code === "Escape";
      const dataId = (e.target as HTMLElement).getAttribute("data-id");
      const code = e.code;
      this.keyDown.emit({ direction: code, dataId: dataId, escape: escape });
    }
  }

  clickHandler(e) {
    const dataId = (e.target as HTMLElement).getAttribute("data-id");
    const id = (e.target as HTMLElement).getAttribute("id");
    if (!this.disabled) {
      this.optionSelected.emit({ dataId: dataId, id: id });
    }
  }

  render() {
    return (
      <Host
        class={{
          "options-item": true,
          "options-item--disabled": this.disabled,
        }}
        tabindex="0"
        onKeyDown={this.keyDownHandler.bind(this)}
        onClick={this.clickHandler.bind(this)}
      >
        <div class="options-item__wrapper">
          <p class="options-item__p">
            <slot></slot>
          </p>
        </div>
      </Host>
    );
  }
}
