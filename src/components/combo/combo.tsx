import {
  Component,
  Host,
  h,
  Prop,
  State,
  Element,
  Event,
  EventEmitter,
} from "@stencil/core";
import { GxgFormText, IconPosition } from "../form-text/form-text";

@Component({
  tag: "gxg-combo",
  styleUrl: "combo.scss",
  shadow: true,
})
export class GxgCombo {
  /**
   * This event is triggered when the user clicks on an item. event.detail contains the item index, and item value.
   */
  @Event() itemClicked: EventEmitter;

  @Element() el: HTMLElement;
  @Prop() items: Array<object>;
  @Prop() width = "240px";
  @State() searchValue = "";
  @State() selectedItemValue = "";
  @State() showItems = false;
  @State() indexItemSelected: number;
  @State() inputTextIcon: string = undefined;
  @State() inputTextIconPosition: IconPosition = null;

  onInputGxgformText(e) {
    this.searchValue = e.target.value.toLowerCase();
    this.inputTextIconPosition = null;
  }

  showItemsFunc() {
    this.showItems = true;
  }

  detectClickOutsideCombo(event) {
    const comboMainContainer = this.el.shadowRoot.querySelector(
      ".main-container"
    ) as HTMLElement;

    const x = event.x;
    const y = event.y;

    //Contextual menu coordinates
    const comboMainContainerArea = comboMainContainer.getBoundingClientRect();
    if (
      x > comboMainContainerArea.left &&
      x < comboMainContainerArea.right &&
      y > comboMainContainerArea.top &&
      y < comboMainContainerArea.bottom
    ) {
      //Click happened inside the combo
    } else {
      this.showItems = false;
      //Click happened outside the combo
    }
  }

  componentDidLoad() {
    document.addEventListener("click", this.detectClickOutsideCombo.bind(this));
  }
  componentDidUnload() {
    document.removeEventListener("click", this.detectClickOutsideCombo);
  }

  itemClickedFunc(itemValue, itemIcon, index) {
    this.selectedItemValue = itemValue;
    if (itemIcon !== undefined) {
      this.inputTextIcon = itemIcon;
      this.inputTextIconPosition = "start";
    } else {
      this.inputTextIcon = null;
      this.inputTextIconPosition = null;
    }
    this.showItems = false;
    this.indexItemSelected = index;
    this.itemClicked.emit({ index: index, value: itemValue });
  }
  selecteItemFunc() {
    return this.selectedItemValue;
  }
  onClickInput() {
    this.showItems = true;
  }
  clearInputFunc() {
    this.searchValue = "";
    this.selectedItemValue = "";
    const gxgFormText = this.el.shadowRoot.getElementById("gxgFormText");
    ((gxgFormText as unknown) as GxgFormText).value = "";
    this.indexItemSelected = null;
    gxgFormText.focus();
    this.inputTextIconPosition = null;
  }

  noOcurrencesFound() {
    if (this.searchValue !== "") {
      let itemFound = false;
      for (const item of this.items) {
        if (
          item["value"].toLowerCase().includes(this.searchValue.toLowerCase())
        ) {
          itemFound = true;
          break;
        }
      }
      if (!itemFound) {
        return (
          <div class="no-courrences-found">
            No ocurrences found<span>crtl + backspace to erase</span>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <Host>
        <div class={{ "main-container": true }} style={{ width: this.width }}>
          <div class={{ "search-container": true }}>
            <gxg-form-text
              placeholder="Search item"
              onInput={(e) => this.onInputGxgformText(e)}
              onFocus={() => this.onClickInput()}
              value={this.selecteItemFunc()}
              id="gxgFormText"
              icon={this.inputTextIcon}
              iconPosition={this.inputTextIconPosition}
            ></gxg-form-text>
            <gxg-icon
              class={{ "arrow-down-icon": true }}
              type="navigation/arrow-down"
              onClick={this.showItemsFunc.bind(this)}
            ></gxg-icon>
            <gxg-icon
              class={{ "delete-icon": true }}
              type="menus/delete"
              onClick={() => this.clearInputFunc()}
            ></gxg-icon>
            <span class="layer"></span>
          </div>
          {this.showItems ? (
            <div class={{ "items-container": true }}>
              {this.items.map((item, i) => {
                return (
                  <div
                    class={{
                      item: true,
                      selected: i === this.indexItemSelected,
                      "exact-match":
                        item["value"].toLowerCase() ===
                        this.searchValue.toLowerCase(),
                      hidden: !item["value"]
                        .toLowerCase()
                        .includes(this.searchValue),
                    }}
                    onClick={() =>
                      this.itemClickedFunc(item["value"], item["icon"], i)
                    }
                  >
                    {item["icon"]
                      ? [
                          <gxg-icon
                            class={{ "custom-icon": true }}
                            type={item["icon"]}
                            color="auto"
                          ></gxg-icon>,
                          item["value"],
                        ]
                      : item["value"]}
                  </div>
                );
              })}
              {this.noOcurrencesFound()}
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}
