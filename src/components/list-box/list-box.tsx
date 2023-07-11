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

      //tabindex
      item.setAttribute("tabindex", "0");
    });
  }

  setSelectedItem(): void {
    //1. If no list-box-item is initially selected and 'allowsEmptySelection' is false, the first list-box-item should be selected
    //2. If the list-box is single-selection, only one list-box-item sould be selected.

    const selectedItems = this.el.querySelectorAll(
      "gxg-list-box-item[selected]"
    );
    if (selectedItems.length === 0 && !this.allowsEmptySelection) {
      const firstItem = this.el.querySelector("gxg-list-box-item");
      this.toggleItem(firstItem);
    } else {
      if (selectedItems.length > 1 && this.singleSelection) {
        this.clearSelectedItems();
        if (((selectedItems[0] as unknown) as GxgListboxItem).index === 0) {
          this.selectItem(selectedItems[1]);
        } else {
          this.selectItem(selectedItems[0]);
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
    const clickedItem = this.getItem(e.detail["index"]);
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
        (e.detail["crtlKey"] || e.detail["cmdKey"])
      ) {
        this.unselectItem(clickedItem);
      } else {
        this.selectItem(clickedItem);
      }
    }
    this.emmitSelectedItems();
  }

  @Listen("KeyPressed")
  KeyPressedHandler(e): void {
    let itemWithFocus = document.activeElement;
    if (itemWithFocus.tagName !== "GXG-LIST-BOX-ITEM") {
      itemWithFocus = undefined;
    }
    if (e.detail.eCode === "ArrowDown") {
      const nextElement = this.getItem(e.detail.index).nextElementSibling;
      if (nextElement !== null) {
        if (
          (!e.detail.shiftKey && !e.detail.crtlKey) ||
          (this.singleSelection && !e.detail.crtlKey)
        ) {
          this.clearSelectedItems();
        }
        (nextElement as HTMLElement).focus();
        if (!e.detail.crtlKey) {
          if (!nextElement.classList.contains("selected")) {
            this.selectItem(nextElement);
          } else {
            if (itemWithFocus) {
              this.unselectItem(itemWithFocus);
            }
          }
        }
      }
    } else if (e.detail.eCode === "ArrowUp") {
      const prevElement = this.getItem(e.detail.index).previousElementSibling;
      if (prevElement !== null) {
        if (
          (!e.detail.shiftKey && !e.detail.crtlKey) ||
          (this.singleSelection && !e.detail.crtlKey)
        ) {
          this.clearSelectedItems();
        }
        (prevElement as HTMLElement).focus();
        if (!e.detail.crtlKey) {
          if (!prevElement.classList.contains("selected")) {
            this.selectItem(prevElement);
          } else {
            if (itemWithFocus) {
              this.unselectItem(itemWithFocus);
            }
          }
        }
      }
    } else if (e.detail.eCode === "Enter") {
      if (!e.detail.crtlKey) {
        this.clearSelectedItems();
      }
      this.selectItem(itemWithFocus);
    }
    this.emmitSelectedItems();
  }

  selectMulitpleItems(fromIndex: number, toIndex: number): void {
    for (let i = fromIndex; i <= toIndex; i++) {
      const item = this.el.querySelector(
        "gxg-list-box-item[index='" + i + "']"
      );
      this.selectItem(item);
    }
  }

  clearSelectedItems(): void {
    const actualSelectedItems = this.el.querySelectorAll(
      "gxg-list-box-item[selected]"
    );
    if (actualSelectedItems.length > 0) {
      actualSelectedItems.forEach((item) => {
        this.unselectItem(item);
      });
    }
  }

  getItem(index): Element {
    return this.el.querySelector("gxg-list-box-item[index='" + index + "']");
  }

  selectItem(item): void {
    (item as HTMLElement).setAttribute("selected", "");
  }

  unselectItem(item): void {
    (item as HTMLElement).removeAttribute("selected");
  }

  toggleItem(item): void {
    if ((item as HTMLElement).hasAttribute("selected")) {
      this.unselectItem(item);
    } else {
      this.selectItem(item);
    }
  }

  selectedItems() {
    const selectedItems = this.el.querySelectorAll(
      "gxg-list-box-item[selected]"
    );
    const selectedItemsArray = [];
    selectedItems.forEach((item) => {
      const listBoxItem = (item as unknown) as GxgListboxItem;
      const itemIndex = listBoxItem.index;
      let itemValue = listBoxItem.value;
      if (!itemValue) {
        itemValue = item.textContent;
      } else {
        itemValue = itemValue;
      }
      const itemObj = {
        index: itemIndex,
        value: itemValue,
      };
      selectedItemsArray.push(itemObj);
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
