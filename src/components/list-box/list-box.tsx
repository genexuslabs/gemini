import {
  Component,
  Host,
  h,
  Prop,
  Element,
  Event,
  EventEmitter,
  Listen,
  State,
  Method,
  Watch
} from "@stencil/core";
import { formMessageLogic } from "../../common/form";
import { FormComponent } from "../../common/interfaces";
import { formClasses } from "../../common/classesNames";
import { commonClassesNames } from "../../common/classesNames";
import { repositionScroll } from "../../common/reposition-scroll";
import { KeyboardKeys as KK } from "../../common/types";
import state from "../store";
import { ItemClicked, ItemChecked } from "../list-box-item/list-box-item";
import { ValidationStatus } from "../../common/types";

@Component({
  tag: "gxg-list-box",
  styleUrl: "list-box.scss",
  shadow: true
})
export class GxgListBox implements FormComponent {
  /**
   * This event emits the items that are currently selected. event.detail contains the selected items as objects. Each object contains the item idex and the item value. If value was not provided, the value will be the item innerText.
   */
  @Event() selectionChanged: EventEmitter<SelectionChangedEvent>;
  @Event() checkedChanged: EventEmitter;
  @Element() el: HTMLElement;
  header!: HTMLElement;
  main!: HTMLElement;
  containerEl!: HTMLDivElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * The listbox title that appears on the header
   */
  @Prop() theTitle: string;

  /**
   * The presence of this attribute will display a checkbox for every item
   */
  @Prop() checkboxes = false;

  /**
   * The presence of this attribute will deactivate multi-selection
   */
  @Prop() singleSelection = false;

  /**
   * The presence of this attribute allows the list-box to not have any list-box-item selected
   */
  @Prop() allowsEmpty = false;

  /**
   * The presence of this attribute prevents 'selectionChanged' event from being emitted if the selection is empty.
   */
  @Prop() emitEmptySelection = false;

  /**
   * An object with suggestions about the possible keyboard combinations
   */
  @Prop() keyboardSuggestions: KeyboardSuggestions = {
    checkCheckbox: "to check a checkbox press (shift + space)",
    uncheckCheckbox: "to uncheck a checkbox press (shift + ctrl + space)"
  };

  /**
   * Disable suggestions about keyboard combinations
   */
  @Prop() disableSuggestions = false;

  /*BORDERS*/

  /**
   * The presence of this attribute disables the border all around
   */
  @Prop({ reflect: true }) noBorder = false;

  /**
   * The presence of this attribute adds a border to the top
   */
  @Prop({ reflect: true }) borderTop = false;

  /**
   * The presence of this attribute adds a border to the end
   */
  @Prop({ reflect: true }) borderEnd = false;

  /**
   * The presence of this attribute adds a border to the bottom
   */
  @Prop({ reflect: true }) borderBottom = false;

  /**
   * The presence of this attribute adds a border to the start
   */
  @Prop({ reflect: true }) borderStart = false;

  /**
   * this variable keeps an array of the selected items.
   */
  @State() selectedItems: ItemsInformation[] = [];

  /**
   * this variable keeps an array of the items with checked checkboxes.
   */
  @State() checkedItems: ItemsInformation[] = [];

  /**
   * Hides the keyboard suggestions
   */
  @State() hideKeyboardSuggestions = true;

  /**
   * This is needed to evaluate if keyboard suggestions should be displayed.
   */
  private userUsedKeyboard = false;

  @State() headerHeight = 0;

  private activeItem: HTMLGxgListBoxItemElement;
  private selectedItemsState: string[] = [];

  /*********************************
  PROPERTIES FOR VALIDATION 
  *********************************/

  /**
   * The presence of this attribute makes the component disabled
   */
  @Prop() disabled = false;

  /*VALIDATION*/

  formMessageLogic = formMessageLogic;

  /**
   * Make the radio-buttons required
   */
  @Prop() required = false;

  /**
   * The validation status
   *
   */
  @Prop({ mutable: true }) validationStatus: ValidationStatus = "indeterminate";

  /**
   * The required message if this input is required and no value is provided (optional). If this is not provided, the default browser required message will show up
   *
   */
  @Prop({ mutable: true }) validationMessage: string;

  /**
   * An informative message to help the user filling the information
   *
   */
  @Prop() informationMessage: string;

  /*********************************
  METHODS
  *********************************/

