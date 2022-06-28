import {
  Component,
  Host,
  h,
  Prop,
  State,
  Element,
  Listen,
  Watch,
  Method,
} from "@stencil/core";
import { GxgComboBoxItem } from "../combo-box-item/combo-box-item";
import { GxgFormText, IconPosition } from "../form-text/form-text";
import state from "../store";

@Component({
  tag: "gxg-combo-box",
  styleUrl: "combo-box.scss",
  shadow: true,
})
export class GxgComboBox {
  gxgFormText!: GxgFormText;

  @Element() el: HTMLElement;

  /**
   * The combo width
   */
  @Prop() width = "240px";

  /**
   * The combo min-width
   */
  @Prop() minWidth = "none";

  /**
   * The combo max-width
   */
  @Prop() maxWidth = "none";

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
  @Prop({ mutable: true }) value = undefined;

  /**
   * This property returns true if the combo-box list is open, false otherwise.
   * Do not use this property to open or close the combo-box list, for that purpose use the open() or close() methods.
   */
  @Prop({ mutable: true }) isOpen = false;

  @State() itemsNodeList: NodeList;
  @State() inputTextValue = "";
  @State() showItems = false;
  @State() inputTextIcon: string = undefined;
  @State() inputTextIconPosition: IconPosition = null;
  @State() noMatch = false;
  @State() lastAllowedValue = undefined;
  @State() slottedContent: HTMLElement = null;
  @State() userTyped = false;
  @State() selectionNotProgramatic = true;

  componentWillLoad() {
    this.setItemsNodeList();
    if (this.value !== undefined) {
      this.tryToSetItem(this.value);
    }
  }

  setItemsNodeList() {
    this.itemsNodeList = this.el.querySelectorAll("gxg-combo-box-item");
    this.itemsNodeList.forEach((item, i) => {
      const itemHtmlElement = item as HTMLElement;
      itemHtmlElement.setAttribute("index", i.toString());
    });
  }

  @Method()
  async updateItems() {
    //This method must be called after the combo-box items list has been programatically updated/changed.
    this.setItemsNodeList();
    this.clearCombo();
  }

  @Method()
  async setFocus() {
    this.focus();
  }

  @Method()
  async open() {
    //console.log("'open' method was called");
    this.showItems = true;
  }

  @Method()
  async close() {
    //console.log("'close' method was called");
    this.showItems = false;
  }

  @Listen("itemSelected")
  itemSelectedHandler(event) {
    this.selectionNotProgramatic = true;
    this.value = event.detail.value;
  }

  @Listen("keyDownComboItem")
  keyDownComboItemHandler(event) {
    if (event.detail === "ArrowUp") {
      this.gxgFormText.setFocus();
    } else if (event.detail === "Tab" || event.detail === "Escape") {
      this.showItems = false;
      this.gxgFormText.setFocus();
    }
  }

  onInputGxgformText(e) {
    this.userTyped = true;
    this.showItems = true;
    this.inputTextValue = e.detail;

    if (!this.strict) {
      this.value = e.detail;
    } else {
      this.value = undefined;
    }

    this.inputTextIcon = null;
    this.inputTextIconPosition = null;
    this.clearSelectedItem();

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
    this.userTyped = false;
  }

  @Watch("value")
  onValueChanged(newValue: string) {
    this.tryToSetItem(newValue);
  }

  @Watch("showItems")
  onShowItemsChanged(newValue: boolean) {
    newValue ? (this.isOpen = true) : (this.isOpen = false);
  }

  tryToSetItem(value) {
    if (!this.userTyped) {
      const item = this.getItemByValue(value);
      if (item) {
        this.updateSelectedItem(item);
        this.lastAllowedValue = (item as GxgComboBoxItem).value;
      } else if (this.strict) {
        this.value = this.lastAllowedValue;
      } else {
        this.clearIcon();
        this.inputTextValue = value;
      }
    } else if (value !== undefined) {
      //user did not type
      this.lastAllowedValue = this.value;
    }
    this.userTyped = false;
  }

