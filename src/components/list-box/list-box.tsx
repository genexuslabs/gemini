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
import { GxgListboxItem } from "../list-box-item/list-box-item";

@Component({
  tag: "gxg-list-box",
  styleUrl: "list-box.scss",
  shadow: true,
})
export class GxgListBox {
  /**
   * This event emmits the items that are currently selected. event.detail contains the selected items as objects. Each object contains the item idex and the item value. If value was not provided, the value will be the item innerText.
   */
  @Event() selectionChanged: EventEmitter;
  @Element() el: HTMLElement;

  /**
   * The listbox title that appears on the header
   */
  @Prop() theTitle = "";

  /**
   * The listbox width
   */
  @Prop() width = "280px";

  /**
   * The prescence of this attribute will display a checkbox for every item
   */
  @Prop() checkboxes = false;

  /**
   * The prescence of this attribute will deactivate multi-selection
   */
  @Prop() singleSelection = false;

  @Method()
  async getSelectedItems() {
    return { ...this.selectedItems() };
  }

  @State() lastSelectedItemIndex: number | undefined = undefined;

  componentWillLoad() {
    //Set checkboxes
    if (this.checkboxes) {
      const items = this.el.querySelectorAll("gxg-list-box-item");
      items.forEach((item) => {
        const checkbox = document.createElement("gxg-form-checkbox");
        checkbox.setAttribute("slot", "checkbox");
        checkbox.setAttribute("tabindex", "-1");
        item.prepend(checkbox);
      });
    }
    //Set index and Tabindex
    const itemsNodeList = this.el.querySelectorAll("gxg-list-box-item");
    itemsNodeList.forEach((item, i) => {
      //index
      const itemHtmlElement = item as HTMLElement;
      itemHtmlElement.setAttribute("index", i.toString());

      //tabindex
      item.setAttribute("tabindex", "0");
    });
  }

  @Listen("itemClicked")
  itemClickedHandler(e) {
    const clickedItem = this.getItem(e.detail["index"]);
    const clickedItemIndex: number = parseInt(
      clickedItem.getAttribute("index")
    );
    if (!this.singleSelection) {
      if (!e.detail.crtlKey && !e.detail.cmdKey && !e.detail.shiftKey) {
        //If ctrl and command and shift keys were not pressed, unselect previous selected items
        this.clearSelectedItems();
        this.selectItem(clickedItem);
        this.lastSelectedItemIndex = clickedItemIndex;
      } else if (e.detail.crtlKey || e.detail.cmdKey) {
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
      this.clearSelectedItems();
      this.selectItem(clickedItem);
    }
    this.emmitSelectedItems();
  }

  @Listen("KeyPressed")
  KeyPressedHandler(e) {
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

  selectMulitpleItems(fromIndex: number, toIndex: number) {
    for (let i = fromIndex; i <= toIndex; i++) {
      const item = this.el.querySelector(
        "gxg-list-box-item[index='" + i + "']"
      );
      this.selectItem(item);
    }
  }

  clearSelectedItems() {
    const actualSelectedItems = this.el.querySelectorAll(".selected");
    if (actualSelectedItems.length > 0) {
      actualSelectedItems.forEach((item) => {
        item.classList.remove("selected");
        //set icon color to auto
        ((item as unknown) as GxgListboxItem).iconColor = "auto";
        //checkbox
        const checkbox = item.querySelector("gxg-form-checkbox");
        if (checkbox !== null) {
          checkbox.checked = false;
        }
      });
    }
  }

  getItem(index) {
    return this.el.querySelector("gxg-list-box-item[index='" + index + "']");
  }

  selectItem(item) {
    item.classList.add("selected");
    //set icon color to negative
    ((item as unknown) as GxgListboxItem).iconColor = "negative";
    //checkbox
    const checkbox = item.querySelector("gxg-form-checkbox");
    if (checkbox !== null) {
      checkbox.checked = true;
    }
  }

  unselectItem(item) {
    item.classList.remove("selected");
    //set icon color to auto
    ((item as unknown) as GxgListboxItem).iconColor = "auto";
    //checkbox
    const checkbox = item.querySelector("gxg-form-checkbox");
    if (checkbox !== null) {
      checkbox.checked = false;
    }
  }

  toggleItem(item) {
    item.classList.toggle("selected");
    const checkbox = item.querySelector("gxg-form-checkbox");
    if (checkbox !== null) {
      if (checkbox.checked === true) {
        checkbox.checked = false;
      } else {
        checkbox.checked = true;
      }
    }
  }

  selectedItems() {
    const selectedItems = this.el.querySelectorAll(".selected");
    const selectedItemsArray = [];
    selectedItems.forEach((item) => {
      const itemIndex = item.getAttribute("index");
      let itemValue = item.getAttribute("value");
      if (itemValue === null) {
        itemValue = item.textContent;
      } else {
        itemValue = itemValue.toString();
      }
      const itemObj = {
        index: itemIndex,
        value: itemValue,
      };
      selectedItemsArray.push(itemObj);
    });
    return selectedItemsArray;
  }

  emmitSelectedItems() {
    this.selectionChanged.emit({
      ...this.selectedItems(),
    });
  }

  render() {
    return (
      <Host>
        <div style={{ width: this.width }} class={{ container: true }}>
          {this.theTitle ? (
            <header class={{ header: true }}>{this.theTitle}</header>
          ) : null}
          <main class={{ main: true }}>
            <slot></slot>
          </main>
        </div>
      </Host>
    );
  }
}
