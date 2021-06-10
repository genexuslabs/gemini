import { Component, Host, h, Prop, State, Element } from "@stencil/core";

@Component({
  tag: "gxg-combo",
  styleUrl: "combo.scss",
  shadow: true,
})
export class GxgCombo {
  @Element() el: HTMLElement;
  @Prop() items: Array<Record<string, any>>;
  @State() searchValue = "";
  @State() selectedItemValue = "";
  @State() showItems = false;
  @State() indexItemSelected: number;

  onInputGxgformText(e) {
    this.searchValue = e.target.value.toLowerCase();
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

  componentWillLoad() {
    console.log(this.items);
  }

  componentDidLoad() {
    document.addEventListener("click", this.detectClickOutsideCombo.bind(this));
  }
  componentDidUnload() {
    document.removeEventListener("click", this.detectClickOutsideCombo);
  }

  itemClickedFunc(itemValue, index) {
    this.selectedItemValue = itemValue;
    this.showItems = false;
    this.indexItemSelected = index;
  }
  selecteItemFunc() {
    return this.selectedItemValue;
  }

  render() {
    console.log("this.searchValue", this.searchValue);
    return (
      <Host>
        <div class={{ "main-container": true }}>
          <div class={{ "search-container": true }}>
            <gxg-form-text
              placeholder="Search item"
              // onInput={this.onInputGxgformText()}
              onInput={(e) => this.onInputGxgformText(e)}
              value={this.selecteItemFunc()}
            ></gxg-form-text>
            <gxg-icon
              class={{ "arrow-down-icon": true }}
              type="navigation/arrow-down"
              onClick={this.showItemsFunc.bind(this)}
            ></gxg-icon>
            <gxg-icon
              class={{ "delete-icon": true }}
              type="menus/delete"
            ></gxg-icon>
            <span class="layer"></span>
          </div>
          {this.showItems ? (
            <div class={{ "items-container": true }}>
              {this.items.map((item, i) => {
                // return item["value"].toLowerCase().includes(this.searchValue) ||
                //   this.searchValue === "" ? (
                //   <div
                //     class={{
                //       item: true,
                //       selected: i === this.indexItemSelected,
                //     }}
                //     onClick={(e) => this.itemClickedFunc(item["value"], i)}
                //   >
                //     {[
                //       <gxg-icon
                //         class={{ "custom-icon": true }}
                //         type={item["icon"]}
                //         color="auto"
                //       ></gxg-icon>,
                //       item["value"],
                //     ]}
                //   </div>
                // ) : null;
                return (
                  <div
                    class={{
                      item: true,
                      selected: i === this.indexItemSelected,
                      hidden: !item["value"]
                        .toLowerCase()
                        .includes(this.searchValue),
                    }}
                    onClick={(e) => this.itemClickedFunc(item["value"], i)}
                  >
                    {[
                      <gxg-icon
                        class={{ "custom-icon": true }}
                        type={item["icon"]}
                        color="auto"
                      ></gxg-icon>,
                      item["value"],
                    ]}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}
