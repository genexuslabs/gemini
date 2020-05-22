import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-option",
  styleUrl: "option.scss",
  shadow: true
})
export class Option {
  @Prop() value: string;

  @Prop() selected: boolean;

  render() {
    return <Host value={this.value} role="option"></Host>;
  }
}
