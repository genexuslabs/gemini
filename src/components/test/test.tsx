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
      <gxg-select label="Index" label-position="start">
        <gxg-option value="None">None</gxg-option>
        {this.optionsArray.map(option => {
          return (
            <gxg-option key={option} value={option}>
              {option}
            </gxg-option>
          );
        })}
      </gxg-select>,
      <button onClick={this.updateOptions.bind(this)}>Update options</button>
    ];
  }
}
