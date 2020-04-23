import { Component, Prop, h } from "@stencil/core";
import { IconType } from "../icon/icon";

@Component({
  tag: "gxg-menu-item",
  styleUrl: "menu-item.scss",
  shadow: true
})
export class MenuItem {
  @Prop() label: string;
  @Prop() icon: IconType = null;

  render() {
    return <li>{this.label}</li>;
  }
}
