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
} from "@stencil/core";
import { formMessageLogic } from "../../common/form";
import { GxgListboxItem } from "../list-box-item/list-box-item";
import { FormComponent } from "../../common/interfaces";
import { formClasses } from "../../common/classes-names";
import state from "../store";
import { ItemClicked } from "../list-box-item/list-box-item";

@Component({
  tag: "gxg-list-box",
  styleUrl: "list-box.scss",
  shadow: true,
})
export class GxgListBox implements FormComponent {
  /**
   * This event emits the items that are currently selected. event.detail contains the selected items as objects. Each object contains the item idex and the item value. If value was not provided, the value will be the item innerText.
   */
  @Event() selectionChanged: EventEmitter;
  @Element() el: HTMLElement;
  header!: HTMLElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * The listbox title that appears on the header
   */
  @Prop() theTitle = "";

  /**
   * The list-box width
   */
  @Prop() width = "100%";

  /**
   * The list-box min-width
   */
  @Prop() minWidth = "0";

  /**
   * The list-box max-width
   */
  @Prop() maxWidth = "none";

  /**
   * The list-box height
   */
  @Prop() height = "auto";

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
  @Prop() allowsNoSelection = false;

  @State() lastSelectedItemIndex: number | undefined = undefined;
  @State() headerHeight = 0;

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
  @Prop({ mutable: true }) validationStatus:
    | "indeterminate"
    | "warning"
    | "error"
    | "success";

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
   * The required message if this input is required and no value is provided (optional). If this is not provided, the default browser required message will show up
   *
   */
  @Prop({ mutable: true }) validationMessage: string;

  /**
   * An informative message to help the user filling the information
   *
   */
  @Prop() informationMessage: string;

  private activeItem: HTMLGxgListBoxItemElement;

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
      (this.required && this.selectedItemsLength() === 0) ||
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
  async getSelectedItems() {
    return [...this.getSelectedItemsInfo()];
  }

  componentDidRender(): void {
    if (this.theTitle) {
      this.headerHeight = this.header.clientHeight;
    }
  }

  componentWillLoad() {
    this.initialSetup();
  }

  setUpItems(): void {
    //Set index and Tabindex
    const itemsNodeList = this.el.querySelectorAll("gxg-list-box-item");
    itemsNodeList.forEach((item, i) => {
      //index
      const listBoxItem = (item as unknown) as GxgListboxItem;
      listBoxItem.index = i;
    });
  }

  initialSetup = (): void => {
    if (!this.allowsNoSelection) {
      const selectedItems = this.el.querySelectorAll(
        "gxg-list-box-item[selected]"
      );
      if (!selectedItems?.length) {
        const firstEnabledItem = this.getFirstEnabledItem();
        this.selectItem(firstEnabledItem);
      }
    }
    if (this.checkboxes) {
      const allItems = this.el.querySelectorAll("gxg-list-box-item");
      allItems.forEach((item) => {
        (item as HTMLGxgListBoxItemElement).checkbox = true;
      });
    }
  };

  @Listen("itemLoaded")
  itemLoadedHandler(): void {
    this.setUpItems();
    this.setSelectedItem();
  }

  @Listen("itemClicked")
  itemClickedHandler(event: ItemClicked): void {
    const { clickedItem, ctrlKey, cmdKey, shiftKey, index } = event["detail"];
    if (this.singleSelection) {
      if (this.activeItem === clickedItem && !this.allowsNoSelection) {
        /*same item. do nothing.*/
        return;
      }
      if (this.allowsNoSelection && (ctrlKey || cmdKey)) {
        this.unselectItem(clickedItem);
      } else {
        this.clearHighlightedItems();
        this.clearSelectedItems();
        this.selectItem(clickedItem);
        this.highlightItem(clickedItem);
      }
    } else {
      /*multiple-selection allowed*/
      if (shiftKey || !ctrlKey) {
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
      } else if (ctrlKey) {
        if (
          !this.allowsNoSelection &&
          this.selectedItemsLength() === 1 &&
          clickedItem === this.getFirstSelectedItem()
        ) {
          return;
        }
        this.unhighlightItem(this.activeItem);
        this.toggleItem(clickedItem);
        this.highlightItem(clickedItem);
      } else {
        this.selectItem(clickedItem);
        this.highlightItem(clickedItem);
      }
    }
  }

