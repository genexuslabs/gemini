import { Component, Element, Host, h, State } from "@stencil/core";

@Component({
  tag: "gxg-filter",
  styleUrl: "gxg-filter.scss",
  shadow: true,
})
export class GxgFilter {
  @Element() el: HTMLElement;

  @State() itemsNodeList: NodeList;

  componentWillLoad() {
    this.itemsNodeList = this.el.querySelectorAll("gxg-filter-item");
  }

  onInputGxgformText(e) {
    const noMatchSpan = this.el.shadowRoot.getElementById("no-match");
    const filterValue = e.detail.toLowerCase();
    this.itemsNodeList.forEach((item) => {
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
    const numberOfHiddenItems = this.el.getElementsByClassName("opacity-zero")
      .length;
    if (this.itemsNodeList.length === numberOfHiddenItems) {
      noMatchSpan.classList.remove("height-zero");
      noMatchSpan.classList.remove("opacity-zero");
    } else {
      noMatchSpan.classList.add("opacity-zero");
      noMatchSpan.classList.add("height-zero");
    }
  }

  closeFilter() {
    this.el.addEventListener("animationend", () => {
      this.el.remove();
    });
    this.el.classList.add("hide");
  }

  render() {
    console.log("render method");
    return (
      <Host>
        <header id="header">
          <div class="search-container">
            <gxg-form-text
              icon="gemini-tools/search"
              icon-position="start"
              onInput={this.onInputGxgformText.bind(this)}
            ></gxg-form-text>
          </div>
          <gxg-button
            class="close-icon"
            icon="gemini-tools/close"
            type="tertiary"
            onClick={this.closeFilter.bind(this)}
          ></gxg-button>
        </header>
        <main id="main">
          <slot></slot>
          <span id="no-match" class="opacity-zero height-zero">
            No ocurrences found
          </span>
        </main>
      </Host>
    );
  }
}
