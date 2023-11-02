import { Component, h, Prop, Listen, State, Element } from "@stencil/core";
@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true,
})
export class GxgTest {
  @Element() el: HTMLElement;

  @State() listBoxModel = ["id1", "id2", "id3", "id4", "id5", "id6"];

  private handleUnassignedCheckedChange = (e: any) => {
    console.log(e.detail);
  };

  private updateModel = () => {
    this.listBoxModel = [...this.listBoxModel, "id7"];
  };

  render() {
    return [
      <gxg-list-box
        checkboxes
        onCheckedChanged={this.handleUnassignedCheckedChange}
      >
        {this.listBoxModel.map((item) => {
          return <gxg-list-box-item value={item}>{item}</gxg-list-box-item>;
        })}
      </gxg-list-box>,
      <br />,
      <button onClick={this.updateModel}>update model</button>,
    ];
  }
}