  @Method()
  async getSelectedItems(): Promise<ItemsInformation[]> {
    const selectedItems: HTMLGxgListBoxItemElement[] =
      this.getSelectedItemsFunc();
    const selectedItemsInformation: ItemsInformation[] = [];
    selectedItems.forEach(selectedItem => {
      selectedItemsInformation.push({
        active: selectedItem.active,
        selected: selectedItem.selected,
        checked: selectedItem.checked,
        index: selectedItem.index,
        value: selectedItem.value || selectedItem.textContent
      });
    });
    return selectedItemsInformation;
  }

  componentDidRender(): void {
    if (this.theTitle) {
      this.headerHeight = this.header.clientHeight;
    }
  }

  componentDidLoad(): void {
    //this.setInitialActive();
  }

  private setIndexes = () => {
    const allItems = this.getAllItems();
    allItems.forEach((item, i) => {
      item.index = i;
    });
  };

  private initialSetup = () => {
    const enabledItems: HTMLGxgListBoxItemElement[] = this.getEnabledItems();
    const selectedItemsLength = this.selectedItemsLength();
    //1. Select item if allowsEmpty is false and no item is currently selected
    const selectItem = !this.allowsEmpty && selectedItemsLength === 0;
    if (selectItem) {
      const firstDeselectedItem = enabledItems.find(item => {
        return !item.selected;
      });
      firstDeselectedItem && (firstDeselectedItem.selected = true);
    } else if (this.singleSelection && selectedItemsLength > 1) {
      //Only one item can be selected. Unselect every selected items, except the first one.
      const selectedItems = this.getSelectedItemsFunc();
      selectedItems.forEach((selectedItem: HTMLGxgListBoxItemElement, i) => {
        if (i !== 0) {
          selectedItem.selected = false;
        }
      });
    }
    //2. Set active item, if not active item exists yet
    const currentActiveItem = this.getActiveItem();
    if (!currentActiveItem) {
      const firstEnabledItem = this.getEnabledItems()[0];
      if (firstEnabledItem) {
        firstEnabledItem.active = true;
        this.activeItem = firstEnabledItem;
      }
    }
    //3. Set index on every item
    this.setIndexes();
    //4. disable items
    if (this.disabled) {
      this.disabledHandler(true);
    }
    //5. set checkboxes
    if (this.checkboxes) {
      const allItems = this.getAllItems();
      allItems.forEach(item => {
        item.checkbox = true;
      });
    }
  };

  @Listen("checkboxClicked")
  checkboxClickedHandler(): void {
    this.containerEl.focus();
  }

  @Listen("itemLoaded")
  itemLoadedHandler(): void {
    this.initialSetup();
    this.updateSelectedItems();
  }

  @Listen("itemClicked")
  itemClickedHandler(event: ItemClicked): void {
    const { clickedItem, ctrlKey, cmdKey, shiftKey, index } = event["detail"];
    if (this.singleSelection) {
      this.setActiveItem(clickedItem);
    }
    this.containerEl.focus();
    //this.clearActiveItem();
    if (this.singleSelection) {
      if (
        (clickedItem as HTMLGxgListBoxItemElement).selected &&
        !this.allowsEmpty
      ) {
        /*same item. do nothing.*/
        return;
      }
      if (this.allowsEmpty && (ctrlKey || cmdKey)) {
        this.unselectItems(clickedItem);
      } else {
        this.clearHighlightedItems();
        this.clearSelectedItems();
        this.selectItems(clickedItem);
        this.highlightItem(clickedItem);
      }
    } else {
      /*multiple-selection allowed*/
      if (shiftKey || (!cmdKey && !cmdKey)) {
        this.clearHighlightedItems();
        this.clearSelectedItems();
      }
      if (shiftKey) {
        if (this.activeItem === clickedItem) return;

        let fromIndex: number;
        const toIndex: number = index;
        if (this.activeItem) {
          const activeItemIndex = this.getIndexByElement(this.activeItem);
          if (index === activeItemIndex) {
            return;
          }
          fromIndex = activeItemIndex;
        } else {
          fromIndex = 0;
        }
        this.selectMultipleItems(fromIndex, toIndex);
      } else if (ctrlKey || cmdKey) {
        if (
          !this.allowsEmpty &&
          this.selectedItemsLength() === 1 &&
          (clickedItem as HTMLGxgListBoxItemElement).selected
        ) {
          return;
        }
        this.unhighlightItem(this.activeItem);
        this.toggleItem(clickedItem);
        this.highlightItem(clickedItem);
      } else {
        this.selectItems(clickedItem);
        this.highlightItem(clickedItem);
      }
    }
    this.setActiveItem(clickedItem);
    this.evaluateSelectedItems();
  }