  handleKeyDown = (e: KeyboardEvent): void => {
    const ctrlKey = e.ctrlKey;
    const cmdKey = e.metaKey;
    const shiftKey = e.shiftKey;
    const activeItemIndex = this.getIndexByElement(this.activeItem);
    if (
      e.code === "ArrowDown" ||
      e.code === "ArrowUp" ||
      e.code === "Space" ||
      e.code === "Enter"
    ) {
      e.preventDefault();
    }
    if (e.code === "ArrowDown" || e.code === "ArrowUp") {
      this.handleArrow(e.code, e.shiftKey, activeItemIndex);
    } else if (e.code === "Space" || e.code === "Enter") {
      if ((ctrlKey || cmdKey) && this.selectedItemsLength() >= 1) {
        console.log("3");
        const deselectionNotAllowed =
          (!this.allowsNoSelection &&
            this.selectedItemsLength() === 1 &&
            this.activeItem === this.getSelectedItemsFunc()[0]) ||
          !this.activeItem.selected;
        if (deselectionNotAllowed) {
          console.log("do nothing");
          return;
        }
        this.unselectItem(this.activeItem);
      } else if (!ctrlKey && !cmdKey) {
        console.log("4");
        if (this.singleSelection) {
          console.log("5");
          if (this.activeItem === this.getSelectedItemsFunc()[0]) {
            console.log("do nothing");
            return;
          }
          this.clearSelectedItems();
          this.selectItem(this.activeItem);
        } else {
          console.log("6");
          /*multi-select allowed*/
          if (ctrlKey || cmdKey) {
            console.log("7");
            this.clearHighlightedItems();
          } else {
            if (!this.activeItem.selected) {
              console.log("8");
              this.selectHighlightedItems();
            }
          }
        }
      }
    }
  };

  handleArrow = (
    direction: handleArrow,
    shiftKey: boolean,
    activeItemIndex: number
  ): void => {
    /*Get the next element*/
    let newElement: HTMLGxgListBoxItemElement;
    if (activeItemIndex !== -1) {
      direction === "ArrowDown"
        ? (newElement = this.getNextItem(activeItemIndex))
        : (newElement = this.getPrevItem(activeItemIndex));
    } else {
      direction === "ArrowDown"
        ? (newElement = this.getFirstEnabledItem())
        : null;
    }
    /*Handle*/
    if (newElement) {
      this.singleSelection &&
        this.activeItem &&
        !this.allowsNoSelection &&
        this.clearSelectedItems();
      if (shiftKey && !this.singleSelection && !this.activeItem.selected) {
        this.activeItem.selected = true;
      }
      this.unhighlightItem(this.activeItem);
      this.setActiveItem(newElement);
      this.highlightItem(newElement);
      if (shiftKey && !this.singleSelection && !this.activeItem.selected) {
        this.activeItem.selected = true;
      }
      if (
        (!newElement.selected || (shiftKey && !this.singleSelection)) &&
        !this.allowsNoSelection
      ) {
        console.log("1");
        this.selectItem(newElement);
      } else if (this.singleSelection) {
        console.log("2");
      }
    }
  };

  /* SELECTED */

  clearSelectedItems(ignoreHighlighted = false): void {
    const actualSelectedItems = ignoreHighlighted
      ? this.el.querySelectorAll(
          "gxg-list-box-item[selected]:not([highlighted])"
        )
      : this.el.querySelectorAll("gxg-list-box-item[selected]");
    if (actualSelectedItems.length > 0) {
      const disableEmmit = this.singleSelection;
      actualSelectedItems.forEach((item) => {
        this.unselectItem(item as HTMLGxgListBoxItemElement, disableEmmit);
      });
    }
  }

  getSelectedItemsInfo() {
    const allItems = this.el.querySelectorAll("gxg-list-box-item");
    const selectedItemsArray = [];
    allItems.forEach((item) => {
      const HTMLListBoxItemElement = item as HTMLGxgListBoxItemElement;
      if (HTMLListBoxItemElement.selected && !HTMLListBoxItemElement.disabled) {
        selectedItemsArray.push({
          index: HTMLListBoxItemElement.index,
          value:
            HTMLListBoxItemElement.value || HTMLListBoxItemElement.textContent,
        });
      }
    });
    return selectedItemsArray;
  }

