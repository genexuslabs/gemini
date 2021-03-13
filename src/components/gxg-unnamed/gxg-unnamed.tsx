import { Component, Element, Host, h, State } from "@stencil/core";

@Component({
  tag: "gxg-unnamed",
  styleUrl: "gxg-unnamed.scss",
  shadow: true
})
export class GxgUnnamed {
  @Element() el: HTMLElement;

  @State() itemsNodeList: NodeList;

  componentWillLoad() {
    this.itemsNodeList = this.el.querySelectorAll("gxg-unnamed-item");
    console.log("this.itemsNodeList");
    console.log(this.itemsNodeList);
  }

  onInputGxgformText(e) {
    const filterValue = e.detail.toLowerCase();
    console.log(filterValue);
    this.itemsNodeList.forEach(item => {
      const itemHtmlElement = item as HTMLElement;
      const itemContent = itemHtmlElement.innerText.toLowerCase();
      if (!itemContent.includes(filterValue)) {
        itemHtmlElement.classList.add("opacity-zero");
        setTimeout(function() {
          itemHtmlElement.classList.add("height-zero");
        }, 150);
      } else {
        itemHtmlElement.classList.remove("height-zero");
        setTimeout(function() {
          itemHtmlElement.classList.remove("opacity-zero");
        }, 150);
      }
      if (itemContent === filterValue) {
        itemHtmlElement.classList.add("exact-match");
      } else {
        itemHtmlElement.classList.remove("exact-match");
      }
    });
  }

  render() {
    console.log("render method");
    return (
      <Host>
        <header class="header">
          <div class="search-container">
            <gxg-form-text
              onInput={this.onInputGxgformText.bind(this)}
            ></gxg-form-text>
          </div>
          <gxg-button
            class="close-icon"
            icon="gemini-tools/close"
            type="tertiary"
          ></gxg-button>
        </header>
        <main class="main">
          <slot></slot>
        </main>
      </Host>
    );
  }
}
