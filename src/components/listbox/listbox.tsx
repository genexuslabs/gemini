import {
  Component,
  Host,
  h,
  Prop,
  Element,
  Event,
  EventEmitter,
} from "@stencil/core";
import { GxgFormCheckbox } from "../form-checkbox/form-checkbox";

@Component({
  tag: "gxg-listbox",
  styleUrl: "listbox.scss",
  shadow: true,
})
export class GxgListbox {
  @Event() selectionChanged: EventEmitter;
  @Element() el: HTMLElement;

  /**
   * The listbox title that appears on the header
   */
  @Prop() title = "";
  /**
   * That array of items as objects. example: {icon: "objects/business-process-diagram", value: "BPM"}
   */
  @Prop() items: Array<object>;
  /**
   * The listbox width
   */
  @Prop() width = "280px";
  /**
   * The prescence of this attribute will display a checkbox for every item
   */
  @Prop() checkboxes = false;

  onChangeFunc() {
    //get all checked items
    const checkedItems = [];
    const items = this.el.shadowRoot.querySelectorAll(".item");
    items.forEach((item, i) => {
      const checkbox = item.querySelector(".checkbox");
      const checkboxChecked = ((checkbox as unknown) as GxgFormCheckbox)
        .checked;
      if (checkboxChecked) {
        item.classList.add("selected");
        checkedItems.push({
          index: i,
          value: item.getAttribute("data-value"),
        });
      } else {
        item.classList.remove("selected");
      }
    });
    this.selectionChanged.emit(checkedItems);
  }

  itemClicked(e) {
    if (!this.checkboxes) {
      const selectedItemsArray = [];
      if (!e.ctrlKey) {
        // clear previously selected items
        const selectedItems = this.el.shadowRoot.querySelectorAll(
          ".item.selected"
        );
        selectedItems.forEach((item) => {
          item.classList.remove("selected");
        });
      }
      //set selected item
      if ((e.target as HTMLElement).classList.contains("selected")) {
        (e.target as HTMLElement).classList.remove("selected");
      } else {
        (e.target as HTMLElement).classList.add("selected");
      }

      const items = this.el.shadowRoot.querySelectorAll(".item");
      items.forEach((item, i) => {
        if (item.classList.contains("selected")) {
          selectedItemsArray.push({
            index: i,
            value: item.getAttribute("data-value"),
          });
        }
      });
      this.selectionChanged.emit(selectedItemsArray);
    }
  }

  render() {
    return (
      <Host>
        <div style={{ width: this.width }} class={{ container: true }}>
          <header class={{ header: true }}>{this.title}</header>
          <main class={{ main: true }}>
            {this.items.map((item) => {
              return (
                <div
                  data-value={item["value"]}
                  class={{ item: true }}
                  onClick={this.itemClicked.bind(this)}
                >
                  {this.checkboxes ? (
                    <gxg-form-checkbox
                      onChange={this.onChangeFunc.bind(this)}
                      class={{ checkbox: true }}
                    ></gxg-form-checkbox>
                  ) : null}
                  {item["icon"] ? (
                    <gxg-icon
                      class="icon"
                      color="auto"
                      type={item["icon"]}
                    ></gxg-icon>
                  ) : null}
                  {item["value"]}
                </div>
              );
            })}
          </main>
        </div>
      </Host>
    );
  }
}
