import {
  Component,
  Event,
  EventEmitter,
  Element,
  Host,
  Prop,
  State,
  h,
  Watch,
  Method,
} from "@stencil/core";
import { Color } from "../icon/icon";
import { GxgTree } from "../tree/gxg-tree";
import { exportParts } from "../../common/export-parts";
import { getSiblings } from "../../common/get-siblings";

@Component({
  tag: "gxg-tree-item",
  styleUrl: "gxg-tree-item.scss",
  shadow: true,
  assetsDirs: ["tree-item-assets"],
})
export class GxgTreeItem {
  private parts = {
    item: "item",
    checkbox: "checkbox",
    toggleButton: "toggle-button",
  };
  private exportparts: string;
  checkboxInput!: HTMLInputElement;

  //PROPS

  /**
   * A reference for the master tree (the first tree). This is only needed if using the model, instead of using common markup.
   */
  @Prop() masterTree: HTMLGxgTreeElement;

  /**
   * Set this attribute if you want this item to display a checkbox. This attribute is affected by the parent tree-item checkbox attribute, unless it is set in this item.
   */
  @Prop({ mutable: true }) checkbox: boolean = undefined;

  /**
   * Set this attribute if you want this item to be checked by default. This attribute is affected by the parent tree-item checked attribute, unless it is set in this item.
   */
  @Prop({ mutable: true }) checked: boolean = undefined;

  /**
   * Set this attribute if you want this items child tree to be opened by default. This attribute is affected by the parent tree-item opened attribute, unless it is set in this item.
   */
  @Prop() opened: boolean = undefined;

  /**
   * Set this attribute if you want all the children item's checkboxes to be toggled when this item checkbox is toggled. This attribute is affected by the parent tree-item toggleCheckboxes attribute, unless it is set in this item.
   */
  @Prop() toggleCheckboxes: boolean = undefined;

  /**
   * The presence of this attribute sets the tree-item as selected
   */
  @Prop({ mutable: true }) selected = false;

  /**
   * Set this attribute if this tree-item has a resource to be downloaded;
   */
  @Prop() readonly download: boolean = false;

  /**
   * Set this attribute when you are downloading a resource
   */
  @Prop() readonly downloading: boolean = false;

  /**
   * Set this attribute when you have downloaded the resource
   */
  @Prop() readonly downloaded: boolean = false;

  /**
   * Set the left side icon from the available Gemini icon set : https://gx-gemini.netlify.app/?path=/story/icons-icons--controls
   */
  @Prop() readonly leftIcon: string;

  /**
   * Set the right side icon from the available Gemini icon set : https://gx-gemini.netlify.app/?path=/story/icons-icons--controls
   */
  @Prop() readonly rightIcon: string;

  /**
   * The presence of this attribute displays a +/- icon to toggle/untoggle the tree
   */
  @Prop({ mutable: true }) isLeaf = true;

  /**
   * This property is for passing a tree structure from the tree.
   */
  @Prop() treeModel: HTMLGxgTreeElement;

  //PROPS
  @Prop({ mutable: true }) hasChildTree = false;
  @Prop({ mutable: true }) firstTreeItem = false;
  @Prop({ mutable: true }) indeterminate: boolean;
  @Prop() readonly disabled: boolean = false;

  //STATE
  @State() numberOfParentTrees = 1;
  private itemPaddingLeftValue = 0;
  //@State() verticalLineHeight: string;
  @State() horizontalLinePaddingLeft = 0;
  @State() lastTreeItem = false;
  @State() firstTreeItemOfParentTree = false;
  @State() lastTreeItemOfParentTree = false;
  @State() rightIconColor: Color = "auto";
  @State() numberOfVisibleDescendantItems = 0;
  private directVisibleItemsLength = 0;

  //EVENTS
  @Event() liItemClicked: EventEmitter;
  @Event() toggleIconClicked: EventEmitter;

  /**
   * Emits the checkbox information (chTreeItemData) that includes: the id, name(innerText) and checkbox value.
   */
  @Event() checkboxClickedEvent: EventEmitter<GxgTreeItemDataEmmited>;

