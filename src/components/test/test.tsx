import {
  Component,
  Prop,
  h,
  Watch,
  Host,
  Element,
  Method,
} from "@stencil/core";
@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true,
})
export class GxgTest {
  textInput!: HTMLInputElement;
  @Element() el: HTMLElement;

  /**
   * The presence of this attribute sets focus on the input
   */
  @Prop() setFocus = false;

  componentDidLoad() {
    //focus
  }

  @Watch("setFocus")
  setFocusHandler(newValue) {
    if (newValue === true) {
      this.textInput.focus();
    }
  }

  @Method()
  async showPrompt() {
    // show a prompt
    this.textInput.focus();
  }

  hasFocusFunc() {
    console.log("host has focus");
  }

  render() {
    return (
      <Host onFocus={this.hasFocusFunc}>
        <input
          tabindex="0"
          ref={(el) => (this.textInput = el as HTMLInputElement)}
        ></input>
      </Host>
    );
  }
}
