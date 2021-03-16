import {
  Component,
  Element,
  Host,
  h,
  Prop,
  State,
  Listen,
} from "@stencil/core";

@Component({
  tag: "gxg-filter",
  styleUrl: "gxg-filter.scss",
  shadow: true,
})
export class GxgFilter {
  @Element() el: HTMLElement;

  /**
   * The top position of the filter, relative to the closest parent with relative position. (optional)
   */
  @Prop() top = undefined;

  /**
   * The left position of the filter, relative to the closest parent with relative position. (optional)
   */
  @Prop() left = undefined;

  @State() itemsNodeList: NodeList;

  componentWillLoad() {
    this.itemsNodeList = this.el.querySelectorAll("gxg-filter-item");

    //Set position
    if (this.top !== undefined && this.left !== undefined) {
      this.el.style.top = this.top;
      this.el.style.left = this.left;
      this.el.style.position = "absolute";
    }
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

  @Listen("itemClickedEvent")
  handleItemClickedEvent() {
    //When an item has been clicked, hide the filter
    this.el.addEventListener("animationend", () => {
      this.el.remove();
    });
    this.el.classList.add("hide");
  }

  render() {
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
            No ocurrences found <br />
            <span class="hint">ctrl + backspace to erase</span>
          </span>
        </main>
      </Host>
    );
  }
}