  @Watch("selectedItems")
  selectedItemsHandler(newArray: ItemsInformation[]): void {
    this.selectionChanged.emit({ items: newArray });
  }
  @Watch("checkedItems")
  checkedItemsHandler(newArray: Array<ItemsInformation>): void {
    this.checkedChanged.emit(newArray);
  }
  @Watch("disabled")
  disabledHandler(disabled: boolean): void {
    if (disabled) {
      const enabledItems = this.getEnabledItems();
      enabledItems?.forEach(item => {
        item.disabled = true;
      });
    } else {
      const disabledItems = this.getDisabledItems();
      disabledItems?.forEach(item => {
        item.disabled = false;
      });
    }
  }

  @Watch("hideKeyboardSuggestions")
  hideKeyboardSuggestionsHandler(newValue: boolean, oldValue: boolean): void {
    newValue === true &&
      oldValue === false &&
      localStorage.setItem("gxg-list-box-hide-keyboard-suggestions", "true");
  }

  @Listen("itemSelected")
  itemSelectedHandler(): void {
    this.setSiblingSelected();
  }

  @Listen("checkboxStateChanged")
  checkboxStateChangedHandler(e: CustomEvent<ItemChecked>): void {
    const checkedItemEl = e.detail.checkedItem;
    const checkedItemValue = e.detail.checked;
    /*Update checkboxes array*/
    const checkedItemsArray: ItemsInformation[] = [];
    const enabledItems: HTMLGxgListBoxItemElement[] = this.getEnabledItems();
    if (enabledItems?.length) {
      enabledItems.forEach(enabledItem => {
        let item: HTMLGxgListBoxItemElement;
        if (enabledItem === checkedItemEl) {
          item = checkedItemEl;
        } else {
          item = enabledItem;
        }
        const checked =
          enabledItem === checkedItemEl ? checkedItemValue : item.checked;
        if (item && checked) {
          checkedItemsArray.push({
            active: item.active,
            selected: item.selected,
            checked: checked,
            index: item.index,
            value: item.value || item.textContent
          });
        }
      });
      this.checkedItems = checkedItemsArray;
    }

    /*Local Storage*/
    const localStorageExists = localStorage.getItem(
      "gxg-list-box-hide-keyboard-suggestions"
    );
    if (
      !localStorageExists &&
      !this.disableSuggestions &&
      this.userUsedKeyboard
    ) {
      // this.hideKeyboardSuggestions = false;
    }
  }

  handleKeyDown = (e: KeyboardEvent): void => {
    this.userUsedKeyboard = true;
    const ctrlKey = e.ctrlKey;
    const cmdKey = e.metaKey;
    const shiftKey = e.shiftKey;
    //const activeItemIndex = this.getIndexByElement(this.activeItem);
    if (
      e.code === "ArrowDown" ||
      e.code === "ArrowUp" ||
      e.code === "Space" ||
      e.code === "Backspace" ||
      e.code === "Delete" ||
      e.code === "KeyA"
    ) {
      e.preventDefault();
    }

    if (e.code === "ArrowDown" || e.code === "ArrowUp") {
      this.handleArrow(e.code, shiftKey);
    } else if (e.code === "Space") {
      if (shiftKey && ctrlKey) {
        /*uncheck checkbox*/
        // const changedLength = this.setCheckboxState(
        //   this.getHighlightedItems(),
        //   false
        // );
        //changedLength > 0 && (this.hideKeyboardSuggestions = true);
      } else if (shiftKey && (!ctrlKey || !cmdKey)) {
        // const changedLength = this.setCheckboxState(
        //   this.getHighlightedItems(),
        //   true
        // );
        // changedLength > 0 && (this.hideKeyboardSuggestions = true);
      } else if (
        !shiftKey &&
        (ctrlKey || cmdKey) &&
        this.selectedItemsLength() >= 1
      ) {
        this.unselectHighlightedItems(true);
      } else if (!ctrlKey && !cmdKey) {
        if (this.singleSelection) {
          if (this.activeItem === this.getSelectedItemsFunc()[0]) {
            return;
          }
          this.clearSelectedItems();
          this.selectItems(this.activeItem);
        } else {
          /*multi-select allowed*/
          if (ctrlKey || cmdKey) {
            this.clearHighlightedItems();
          } else {
            this.selectItems(this.activeItem);
            //this.selectHighlightedItems();
          }
        }
      }
      const selectedItems = this.getSelectedItemsFunc();
      if (!ctrlKey || !cmdKey) {
        selectedItems.forEach(item => {
          item.checked = true;
        });
      } else {
        selectedItems.forEach(item => {
          item.checked = false;
        });
      }
    } else if (
      e.code === "KeyA" &&
      (ctrlKey || cmdKey) &&
      !this.singleSelection
    ) {
      /*highlight all*/
      this.highlightAll();
    } else if (e.code === "Delete" || e.code === "Backspace") {
      /*Deselect highlighted items*/
      this.unselectHighlightedItems();
    }
    //this.evaluateSelectedItems();
  };

