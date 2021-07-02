import { Component, h, Host } from "@stencil/core";
import state from "../store";

@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true,
})
export class GxgTest {
  render() {
    return (
      <Host
        class={{
          large: state.large,
        }}
      >
        hola
      </Host>
    );
  }
}
