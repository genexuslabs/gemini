import { Component, Host, h, Prop, State } from "@stencil/core";

@Component({
  tag: "gxg-tree-grid",
  styleUrl: "gxg-tree-grid.scss",
  shadow: true,
})
export class GxgTreeGrid {
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
    this.rowsBuffer.push(
      <tr>
        {Object.keys(row["cells"]).map((td, i) => (
          <td
            style={{
              paddingLeft: this.tdPaddingLeft(i, level),
            }}
          >
            hola
          </td>
        ))}
      </tr>
    );
    if (row.hasOwnProperty("children")) {
      row["children"].map((row) => {
        this.parseRows(row, level + 1);
      });
    } else {
      return;
    }
  }

  tdPaddingLeft(i, level) {
    if (i === 0) {
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
        <table style={{ width: this.width }}>
          <thead>
            <tr>
              {this.columns.map((th) => {
                return (
                  <th
                    style={{
                      width: this.thWidth(th),
                    }}
                    id={th["name"]}
                  >
                    {th["displayName"]}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>{this.rowsBuffer}</tbody>
        </table>
      </Host>
    );
  }
}
