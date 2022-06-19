import {
  Component,
  Host,
  h,
  Prop,
  State,
  Element,
  Listen,
  Watch,
} from "@stencil/core";
import { GxgComboItem } from "../combo-item/combo-item";
import { IconPosition } from "../form-text/form-text";
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
   * The combo max-width
   */
  @Prop() maxWidth = "240px";

  /**
   * The combo placeholder
   */
  @Prop() placeholder = "Search item";

  /**
   * The presence of this attribute disables the filter
   */
  @Prop() disableFilter = false;

  /**
   * If this attribute is present, "value" will only return something if a comboItem is selected, otherwise it will return undefined.
   * if this attribute is not present, "value" will return the value of the actual comboItem, or whatever text the comboItem has.
   */
  @Prop() strict = false;

  /**
   * Get or set the selected item value
   */
  @Prop({ mutable: true }) value = null;

  @State() itemsNodeList: NodeList;
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
    });
  }

  @Listen("itemClicked")
  itemClickedHandler(event) {
    //unselect previous selected item
    const previouslyselectedItem = this.el.querySelector(".selected");
    if (previouslyselectedItem !== null) {
      previouslyselectedItem.classList.remove("selected");
      ((previouslyselectedItem as unknown) as GxgListboxItem).iconColor =
        "auto";
    }

    //update active item
    const actualSelectedItem = this.el.querySelector(
      "[index='" + event.detail["index"] + "']"
    );
    actualSelectedItem.classList.add("selected");

    this.value = event.detail.value;
    this.inputTextValue = event.detail.description;
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
    this.textInput.focus();
  }

  @Listen("keyDownComboItem")
  keyDownComboItemHandler(event) {
    if (event.detail === "ArrowUp") {
      this.textInput.focus();
    } else if (event.detail === "Tab" || event.detail === "Escape") {
      this.showItems = false;
      this.textInput.focus();
    }
  }

  onInputGxgformText(e) {
    this.showItems = true;

    //this.inputTextValue = e.detail;
    this.inputTextIcon = null;
    this.inputTextIconPosition = null;

    const itemSelected = this.el.querySelector(".selected");
    if (itemSelected !== null) {
      itemSelected.classList.remove("selected");
    }

    const filterValue = e.detail.toLowerCase();
    this.itemsNodeList.forEach((item) => {
      const itemHtmlElement = item as HTMLElement;
      const itemDescription = itemHtmlElement.innerText.toLocaleLowerCase();
      if (!itemDescription.includes(filterValue)) {
        itemHtmlElement.classList.add("hidden");
      } else {
        itemHtmlElement.classList.remove("hidden");
      }
      if (itemDescription === filterValue) {
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

  updateSelectedItem(itemValue: any) {
    console.log("cambio el value");
  }

  @Watch("value")
  onValueChanged(newValue: any) {
    this.updateSelectedItem(newValue);
  }

  onKeyDownGxgformText(e) {
    if (e.key === "Enter") {
      this.showItems = true;
    } else if (e.key === "ArrowDown") {
      //set focus on the first list item
      e.preventDefault();
      (this.el.querySelector(
        "gxg-combo-item:not(.hidden)"
      ) as HTMLElement).focus();
    } else if (e.key === "Escape") {
      this.showItems = false;
    }
  }

  onKeyDownGxgButtonArrowDown(e) {
    if (e.key === "ArrowDown") {
      //set focus on the first list item
      e.preventDefault();
      this.el.querySelector("gxg-combo-item").focus();
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

  clearCombo() {
    this.value = undefined;
    this.inputTextValue = "";
    this.textInput.focus();
    this.inputTextIcon = null;
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
      <Host class={{ "filter-disabled": this.disableFilter }}>
        <div
          class={{ "main-container": true }}
          style={{ maxWidth: this.maxWidth }}
        >
          <div class={{ "search-container": true }}>
            <gxg-form-text
              placeholder={this.placeholder}
              onInput={this.onInputGxgformText.bind(this)}
              onKeyDown={this.onKeyDownGxgformText.bind(this)}
              onClick={() => this.toggleItems()}
              value={this.inputTextValue}
              id="gxgFormText"
              icon={this.inputTextIcon}
              iconPosition={this.inputTextIconPosition}
              disabled={this.disableFilter}
              ref={(el) =>
                (this.textInput = (el as unknown) as HTMLInputElement)
              }
            ></gxg-form-text>
            {this.inputTextValue !== "" && !this.disableFilter ? (
              <gxg-button
                class={{ "delete-icon": true }}
                icon="menus/delete"
                type="tertiary"
                onClick={() => this.clearCombo()}
                tabindex="-1"
              ></gxg-button>
            ) : null}

            <gxg-button
              class={{ "arrow-down-icon": true }}
              icon="navigation/arrow-down"
              type="tertiary"
              onClick={() => this.toggleItems()}
              onKeyDown={this.onKeyDownGxgButtonArrowDown.bind(this)}
              tabindex="-1"
            ></gxg-button>
            {!this.disableFilter ? <span class="layer"></span> : null}
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
