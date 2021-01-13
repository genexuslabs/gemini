import { Component, Prop, h } from "@stencil/core";
@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true
})
export class GxgTest {
  @Prop() optionsArray = ["rojo", "azul", "verde"];
  /**
   * The presence of this attribute disables the pillgit a
   */
  //@Prop() disabled = false;
  updateOptions() {
    this.optionsArray = ["rojo", "azul", "marron"];
  }
  render() {
    return [
      <gxg-modal
        padding="m"
        modal-title="Welcome to the Design tokens editor wizard"
        width="304px"
        visible={true}
      >
        Hi
      </gxg-modal>,
      <button onClick={this.updateOptions.bind(this)}>Update options</button>
    ];
  }
}
