import { Component, h, Host, Element, State } from "@stencil/core";

@Component({
  tag: "gxg-tree-item",
  styleUrl: "tree-item.scss",
  shadow: true
})
export class TreeItem {
  @Element() el: HTMLElement;
  @State() hasChilds = false;
  @State() open = false;
  @State() numberOfChildItems: number;
  @State() treeContainerMaxHeight: string;

  componentDidLoad() {
    const slottedTreeContainer = this.el.shadowRoot
      .querySelector("slot")
      .assignedNodes()[1];

    if (slottedTreeContainer !== undefined) {
      this.hasChilds = true;
      this.numberOfChildItems = slottedTreeContainer.childNodes.length - 1;
      this.treeContainerMaxHeight = 17.5 * this.numberOfChildItems + "px";
      this.el.style.setProperty(
        "--treeContainerMaxHeight",
        this.treeContainerMaxHeight
      );

      //set animation duration
      const animationDuration = this.numberOfChildItems * 0.03 + "s";
      this.el.style.setProperty("--animation-duration", animationDuration);
    }
    this.el.style.setProperty("--treeContainerMaxHeight", "0");
  }

  insertIcon() {
    if (!this.hasChilds) {
      return <gxg-icon size="small" slot="icon" type="minus-circle"></gxg-icon>;
    } else if (this.open) {
      return <gxg-icon size="small" slot="icon" type="add-circle"></gxg-icon>;
    } else {
      return <gxg-icon size="small" slot="icon" type="add-circle"></gxg-icon>;
    }
  }

  handleClick(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget === this.el.shadowRoot.querySelector(":scope > li")) {
      this.open = !this.open;
    }
  }

  render() {
    return (
      <Host
        style={{
          "--treeContainerMaxHeight": this.open
            ? this.treeContainerMaxHeight
            : "0"
        }}
      >
        <li
          class={{
            closed: !this.open,
            "has-childs": this.hasChilds
          }}
        >
          {this.hasChilds ? (
            <span class="li__icon" onClick={this.handleClick.bind(this)}></span>
          ) : (
            ""
          )}
          <span class="slotted-container">
            <slot></slot>
          </span>
        </li>
      </Host>
    );
  }
}
