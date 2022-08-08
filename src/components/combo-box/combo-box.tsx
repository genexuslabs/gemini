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
  shadow: { delegatesFocus: true },
})
export class GxgComboBox {
  gxgFormText!: GxgFormText;

  @Element() el: HTMLElement;
  mainContainer!: HTMLDivElement;
  itemsContainer!: HTMLDivElement;

  /**
   * The combo width
   */
  @Prop() width = "240px";

  /**
   * The combo min-width
   */
  @Prop() minWidth = "0";

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

  @State() inputTextValue = "";
  @State() showItems = false;
  @State() inputTextIcon: string = undefined;
  @State() inputTextIconPosition: IconPosition = null;
  @State() noMatch = false;
  @State() lastAllowedValue = undefined;
  @State() slottedContent: HTMLElement = null;
  @State() userTyped = false;
  @State() selectionProgramatic = true;
  @State() lastSetValueByUser;

  private detectClickOutsideCombo = this.detectClickOutsideComboFunc.bind(this);
  private detectMouseScroll = this.detectMouseScrollFunc.bind(this);

  componentWillLoad() {
    this.lastSetValueByUser = this.value;
    if (this.value !== undefined) {
      this.tryToSetItem(this.value);
    }
  }
  componentDidLoad() {
    this.setMainContainerWidth();

    //Listen to combo resize, in order to reset main container width
    this.resizeObserver();
  }

  @Method()
  async open() {
    this.showItems = true;
  }

  @Method()
  async close() {
    this.showItems = false;
  }

  @Method()
  async getValueByIndex(index: number): Promise<string> {
    index++;
    let itemValue = undefined;
    const item = this.el.querySelector(
      "gxg-combo-box-item:nth-child(" + index + ")"
    );
    if (item) {
      itemValue = ((item as unknown) as GxgComboBoxItem).value;
    }
    return itemValue;
  }

  @Method()
  async setValueByIndex(index: number): Promise<void> {
    index++;
    const item = this.el.querySelector(
      "gxg-combo-box-item:nth-child(" + index + ")"
    );
    if (item) {
      const itemValue = ((item as unknown) as GxgComboBoxItem).value;
      this.value = itemValue;
    }
  }

  @Listen("itemSelected")
  itemSelectedHandler(event) {
    this.selectionProgramatic = false;
    this.value = event.detail.value;
    this.clearIconsColor();
  }

  @Listen("itemDidLoad")
  itemDidLoadHandler(event) {
    if (this.lastSetValueByUser === event.detail.value && this.strict) {
      this.tryToSetItem(event.detail.value);
    }
  }

  @Listen("keyDownComboItem")
  keyDownComboItemHandler(event) {
    if (event.detail === "ArrowUp") {
      ((this.gxgFormText as unknown) as HTMLElement).focus();
    } else if (event.detail === "Tab" || event.detail === "Escape") {
      this.showItems = false;
      ((this.gxgFormText as unknown) as HTMLElement).focus();
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

    const itemsNodeList = this.el.querySelectorAll("gxg-combo-box-item");
    itemsNodeList.forEach((item) => {
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
    if (itemsNodeList.length === numberOfHiddenItems) {
      this.noMatch = true;
    } else {
      this.noMatch = false;
    }
    this.userTyped = false;
  }

  @Watch("value")
  onValueChanged(newValue: string) {
    if (newValue) {
      this.lastSetValueByUser = newValue;
    }
    this.tryToSetItem(newValue);
  }

  @Watch("showItems")
  onShowItemsChanged(newValue: boolean) {
    if (newValue) {
      document.addEventListener("click", this.detectClickOutsideCombo, true);
      document.addEventListener("scroll", this.detectMouseScroll, true);
      this.isOpen = true;

      //Reposition .items-container, since it has fixed position
      this.repositionItemsContainer();
    } else {
      document.removeEventListener("click", this.detectClickOutsideCombo, true);
      document.removeEventListener("scroll", this.detectMouseScroll, true);
      this.isOpen = false;
    }
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
      const itemsNodeList = this.el.querySelectorAll("gxg-combo-box-item");
      for (let i = 0; i < itemsNodeList.length; i++) {
        if (
          ((itemsNodeList[i] as unknown) as GxgComboBoxItem).value === value
        ) {
          item = itemsNodeList[i];
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
    if (!this.selectionProgramatic) {
      this.focus();
      this.selectionProgramatic = false;
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

  clearIconsColor() {
    const comboBoxItems = this.el.querySelectorAll("gxg-combo-box-item");
    comboBoxItems.forEach((item) => {
      if (!item.classList.contains("selected")) {
        item.iconColor = "auto";
      }
    });
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
    ((this.gxgFormText as unknown) as HTMLElement).focus();
  }

  detectClickOutsideComboFunc(event) {
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

  detectMouseScrollFunc() {
    this.showItems = false;
  }

  componentDidUnload() {
    document.removeEventListener("click", this.detectClickOutsideCombo, true);
    document.removeEventListener("scroll", this.detectMouseScroll, true);
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

  setMainContainerWidth() {
    const gxgComboWidth = this.el.clientWidth;
    this.mainContainer.style.width = gxgComboWidth + "px";
  }

  resizeObserver() {
    const myObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        this.setMainContainerWidth();
      });
    });

    const gxgCombo = this.el;
    myObserver.observe(gxgCombo);
  }

  repositionItemsContainer() {
    const gxgComboCoordinates = this.el.getBoundingClientRect();
    const gxgComboY = gxgComboCoordinates.y;
    const gxgComboHeight = gxgComboCoordinates.height;
    setTimeout(() => {
      this.itemsContainer.style.top = gxgComboY + gxgComboHeight + "px";
    }, 10);
  }

  render() {
    return (
      <Host
        class={{
          "filter-disabled": this.disableFilter,
          large: state.large,
        }}
        style={{
          width: this.width,
          minWidth: this.minWidth,
          maxWidth: this.maxWidth,
        }}
      >
        <div
          class={{ "main-container": true }}
          ref={(el) => (this.mainContainer = el as HTMLDivElement)}
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
              ref={(el) => (this.itemsContainer = el as HTMLDivElement)}
            >
              <slot></slot>
              {this.noMatch && this.strict ? (
                <div class="no-ocurrences-found">
                  No occurrences found
                  <span>ctrl/cmd + backspace to erase</span>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}