  @Element() el: HTMLGxgTreeItemElement;

  componentWillLoad() {
    //Count number of parent trees in order to set the appropriate padding-left
    this.numberOfParentTrees = this.getParentsNumber(this.el);
    this.directVisibleItemsLength = this.getNumberOfDirectVisibleDescendantItems();
    //If tree item has not a tree-item inside, is leaf
    const treeItemHasTree = this.el.querySelector('[slot="tree"]');
    if (treeItemHasTree) {
      this.isLeaf = false;
    }
    //If is first item of tree
    const prevItem = this.el.previousElementSibling;
    if (prevItem === null) {
      this.firstTreeItem = true;
    }
    //If is last item of tree
    const nextItem = this.el.nextElementSibling;
    if (nextItem === null) {
      this.lastTreeItem = true;
    }
    //If is first item of parent Tree
    if (this.numberOfParentTrees === 1) {
      const prevItem = this.el.previousElementSibling;
      if (prevItem === null) {
        this.firstTreeItemOfParentTree = true;
      }
    }
    //Set right icon color
    if (this.download && this.rightIcon.includes("download")) {
      this.rightIconColor = "primary-enabled";
    } else if (this.disabled) {
      this.rightIconColor = "disabled";
    }
    //If this tree item has a source to download, this item has child tree, and is not leaf. Also, set the tree as not open
    if (this.download) {
      this.hasChildTree = true;
      this.isLeaf = false;
      this.opened = false;
    }
    this.cascadeConfig();
    this.attachExportParts();
  }

  private cascadeConfig = () => {
    //Cascade configuration (set some properties based on the parent tree configuration, unless this item has this properties already set.
    const parentTree: HTMLGxgTreeElement = this.el
      .parentElement as HTMLGxgTreeElement;

    this.checkbox =
      this.checkbox !== undefined ? this.checkbox : parentTree.checkbox;
    this.checked =
      this.checked !== undefined ? this.checked : parentTree.checked;
    this.opened = this.opened !== undefined ? this.opened : parentTree.opened;
    this.toggleCheckboxes =
      this.toggleCheckboxes !== undefined
        ? this.toggleCheckboxes
        : parentTree.checkbox;
  };

  private attachExportParts = (): void => {
    const part = this.el.getAttribute("part");
    const exportPartsResult = exportParts(part, this.parts);
    exportPartsResult.length && (this.exportparts = exportPartsResult);
  };

  getNumberOfVisibleDescendantItems(item: HTMLGxgTreeItemElement) {
    return this.countNumberOfVisibleDescendantItems(item);
  }

  getNumberOfDirectVisibleDescendantItems() {
    let count = 0;
    const directTree = this.el.querySelector(":scope > gxg-tree");
    const directVisibleChildrenItems = directTree?.querySelectorAll(
      ":scope > gxg-tree-item"
    );
    if (directTree && directVisibleChildrenItems) {
      count = directVisibleChildrenItems.length;
    }
    return count;
  }

  private countNumberOfVisibleDescendantItems = (
    item: HTMLGxgTreeItemElement,
    firstItem = true
  ): number => {
    if (item.isLeaf || !item.opened) {
      return 1;
    }
    const directTree = item.querySelector(":scope > gxg-tree");
    let directItemsNodelist: NodeList;
    if (directTree) {
      directItemsNodelist = directTree.querySelectorAll(
        ":scope > gxg-tree-item.visible"
      );
    } else {
      return 1;
    }
    const length = directItemsNodelist?.length;
    let count = firstItem ? 0 : 1;
    if (length) {
      Array.from(directItemsNodelist).forEach(
        (item: HTMLGxgTreeItemElement, i) => {
          count += this.countNumberOfVisibleDescendantItems(item, false);
        }
      );
    } else {
      return 1;
    }
    return count;
  };

