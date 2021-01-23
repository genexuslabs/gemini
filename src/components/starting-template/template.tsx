import { Component, Prop, State, h } from "@stencil/core";
@Component({
  tag: "gxg-template",
  styleUrl: "template.scss",
  shadow: true
})
export class GxgTemplate {
  @Prop() name: string;

  render() {
    return [];
  }
}