  selectedItemsLength = (): number => {
    return this.el.querySelectorAll(
      "gxg-list-box-item[selected]:not([disabled])"
    ).length;
  };

  getSelectedItemsFunc(): HTMLGxgListBoxItemElement[] {
    const selectedItems: HTMLGxgListBoxItemElement[] = [];
    const selectedItemsNodelist = this.el.querySelectorAll(
      "gxg-list-box-item[selected]:not([disabled])"
    );
    if (selectedItemsNodelist?.length) {
      selectedItemsNodelist.forEach((item) => {
        selectedItems.push(item as HTMLGxgListBoxItemElement);
      });
    }
    return selectedItems;
  }

  emitSelectedItems(): void {
    this.selectionChanged.emit([...this.getSelectedItemsInfo()]);
  }

  setSelectedItem(): void {
    //1. If the list-box is single-selection, only one list-box-item sould be selected.
    if (this.selectedItemsLength() > 1 && this.singleSelection) {
      this.clearSelectedItems();
      this.selectItem(
        this.getSelectedItemsFunc()[0] as HTMLGxgListBoxItemElement
      );
    }
  }

  /* HIGHLIGHTED */

  highlightItem(item: HTMLGxgListBoxItemElement): void {
    if (item) {
      this.singleSelection && this.clearHighlightedItems();
      item.highlighted = true;
      this.activeItem = item;
    }
  }

  unhighlightItem(item: HTMLGxgListBoxItemElement): void {
    if (item) {
      item.highlighted = false;
    }
  }

  toggleHighlightedItems(): void {
    const highlightedItems = this.getHighlightedItems();
    highlightedItems.forEach((item) => {
      this.toggleItem(item);
    });
  }

  selectHighlightedItems(): void {
    const highlightedItems = this.el.querySelectorAll(
      "gxg-list-box-item[highlighted]"
    );
    highlightedItems.forEach((item) => {
      this.selectItem(item as HTMLGxgListBoxItemElement);
    });
  }

  clearHighlightedItems(): void {
    const actualHighlightedItems = this.el.querySelectorAll(
      "gxg-list-box-item[highlighted]"
    );
    if (actualHighlightedItems.length > 0) {
      actualHighlightedItems.forEach((item) => {
        this.unhighlightItem(item as HTMLGxgListBoxItemElement);
      });
    }
  }

  getHighlightedItems(): HTMLGxgListBoxItemElement[] {
    const highlightedItems: HTMLGxgListBoxItemElement[] = [];
    const highlightedItemsNodelist = this.el.querySelectorAll(
      "gxg-list-box-item[highlighted]:not([disabled])"
    );
    highlightedItemsNodelist?.forEach((item) => {
      highlightedItems.push(item as HTMLGxgListBoxItemElement);
    });
    return highlightedItems;
  }

  getHighlightedItemsLength(): number {
    return this.getHighlightedItems().length;
  }

  /* INDEX */

  getItemByIndex(index: number): HTMLGxgListBoxItemElement {
    const item = this.el.querySelector(
      "gxg-list-box-item[index='" + index + "']"
    );
    if (item) {
      return item as HTMLGxgListBoxItemElement;
    }
    return null;
  }

  getIndexByElement = (element: HTMLGxgListBoxItemElement): number => {
    return Array.from(this.el.querySelectorAll("gxg-list-box-item")).findIndex(
      (item) => {
        return item === element;
      }
    );
  };

  /* PREV/NEXT */

  getNextItem(index: number): HTMLGxgListBoxItemElement {
    const allItems = this.el.querySelectorAll("gxg-list-box-item");
    if (index === -1) {
      return allItems[0];
    }
    const allItemsLength = allItems.length;
    let nextItemIndex = index + 1;
    while (
      nextItemIndex < allItemsLength &&
      (allItems[nextItemIndex] as HTMLGxgListBoxItemElement).disabled
    ) {
      nextItemIndex++;
    }
    if (
      nextItemIndex < allItemsLength &&
      !(allItems[nextItemIndex] as HTMLGxgListBoxItemElement).disabled
    ) {
      return allItems[nextItemIndex] as HTMLGxgListBoxItemElement;
    }
    return null;
  }

