import { Component, h, Prop, Listen, Element } from "@stencil/core";
import { GxgTreeItemData, ToggleIconClicked } from "../tree-item/gxg-tree-item";
import { renderTreeItems } from "../tree/renderTreeItems";
@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true,
})
export class GxgTest {
  @Element() el: HTMLElement;
  tree!: HTMLGxgTreeElement;

  //Do not delete buttonTestExportParts property as this is for a specific purpose
  @Prop() buttonTestExportParts = false;
  //Do not delete treeItemsModel property as this is for a specific purpose
  @Prop() treeItemsModel: GxgTreeItemData[];
  //Do not delete lazyLoadTreeItems property as this is for a specific purpose
  @Prop() lazyLoadTreeItemsCallback: (
    treeItemId: string
  ) => Promise<GxgTreeItemData[]>;

  //Grid tests
  @Prop() showGrid = false;
  @Prop() showGridData = false;

  @Listen("toggleIconClicked")
  toggleIconClickedHandler(e: CustomEvent<ToggleIconClicked>) {
    const treeItemId = e.detail.id;
    const isLazy = e.detail.lazy;
    if (this.lazyLoadTreeItemsCallback && isLazy) {
      const promise = this.lazyLoadTreeItemsCallback(treeItemId);
      setTimeout(() => {
        promise.then((result) => {
          this.treeItemsModel = result;
        });
      }, 1000);
    }
  }

  /*Gxg-Tree Methods*/
  private closeTreeNodeHandler = () => {
    this.tree.toggleItems(["number-1-1-2"], false);
  };
  private openTreeNodeHandler = () => {
    this.tree.toggleItems(["number-1-1-2"], true);
  };
  private toggleTreeNodeHandler = () => {
    this.tree.toggleItems(["number-1-1-2"]);
  };
  private getSelectedItemsHandler = () => {
    (async () => {
      const selected = await this.tree.getSelectedItems();
      console.log(selected);
    })();
  };
  private getCheckedItemsHandler = () => {
    (async () => {
      const checked = await this.tree.getCheckedItems();
      console.log(checked);
    })();
  };
  private deleteNodeHandler = () => {
    this.treeItemsModel = [];
  };

  render() {
    if (this.buttonTestExportParts) {
      return <gxg-button part="exterior-part">Export parts tests</gxg-button>;
    } else if (this.treeItemsModel) {
      return [
        <gxg-tree checkbox checked>
          {renderTreeItems(this.treeItemsModel)}
        </gxg-tree>,

        <div class="tree-buttons">
          <gxg-button type="outlined" onClick={this.closeTreeNodeHandler}>
            Close 1-1-2
          </gxg-button>
          <gxg-button type="outlined" onClick={this.openTreeNodeHandler}>
            Open 1-1-2
          </gxg-button>
          <gxg-button type="outlined" onClick={this.toggleTreeNodeHandler}>
            Toggle 1-1-2
          </gxg-button>
          <gxg-button type="outlined" onClick={this.getSelectedItemsHandler}>
            Get Selected Items
          </gxg-button>
          <gxg-button type="outlined" onClick={this.getCheckedItemsHandler}>
            Get Checked Items
          </gxg-button>
          <gxg-button type="outlined" onClick={this.deleteNodeHandler}>
            Delete Tree
          </gxg-button>
        </div>,
      ];
    } else if (this.showGrid) {
      return (
        <gxg-grid>
          <ch-grid
            row-selection-mode="multiple"
            part="ch-grid-pending-for-updates"
            class="no-border"
          >
            <ch-grid-columnset>
              <ch-grid-column
                settingable={false}
                sortable={false}
                column-type="rich"
                rich-row-selector
                rich-row-selector-mode="mark"
              ></ch-grid-column>
              <ch-grid-column
                column-name="name"
                column-name-position="text"
                settingable={false}
              ></ch-grid-column>
              <ch-grid-column
                column-name="productos"
                column-name-position="text"
                settingable={false}
              ></ch-grid-column>
            </ch-grid-columnset>

            {this.showGridData && [
              <ch-grid-row rowid="123">
                <ch-grid-cell cell-type="rich" row-selector></ch-grid-cell>
                <ch-grid-cell>Nombre</ch-grid-cell>
                <ch-grid-cell>Productos</ch-grid-cell>
              </ch-grid-row>,
              <ch-grid-rowset>
                <ch-grid-rowset-legend>Identidad</ch-grid-rowset-legend>

                <ch-grid-row>
                  <ch-grid-cell cell-type="rich" row-selector></ch-grid-cell>
                  <ch-grid-cell>Nombre</ch-grid-cell>
                  <ch-grid-cell>Productos</ch-grid-cell>
                </ch-grid-row>
                <ch-grid-row>
                  <ch-grid-cell cell-type="rich" row-selector></ch-grid-cell>
                  <ch-grid-cell>English</ch-grid-cell>
                  <ch-grid-cell>Products</ch-grid-cell>
                </ch-grid-row>
                <ch-grid-row>
                  <ch-grid-cell cell-type="rich" row-selector></ch-grid-cell>
                  <ch-grid-cell>Português</ch-grid-cell>
                  <ch-grid-cell>Produtos</ch-grid-cell>
                </ch-grid-row>
              </ch-grid-rowset>,
            ]}
          </ch-grid>
        </gxg-grid>
      );
    } else {
      return <slot></slot>;
    }
  }
}

export type ObjectState = "inserted" | "modified" | "deleted" | "conflicted";
