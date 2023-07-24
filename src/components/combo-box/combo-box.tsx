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
  Event,
  EventEmitter,
} from "@stencil/core";
import {
  ComboBoxItemValue,
  ItemInformation,
} from "../combo-box-item/combo-box-item";
import { IconPosition } from "../form-text/form-text";
import { formMessageLogic } from "../../common/form";
import { FormComponent } from "../../common/interfaces";
import state from "../store";

const ARROW_DOWN = "ArrowDown";
const ARROW_UP = "ArrowUp";
const SPACE = "Space";
const ENTER = "Enter";
const ESCAPE = "Escape";
const ALT_LEFT = "AltLeft";
const ALT_RIGHT = "AltRight";
const TAB = "Tab";
@Component({
  tag: "gxg-combo-box",
  styleUrl: "combo-box.scss",
  shadow: { delegatesFocus: true },
})
export class GxgComboBox implements FormComponent {
  @Event() keyDown: EventEmitter<string>;

  inputText!: HTMLGxgFormTextElement;

  @Element() el: HTMLElement;
  mainContainer!: HTMLDivElement;
  itemsContainer!: HTMLDivElement;

  /**
   * The presence of this attribute makes the input disabled
   */
  @Prop() disabled = false;

  /**
   * The combo label
   */
  @Prop() label: string = undefined;

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
   * The presence of this attribute disables the clear button
   */
  @Prop() disableClear = false;

  /**
   * If this attribute is present, "value" will only return something if a comboItem is selected, otherwise it will return undefined.
   * if this attribute is not present, "value" will return the value of the actual comboItem, or whatever text the comboItem has.
   */
  @Prop() strict = false;

  /**
   * The current combo box item value
   */
  @Prop() value: ComboBoxItemValue;

  /**
   * The presence of this attribute with make the filter search for values with case sensitive distinction
   */
  @Prop() caseSensitive = false;

  /**
   * The container 'items container' position
   */
  @Prop() listPosition: ListPosition = "below";

  /**
   * The visible text on the input (not the same as the value)
   */
  @State() text: string;

  /*VALIDATION*/

  /**
   * The presence of this attribute makes the commbo required
   */
  @Prop({ reflect: true }) required = false;

  /**
   * The validation status
   *
   */
  @Prop({ mutable: true }) validationStatus:
    | "indeterminate"
    | "warning"
    | "error"
    | "success";

  /**
   * The presence of this attribute will check the input validity on every user input
   *
   */
  @Prop() validateOnChange = false;

  /**
   * The presence of this attribute will display validation styles, such as a red, orange, or green border dependening on the validation status
   *
   */
  @Prop() displayValidationStyles = false;

  /**
   * The presence of this attribute will display validation styles, such as a red, orange, or green border dependening on the validation status
   *
   */
  @Prop() displayValidationMessage = false;

  /**
   * The message to display when validation fails (error)
   *
   */
  @Prop() validationMessage: string;

  /**
   * An informative message to help the user filling the information
   *
   */
  @Prop() informationMessage: string;

  /**
   * A function that will return true or false depending on wether the
   * error condition is met or not
   */
  @Prop() errorCondition: Function;

  /**
   * A function that will return true or false depending on wether the
   * warning condition is met or not
   */
  @Prop() warningCondition: Function;

  private userTyped = false;

  formMessageLogic = formMessageLogic;

  @State() inputTextValue = "";
  @State() listIsOpen = false;
  @State() inputTextIcon: string = undefined;
  @State() inputTextIconPosition: IconPosition = null;
  @State() noMatch = false;
  @State() lastAllowedValue = undefined;
  @State() slottedContent: HTMLElement = null;
  @State() selectionProgramatic = true;
  @State() lastSetValueByUser;
  @State() myObserver = null;
  @State() selectedItem: HTMLGxgComboBoxItemElement;

  private detectClickOutsideCombo = this.detectClickOutsideComboFunc.bind(this);
  private detectMouseScroll = this.detectMouseScrollFunc.bind(this);

