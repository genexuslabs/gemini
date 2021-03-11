import { Component, h } from "@stencil/core";
@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true
})
export class GxgTest {
  ulList!: HTMLElement;

  componentDidLoad() {
    console.log("test did load");
  }

  checkboxClicked(e) {
    console.log(e);
    console.log("clicked");
  }

  render() {
    console.log("render method fired on test component");
    return (
      <gxg-form-checkbox
        checked={true}
        class={{ checkbox: true }}
        onClick={this.checkboxClicked.bind(this)}
      ></gxg-form-checkbox>
    );
  }
}
