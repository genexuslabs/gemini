import { Component, Host, Prop, h } from "@stencil/core";
@Component({
  tag: "gxg-tree",
  styleUrl: "gxg-tree.scss",
  shadow: false,
})
export class GxgTree {
  /**
   * The tree model (optional). An array of GxgTreeItem's items.
   */
  @Prop() model: GxgTreeItem[];

  /**
   * The base/parent tree configuration.
   */
  @Prop() config: GxgTreeConfig;

  /**
   * The base path for Gemini icon assets.
   */
  @Prop() basePath = "/build/icon-assets/";

  renderTree = (
    model: GxgTreeItem[],
    isFirstCall = true
  ): HTMLChTreeElement => {
    if (isFirstCall) {
      return (
        <ch-tree
          checkbox={this.config?.checkbox}
          checked={this.config?.checked}
          singleSelection={this.config?.singleSelection}
          toggleCheckboxes={this.config?.toggleCheckboxes}
        >
          {model.map((item: GxgTreeItem) => {
            return this.renderTreeItem(item);
          })}
        </ch-tree>
      );
    } else {
      return (
        <ch-tree slot="tree">
          {model.map((item: GxgTreeItem) => {
            return this.renderTreeItem(item);
          })}
        </ch-tree>
      );
    }
  };

  renderTreeItem = (item: GxgTreeItem): HTMLChTreeItemElement => {
    return item.items ? (
      <ch-tree-item
        id={item["id"]}
        leftIcon={this.getIcon(item["icon"])}
        checkbox={item["checkbox"]}
        checked={item["checked"]}
        disabled={item["disabled"]}
        indeterminate={item["indeterminate"]}
        selected={item["selected"]}
      >
        {item.name}
        {this.renderTree(item.items, false)}
      </ch-tree-item>
    ) : (
      <ch-tree-item
        checkbox={item["checkbox"]}
        checked={item["checked"]}
        disabled={item["disabled"]}
        leftIcon={this.getIcon(item["icon"])}
        id={item["id"]}
        indeterminate={item["indeterminate"]}
        opened={item["opened"]}
        selected={item["selected"]}
      >
        {item.name}
      </ch-tree-item>
    );
  };

  getIcon = (geminiIconType: string): string => {
    return `${this.basePath}${geminiIconType}.svg`;
  };

  render(): void {
    return (
      <Host>{this.model ? this.renderTree(this.model) : <slot></slot>}</Host>
    );
  }
}

export type GxgTreeConfig = {
  checkbox?: boolean;
  checked?: boolean;
  singleSelection?: boolean;
  toggleCheckboxes?: boolean;
};

export type GxgTreeItem = {
  checkbox?: boolean;
  checked?: boolean;
  disabled?: boolean;
  icon?: string;
  id: string;
  indeterminate?: boolean;
  items?: GxgTreeItem[];
  name: string;
  opened?: boolean;
  selected?: boolean;
};
