import {
  Component,
  Prop,
  h,
  Host,
  Watch,
  Event,
  EventEmitter
} from "@stencil/core";

@Component({
  tag: "gxg-option",
  styleUrl: "option.scss",
  shadow: true
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

  @Event() optionIsSelected: EventEmitter;

  @Watch("selected")
  watchHandler(newValue: boolean) {
    if (newValue === true) {
      this.optionIsSelected.emit(this.value);
    }
  }

  render() {
    return <Host value={this.value} role="option"></Host>;
  }
}
