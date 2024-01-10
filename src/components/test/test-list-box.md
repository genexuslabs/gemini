import { Component, h, Element, State, Watch } from "@stencil/core";
@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true
})
export class GxgTest {
  @Element() el: HTMLElement;

  @State() kbs: Array<object> = [];

  @Watch("kbs")
  watchKbsHandler() {}

  private selectionHasChanged = e => {
    console.log(e.detail);
  };

  private updateKbs1 = () => {
    this.kbs = [
      {
        id: "uva",
        name: "uva",
        selected: false
      },
      {
        id: "manzana",
        name: "manzana",
        selected: false
      },
      {
        id: "pera",
        name: "pera",
        selected: false
      }
    ];
  };
  private updateKbs2 = () => {
    this.kbs = [
      {
        id: "uva",
        name: "uva",
        selected: false
      },
      {
        id: "manzana",
        name: "manzana",
        selected: true
      },
      {
        id: "pera",
        name: "pera",
        selected: false
      }
    ];
  };
  private updateKbs3 = () => {
    this.kbs = [
      {
        id: "uva",
        name: "uva",
        selected: false
      },
      {
        id: "manzana",
        name: "manzana",
        selected: true
      },
      {
        id: "pera",
        name: "pera",
        selected: true
      }
    ];
  };
  private unselectLast = () => {
    this.kbs = [
      {
        id: "uva",
        name: "uva",
        selected: false
      },
      {
        id: "manzana",
        name: "manzana",
        selected: true
      },
      {
        id: "pera",
        name: "pera",
        selected: false
      }
    ];
  };

  private singleSelectionChanged = e => {
    console.log(e.detail);
  };

  componentDidLoad(): void {}

  render() {
    return [
      <div>
        <p>single selection</p>
        <gxg-list-box
          singleSelection
          // disabled={this.selectionKbDisabled}
          // ref={(el: HTMLElement) => (this.listBoxEl = el)}
          part="kbs"
          onSelectionChanged={this.singleSelectionChanged}
        >
          {this.kbs.map(kb => (
            <gxg-list-box-item
              value={kb["id"]}
              key={kb["id"]}
              selected={kb["selected"]}
            >
              {kb["name"]}
            </gxg-list-box-item>
          ))}
        </gxg-list-box>
      </div>,
      <br />,
      <div>
        <p>single selection allows empty</p>
        <gxg-list-box
          // disabled={this.selectionKbDisabled}
          // ref={(el: HTMLElement) => (this.listBoxEl = el)}
          onSelectionChanged={this.selectionHasChanged}
          part="kbs"
          // onSelectionChanged={this.kbsOnSelectionChangedHandler}
        >
          {this.kbs.map(kb => (
            <gxg-list-box-item
              value={kb["id"]}
              key={kb["id"]}
              selected={kb["selected"]}
            >
              {kb["name"]}
            </gxg-list-box-item>
          ))}
        </gxg-list-box>
      </div>,
      <br />,
      <div>
        <p>multi selection allows empty</p>
        <gxg-list-box
          // disabled={this.selectionKbDisabled}
          // ref={(el: HTMLElement) => (this.listBoxEl = el)}
          singleSelection
          allowsEmpty
          onSelectionChanged={this.selectionHasChanged}
          part="kbs"
          // onSelectionChanged={this.kbsOnSelectionChangedHandler}
        >
          {this.kbs.map(kb => (
            <gxg-list-box-item
              value={kb["id"]}
              key={kb["id"]}
              selected={kb["selected"]}
            >
              {kb["name"]}
            </gxg-list-box-item>
          ))}
        </gxg-list-box>
      </div>,
      <br />,
      <div>
        <p>multi selection</p>
        <gxg-list-box
          // disabled={this.selectionKbDisabled}
          // ref={(el: HTMLElement) => (this.listBoxEl = el)}
          allowsEmpty
          onSelectionChanged={this.selectionHasChanged}
          part="kbs"
          // onSelectionChanged={this.kbsOnSelectionChangedHandler}
        >
          {this.kbs.map(kb => (
            <gxg-list-box-item
              value={kb["id"]}
              key={kb["id"]}
              selected={kb["selected"]}
            >
              {kb["name"]}
            </gxg-list-box-item>
          ))}
        </gxg-list-box>
      </div>,
      <br />,
      <div>
        <button onClick={this.updateKbs1}>No selected</button>
        <button onClick={this.updateKbs2}>Second selected</button>
        <button onClick={this.updateKbs3}>Second & third selected</button>
        <button onClick={this.unselectLast}>Unselect last</button>
      </div>
    ];
  }
}