  componentDidUpdate(): void {
    const itemsContainerIsOverflowing = this.itemsContainerBottomOverflows();
    itemsContainerIsOverflowing
      ? (this.listPosition = "above")
      : (this.listPosition = "below");
  }

  componentWillLoad(): void {
    this.setup();
  }
  componentDidLoad(): void {
    this.resizeObserver();
  }
  disconnectedCallback(): void {
    this.cleanup();
  }

  /*********************************
  METHODS
  *********************************/

  @Method()
  async validate(): Promise<boolean> {
    this.handleValidation();
    if (this.validationStatus === "error") {
      return false;
    } else {
      return true;
    }
  }
  handleValidation = (): void => {
    this.handleError();
    this.handleWarning();
  };
  handleError = (): void => {
    const hasError =
      (this.required && !this.value) ||
      (this.errorCondition && this.errorCondition());
    if (hasError) {
      this.validationStatus = "error";
    } else {
      this.validationStatus = "indeterminate";
    }
  };
  handleWarning = (): void => {
    const hasWarning = this.warningCondition && this.warningCondition();
    if (hasWarning) {
      this.validationStatus === "warning";
    } else {
      this.validationStatus === "indeterminate";
    }
  };

  @Method()
  async open(): Promise<void> {
    this.listIsOpen = true;
  }

  @Method()
  async close(): Promise<void> {
    this.listIsOpen = false;
  }

  @Method()
  async getValueByIndex(index: number): Promise<string> {
    const enabledItems = this.getEnabledItems();
    const foundItem = enabledItems.filter((item) => item.index === index)[0];
    return foundItem?.value;
  }

  @Method()
  async setValueByIndex(index: number): Promise<boolean> {
    const enabledItems = this.getEnabledItems();
    const foundItem = enabledItems.filter((item) => item.index === index)[0];
    if (foundItem && foundItem.value) {
      this.value = foundItem.value;
      return true;
    }
    return false;
  }

  /*********************************
  LISTEN
  *********************************/
  @Listen("itemSelected")
  itemSelectedHandler(event: CustomEvent<ItemInformation>): void {
    this.value = event.detail.value;
    this.inputText.focus();
  }

  @Listen("itemDidLoad")
  itemDidLoadHandler(): void {
    this.setup();
  }

  @Listen("keyDownComboItem")
  keyDownComboItemHandler(event): void {
    event.stopPropagation();
    if (event.detail === "ArrowUp") {
      ((this.inputText as unknown) as HTMLElement).focus();
    } else if (event.detail === "Tab" || event.detail === "Escape") {
      this.listIsOpen = false;
      ((this.inputText as unknown) as HTMLElement).focus();
    }
  }

  /*********************************
  HANDLERS
  *********************************/

  private inputHandler = (e): void => {
    this.userTyped = true;
    const value = this.sanitizeString(e.detail);
    const filteredItems = this.filterList(value);
    if (!this.strict) {
      this.value = value;
    } else if (filteredItems.length === 1) {
      /*on strict mode, only set value if there is an exact match*/
      this.value = filteredItems[0].value;
    }
  };

  private keyDownHandler = (e: KeyboardEvent): void => {
    let newItem: HTMLGxgComboBoxItemElement;
    if (e.code === ARROW_DOWN) {
      newItem = this.getNewItem("next");
      newItem?.value && (this.value = newItem?.value);
      e.altKey && this.showList();
    } else if (e.code === ARROW_UP) {
      newItem = this.getNewItem("prev");
      newItem?.value && (this.value = newItem?.value);
    } else if (e.code === ENTER) {
      this.hideList();
    } else if (e.code === SPACE) {
      /*handled by inputHandler*/
    } else if (e.code === ESCAPE) {
      this.hideList();
    } else if (e.code === TAB && this.showList) {
      this.hideList();
    }
  };

  /*********************************
  WATCH
  *********************************/

