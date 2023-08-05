import { Component, Host, Prop, h, Method } from "@stencil/core";
@Component({
  tag: "gxg-tree",
  styleUrl: "gxg-tree.scss",
  shadow: false,
})
export class GxgTree {
  chTree!: HTMLChTreeElement;

  /**
   * The tree model (optional). An array of GxgTreeItem's items.
   */
  @Prop() model: GxgTreeItem[];

  /**
   * The base/parent tree configuration.
   */
  @Prop() config: GxgTreeConfig = {
    opened: true,
  };

  /**
   * The base path for Gemini icon assets.
   */
  @Prop() basePath = "/build/icon-assets/";

  /**
   * @returns an array of the ch-tree-items that are checked. Each array item is an object with "id" and "innerText".
   */
  @Method()
  async getChecked(): Promise<any[]> {
    return await this.chTree.getChecked();
  }

  renderTree = (model: GxgTreeItem[], isFirstCall = true): HTMLElement => {
    console.log("config", this.config);
    if (isFirstCall) {
      return (
        <ch-tree
          checkbox={this.config?.checkbox ?? true}
          checked={this.config?.checked ?? false}
          toggleCheckboxes={this.config?.toggleCheckboxes ?? true}
          ref={(el) => (this.chTree = el as HTMLChTreeElement)}
        >
          {model.map((item: GxgTreeItem) => {
            return this.renderTreeItem(item, this.config);
          })}
        </ch-tree>
      );
    } else {
      return (
        <ch-tree slot="tree">
          {model.map((item: GxgTreeItem) => {
            return this.renderTreeItem(item, this.config);
          })}
        </ch-tree>
      );
    }
  };

  renderTreeItem = (item: GxgTreeItem, config: GxgTreeConfig): HTMLElement => {
    let opened;
    const masterTreeOpened = config?.opened ?? true;
    return (
      <ch-tree-item
        id={item.id}
        leftIcon={this.getIcon(item.icon)}
        checkbox={item.checkbox}
        checked={false}
        disabled={item.disabled}
        indeterminate={item.indeterminate}
        opened={opened || masterTreeOpened}
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
  toggleCheckboxes?: boolean;
  opened: boolean;
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
