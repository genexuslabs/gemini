import { Component, Host, h, Prop, State } from "@stencil/core";

@Component({
  tag: "gxg-tree-grid-divs",
  styleUrl: "gxg-tree-grid-divs.scss",
  shadow: true,
})
export class GxgTreeGridDivs {
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

    this.rows.map((row) => {
      this.parseRows(row, 0);
    });
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

  parseRows(row, level) {
    let hasChildren = false;
    if (row.hasOwnProperty("children")) {
      hasChildren = true;
    }
    this.rowsBuffer.push(
      <div class={{ tr: true }}>
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
        this.parseRows(row, level + 1);
      });
    } else {
      return;
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
