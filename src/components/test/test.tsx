import Sortable from "sortablejs";
import { Component, Prop, h } from "@stencil/core";
@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true
})
export class GxgTest {
  ulList!: HTMLElement;

  @Prop() optionsArray = ["rojo", "azul", "verde"];
  /**
   * The presence of this attribute disables the pillgit a
   */
  //@Prop() disabled = false;
  updateOptions() {
    this.optionsArray = ["rojo", "azul", "marron"];
  }

  componentDidLoad() {
    Sortable.create(this.ulList, {
      group: "foo",
      animation: 100
    });
  }

  render() {
    return (
      <ul id="foo" ref={el => (this.ulList = el as HTMLElement)}>
        <li>foo 1</li>
        <li>foo 2</li>
        <li>foo 3</li>
      </ul>
    );
    // return [
    //   <gxg-modal
    //     padding="m"
    //     modal-title="Welcome to the Design tokens editor wizard"
    //     width="304px"
    //     visible={true}
    //   >
    //     Hi
    //   </gxg-modal>,
    //   <button onClick={this.updateOptions.bind(this)}>Update options</button>
    // ];
  }
}