  handleArrow = (direction: HandleArrow, shiftKey: boolean): void => {
    /*Get the next element*/
    let newElement: HTMLGxgListBoxItemElement;
    const activeElement = this.getActiveItem();
    newElement =
      direction === "ArrowDown"
        ? (newElement = this.getNextItem(activeElement))
        : (newElement = this.getPrevItem(activeElement));
    /*Handle*/
    if (newElement) {
      this.singleSelection &&
        !this.allowsEmpty &&
        newElement !== this.getSelectedItemsFunc()[0] &&
        this.clearSelectedItems();
      if (shiftKey && !this.singleSelection) {
        !this.activeItem.selected && this.selectItems(this.activeItem);
        !newElement.selected && this.selectItems(newElement);
      }
      this.unhighlightAll();
      this.setActiveItem(newElement);
      this.highlightItem(newElement);
      if (shiftKey && !this.singleSelection) {
        //this.selectItems(this.activeItem);
      }
      if (
        (this.singleSelection || (!this.singleSelection && shiftKey)) &&
        !newElement.selected &&
        !this.allowsEmpty
      ) {
        this.selectItems(newElement);
      } else if (this.singleSelection) {
      }
      repositionScroll(this.main, newElement, direction);
    }
  };

  /* SELECTED */

  private setSiblingSelected = async () => {
    const allItems: HTMLGxgListBoxItemElement[] = this.getAllItems();
    allItems.forEach((item, i) => {
      if (i === allItems.length - 1) {
        item.siblingIsSelected = false;
      } else {
        if (allItems[i + 1].selected) {
          item.siblingIsSelected = true;
        } else {
          item.siblingIsSelected = false;
        }
      }
    });
  };

  clearSelectedItems(ignoreHighlighted = false): void {
    const actualSelectedItems = ignoreHighlighted
      ? this.el.querySelectorAll(
          "gxg-list-box-item[selected]:not([highlighted])"
        )
      : this.el.querySelectorAll("gxg-list-box-item[selected]");
    if (actualSelectedItems.length > 0) {
      actualSelectedItems.forEach(item => {
        this.unselectItems(item as HTMLGxgListBoxItemElement);
      });
    }
  }

  selectedItemsLength = (): number => {
    return this.getSelectedItemsFunc().length;
  };

  getSelectedItemsFunc(): HTMLGxgListBoxItemElement[] {
    const selectedItemsArray: HTMLGxgListBoxItemElement[] = [];
    const enabledItems: HTMLGxgListBoxItemElement[] = this.getAllItems();
    if (enabledItems?.length) {
      enabledItems.forEach(item => {
        item.selected && selectedItemsArray.push(item);
      });
    }
    return selectedItemsArray;
  }

  /* HIGHLIGHTED */

  highlightItem(item: HTMLGxgListBoxItemElement, doNotActivate = false): void {
    if (item) {
      this.singleSelection && this.clearHighlightedItems();
      item.highlighted = true;
      !doNotActivate && (this.activeItem = item);
    }
  }

  unhighlightItem(item: HTMLGxgListBoxItemElement): void {
    if (item) {
      item.highlighted = false;
    }
  }

  unhighlightAll(ignoreActiveItem = false): number {
    const enabledItems: HTMLGxgListBoxItemElement[] = this.getEnabledItems();
    if (enabledItems?.length) {
      enabledItems.forEach(item => {
        ignoreActiveItem && item === this.activeItem
          ? null
          : (item.highlighted = false);
      });
      return enabledItems.length;
    }
    return 0;
  }

