import { Component, Element, Host, h, State } from "@stencil/core";

@Component({
  tag: "gxg-unnamed",
  styleUrl: "gxg-unnamed.scss",
  shadow: true
})
export class GxgUnnamed {
  @Element() el: HTMLElement;

  @State() itemsList = [];

  componentWillLoad() {
    const itemsNodeList = this.el.querySelectorAll("gxg-unnamed-item");
    console.log(itemsNodeList);
    //this.itemsList = Array.from(btns);
    itemsNodeList.forEach(item => {
      console.log(item);
      item.classList;
    });
  }

  onInputGxgformText(e) {
    console.log("hola");
  }

  render() {
    console.log("render method");
    return (
      <Host>
        <header class="header">
          <div class="search-container">
            <gxg-form-text onInput={this.onInputGxgformText}></gxg-form-text>
          </div>
          <gxg-button icon="gemini-tools/close" type="tertiary"></gxg-button>
        </header>
        <main class="main">
          <slot></slot>
        </main>
      </Host>
    );
  }
}
