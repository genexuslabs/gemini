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
} from "@stencil/core";
import { GxgListboxItem } from "../listbox-item/listbox-item";

@Component({
  tag: "gxg-listbox",
  styleUrl: "listbox.scss",
  shadow: true,
})
export class GxgListbox {
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

  @State() lastSelectedItemIndex: number | undefined = undefined;

  componentWillLoad() {
    //Set checkboxes
    if (this.checkboxes) {
      const items = this.el.querySelectorAll("gxg-listbox-item");
      items.forEach((item) => {
        const checkbox = document.createElement("gxg-form-checkbox");
        checkbox.setAttribute("slot", "checkbox");
        checkbox.setAttribute("tabindex", "-1");
        item.prepend(checkbox);
      });
    }
    //Set index and Tabindex
    const itemsNodeList = this.el.querySelectorAll("gxg-listbox-item");
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

    if (!e.detail.crtlKey && !e.detail.cmdKey && !e.detail.shiftKey) {
      //If ctrl and command and shift keys were not pressed, unselect previous selected items
      this.clearSelectedItems();
      this.selectItem(clickedItem);
      this.lastSelectedItemIndex = clickedItemIndex;
    } else if (e.detail.crtlKey || e.detail.cmdKey) {
      clickedItem.classList.toggle("selected");
      this.lastSelectedItemIndex = clickedItemIndex;
    } else if (e.detail.shiftKey) {
      if (this.lastSelectedItemIndex === undefined) {
        console.log("lastSelectedItemIndex is undefined");
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

    //Then select clicked item

    // if (!e.detail.crtlKey && !e.detail.cmdKey && !this.checkboxes) {
    //   const actualSelectedItems = this.el.querySelectorAll(".selected");
    //   if (actualSelectedItems.length > 0) {
    //     actualSelectedItems.forEach((item) => {
    //       item.classList.remove("selected");
    //       //set icon color to auto
    //       ((item as unknown) as GxgListboxItem).iconColor = "auto";
    //     });
    //   }
    // }
    // const actualSelectedItem = this.el.querySelector(
    //   "[index='" + e.detail["index"] + "']"
    // );
    // //checkbox
    // const actualSelectedItemCheckbox = actualSelectedItem.querySelector(
    //   "gxg-form-checkbox"
    // );
    // if (actualSelectedItem.classList.contains("selected")) {
    //   actualSelectedItem.classList.remove("selected");

    //   //set icon color to auto
    //   if (!e.detail.mouseClicked) {
    //     ((actualSelectedItem as unknown) as GxgListboxItem).iconColor = "auto";
    //     if (actualSelectedItemCheckbox !== null) {
    //       actualSelectedItemCheckbox.checked = false;
    //     }
    //   }
    // } else {
    //   actualSelectedItem.classList.add("selected");
    //   //set icon color to negative
    //   ((actualSelectedItem as unknown) as GxgListboxItem).iconColor =
    //     "negative";
    //   if (actualSelectedItemCheckbox !== null) {
    //     actualSelectedItemCheckbox.checked = true;
    //   }
    // }
    this.emmitSelectedItems();
  }

  selectMulitpleItems(fromIndex: number, toIndex: number) {
    for (let i = fromIndex; i <= toIndex; i++) {
      const item = this.el.querySelector("gxg-listbox-item[index='" + i + "']");
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
      });
    }
  }

  getItem(index) {
    return this.el.querySelector("gxg-listbox-item[index='" + index + "']");
  }

  selectItem(item) {
    item.classList.add("selected");
    //set icon color to negative
    ((item as unknown) as GxgListboxItem).iconColor = "negative";
  }

  @Listen("checkboxClicked")
  checkboxClickedHandler(e) {
    const actualSelectedItem = this.el.querySelector(
      "[index='" + e.detail["index"] + "']"
    );
    if (actualSelectedItem.classList.contains("selected")) {
      actualSelectedItem.classList.remove("selected");
    } else {
      actualSelectedItem.classList.add("selected");
    }
    this.emmitSelectedItems();
  }

  emmitSelectedItems() {
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

    this.selectionChanged.emit({
      ...selectedItemsArray,
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
