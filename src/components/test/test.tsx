import { Component, h, Host, Prop, Listen, Element } from "@stencil/core";
//import { GxgComboBox } from "../combo-box/combo-box";
//import { GxgFormSelect } from "../form-select/gxg-select";
//import { GxgModal } from "../modal/modal";
//import state from "../store";

@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true,
})
export class GxgTest {
  @Element() el: HTMLElement;
  @Prop() slottedContentList: JSX.Element = (<gxg-button>Hola</gxg-button>);

  componentDidLoad() {
    this.el.innerHTML = this.returnButton();
  }

  returnButton = () => {
    return `<gxg-button>Hey handsome</gxg-button>`;
  };

  render() {
    return (
      <div>
        <slot></slot>
        {this.slottedContentList}
      </div>
    );
  }
}
