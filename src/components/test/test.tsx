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
  private updateSlot = () => {
    // Update the content based on the fetched data
    const button = <gxg-button></gxg-button>;
    console.log(button);
    //this.el.innerHTML = "<gxg-button>Bomba</gxg-button>";
  };

  render() {
    return (
      <Host>
        <slot></slot>
        <gxg-button onClick={this.updateSlot.bind(this)}>
          update slot
        </gxg-button>
      </Host>
    );
  }
}
