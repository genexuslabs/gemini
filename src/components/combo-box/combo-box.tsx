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
  GxgComboBoxItem,
  ComboBoxItemValue,
} from "../combo-box-item/combo-box-item";
import { IconPosition } from "../form-text/form-text";
import { formMessageLogic } from "../../common/form";
import { FormComponent } from "../../common/interfaces";
import state from "../store";

const ARROW_DOWN = "ArrowDown";
const ARROW_UP = "ArrowUp";
const SELECT = "Select";
const ENTER = "Enter";
@Component({
  tag: "gxg-combo-box",
  styleUrl: "combo-box.scss",
  shadow: { delegatesFocus: true },
})
export class GxgComboBox implements FormComponent {
  @Event() keyDown: EventEmitter<string>;

  gxgFormText!: HTMLGxgFormTextElement;

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
   * The actual selected combo box item
   */
  private selectedItem: HTMLGxgComboBoxItemElement;

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
   * The container 'items container' position
   */
  @Prop() listPosition: ListPosition = "below";

  /**
   * This property returns true if the combo-box list is open, false otherwise.
   * Do not use this property to open or close the combo-box list, for that purpose use the open() or close() methods.
   */
  @Prop({ mutable: true }) isOpen = false;

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

  formMessageLogic = formMessageLogic;

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
  @State() myObserver = null;

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
    // this.lastSetValueByUser = this.value;
    // if (this.value !== undefined) {
    //   this.tryToSetItem(this.value);
    // }
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
    this.showItems = true;
  }

  @Method()
  async close(): Promise<void> {
    this.showItems = false;
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
  itemSelectedHandler(event): void {
    //this.selectionProgramatic = false;
    // this.value = event.detail.value;
    // this.clearIconsColor();
  }

  @Listen("itemDidLoad")
  itemDidLoadHandler(event): void {
    console.log(event);
  }

  @Listen("keyDownComboItem")
  keyDownComboItemHandler(event): void {
    event.stopPropagation();
    if (event.detail === "ArrowUp") {
      ((this.gxgFormText as unknown) as HTMLElement).focus();
    } else if (event.detail === "Tab" || event.detail === "Escape") {
      this.showItems = false;
      ((this.gxgFormText as unknown) as HTMLElement).focus();
    }
  }

  /*********************************
  HANDLERS
  *********************************/

  private inputHandler = (e): void => {
    console.log("input handler");
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
  };

  private keyDownHandler = (e: KeyboardEvent): void => {
    let newItem: HTMLGxgComboBoxItemElement;
    if (e.code === ARROW_DOWN) {
      newItem = this.getNewItem("next");
    } else if (e.code === ARROW_UP) {
      newItem = this.getNewItem("prev");
    }
    newItem?.value && (this.value = newItem?.value);
  };

  /*********************************
  WATCH
  *********************************/

  @Watch("value")
  onValueChanged(newValue: ComboBoxItemValue): void {
    const newItem = this.getItemByValue(newValue);
    newItem && this.setSelectedItem(newItem);
  }

  @Watch("showItems")
  onShowItemsChanged(newValue: boolean): void {
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

  /*********************************
  PRIVATE METHODS
  *********************************/

  private cleanup = () => {
    this.myObserver.unobserve(document.body);
    document.removeEventListener("click", this.detectClickOutsideCombo, true);
    document.removeEventListener("scroll", this.detectMouseScroll, true);
  };

  private setup = () => {
    this.setIndexes();
    this.value && (this.selectedItem = this.getItemByValue(this.value));
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

  private getNewItem = (
    direction: "prev" | "next"
  ): HTMLGxgComboBoxItemElement => {
    if (direction === "next") {
      if (!this.selectedItem) {
        return this.getEnabledItems()[0];
      }
      return this.getItemByIndex(this.selectedItem?.index + 1);
    } else if (direction === "prev") {
      return this.getItemByIndex(this.selectedItem?.index - 1);
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

  // updateSelectedItem(item: GxgComboBoxItem): void {
  //   this.clearSelectedItem();
  //   this.clearExactMatch();
  //   this.clearHiddenItems();

  //   //set icon
  //   if (item.icon) {
  //     this.setIcon(item.icon);
  //     item.iconColor = "negative";
  //   } else {
  //     this.clearIcon();
  //   }

  //   //set description
  //   const itemDescription = ((item as unknown) as HTMLElement).innerText;
  //   if (itemDescription) {
  //     this.inputTextValue = itemDescription;
  //   } else {
  //     this.inputTextValue = " ";
  //   }

  //   //set item as selected
  //   ((item as unknown) as HTMLElement).classList.add("selected");

  //   this.showItems = false;
  //   if (!this.selectionProgramatic) {
  //     this.focus();
  //     this.selectionProgramatic = false;
  //   }
  // }

  onKeyDownGxgButtonArrowDown(e): void {
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

  setIcon(icon: string): void {
    this.inputTextIcon = icon;
    this.inputTextIconPosition = "start";
  }

  clearIcon(): void {
    this.inputTextIcon = null;
    this.inputTextIconPosition = null;
  }

  focus(): void {
    ((this.gxgFormText as unknown) as HTMLElement).focus();
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
      this.showItems = false;
      //Click happened outside the combo
    }
  }

  detectMouseScrollFunc(): void {
    this.showItems = false;
  }

  clearCombo(): void {
    this.value = undefined;
    this.showItems = true;
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
      .gxgFormText as HTMLGxgFormTextElement).getBoundingClientRect();
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
    const clearIcon =
      this.inputTextValue !== "" && !this.disableFilter && !this.disableClear;
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
              onKeyDown={this.keyDownHandler.bind(this)}
              onClick={() => this.toggleItems()}
              value={this.value}
              id="gxgFormText"
              icon={this.inputTextIcon}
              iconPosition={this.inputTextIconPosition}
              readonly={this.disableFilter}
              ref={(el) => (this.gxgFormText = el as HTMLGxgFormTextElement)}
              displayValidationStyles={this.displayValidationStyles}
              validationStatus={this.validationStatus}
              disabled={this.disabled}
              class={{ "clear-icon": clearIcon }}
            ></gxg-form-text>
            <div class="buttons-wrapper">
              {this.inputTextValue !== "" &&
              !this.disableFilter &&
              !this.disableClear ? (
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
                onClick={() => this.toggleItems()}
                onKeyDown={this.onKeyDownGxgButtonArrowDown.bind(this)}
                tabindex="-1"
                fit
                disabled={this.disabled}
              ></gxg-button>
            </div>
          </div>

          <div
            class={{
              "items-container": true,
              "items-container--show": this.showItems,
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
