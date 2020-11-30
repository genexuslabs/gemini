import { Component, Prop, h } from "@stencil/core";
@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true
})
export class GxgTest {
  @Prop() selectedOption = "two";
  /**
   * The presence of this attribute disables the pillgit a
   */
  //@Prop() disabled = false;

  defineSelected(optionValue) {
    if (optionValue === this.selectedOption) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    console.log("render");
    return (
      <gxg-select label="Index" label-position="start">
        <gxg-option value="one" selected={this.defineSelected("one")}>
          One
        </gxg-option>
        <gxg-option value="two" selected={this.defineSelected("two")}>
          Two
        </gxg-option>
        <gxg-option value="three" selected={this.defineSelected("three")}>
          Three
        </gxg-option>
        <gxg-option value="four" selected={this.defineSelected("four")}>
          Four
        </gxg-option>
      </gxg-select>
    );
  }
}