  getItemByValue(value: string): GxgComboBoxItem | undefined {
    let item = null;
    if (value !== undefined) {
      for (let i = 0; i < this.itemsNodeList.length; i++) {
        if (
          ((this.itemsNodeList[i] as unknown) as GxgComboBoxItem).value ===
          value
        ) {
          item = this.itemsNodeList[i];
          break;
        }
      }
    }
    return item;
  }

  updateSelectedItem(item: GxgComboBoxItem) {
    this.clearSelectedItem();
    this.clearExactMatch();
    this.clearHiddenItems();

    //set icon
    if (item.icon) {
      this.setIcon(item.icon);
      item.iconColor = "negative";
    } else {
      this.clearIcon();
    }

    //set description
    const itemDescription = ((item as unknown) as HTMLElement).innerText;
    if (itemDescription) {
      this.inputTextValue = itemDescription;
    } else {
      this.inputTextValue = " ";
    }

    //set item as selected
    ((item as unknown) as HTMLElement).classList.add("selected");

    this.showItems = false;
    if (this.gxgFormText && this.selectionNotProgramatic) {
      this.focus();
      this.selectionNotProgramatic = false;
    }
  }

  onKeyDownGxgformText(e) {
    // DONE
    if (e.key === "Enter") {
      this.showItems = true;
    } else if (e.key === "ArrowDown") {
      //set focus on the first list item
      e.preventDefault();
      if (this.showItems) {
        const nextVisibleItem = this.el.querySelector(
          "gxg-combo-box-item:not(.hidden)"
        ) as HTMLElement;
        nextVisibleItem ? nextVisibleItem.focus() : null;
      } else {
        this.showItems = true;
      }
    } else if (e.key === "Escape") {
      this.showItems = false;
    }
  }

  onKeyDownGxgButtonArrowDown(e) {
    console.log("onKeyDownGxgButtonArrowDown");
    if (e.key === "ArrowDown") {
      //set focus on the first list item
      e.preventDefault();
      ((this.el.querySelector(
        "gxg-combo-box-item"
      ) as unknown) as HTMLElement).focus();
    }
  }

  toggleItems(): void {
    if (this.showItems === true) {
      this.showItems = false;
    } else {
      this.showItems = true;
    }
  }

  clearSelectedItem(): void {
    const selectedItem = this.el.querySelector(".selected");
    if (selectedItem !== null) {
      selectedItem.classList.remove("selected");
      if (selectedItem.hasAttribute("icon")) {
        ((selectedItem as unknown) as GxgComboBoxItem).iconColor = "auto";
      }
    }
  }

  clearExactMatch(): void {
    const itemExactMatch = this.el.querySelector(".exact-match");
    if (itemExactMatch !== null) {
      itemExactMatch.classList.remove("exact-match");
    }
  }

  clearHiddenItems() {
    const hiddenItems = this.el.querySelectorAll(".hidden");
    hiddenItems.forEach((item) => {
      item.classList.remove("hidden");
    });
  }

  setIcon(icon: string): void {
    this.inputTextIcon = icon;
    this.inputTextIconPosition = "start";
  }

  clearIcon(): void {
    this.inputTextIcon = null;
    this.inputTextIconPosition = null;
  }

  focus() {
    this.gxgFormText.setFocus();
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
      //console.log("clicked outside the combo box");
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
    this.lastAllowedValue = undefined;
    this.value = undefined;
    this.inputTextValue = "";
    this.clearIcon();
    this.clearSelectedItem();
    this.clearHiddenItems();
    this.showItems = true;
    this.focus();
  }

  render() {
    return (
      <Host
        class={{
          "filter-disabled": this.disableFilter,
          large: state.large,
        }}
      >
        <div
          class={{ "main-container": true }}
          style={{
            width: this.width,
            minWidth: this.minWidth,
            maxWidth: this.maxWidth,
          }}
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
              readonly={this.disableFilter}
              ref={(el) => (this.gxgFormText = (el as unknown) as GxgFormText)}
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
              {this.noMatch && this.strict ? (
                <div class="no-ocurrences-found">
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
