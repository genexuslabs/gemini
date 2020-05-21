import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-form-option",
  styleUrl: "form-option.scss",
  shadow: true
})
export class FormOption {
  @Prop() value: string;

  @Prop() selected: boolean;

  render() {
    return <Host value={this.value} role="option"></Host>;
  }
}
