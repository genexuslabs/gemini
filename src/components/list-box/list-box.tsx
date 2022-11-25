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
import state from "../store";

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
   * The list-box width
   */
  @Prop() width = "240px";

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

  @Method()
  async getSelectedItems() {
    return [...this.selectedItems()];
  }

  @State() lastSelectedItemIndex: number | undefined = undefined;

  setUpItems() {
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

  setSelectedItem() {
    //1. If no list-box-item is initially selected, the first list-box-item should be selected
    //2. If the list-box is single-selection, only one list-box-item sould be selected.

    const selectedItems = this.el.querySelectorAll(
      "gxg-list-box-item[selected]"
    );
    if (selectedItems.length === 0) {
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
  itemLoadedHandler() {
    this.setUpItems();
    this.setSelectedItem();
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
    const actualSelectedItems = this.el.querySelectorAll(
      "gxg-list-box-item[selected]"
    );
    if (actualSelectedItems.length > 0) {
      actualSelectedItems.forEach((item) => {
        this.unselectItem(item);
      });
    }
  }

  getItem(index) {
    return this.el.querySelector("gxg-list-box-item[index='" + index + "']");
  }

  selectItem(item) {
    (item as HTMLElement).setAttribute("selected", "");
  }

  unselectItem(item) {
    (item as HTMLElement).removeAttribute("selected");
  }

  toggleItem(item) {
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

  emmitSelectedItems() {
    this.selectionChanged.emit([...this.selectedItems()]);
  }

  render() {
    return (
      <Host class={{ large: state.large }}>
        <div
          style={{
            width: this.width,
            minWidth: this.minWidth,
            maxWidth: this.maxWidth,
          }}
          class={{ container: true }}
        >
          {this.theTitle ? (
            <header class={{ header: true }}>{this.theTitle}</header>
          ) : null}
          <main class={{ main: true }} style={{ height: this.height }}>
            <slot></slot>
          </main>
        </div>
      </Host>
    );
  }
}
