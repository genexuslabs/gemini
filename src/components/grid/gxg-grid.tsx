import { Component, Host, h } from "@stencil/core";
import state from "../store";

@Component({
  tag: "gxg-grid",
  styleUrl: "gxg-grid.scss",
  shadow: false,
})
export class GxgGrid {
  render() {
    return (
      <Host class={{ large: state.large }}>
        <slot></slot>
      </Host>
    );
  }
}
