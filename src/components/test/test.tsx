import { Component, h, Host, Prop, Method, State, Watch } from "@stencil/core";
import state from "../store";

@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true,
})
export class GxgTest {
  @Prop() name = "Andres";
  @Prop() show = false;
  textInput!: HTMLInputElement;

  @Watch("show")
  onShowChanged(newValue: boolean) {
    if (newValue) {
      this.addMouseEventListener();
    } else {
      this.removeMouseEventListener();
    }
  }

  @Method()
  async setFocus() {
    console.log("focus");
  }

  @Method()
  async open() {
    this.show = true;
  }

  @Method()
  async close() {
    this.show = false;
  }

  showInput() {
    this.show = true;
  }

  addMouseEventListener() {
    document.addEventListener("mouseup", this.onMouseUp);
  }

  onMouseUp(event) {
    if (!event.composedPath().includes(this.textInput)) {
      this.show = false;
    } else {
    }
  }

  removeMouseEventListener() {
    console.log("remove event listener");
  }

  render() {
    return (
      <Host
        class={{
          large: state.large,
        }}
      >
        <button onClick={this.showInput.bind(this)}>Show input</button>
        {this.show ? (
          <input
            ref={(el) => (this.textInput = el as HTMLInputElement)}
            type="text"
          />
        ) : null}
      </Host>
    );
  }
}
