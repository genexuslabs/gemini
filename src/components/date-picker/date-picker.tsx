import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-date-picker",
  styleUrl: "date-picker.scss",
  shadow: true
})
export class DatePicker {
  /**
   * The state of the toggle. Whether is disabled or not.
   * Possible values: false, true
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The toggle label
   */
  @Prop() label = "Label";

  render() {
    return <Host class={{}}></Host>;
  }
}
