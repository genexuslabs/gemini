import { Component, h, Host, Prop, Listen } from "@stencil/core";
import state from "../store";

@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true,
})
export class GxgTest {
  @Listen("focus")
  handleFocus(focusEvent: Event) {
    console.log("gxg-test tiene foco");
    console.log(focusEvent);
  }

  @Prop() name = "Andres";

  onInputFocus(e) {
    console.log("input has focus");
    console.log(e);
  }

  render() {
    return (
      <Host
        class={{
          large: state.large,
        }}
      >
        <input type="text" onFocus={(e) => this.onInputFocus(e)} />
      </Host>
    );
  }
}