  @Watch("value")
  onValueChanged(newValue: ComboBoxItemValue): void {
    console.log("newValue", newValue);
    this.clearSelectedItem();
    let value;
    let newItem: HTMLGxgComboBoxItemElement = undefined;
    if (this.userTyped) {
      value = this.getValueByText(newValue);
    } else {
      this.showAllItems();
      value = newValue;
    }
    newItem = this.getItemByValue(value);
    if (newItem) {
      this.setSelectedItem(newItem);
      this.setIcon(newItem.icon);
      newItem?.textContent && (this.text = newItem.textContent);
    } else {
      //this.setIcon(undefined);
      if (this.strict) {
        this.text = undefined;
        this.value = undefined;
      } else {
        if (!this.userTyped) {
          this.text = undefined;
        }
      }
    }
    this.userTyped = false;
  }

  @Watch("listIsOpen")
  listIsOpenHandler(newValue: boolean): void {
    if (newValue) {
      document.addEventListener("click", this.detectClickOutsideCombo, true);
      document.addEventListener("scroll", this.detectMouseScroll, true);

      //Reposition .items-container, since it has fixed position
      this.repositionItemsContainer();
    } else {
      document.removeEventListener("click", this.detectClickOutsideCombo, true);
      document.removeEventListener("scroll", this.detectMouseScroll, true);
    }
  }

  @Watch("selectedItem")
  selectedItemHandler(newItem: HTMLGxgComboBoxItemElement): void {
    newItem && (newItem.selected = true);
  }

  /*********************************
  PRIVATE METHODS
  *********************************/

  private filterList = (text: string): HTMLGxgComboBoxItemElement[] => {
    text = this.sanitizeString(text);
    !this.caseSensitive && (text = text.toLowerCase());
    const enabledItems = this.getEnabledItems();
    const filteredItems: HTMLGxgComboBoxItemElement[] = [];
    if (enabledItems.length) {
      enabledItems.forEach((item) => {
        const itemText = !this.caseSensitive
          ? item.textContent.toLocaleLowerCase()
          : item.textContent;
        if (!item.disabled && itemText.includes(text)) {
          filteredItems.push(item);
          item.hidden = false;
        } else {
          item.hidden = true;
        }
      });
    }
    if (filteredItems.length >= 1) {
      this.showList();
    } else {
      this.hideList();
    }
    return filteredItems;
  };

  private showAllItems = () => {
    const enabledItems = this.getEnabledItems();
    enabledItems?.forEach((item) => {
      item?.hidden && (item.hidden = false);
    });
  };

  private cleanup = () => {
    this.myObserver.unobserve(document.body);
    document.removeEventListener("click", this.detectClickOutsideCombo, true);
    document.removeEventListener("scroll", this.detectMouseScroll, true);
  };

  private setup = () => {
    this.setIndexes();
    this.onValueChanged(this.value);
  };

  private setIndexes = (): void => {
    const allItems = this.getAllItems();
    allItems.forEach((item, i) => {
      item.index = i;
    });
  };

  private getEnabledItems = (): HTMLGxgComboBoxItemElement[] => {
    const enabledItems: HTMLGxgComboBoxItemElement[] = [];
    const allItems: HTMLGxgComboBoxItemElement[] = this.getAllItems();
    allItems.forEach((item) => {
      !item.disabled && enabledItems.push(item);
    });
    return enabledItems;
  };

  private getFilteredItems = (): HTMLGxgComboBoxItemElement[] => {
    const enabledItems: HTMLGxgComboBoxItemElement[] = this.getEnabledItems();
    const filteredItems: HTMLGxgComboBoxItemElement[] = [];
    enabledItems.forEach((item) => {
      !item.hidden && filteredItems.push(item);
    });
    return filteredItems;
  };

