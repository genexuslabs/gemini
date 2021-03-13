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
  }

  onInputGxgformText(e) {
    const filterValue = e.detail.toLowerCase();
    this.itemsNodeList.forEach(item => {
      const itemHtmlElement = item as HTMLElement;
      const itemContent = itemHtmlElement.innerText.toLowerCase();
      if (!itemContent.includes(filterValue)) {
        itemHtmlElement.classList.add("opacity-zero");
        itemHtmlElement.classList.add("height-zero");
      } else {
        itemHtmlElement.classList.remove("height-zero");
        itemHtmlElement.classList.remove("opacity-zero");
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
