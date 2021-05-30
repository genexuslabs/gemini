import { Component, Host, h, Prop, State, Element } from "@stencil/core";
import Split from "split.js";

@Component({
  tag: "gxg-tree-grid-divs",
  styleUrl: "gxg-tree-grid-divs.scss",
  shadow: true,
})
export class GxgTreeGridDivs {
  @Element() el: HTMLElement;

  // PROPS
  @Prop() columns: Array<object>;
  @Prop() rows: Array<object>;
  @Prop() width = "100%";

  //STATE
  /**
   * The width in percetage asigned to each of the th's that no width was asigned on initialization.
   */
  @State() thWidthLeftover: string;
  @State() rowsBuffer = [];
  @State() thInPixels = false;
  @State() rowKey = 0;

  componentWillLoad() {
    //Check if th width is in percentages or pixels
    this.checkThWidthUnit();

    //Table width - if th widths are in pixels, table width should be auto.
    if (this.thInPixels) {
      this.width = "auto";
    }

    //Set th width leftover (only if th widhts are in percentages)
    if (!this.thInPixels) {
      this.calculateThWitdhLeftover();
    }

    this.rows.map((row, i) => {
      this.parseRows(row, 0, i);
    });
  }

  componentDidLoad() {
    //Spliter
    // var name = this.el.shadowRoot.getElementById("name");
    // var type = this.el.shadowRoot.getElementById("type");
    // var telephone = this.el.shadowRoot.getElementById("telephone");
    // Split([name, type, telephone], {
    //   gutterSize: 2,
    //   cursor: "col-resize",
    // });
  }

  checkThWidthUnit() {
    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns[i].hasOwnProperty("width")) {
        if (this.columns[i]["width"].includes("px")) {
          this.thInPixels = true;
          break;
        }
      }
    }
  }

  parseRows(row, level, i) {
    this.rowKey++;
    const rowKey = this.rowKey;
    let hasChildren = false;
    if (row.hasOwnProperty("children")) {
      hasChildren = true;
    }
    this.rowsBuffer.push(
      <div
        class={{ tr: true }}
        onClick={(e) => this.trClick(rowKey, e)}
        data-key={this.rowKey}
      >
        {Object.keys(row["cells"]).map((td, i) => (
          <div
            class={{ td: true }}
            style={{
              paddingLeft: this.tdPaddingLeft(i, level),
            }}
          >
            {hasChildren && i === 0 ? (
              <div class={{ "icon-text-container": true }}>
                {this.arrowIcon(i, hasChildren)}
                {row["cells"][td]}
              </div>
            ) : (
              row["cells"][td]
            )}
          </div>
        ))}
      </div>
    );
    if (row.hasOwnProperty("children")) {
      row["children"].map((row) => {
        this.parseRows(row, level + 1, i);
      });
    } else {
      return;
    }
  }

  trClick(rowKey, e) {
    //if ctrl key was not pressed
    if (!e.ctrlKey && !e.shiftKey) {
      //remove previously added classses
      const rows = this.el.shadowRoot.querySelectorAll(".tbody .tr");
      rows.forEach((row) => {
        row.classList.remove("selected");
      });
    }
    //Add 'selected' class to the currently clicked tr
    const rowClicked = this.el.shadowRoot.querySelector(
      "[data-key='" + rowKey + "']"
    );

    //if ctrl key was pressed
    if (e.ctrlKey) {
      if (rowClicked.classList.contains("selected")) {
        rowClicked.classList.remove("selected");
      } else {
        rowClicked.classList.add("selected");
      }
    } else {
      rowClicked.classList.add("selected");
    }

    //if shift key was pressed
    if (e.shiftKey) {
      const itemsSelected = this.el.shadowRoot.querySelectorAll(
        ".tbody .tr.selected"
      );
      const firstRowSelectedDataKey = itemsSelected[0].getAttribute("data-key");
      const lastRowSelectedDataKey = itemsSelected[1].getAttribute("data-key");
      const allRows = this.el.shadowRoot.querySelectorAll(".tbody .tr");
      allRows.forEach((row) => {
        const rowDataKey = row.getAttribute("data-key");
        if (
          rowDataKey > firstRowSelectedDataKey &&
          rowDataKey < lastRowSelectedDataKey
        ) {
          row.classList.add("selected");
        }
      });
    }
  }

  arrowIcon(i, hasChildren) {
    if (i === 0 && hasChildren) {
      return (
        <gxg-icon
          type="navigation/chevron-down"
          onClick={this.toggleRow.bind(this)}
        ></gxg-icon>
      );
    }
  }

  toggleRow() {
    console.log(this.columns);
  }

  tdPaddingLeft(i, level) {
    if (i === 0 && level !== 0) {
      return level * 20 + "px";
    }
  }

  calculateThWitdhLeftover() {
    let totalThWidthDefined = 0;
    let numberOfThWithoutWidthDefined = 0;
    this.columns.forEach((th) => {
      if (th["width"] !== undefined) {
        totalThWidthDefined += parseInt(
          th["width"].substring(0, th["width"].length - 1)
        );
      } else {
        numberOfThWithoutWidthDefined++;
      }
    });
    this.thWidthLeftover =
      (100 - totalThWidthDefined) / numberOfThWithoutWidthDefined + "%";
  }

  thWidth(th) {
    if (th["width"] !== undefined) {
      return th["width"];
    } else {
      return this.thWidthLeftover;
    }
  }

  render() {
    return (
      <Host>
        <div class={{ table: true }} style={{ width: this.width }}>
          <div class={{ tr: true }}>
            {this.columns.map((th) => {
              return (
                <div
                  class={{ th: true }}
                  style={{
                    width: this.thWidth(th),
                  }}
                  id={th["name"]}
                >
                  {th["displayName"]}
                </div>
              );
            })}
          </div>
          <div
            class={{
              tbody: true,
            }}
          >
            {this.rowsBuffer}
          </div>
        </div>
      </Host>
    );
  }
}