  getPrevItem(index: number): HTMLGxgListBoxItemElement {
    const allItems = this.el.querySelectorAll("gxg-list-box-item");
    let prevItemIndex = index - 1;
    while (
      prevItemIndex > -1 &&
      (allItems[prevItemIndex] as HTMLGxgListBoxItemElement).disabled
    ) {
      prevItemIndex--;
    }
    if (
      prevItemIndex > -1 &&
      !(allItems[prevItemIndex] as HTMLGxgListBoxItemElement).disabled
    ) {
      return allItems[prevItemIndex] as HTMLGxgListBoxItemElement;
    }
    return null;
  }

  /* SELECTED */

  selectItem(item: HTMLGxgListBoxItemElement, disableEmit = false): void {
    if (!item?.disabled) {
      item.selected = true;
      console.log("emit select");
      !disableEmit && this.emitSelectedItems();
    }
    return null;
  }

  unselectItem(item: HTMLGxgListBoxItemElement, disableEmit = false): void {
    if (item) {
      item.selected = false;
      console.log("emit unselect");
      !disableEmit && this.emitSelectedItems();
    }
  }

  toggleItem(item: HTMLGxgListBoxItemElement): void {
    if (item.selected) {
      this.unselectItem(item);
    } else {
      this.selectItem(item);
    }
  }

  /* ACTIVE */

  getActiveItem(): HTMLGxgListBoxItemElement {
    return this.el.querySelector("gxg-list-box-item[active]:not([disabled])");
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
    const activeElement = this.el.querySelector(
      "gxg-list-box-item[active]:not([disabled])"
    );
    if (activeElement) {
      (activeElement as HTMLGxgListBoxItemElement).active = false;
      return true;
    }
    return false;
  }

  /* OTHER */

  getFirstEnabledItem(): HTMLGxgListBoxItemElement {
    return this.el.querySelector(
      "gxg-list-box-item:not([disabled])"
    ) as HTMLGxgListBoxItemElement;
  }

  getFirstSelectedItem(): HTMLGxgListBoxItemElement {
    return this.el.querySelector(
      "gxg-list-box-item[selected]:not([disabled])"
    ) as HTMLGxgListBoxItemElement;
  }

  selectMultipleItems(fromIndex: number, toIndex: number): void {
    let comparator = toIndex;
    if (fromIndex === toIndex) {
      return;
    } else if (fromIndex > toIndex) {
      const fromIndexCopy = fromIndex;
      fromIndex = toIndex;
      toIndex = fromIndexCopy;
      comparator = fromIndex;
    }
    for (let i = fromIndex; i <= toIndex; i++) {
      const item = this.el.querySelector(
        "gxg-list-box-item[index='" + i + "']"
      ) as HTMLGxgListBoxItemElement;
      this.selectItem(item);
      if (i === comparator) {
        this.highlightItem(item);
      }
    }
  }

  /* RENDER */

  render(): void {
    return (
      <Host
        class={{
          large: state.large,
          [formClasses["DISPLAY_VALIDATION_STYLES_CLASS"]]: this
            .displayValidationStyles,
          [formClasses["VALIDATION_INDETERMINATE_CLASS"]]:
            this.validationStatus === "indeterminate",
          [formClasses["VALIDATION_WARNING_CLASS"]]:
            this.validationStatus === "warning",
          [formClasses["VALIDATION_ERROR_CLASS"]]:
            this.validationStatus === "error",
          [formClasses["VALIDATION_SUCCESS_CLASS"]]:
            this.validationStatus === "success",
        }}
        style={{
          height: this.height,
        }}
        tabindex="0"
        onKeyDown={this.handleKeyDown}
      >
        <div
          style={{
            width: this.width,
            minWidth: this.minWidth,
            maxWidth: this.maxWidth,
            height: "100%",
          }}
          class={{ container: true }}
        >
          {this.theTitle ? (
            <header
              class={{ header: true }}
              ref={(el) => (this.header = el as HTMLElement)}
            >
              {this.theTitle}
            </header>
          ) : null}
          <main
            class={{ main: true }}
            style={{
              height: `calc(100% - ${this.headerHeight}px)`,
            }}
          >
            <slot></slot>
          </main>
        </div>
        {formMessageLogic(this)}
      </Host>
    );
  }
}

type handleArrow = "ArrowUp" | "ArrowDown";