  setVisibleTreeItems() {
    const directTree = this.el.querySelector(":scope > gxg-tree");
    if (directTree !== null) {
      const directTreeDirectTreeItems = directTree.querySelectorAll(
        ":scope > gxg-tree-item"
      );
      if (this.opened) {
        directTreeDirectTreeItems.forEach((item) => {
          item.classList.remove("not-visible");
          item.classList.add("visible");
        });
      } else {
        directTreeDirectTreeItems.forEach((item) => {
          item.classList.remove("visible");
          item.classList.add("not-visible");
        });
      }
    }
  }

  componentDidLoad() {
    this.setVisibleTreeItems();
    const numberOfVisibleDescendants = this.getNumberOfVisibleDescendantItems(
      this.el
    );
    this.numberOfVisibleDescendantItems = numberOfVisibleDescendants;
  }

  @Watch("downloaded")
  watchHandler(newValue: boolean) {
    if (newValue) {
      //this.updateTreeVerticalLineHeight();
    }
  }

  getParentsNumber(elem) {
    let count = 0;
    let parentElement = elem.parentElement;

    while (parentElement?.nodeName === "GXG-TREE") {
      count++;
      parentElement = parentElement.parentElement?.parentElement;
    }
    return count;
  }

  toggleTreeIconClicked() {
    if (this.opened) {
      this.opened = false;
    } else {
      this.opened = true;
    }
    this.setVisibleTreeItems();
    //this.toggleIconClicked.emit();
    const event = this.toggleIconClicked.emit();
    event.stopPropagation();
    event.preventDefault();
  }

  @Method()
  async updateTreeVerticalLineHeight() {
    this.getNumberOfVisibleDescendantItems(this.el);
  }

  liTextClicked() {
    this.liItemClicked.emit();
    this.selected = true;
  }

  liTextDoubleClicked() {
    this.toggleTreeIconClicked();
  }