  toggleHighlightedItems(): void {
    const highlightedItems = this.getHighlightedItems();
    highlightedItems.forEach(item => {
      this.toggleItem(item);
    });
  }

  selectHighlightedItems(): number {
    const selectedItems: number = this.selectItems(this.getHighlightedItems());
    return selectedItems;
  }

  unselectHighlightedItems(spacePressed: boolean = false): number {
    const length = this.unselectItems(this.getHighlightedItems(), spacePressed);
    return length;
  }

  clearHighlightedItems(): void {
    const enabledItems = this.getEnabledItems();
    if (enabledItems?.length) {
      enabledItems.forEach(item => {
        item.highlighted && this.unhighlightItem(item);
      });
    }
  }

  getHighlightedItems(): HTMLGxgListBoxItemElement[] {
    const highlightedItemsArray: HTMLGxgListBoxItemElement[] = [];
    const enabledItems = this.getEnabledItems();
    if (enabledItems?.length) {
      enabledItems.forEach(item => {
        item.highlighted && highlightedItemsArray.push(item);
      });
    }
    return highlightedItemsArray;
  }

  getHighlightedItemsLength(): number {
    return this.getHighlightedItems().length;
  }

  highlightAll(): number {
    let highlightedItemsLength = 0;
    const enabledItems: HTMLGxgListBoxItemElement[] = this.getEnabledItems();
    if (enabledItems?.length) {
      enabledItems.forEach(item => {
        this.highlightItem(item, true);
        highlightedItemsLength++;
      });
    }
    return highlightedItemsLength;
  }

  /* INDEX */

  getItemByIndex(index: number): HTMLGxgListBoxItemElement {
    const enabledItems: HTMLGxgListBoxItemElement[] = this.getEnabledItems();
    let itemByIndex;
    if (enabledItems?.length) {
      itemByIndex = enabledItems.find(item => item.index === index);
    }
    return itemByIndex;
  }

  getIndexByElement = (el: HTMLGxgListBoxItemElement): number => {
    let index;
    const enabledItems = this.getEnabledItems();
    if (enabledItems?.length) {
      const element = enabledItems.find(item => item === el);
      element && (index = element.index);
    }
    return index;
  };

  /* PREV/NEXT */

  getNextItem(
    currentActive: HTMLGxgListBoxItemElement
  ): HTMLGxgListBoxItemElement {
    const enabledItems = this.getEnabledItems();
    const enabledActiveItemIndex = enabledItems.findIndex(enabledItem => {
      return enabledItem === currentActive;
    });
    //If is the last item, do nothing
    if (enabledActiveItemIndex === enabledItems.length - 1) {
      return null;
    } else {
      return enabledItems[enabledActiveItemIndex + 1];
    }
  }

  getPrevItem(
    currentActive: HTMLGxgListBoxItemElement
  ): HTMLGxgListBoxItemElement {
    const enabledItems = this.getEnabledItems();
    const enabledActiveItemIndex = enabledItems.findIndex(enabledItem => {
      return enabledItem === currentActive;
    });
    //If is the first item, do nothing
    if (enabledActiveItemIndex === 0) {
      return null;
    } else {
      return enabledItems[enabledActiveItemIndex - 1];
    }
  }

  /* SELECTED */

  selectItems(
    items: HTMLGxgListBoxItemElement | HTMLGxgListBoxItemElement[]
  ): number {
    let selected = 0;
    if (items && Array.isArray(items) && items.length > 0) {
      items.forEach(item => {
        if (!item.selected && !item.disabled) {
          (item.selected = true) && selected++;
        }
        this.activeItem !== item && this.unhighlightItem(item);
      });
    } else if (items && !Array.isArray(items)) {
      if (!items.selected && !items.disabled) {
        (items.selected = true) && selected++;
      }
      this.activeItem !== items && this.unhighlightItem(items);
    }
    //this.updateSelectedItems();
    return selected;
  }

