import {
  Component,
  Host,
  h,
  Prop,
  State,
  Element,
  Listen,
} from "@stencil/core";
import { GxgFormText, IconPosition } from "../form-text/form-text";
import { GxgListboxItem } from "../listbox-item/listbox-item";

@Component({
  tag: "gxg-combo",
  styleUrl: "combo.scss",
  shadow: true,
})
export class GxgCombo {
  textInput!: HTMLInputElement;

  @Element() el: HTMLElement;

  /**
   * The combo width
   */
  @Prop() width = "240px";

  @State() itemsNodeList: NodeList;
  @State() selectedItemValue = "";
  @State() inputTextValue = "";
  @State() showItems = false;
  @State() inputTextIcon: string = undefined;
  @State() inputTextIconPosition: IconPosition = null;
  @State() noMatch = false;

  @State() slottedContent: HTMLElement = null;

  componentWillLoad() {
    this.itemsNodeList = this.el.querySelectorAll("gxg-combo-item");
    this.itemsNodeList.forEach((item, i) => {
      const itemHtmlElement = item as HTMLElement;
      itemHtmlElement.setAttribute("index", i.toString());
      itemHtmlElement.setAttribute("tabindex", "0");
    });
  }

  @Listen("itemClicked")
  itemClickedHandler(event) {
    const previouslyselectedItem = this.el.querySelector(".selected");
    if (previouslyselectedItem !== null) {
      previouslyselectedItem.classList.remove("selected");
      //set icon color to auto
      ((previouslyselectedItem as unknown) as GxgListboxItem).iconColor =
        "auto";
    }
    const actualSelectedItem = this.el.querySelector(
      "[index='" + event.detail["index"] + "']"
    );
    actualSelectedItem.classList.add("selected");
    this.selectedItemValue = event.detail.value;
    this.inputTextValue = event.detail.value;
    if (event.detail.icon !== null) {
      this.inputTextIcon = event.detail.icon;
      this.inputTextIconPosition = "start";
    } else {
      this.inputTextIcon = null;
      this.inputTextIconPosition = null;
    }
    // Display all hidden items
    const hiddenItems = this.el.querySelectorAll(".hidden");
    hiddenItems.forEach((hiddenItem) => {
      const hiddenItemHTMLElement = hiddenItem as HTMLElement;
      hiddenItemHTMLElement.classList.remove("hidden");
    });
    //remove exact match class
    const exactMatch = this.el.querySelector(".exact-match");
    if (exactMatch !== null) {
      exactMatch.classList.remove("exact-match");
    }
    this.showItems = false;
  }

  onInputGxgformText(e) {
    this.inputTextValue = e.detail;
    this.inputTextIcon = null;
    this.inputTextIconPosition = null;

    const itemSelected = this.el.querySelector(".selected");
    if (itemSelected !== null) {
      itemSelected.classList.remove("selected");
    }

    const filterValue = e.detail.toLowerCase();
    this.itemsNodeList.forEach((item) => {
      const itemHtmlElement = item as HTMLElement;
      let itemValue = itemHtmlElement.getAttribute("value");
      if (itemValue === null) {
        itemValue = itemHtmlElement.innerText;
      }
      itemValue = itemValue.toLowerCase();
      if (!itemValue.includes(filterValue)) {
        itemHtmlElement.classList.add("hidden");
      } else {
        itemHtmlElement.classList.remove("hidden");
      }
      if (itemValue === filterValue) {
        itemHtmlElement.classList.add("exact-match");
      } else {
        itemHtmlElement.classList.remove("exact-match");
      }
    });

    const numberOfHiddenItems = this.el.getElementsByClassName("hidden").length;
    if (this.itemsNodeList.length === numberOfHiddenItems) {
      this.noMatch = true;
    } else {
      this.noMatch = false;
    }
  }

  onKeyDownGxgformText(e) {
    if (e.key === "Escape") {
      this.showItems = false;
      this.textInput.blur();
    }
  }

  toggleItems() {
    if (this.showItems === true) {
      this.showItems = false;
    } else {
      this.showItems = true;
    }
  }

  detectClickOutsideCombo(event) {
    const comboMainContainer = this.el.shadowRoot.querySelector(
      ".main-container"
    ) as HTMLElement;

    const x = event.x;
    const y = event.y;

    //Contextual menu coordinates
    const comboMainContainerArea = comboMainContainer.getBoundingClientRect();
    if (
      (x > comboMainContainerArea.left &&
        x < comboMainContainerArea.right &&
        y > comboMainContainerArea.top &&
        y < comboMainContainerArea.bottom) ||
      (event.screenX === 0 &&
        event.screenY === 0 &&
        event.clientX === 0 &&
        event.clientY === 0)
    ) {
      //Click happened inside the combo
    } else {
      this.showItems = false;
      //Click happened outside the combo
    }
  }

  componentDidLoad() {
    document.addEventListener("click", this.detectClickOutsideCombo.bind(this));
  }
  componentDidUnload() {
    document.removeEventListener("click", this.detectClickOutsideCombo);
  }

  selecteItemFunc() {
    return this.selectedItemValue;
  }
  onInputFocus() {
    this.showItems = true;
  }
  clearInputFunc() {
    this.selectedItemValue = "";
    this.inputTextValue = "";
    const gxgFormText = this.el.shadowRoot.getElementById("gxgFormText");
    ((gxgFormText as unknown) as GxgFormText).value = "";
    gxgFormText.focus();
    this.inputTextIconPosition = null;

    const hiddenItems = this.el.querySelectorAll(".hidden");
    hiddenItems.forEach((item) => {
      item.classList.remove("hidden");
    });

    const selectedItem = this.el.querySelector(".selected");
    if (selectedItem !== null) {
      //set icon color to auto
      const selectedItemIcon = selectedItem.shadowRoot.querySelector(
        "gxg-icon"
      );
      selectedItemIcon.color = "auto";
      selectedItem.classList.remove("selected");
    }

    const exactMatch = this.el.querySelector(".exact-match");
    if (exactMatch !== null) {
      exactMatch.classList.remove("exact-match");
    }

    this.showItems = true;
  }

  render() {
    return (
      <Host>
        <div class={{ "main-container": true }} style={{ width: this.width }}>
          <div class={{ "search-container": true }}>
            <gxg-form-text
              placeholder="Search item"
              onInput={this.onInputGxgformText.bind(this)}
              onKeyDown={this.onKeyDownGxgformText.bind(this)}
              onFocus={() => this.onInputFocus()}
              value={this.selectedItemValue}
              id="gxgFormText"
              icon={this.inputTextIcon}
              iconPosition={this.inputTextIconPosition}
              ref={(el) =>
                (this.textInput = (el as unknown) as HTMLInputElement)
              }
            ></gxg-form-text>
            {this.inputTextValue !== "" ? (
              <gxg-button
                class={{ "delete-icon": true }}
                icon="menus/delete"
                type="tertiary"
                onClick={() => this.clearInputFunc()}
              ></gxg-button>
            ) : null}

            <gxg-button
              class={{ "arrow-down-icon": true }}
              icon="navigation/arrow-down"
              type="tertiary"
              onClick={() => this.toggleItems()}
            ></gxg-button>
            <span class="layer"></span>
          </div>
          {this.showItems ? (
            <div
              class={{
                "items-container": true,
              }}
            >
              <slot></slot>
              {this.noMatch ? (
                <div class="no-courrences-found">
                  No occurrences found<span>ctrl/cmd + backspace to erase</span>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}