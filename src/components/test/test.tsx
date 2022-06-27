import { Component, h, Host, Prop, Listen, Method } from "@stencil/core";
import state from "../store";

@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true,
})
export class GxgTest {
  @Prop() name = "Andres";

  @Method()
  async setFocus() {
    console.log("focus");
  }

  render() {
    return (
      <Host
        class={{
          large: state.large,
        }}
      >
        <input type="text" />
      </Host>
    );
  }
}
