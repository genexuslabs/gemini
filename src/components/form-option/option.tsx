import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-option",
  styleUrl: "option.scss",
  shadow: true
})
export class Option {
  /**
   * The value
   */
  @Prop() value: string;
  /**
   * The presence of this attribute makes the option selected by default
   */
  @Prop() selected: boolean;

  render() {
    return <Host value={this.value} role="option"></Host>;
  }
}