  unselectItems(
    items: HTMLGxgListBoxItemElement | HTMLGxgListBoxItemElement[],
    spacePressed: boolean = false
  ): number {
    let unselected = 0;
    let selectedItemsLength = this.selectedItemsLength();
    if (
      items &&
      Array.isArray(items) &&
      items.length > 0 &&
      selectedItemsLength > 0
    ) {
      items.forEach(item => {
        if (item.selected && !item.disabled) {
          if (this.allowsEmpty) {
            item.selected = false;
            unselected++;
          } else {
            /*al least one item has to stay selected*/
            if (selectedItemsLength > 1) {
              item.selected = false;
              unselected++;
              selectedItemsLength--;
            }
          }
        }
        this.activeItem !== item && this.unhighlightItem(item);
        if (spacePressed) {
          item.checked = false;
        }
      });
    } else if (items && !Array.isArray(items)) {
      if (items.selected && !items.disabled) {
        items.selected = false;
        if (spacePressed) {
          items.checked = false;
        }
        unselected++;
      }
      this.activeItem !== items && this.unhighlightItem(items);
    }
    //unselected > 0 && this.updateSelectedItems();
    return unselected;
  }

  toggleItem(item: HTMLGxgListBoxItemElement): void {
    if (item?.selected) {
      this.unselectItems(item);
    } else {
      this.selectItems(item);
    }
  }

  private evaluateSelectedItems = () => {
    const selectedItemsArray: string[] = [];
    const selectedItemsArrayFullInfo: ItemsInformation[] = [];
    const selectedItems = this.getSelectedItems();
    selectedItems.then(result => {
      result.forEach(item => {
        selectedItemsArray.push(item.value);
        selectedItemsArrayFullInfo.push({
          active: item.active,
          selected: item.selected,
          checked: item.checked,
          index: item.index,
          value: item.value
        });
      });
      const arraysDiffer =
        JSON.stringify(this.selectedItemsState) !==
        JSON.stringify(selectedItemsArray);
      if (arraysDiffer) {
        this.selectedItemsState = selectedItemsArray;
        this.selectedItems = [...selectedItemsArrayFullInfo];
      }
    });
  };

  updateSelectedItems = (): void => {
    const selectedItemsArray: string[] = [];
    const selectedItems = this.getSelectedItems();
    selectedItems.then(result => {
      result.forEach(item => {
        selectedItemsArray.push(item.value);
      });
      const arraysDiffer =
        JSON.stringify(this.selectedItemsState) !==
        JSON.stringify(selectedItemsArray);
      if (arraysDiffer) {
        this.selectedItemsState = selectedItemsArray;
      }
    });
  };

  /* ACTIVE */

  getActiveItem(): HTMLGxgListBoxItemElement {
    const enabledItems: HTMLGxgListBoxItemElement[] = this.getEnabledItems();
    return enabledItems.find(item => item.active);
  }

  setActiveItem(item: HTMLGxgListBoxItemElement): boolean {
    if (item) {
      this.clearActiveItem(); /*Only one active item allowed at a time*/
      item.active = true;
      this.activeItem = item;
      return true;
    }
    return false;
  }

  clearActiveItem(): boolean {
    const activeItem: HTMLGxgListBoxItemElement = this.getActiveItem();
    if (activeItem) {
      activeItem.active = false;
      return true;
    }
    return false;
  }

  /* ENABLED */

  getEnabledItems(): HTMLGxgListBoxItemElement[] {
    const enabledItemsArray: HTMLGxgListBoxItemElement[] = [];
    const enabledItems = this.el.querySelectorAll("gxg-list-box-item");
    enabledItems.forEach(item => {
      !item.disabled && enabledItemsArray.push(item);
    });
    return enabledItemsArray;
  }

  /* DISABLED*/

  getDisabledItems(): HTMLGxgListBoxItemElement[] {
    const disabledItemsArray: HTMLGxgListBoxItemElement[] = [];
    const allItems = this.el.querySelectorAll("gxg-list-box-item");
    allItems.forEach(item => {
      item.disabled && disabledItemsArray.push(item);
    });
    return disabledItemsArray;
  }

  /* CHECKBOX */

  setCheckboxState(
    items: HTMLGxgListBoxItemElement | HTMLGxgListBoxItemElement[],
    check = true
  ): number {
    if (items && Array.isArray(items) && items.length !== 0) {
      let changed = 0;
      items.forEach(item => {
        if (!item.checked && check) {
          item.checked = true;
          changed++;
        } else if (item.checked && !check) {
          item.checked = false;
          changed++;
        }
      });
      return changed;
    } else if (!(items && Array.isArray(items))) {
      const item = items as HTMLGxgListBoxItemElement;
      if (!item.checked && check) {
        item.checked = true;
        return 1;
      } else if (item.checked && !check) {
        item.checked = false;
        return 1;
      }
    }
    return 0;
  }