  liTextKeyDownPressed(e) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault(); //prevents scrolling
    }
    //ENTER
    if (e.key === "Enter") {
      //Enter should check/uncheck the checkbox (if present)
      this.checkboxClicked();
      if (this.download) {
        //If the item has a resource to be downloaded, download.
        this.el.click();
      }
    }
    //LEFT/RIGHT NAVIGATION
    if (e.key === "ArrowRight" && !this.isLeaf) {
      //Toggle the tree
      if (!this.opened) {
        this.opened = true;
      } else {
        const childTree = this.el.querySelector("gxg-tree");
        const childTreeFirstChildren = childTree.querySelector("gxg-tree-item");
        const childTreeFirstChildrenLiText = childTreeFirstChildren.shadowRoot.querySelector(
          ".li-text"
        );
        (childTreeFirstChildrenLiText as HTMLElement).focus();
      }
      this.setVisibleTreeItems();
      this.toggleIconClicked.emit(); //this recalculates the vertical line height
    }

    if (e.key === "ArrowLeft") {
      let hasParent = false;
      const parentGxgTreeItem = this.el.parentElement.parentElement;
      let parentGxgTreeItemLiText = null;
      if (parentGxgTreeItem.tagName === "GXG-TREE-ITEM") {
        hasParent = true;
        parentGxgTreeItemLiText = parentGxgTreeItem.shadowRoot.querySelector(
          ".li-text"
        ) as HTMLElement;
      }

      if (this.isLeaf) {
        if (hasParent) {
          parentGxgTreeItemLiText.focus();
        }
      } else {
        const li = this.el.shadowRoot.querySelector("li");
        if (li.classList.contains("tree-open")) {
          this.opened = false;
        } else {
          if (hasParent) {
            parentGxgTreeItemLiText.focus();
          }
        }
      }
      this.setVisibleTreeItems();
      this.toggleIconClicked.emit(); //this recalculates the vertical line height
    }

    // UP/DOWN NAVIGATION
    if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
      e.preventDefault();
      if (!this.firstTreeItemOfParentTree) {
        //Is not the first element of the parent
        //Set focus on the prev item
        let prevItem;
        const prevElementSibling = this.el.previousElementSibling;

        if (e.shiftKey && e.key !== "Tab") {
          //if shift key was pressed, navigate to the previous sibling
          if (prevElementSibling !== null) {
            prevItem = prevElementSibling.shadowRoot.querySelector(
              "li .li-text"
            );
          }
        } else {
          if (prevElementSibling === null) {
            const parentItem = this.el.parentElement;
            const parentParentItem = parentItem.parentElement;
            prevItem = parentParentItem.shadowRoot.querySelector("li .li-text");
          } else {
            prevItem = prevElementSibling.shadowRoot.querySelector(
              "li .li-text"
            );
            if (prevElementSibling !== null) {
              //If the preceding tree-item has tree inside...
              const prevElementSiblingHasChildTree = ((prevElementSibling as unknown) as GxgTreeItem)
                .hasChildTree;
              if (prevElementSiblingHasChildTree) {
                const prevElementSiblingHasOpenTree = ((prevElementSibling as unknown) as GxgTreeItem)
                  .opened;
                if (prevElementSiblingHasOpenTree && !this.download) {
                  //If preceding tree-item tree is opened, then the prev item is the last item of that tree
                  const prevElemSiblingTreeItem = this.el
                    .previousElementSibling;
                  const prevElemSiblingTreeItemTree = prevElemSiblingTreeItem.querySelector(
                    "gxg-tree"
                  );
                  //
                  if (
                    ((prevElemSiblingTreeItemTree.lastElementChild as unknown) as GxgTreeItem)
                      .hasChildTree
                  ) {
                    if (
                      prevElemSiblingTreeItemTree.lastElementChild.shadowRoot
                        .querySelector("li")
                        .classList.contains("tree-open")
                    ) {
                      prevItem = prevElemSiblingTreeItemTree.lastElementChild
                        .querySelector("gxg-tree")
                        .lastElementChild.shadowRoot.querySelector(
                          "li .li-text"
                        );
                    } else {
                      prevItem = prevElemSiblingTreeItemTree.lastElementChild.shadowRoot.querySelector(
                        "li .li-text"
                      );
                    }
                  } else {
                    prevItem = prevElemSiblingTreeItemTree.lastElementChild.shadowRoot.querySelector(
                      "li .li-text"
                    );
                  }
                  //
                } else {
                  //The preciding item has a tree, but it is closed
                  prevItem = this.el.previousElementSibling.shadowRoot.querySelector(
                    "li .li-text"
                  );
                }
              }
            }
          }
        }

        if (prevItem !== null && prevItem !== undefined) {
          (prevItem as HTMLElement).focus();
        }
      }
    }
    if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
      e.preventDefault();
      if (!this.lastTreeItemOfParentTree) {
        //Set focus on the next item
        let nextItem;

        if (e.shiftKey) {
          //if shift key was pressed, navigate to the next sibling
          if (this.el.nextElementSibling !== null) {
            nextItem = this.el.nextElementSibling.shadowRoot.querySelector(
              "li .li-text"
            );
          }
        } else {
          if (this.lastTreeItem) {
            if (this.hasChildTree && this.opened) {
              nextItem = this.el.firstElementChild.firstElementChild.shadowRoot.querySelector(
                ".li-text"
              );
            } else {
              const thisTree = this.el.parentElement;
              const thisTreeParent = thisTree.parentElement;
              const thisTreeParentNextTree = thisTreeParent.nextElementSibling;
              if (thisTreeParentNextTree === null) {
                if (
                  thisTreeParent.parentElement.parentElement
                    .nextElementSibling !== null
                ) {
                  nextItem = thisTreeParent.parentElement.parentElement.nextElementSibling.shadowRoot.querySelector(
                    ".li-text"
                  );
                }
              } else {
                nextItem = (thisTreeParentNextTree as HTMLElement).shadowRoot.querySelector(
                  ".li-text"
                );
              }
            }
          } else {
            if (this.hasChildTree && this.opened && !this.download) {
              nextItem = this.el
                .querySelector("gxg-tree gxg-tree-item")
                .shadowRoot.querySelector("li .li-text");
            } else {
              nextItem = this.el.nextElementSibling.shadowRoot.querySelector(
                ".li-text"
              );
            }
          }
        }
        if (nextItem !== null && nextItem !== undefined) {
          (nextItem as HTMLElement).focus();
        }
      } else {
        //Last element of parent tree
        if (
          this.el.classList.contains("not-leaf") &&
          this.el.shadowRoot.querySelector("li").classList.contains("tree-open")
        ) {
          const childTreeFirstTreeItem = this.el.firstElementChild.firstElementChild.shadowRoot.querySelector(
            "li .li-text"
          );
          (childTreeFirstTreeItem as HTMLElement).focus();
        }
      }
    }
  }

  returnToggleIconType() {
    //Returns the type of icon : expand or collapse
    if (!this.opened || this.download) {
      return "gemini-tools/add";
    } else {
      return "gemini-tools/minus";
    }
  }

  returnPaddingLeft() {
    //returns the appropriate padding left to the .li-text element
    let paddingLeftValue = 0;

    if (this.numberOfParentTrees !== 1) {
      paddingLeftValue = (this.numberOfParentTrees - 1) * 45;
    } else {
      paddingLeftValue = 5;
    }
    this.itemPaddingLeftValue = paddingLeftValue;
    return `${this.itemPaddingLeftValue}px`;
  }

  returnVerticalLineLeftPosition() {
    //Returns the left position of the vertical line that associates the chid-items with the parent item
    const paddingLeftValue = this.itemPaddingLeftValue + 7;
    return `${paddingLeftValue}px`;
  }

  returnVerticalLineHeight() {
    //Returns the vertical line height, that associates the chid-items with the parent item
    let lastDirectItemItemsLength = 0;
    const directTree = this.el.querySelector(":scope > gxg-tree");
    if (directTree) {
      const directItems = directTree.querySelectorAll(":scope > gxg-tree-item");
      if (directItems) {
        const lastDirectItem: HTMLGxgTreeItemElement = directItems[
          directItems.length - 1
        ] as HTMLGxgTreeItemElement;
        if (!lastDirectItem.isLeaf) {
          lastDirectItemItemsLength = this.getNumberOfVisibleDescendantItems(
            lastDirectItem
          );
        }
      }
    }
    const childrenItemsLength = this.getNumberOfVisibleDescendantItems(this.el);
    return `${(childrenItemsLength - lastDirectItemItemsLength) * 24 - 10}px`;
  }

  returnVerticalLineHeightV2() {
    //Returns the vertical line height, that associates the chid-items with the parent item
    let total = 0;
    const numberOfChildItemsLength = this.el.querySelectorAll("gxg-tree-item")
      .length;
    const siblingsLength = getSiblings(this.el, "after").length;
    if (this.numberOfParentTrees > 1) {
      total = this.getNumberOfDirectVisibleDescendantItems();
    } else {
      total = numberOfChildItemsLength + siblingsLength;
    }
    const itemHeight = 24;
    const offSet = 9;
    return `${total * itemHeight - offSet}px`;
  }

  returnHorizontalLineLeftPosition() {
    //Returns the left position of the horizontal line that associates the chid-items with the parent item
    let paddingLeftValue = this.itemPaddingLeftValue - 8;

    if (this.numberOfParentTrees > 2) {
      paddingLeftValue -= 5;
    }
    return `${paddingLeftValue}px`;
  }

  returnHorizontalLineLeftWidth() {
    //Returns the width of the horizontal line that associates the chid-items with the parent item
    let width = 24;
    if (this.numberOfParentTrees > 2) {
      width += 5;
    }
    return `${width}px`;
  }

  checkboxTabIndex() {
    return -1;
  }
  liTextTabIndex() {
    return 1;
  }

  setIndeterminate() {
    if (this.indeterminate) {
      return true;
    } else {
      return false;
    }
  }

  checkboxClicked() {
    if (this.checkbox) {
      this.checked = !this.checked;
      this.toggleTreeItemsCheckboxes(this.checked);
      this.checkboxClickedEvent.emit({
        checked: this.checked,
        id: this.el.id,
      });
    }
  }

  toggleTreeItemsCheckboxes(checked) {
    //Only do if toggleCheckboxes property exists in parent tree
    const parentTree = (this.el.parentElement as unknown) as GxgTree;
    if (this.toggleCheckboxes) {
      this.indeterminate = false;
      const childTree = this.el.querySelector("gxg-tree");
      if (childTree !== null) {
        const childTreeItems = childTree.querySelectorAll("gxg-tree-item");
        childTreeItems.forEach(function (treeItem) {
          if (checked) {
            treeItem.checked = true;
          } else {
            treeItem.checked = false;
          }
        });
      }
    }
  }

  resolveLeftIcon() {
    if (this.leftIcon !== undefined) {
      return this.leftIcon;
    } else {
      return "";
    }
  }

  resolveRightIcon() {
    if (this.rightIcon !== undefined) {
      return this.rightIcon;
    } else {
      return "";
    }
  }

  render() {
    return (
      <Host
        class={{ leaf: this.isLeaf, "not-leaf": !this.isLeaf }}
        exportParts={this.exportparts ? this.exportparts : null}
      >
        <li
          class={{
            "tree-open": this.opened,
            disabled: this.disabled,
          }}
        >
          <div
            class={{
              "li-text": true,
              "li-text--not-leaf": !this.isLeaf,
              "li-text--leaf": this.isLeaf,
              "li-text--first-tree-item": this.firstTreeItem,
              "li-text--has-child-tree": this.hasChildTree,
              "li-text--selected": this.selected,
            }}
            style={{ paddingLeft: this.returnPaddingLeft() }}
            onClick={this.liTextClicked.bind(this)}
            onDblClick={this.liTextDoubleClicked.bind(this)}
            onKeyDown={this.liTextKeyDownPressed.bind(this)}
            tabIndex={this.liTextTabIndex()}
            part={this.parts.item}
          >
            {!this.isLeaf || this.download
              ? [
                  <span
                    class={{ "vertical-line": true }}
                    style={{
                      height: this.returnVerticalLineHeightV2(),
                      left: this.returnVerticalLineLeftPosition(),
                    }}
                  ></span>,
                  <div class={{ "closed-opened-icons": true }}>
                    <gxg-icon
                      onClick={this.toggleTreeIconClicked.bind(this)}
                      type={this.returnToggleIconType()}
                      color="auto"
                      class="icon toggle-icon"
                      part={this.parts.toggleButton}
                    ></gxg-icon>
                  </div>,
                ]
              : null}
            {this.numberOfParentTrees !== 1 ? (
              <span
                class={{
                  "horizontal-line": true,
                }}
                style={{
                  left: this.returnHorizontalLineLeftPosition(),
                  width: this.returnHorizontalLineLeftWidth(),
                }}
              ></span>
            ) : null}
            {this.checkbox ? (
              <ch-form-checkbox
                checked={this.checked}
                class={{ checkbox: true }}
                tabIndex={this.checkboxTabIndex()}
                indeterminate={this.setIndeterminate()}
                disabled={this.disabled}
                onClick={this.checkboxClicked.bind(this)}
                part={this.parts.checkbox}
              ></ch-form-checkbox>
            ) : null}
            {this.leftIcon ? (
              <gxg-icon
                type={this.resolveLeftIcon()}
                color="auto"
                class="icon icon--left"
                style={{
                  "--icon-size": "14px",
                }}
              ></gxg-icon>
            ) : null}
            <span class="text">
              <slot></slot>
            </span>
            {this.rightIcon ? (
              <gxg-icon
                type={this.resolveRightIcon()}
                color={this.rightIconColor}
                class="icon icon--right"
                style={{
                  "--icon-size": "14px",
                }}
              ></gxg-icon>
            ) : null}
            {this.download ? <span class={{ loading: true }}></span> : null}
          </div>
          <slot name="tree"></slot>
          {this.treeModel ? this.treeModel : null}
        </li>
      </Host>
    );
  }
}

export type GxgTreeItemDataEmmited = {
  checked: boolean;
  id: string;
};

export type GxgTreeItemData = {
  id: string;
  name: string;
  checkbox?: boolean;
  checked?: boolean;
  disabled?: boolean;
  icon?: string;
  indeterminate?: boolean;
  items?: GxgTreeItemData[];
  opened?: boolean;
  selected?: boolean;
};
