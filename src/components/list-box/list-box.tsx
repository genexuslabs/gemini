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

@Component({
  tag: "gxg-list-box",
  styleUrl: "list-box.scss",
  shadow: true,
})
export class GxgListBox implements FormComponent {
  /**
   * This event emmits the items that are currently selected. event.detail contains the selected items as objects. Each object contains the item idex and the item value. If value was not provided, the value will be the item innerText.
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
   * The prescence of this attribute will display a checkbox for every item
   */
  @Prop() checkboxes = false;

  /**
   * The prescence of this attribute will deactivate multi-selection
   */
  @Prop() singleSelection = false;

  /**
   * The prescence of this attribute allows the list-box to not have any list-box-item selected
   */
  @Prop() allowsEmptySelection = false;

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

  private selectedItem: HTMLGxgListBoxItemElement;

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
      (this.required && this.selectedItems().length === 0) ||
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
    return [...this.selectedItems()];
  }

  componentDidRender(): void {
    if (this.theTitle) {
      this.headerHeight = this.header.clientHeight;
    }
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

  setSelectedItem(): void {
    //1. If no list-box-item is initially selected and 'allowsEmptySelection' is false, the first list-box-item should be selected
    //2. If the list-box is single-selection, only one list-box-item sould be selected.

    const selectedItems = this.el.querySelectorAll(
      "gxg-list-box-item[selected]"
    );
    if (selectedItems.length === 0 && !this.allowsEmptySelection) {
      const firstItem = this.el.querySelector(
        "gxg-list-box-item"
      ) as HTMLGxgListBoxItemElement;
      this.toggleItem(firstItem);
    } else {
      if (selectedItems.length > 1 && this.singleSelection) {
        this.clearSelectedItems();
        if ((selectedItems[0] as HTMLGxgListBoxItemElement).index === 0) {
          this.selectItem(selectedItems[1] as HTMLGxgListBoxItemElement);
        } else {
          this.selectItem(selectedItems[0] as HTMLGxgListBoxItemElement);
        }
      }
    }
  }

  @Listen("itemLoaded")
  itemLoadedHandler(): void {
    this.setUpItems();
    this.setSelectedItem();
  }

  @Listen("itemClicked")
  itemClickedHandler(e): void {
    const clickedItem = e.detail.el as HTMLGxgListBoxItemElement;
    const clickedItemIndex: number = parseInt(
      clickedItem.getAttribute("index")
    );
    if (!this.singleSelection) {
      /*multi-selection*/
      if (!e.detail.crtlKey && !e.detail.cmdKey && !e.detail.shiftKey) {
        //If ctrl and command and shift keys were not pressed, unselect previous selected items
        this.clearSelectedItems();
        this.selectItem(clickedItem);
        this.lastSelectedItemIndex = clickedItemIndex;
      } else if (e.detail.crtlKey || e.detail.cmdKey) {
        const listBoxItem = clickedItem as HTMLGxgListBoxItemElement;
        const selectedItemsLength = this.selectedItems().length;
        if (
          !this.allowsEmptySelection &&
          selectedItemsLength === 1 &&
          listBoxItem.selected
        ) {
          return;
        }
        this.toggleItem(clickedItem);
        this.lastSelectedItemIndex = clickedItemIndex;
      } else if (e.detail.shiftKey) {
        if (this.lastSelectedItemIndex === undefined) {
          this.selectMulitpleItems(0, clickedItemIndex);
          this.lastSelectedItemIndex = clickedItemIndex;
        } else {
          this.clearSelectedItems();
          if (clickedItemIndex === this.lastSelectedItemIndex) {
            this.selectItem(clickedItem);
          } else if (clickedItemIndex < this.lastSelectedItemIndex) {
            this.selectMulitpleItems(
              clickedItemIndex,
              this.lastSelectedItemIndex
            );
          } else {
            this.selectMulitpleItems(
              this.lastSelectedItemIndex,
              clickedItemIndex
            );
          }
        }
      }
    } else {
      /*single-selection*/
      this.clearSelectedItems();
      if (
        this.allowsEmptySelection &&
        (e.detail["crtlKey"] || e.detail["cmdKey"]) &&
        clickedItem === this.selectedItem
      ) {
        this.unselectItem(clickedItem);
      } else {
        this.selectItem(clickedItem);
      }
    }
  }

  handleKeyDown = (e: KeyboardEvent): void => {
    const selectedItemIndex = this.getIndexByElement(this.selectedItem);
    if (e.code === "ArrowDown" || e.code === "ArrowUp" || e.code === "Space") {
      e.preventDefault();
    }
    if (e.code === "ArrowDown") {
      const nextElement: HTMLGxgListBoxItemElement = this.getNextItem(
        selectedItemIndex
      );
      if (nextElement !== null) {
        if (
          (!e.shiftKey && !e.ctrlKey) ||
          (this.singleSelection && !e.ctrlKey)
        ) {
          this.clearSelectedItems();
        }
        if (!e.ctrlKey) {
          if (!nextElement.selected) {
            this.selectItem(nextElement);
          } else {
            this.unselectItem(this.selectedItem);
          }
        }
      }
    } else if (e.code === "ArrowUp") {
      const prevElement: HTMLGxgListBoxItemElement = this.getPrevItem(
        selectedItemIndex
      );
      if (prevElement !== null) {
        if (
          (!e.shiftKey && !e.ctrlKey) ||
          (this.singleSelection && !e.ctrlKey)
        ) {
          this.clearSelectedItems();
        }
        if (!e.ctrlKey) {
          if (!prevElement.selected) {
            this.selectItem(prevElement);
          } else {
            if (this.selectedItem) {
              this.unselectItem(this.selectedItem);
            }
          }
        }
      }
    } else if (e.code === "Space" && this.allowsEmptySelection) {
    }
  };

  handleFocus = () => {
    if (!this.selectedItem) {
      const firstItem: HTMLGxgListBoxItemElement = this.getItemByIndex(0);
      if (firstItem) {
        this.selectItem(firstItem);
      }
    }
  };

  selectMulitpleItems(fromIndex: number, toIndex: number): void {
    for (let i = fromIndex; i <= toIndex; i++) {
      const item = this.el.querySelector(
        "gxg-list-box-item[index='" + i + "']"
      );
      this.selectItem(item as HTMLGxgListBoxItemElement);
    }
  }

  clearSelectedItems(): void {
    const actualSelectedItems = this.el.querySelectorAll(
      "gxg-list-box-item[selected]"
    );
    if (actualSelectedItems.length > 0) {
      actualSelectedItems.forEach((item) => {
        this.unselectItem(item as HTMLGxgListBoxItemElement);
      });
    }
  }

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

  selectItem(item: HTMLGxgListBoxItemElement): void {
    if (item) {
      item.selected = true;
      this.selectedItem = item;
      this.emmitSelectedItems();
    }
    return null;
  }

  unselectItem(item: HTMLGxgListBoxItemElement): void {
    if (item) {
      item.selected = false;
      this.emmitSelectedItems();
    }
  }

  highlightItem(item: HTMLGxgListBoxItemElement): void {
    if (item) {
      item.highlighted = true;
    }
    return null;
  }

  unhighlightItem(item: HTMLGxgListBoxItemElement): void {
    if (item) {
      item.highlighted = false;
    }
  }

  toggleItem(item: HTMLGxgListBoxItemElement): void {
    if (item.selected) {
      this.unselectItem(item);
    } else {
      this.selectItem(item);
    }
  }

  selectedItems() {
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

  emmitSelectedItems(): void {
    this.selectionChanged.emit([...this.selectedItems()]);
  }

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
        onFocus={this.handleFocus}
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
