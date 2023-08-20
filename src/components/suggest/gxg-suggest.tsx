import { Component, Host, h } from "@stencil/core";
import state from "../store";

@Component({
  tag: "gxg-suggest",
  styleUrl: "gxg-suggest.scss",
  shadow: false,
})
export class GxgSuggest {
  render() {
    return (
      <Host class={{ large: state.large }}>
        <slot></slot>
      </Host>
    );
  }
}
