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
  @Prop() config: GxgTreeConfig = {
    checkbox: true,
    checked: false,
    singleSelection: true,
    toggleCheckboxes: true,
  };

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
          checkbox={this.config?.checkbox ?? true}
          checked={this.config?.checked ?? false}
          singleSelection={this.config?.singleSelection ?? true}
          toggleCheckboxes={this.config?.toggleCheckboxes ?? true}
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
    let opened = true;
    if (!item.opened && !item.items) {
      opened = false;
    } else if (item.opened && item.items) {
      opened = item.opened;
    }
    console.log(item);
    return (
      <ch-tree-item
        id={item["id"]}
        leftIcon={this.getIcon(item.icon)}
        checkbox={item.checkbox}
        checked={item.checked}
        disabled={item.disabled}
        indeterminate={item.indeterminate}
        opened={opened}
        selected={item.selected}
      >
        {[item.name, item.items && this.renderTree(item.items, false)]}
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