  private getAllItems = (): HTMLGxgComboBoxItemElement[] => {
    const allItems: HTMLGxgComboBoxItemElement[] = [];
    const allItemsNodeList = this.el.querySelectorAll("gxg-combo-box-item");
    allItemsNodeList.forEach((item) => {
      allItems.push(item as HTMLGxgComboBoxItemElement);
    });
    return allItems;
  };

  private getItemByValue = (
    value: ComboBoxItemValue
  ): HTMLGxgComboBoxItemElement => {
    let item: HTMLGxgComboBoxItemElement;
    if (value) {
      const enabledItems: HTMLGxgComboBoxItemElement[] = this.getEnabledItems();
      item = enabledItems.find((item) => {
        return !item.disabled && item?.value && item.value === value;
      });
    }
    return item;
  };

  private getItemByText = (text: string): HTMLGxgComboBoxItemElement => {
    text = !this.caseSensitive && text.toLocaleLowerCase();
    let item: HTMLGxgComboBoxItemElement;
    if (text) {
      const enabledItems: HTMLGxgComboBoxItemElement[] = this.getEnabledItems();
      item = enabledItems.find((item) => {
        const textContent = !this.caseSensitive
          ? item.textContent.toLocaleLowerCase()
          : item.textContent;
        return !item.disabled && textContent === text;
      });
    }
    return item;
  };

  private clearSelectedItem = () => {
    const enabledItems = this.getEnabledItems();
    enabledItems?.forEach((item) => {
      item.selected && (item.selected = false);
    });
    this.selectedItem = undefined;
    this.clearIcon();
  };

  private getItemByIndex = (index: number): HTMLGxgComboBoxItemElement => {
    let item: HTMLGxgComboBoxItemElement;
    if (index >= 0) {
      item = this.getEnabledItems()[index];
    }
    return item;
  };

  private getValueByItem = (
    item: HTMLGxgComboBoxItemElement
  ): ComboBoxItemValue => {
    return item?.value;
  };

  private getValueByText = (text: string): ComboBoxItemValue => {
    !this.caseSensitive && (text = text.toLowerCase());
    const enabledItems = this.getEnabledItems();
    const item = enabledItems?.find((item) => {
      const itemText = !this.caseSensitive
        ? item.textContent.toLocaleLowerCase()
        : item.textContent;
      return !item.disabled && itemText === text;
    });
    return item?.value;
  };

  private getNewItem = (
    direction: "prev" | "next"
  ): HTMLGxgComboBoxItemElement => {
    const filteredItems = this.getFilteredItems();
    const indexInFiltered = filteredItems?.findIndex((item) => {
      return item === this.selectedItem;
    });
    if (direction === "next") {
      if (indexInFiltered === -1) {
        /*no selectedItem at the time*/
        return filteredItems[0];
      }
      return filteredItems[indexInFiltered + 1];
    } else if (direction === "prev") {
      if (indexInFiltered !== -1) {
        return filteredItems[indexInFiltered - 1];
      }
    }
  };

  private setSelectedItem = (item: HTMLGxgComboBoxItemElement): boolean => {
    if (item) {
      this.selectedItem && (this.selectedItem.selected = false);
      item.selected = true;
      this.selectedItem = item;
      return true;
    }
    return false;
  };

  private sanitizeString = (value: string) => {
    if (typeof value === "string") {
      return value.replace(/\s+/g, " ").trim();
    }
    return value;
  };

  private toggleListButtonClickHandler = (): void => {
    this.showAllItems();
    this.toggleList();
    this.focus();
  };

  private inputTextClickHandler = (e): void => {
    this.disableFilter && this.toggleList();
  };

  private toggleList = (): void => {
    this.listIsOpen = !this.listIsOpen;
  };

  private showList = (): void => {
    this.listIsOpen = true;
  };

  private hideList = (): void => {
    this.listIsOpen = false;
  };

  private clearIcon = (): void => {
    this.inputTextIcon = null;
    this.inputTextIconPosition = null;
  };

