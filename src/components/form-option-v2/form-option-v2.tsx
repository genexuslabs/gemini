import {
  Component,
  Prop,
  h,
  Host,
  Watch,
  Event,
  EventEmitter,
} from "@stencil/core";

@Component({
  tag: "gxg-option-v2",
  styleUrl: "form-option-v2.scss",
  shadow: true,
})
export class GxgFormOption {
  /**
   * The value
   */
  @Prop() value: string;

  /**
   * The presence of this attribute makes the option selected by default
   */
  @Prop() selected: boolean;

  /**
   * The icon name (optional)
   */
  @Prop() iconName: string = undefined;

  @Event() optionIsSelected: EventEmitter;

  @Watch("selected")
  watchHandler(newValue: boolean) {
    if (newValue === true) {
      this.optionIsSelected.emit(this.value);
    }
  }

  icon() {
    if (this.iconName) {
      return (
        <gxg-icon type={this.iconName} color="auto" size="small"></gxg-icon>
      );
    }
  }

  render() {
    return (
      <Host role="option">
        {this.icon()}{" "}
        <span class="label">
          <slot></slot>
        </span>
      </Host>
    );
  }
}
