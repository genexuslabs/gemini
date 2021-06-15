import {
  Component,
  Host,
  h,
  Prop,
  Element,
  Event,
  EventEmitter,
  Listen,
} from "@stencil/core";

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
  @Prop() title = "";

  /**
   * The listbox width
   */
  @Prop() width = "280px";
  /**
   * The prescence of this attribute will display a checkbox for every item
   */
  @Prop() checkboxes = false;

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
    console.log("item clicked");
    if (!e.detail.crtlKey && !this.checkboxes) {
      const actualSelectedItems = this.el.querySelectorAll(".selected");
      if (actualSelectedItems.length > 0) {
        actualSelectedItems.forEach((item) => {
          item.classList.remove("selected");
          const checkbox = item.querySelector("gxg-form-checkbox");
          if (checkbox !== null) {
            checkbox.checked = false;
          }
        });
      }
    }
    const actualSelectedItem = this.el.querySelector(
      "[index='" + e.detail["index"] + "']"
    );
    const actualSelectedItemCheckbox = actualSelectedItem.querySelector(
      "gxg-form-checkbox"
    );
    if (actualSelectedItem.classList.contains("selected")) {
      actualSelectedItem.classList.remove("selected");
      if (actualSelectedItemCheckbox !== null) {
        actualSelectedItemCheckbox.checked = false;
      }
    } else {
      actualSelectedItem.classList.add("selected");
      if (actualSelectedItemCheckbox !== null) {
        actualSelectedItemCheckbox.checked = true;
      }
    }
    this.emmitSelectedItems();
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
          <header class={{ header: true }}>{this.title}</header>
          <main class={{ main: true }}>
            <slot></slot>
          </main>
        </div>
      </Host>
    );
  }
}