  setIcon(icon: string): void {
    if (icon) {
      this.inputTextIcon = icon;
      this.inputTextIconPosition = "start";
    } else {
      this.inputTextIcon = null;
      this.inputTextIconPosition = null;
    }
  }

  focus(): void {
    ((this.inputText as unknown) as HTMLElement).focus();
  }

  detectClickOutsideComboFunc(event): void {
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
      this.listIsOpen = false;
      //Click happened outside the combo
    }
  }

  detectMouseScrollFunc(): void {
    this.listIsOpen = false;
  }

  clearCombo(): void {
    this.value = undefined;
    this.listIsOpen = true;
    this.focus();
  }

  resizeObserver(): void {
    this.myObserver = new ResizeObserver((entries) => {
      entries.forEach(() => {
        this.repositionItemsContainer();
      });
    });
    this.myObserver.observe(document.body);
    this.myObserver.observe(this.el);
  }

  repositionItemsContainer(): void {
    //redefine .main-container width
    const gxgComboWidth = this.el.clientWidth;
    this.itemsContainer.style.width = gxgComboWidth + "px";
    //redefine .items-container "top" value
    const gxgComboTextInput = (this
      .inputText as HTMLGxgFormTextElement).getBoundingClientRect();
    const gxgComboTextInputY = gxgComboTextInput.y;
    const gxgComboTextInputHeight = gxgComboTextInput.height;
    this.itemsContainer.style.top =
      gxgComboTextInputY + gxgComboTextInputHeight + "px";
  }

  itemsContainerBottomOverflows(): boolean {
    const viewportHeight = window.innerHeight;
    const comboBottom = this.el.getBoundingClientRect().bottom;
    const itemsContainerHeight = this.itemsContainer.clientHeight;
    const result = comboBottom + itemsContainerHeight;

    const itOverflows = true ? result > viewportHeight : false;
    return itOverflows;
  }

  render(): void {
    const clearIcon = this.value && !this.disableFilter && !this.disableClear;
    return (
      <Host
        class={{
          "gxg-combo-box--disabled": this.disableFilter,
          large: state.large,
        }}
      >
        <div
          class={{ "main-container": true }}
          ref={(el) => (this.mainContainer = el as HTMLDivElement)}
        >
          {this.label ? (
            <gxg-label class="label">{this.label}</gxg-label>
          ) : null}
          <div class={{ "search-container": true }}>
            <gxg-form-text
              placeholder={this.placeholder}
              onInput={this.inputHandler.bind(this)}
              onKeyDown={this.keyDownHandler}
              onClick={this.inputTextClickHandler}
              value={this.text}
              icon={this.inputTextIcon}
              iconPosition={this.inputTextIconPosition}
              readonly={this.disableFilter}
              ref={(el) => (this.inputText = el as HTMLGxgFormTextElement)}
              displayValidationStyles={this.displayValidationStyles}
              validationStatus={this.validationStatus}
              disabled={this.disabled}
              class={{ "clear-icon": clearIcon }}
            ></gxg-form-text>
            <div class="buttons-wrapper">
              {clearIcon ? (
                <gxg-button
                  class={{ "button-icon delete-icon": true }}
                  icon="menus/delete"
                  type="tertiary"
                  onClick={() => this.clearCombo()}
                  tabindex="-1"
                  fit
                  disabled={this.disabled}
                ></gxg-button>
              ) : null}

              <gxg-button
                class={{ "button-icon": true }}
                icon="navigation/arrow-down"
                type="secondary-icon-only"
                onClick={this.toggleListButtonClickHandler}
                fit
                disabled={this.disabled}
                tabindex="-1"
              ></gxg-button>
            </div>
          </div>

          <div
            class={{
              "items-container": true,
              "items-container--show": this.listIsOpen,
              "items-container--no-match": this.noMatch,
              "items-container--below": this.listPosition === "below",
              "items-container--above": this.listPosition === "above",
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
        </div>
        {this.formMessageLogic(this)}
      </Host>
    );
  }
}

export type ListPosition = "above" | "below";