  /* OTHER */

  getAllItems = (): HTMLGxgListBoxItemElement[] => {
    const allItemsArray: HTMLGxgListBoxItemElement[] = [];
    const allItems = this.el.querySelectorAll("gxg-list-box-item");
    if (allItems?.length) {
      allItems.forEach(item => {
        allItemsArray.push(item);
      });
    }
    return allItemsArray;
  };

  getFirstEnabledItem(): HTMLGxgListBoxItemElement {
    return this.getEnabledItems()[0] || null;
  }

  getFirstSelectedItem(): HTMLGxgListBoxItemElement {
    const enabledItems = this.getEnabledItems();
    if (enabledItems?.length && enabledItems[0].selected) {
      return enabledItems[0];
    }
    return undefined;
  }

  selectMultipleItems(fromIndex: number, toIndex: number): void {
    let comparator = toIndex;
    const selectedItems: HTMLGxgListBoxItemElement[] = [];
    if (fromIndex === toIndex) {
      return;
    } else if (fromIndex > toIndex) {
      const fromIndexCopy = fromIndex;
      fromIndex = toIndex;
      toIndex = fromIndexCopy;
      comparator = fromIndex;
    }
    for (let i = fromIndex; i <= toIndex; i++) {
      const item: HTMLGxgListBoxItemElement = this.getItemByIndex(i);
      item && selectedItems.push(item);
      if (i === comparator) {
        this.highlightItem(item);
      }
    }
    if (selectedItems?.length > 0) {
      this.selectItems(selectedItems);
    }
  }

  renderKeyboardSuggestions() {
    if (Object.keys(this.keyboardSuggestions).length) {
      const itemsArray = [];
      for (const key in this.keyboardSuggestions) {
        const listItem = (
          <li class="suggestions-__list-item">
            {this.keyboardSuggestions[key]}
          </li>
        );
        itemsArray.push(listItem);
      }
      return (
        <div class="suggestions suggestions__container">
          <ul class="suggestions__list">{itemsArray}</ul>
          <gxg-button
            class="suggestions__button"
            type="secondary-icon-only"
            icon="gemini-tools/close"
            onClick={(): boolean => (this.hideKeyboardSuggestions = true)}
          ></gxg-button>
        </div>
      );
    }
  }

  /* RENDER */

  render(): void {
    return (
      <Host
        class={{
          large: state.large,
          "has-title": !!this.theTitle,
          [formClasses["VALIDATION_INDETERMINATE_CLASS"]]:
            this.validationStatus === "indeterminate",
          [formClasses["VALIDATION_WARNING_CLASS"]]:
            this.validationStatus === "warning",
          [formClasses["VALIDATION_ERROR_CLASS"]]:
            this.validationStatus === "error",
          [formClasses["VALIDATION_SUCCESS_CLASS"]]:
            this.validationStatus === "success",
          [commonClassesNames["DISABLED_CLASS"]]: this.disabled
        }}
        onKeyDown={this.handleKeyDown}
      >
        <div
          class={{ container: true, "form-element": true }}
          tabindex={this.disabled ? "-1" : "0"}
          ref={el => (this.containerEl = el as HTMLDivElement)}
        >
          {this.theTitle ? (
            <header
              class={{ header: true }}
              ref={el => (this.header = el as HTMLElement)}
            >
              {this.theTitle}
            </header>
          ) : null}
          {!this.disableSuggestions && !this.hideKeyboardSuggestions
            ? this.renderKeyboardSuggestions()
            : null}
          <main
            class={{
              main: true
            }}
            style={{
              height: `calc(100% - ${this.headerHeight}px)`
            }}
            ref={el => (this.main = el as HTMLElement)}
          >
            <slot></slot>
          </main>
        </div>
        {formMessageLogic(this)}
      </Host>
    );
  }
}

type HandleArrow = typeof KK.ARROW_UP | typeof KK.ARROW_DOWN;

export type ItemsInformation = {
  active: boolean;
  selected: boolean;
  checked: boolean;
  index: number;
  value: string;
};

export type KeyboardSuggestions = {
  checkCheckbox: string;
  uncheckCheckbox: string;
};

export type SelectionChangedEvent = {
  items: ItemsInformation[];
};
