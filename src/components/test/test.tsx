import {
  Component,
  Prop,
  h,
  Watch,
  Host,
  Element,
  Method,
  Listen,
} from "@stencil/core";
@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true,
})
export class GxgTest {
  textInput!: HTMLInputElement;

  @Element() host: HTMLElement;
  @Listen("focus")
  handleFocus(focusEvent: Event) {
    if (focusEvent.target !== this.host) {
      return;
    }
    this.textInput.focus();
  }

  render() {
    return (
      <Host tabindex="0">
        <input
          tabindex="0"
          ref={(el) => (this.textInput = el as HTMLInputElement)}
        ></input>
      </Host>
    );
  }
}
