import {
  Component,
  Event,
  EventEmitter,
  Element,
  Host,
  Prop,
  State,
  h,
  Method,
  Watch
} from "@stencil/core";
import { exportParts } from "../../common/export-parts";

@Component({
  tag: "gxg-tree-item",
  styleUrl: "gxg-tree-item.scss",
  shadow: true,
  assetsDirs: ["tree-item-assets"]
})
export class GxgTreeItem {
  /*
INDEX:
1.OWN PROPERTIES 
2.REFERENCE TO ELEMENTS
3.STATE() VARIABLES
4.PUBLIC PROPERTY API | WATCH'S
5.EVENTS (EMIT)
6.COMPONENT LIFECYCLE METHODS
7.LISTENERS
8.PUBLIC METHODS API
9.LOCAL METHODS
10.RENDER() FUNCTION
*/

  // 1.OWN PROPERTIES //

  private id;
  private lazy = false; //True if not leaf but no children.
  private parentTreeIsMasterTree = false;
  private numberOfParentTrees = 1;
  private firstItem = false;
  private lastItem = false;
  private leftPadding = "0px";
  private verticalLineStartPosition = "0px";
  private horizontalLineWidth = "24px";
  private horizontalLineStartPosition = "0px";
  private parts = {
    item: "item",
    checkbox: "checkbox",
    toggleButton: "toggle-button"
  };
  private exportparts: string;

  // 2. REFERENCE TO ELEMENTS //

  @Element() el: HTMLGxgTreeItemElement;

  // 3.STATE() VARIABLES //

  @State() horizontalLinePaddingLeft = 0;
  @State() lastTreeItem = false;
  @State() lastTreeItemOfParentTree = false;
  @State() numberOfVisibleDescendantItems = 0;
  @State() time = 0;
  @State() lineHeight: string;
  @State() downloading = false;

  // 4.PUBLIC PROPERTY API | WATCH'S //

  /**
   * Set this attribute if you want this item to display a checkbox. This attribute is affected by the parent tree-item checkbox attribute, unless it is set in this item.
   */
  @Prop({ mutable: true }) checkbox: boolean = undefined;

  /**
   * Set this attribute if you want this item to be checked by default. This attribute is affected by the parent tree-item checked attribute, unless it is set in this item.
   */
  @Prop({ mutable: true }) checked: boolean = undefined;
  @Watch("checked")
  checkedHandler(_, oldValue: boolean): void {
    if (oldValue !== undefined) {
      this.checkboxToggled.emit(this.getItemData(false));
    }
  }

  /**
   * Set this attribute if you want this items child tree to be opened by default. This attribute is affected by the parent tree-item opened attribute, unless it is set in this item.
   */
  @Prop() opened: boolean = undefined;
  @Watch("opened")
  openedHandler(_, oldValue: boolean): void {
    if (oldValue !== undefined) {
      this.toggleIconClicked.emit(this.getItemData(false));
    }
  }

  /**
   * Set this attribute if you want all the children item's checkboxes to be toggled when this item checkbox is toggled. This attribute is affected by the parent tree-item toggleCheckboxes attribute, unless it is set in this item.
   */
  @Prop() toggleCheckboxes: boolean = undefined;

  /**
   * This is the tree-item type/category. This attribute is affected by the parent tree type attribute, unless it is set in this item.
   */
  @Prop() type: string;

  /**
   * The presence of this attribute makes this tree item disabled. This attribute is affected by the parent tree type attribute, unless it is set in this item.
   */
  @Prop() disabled: boolean = undefined;

  /**
   * The tree item label.
   */
  @Prop() label: string;

  /**
   * The tree item description.
   */
  @Prop() description: string;

  /**
   * The presence of this attribute indicates that this tree-item is a leaf, meaning it has no children items. If is not a leaf, it will display a +/- icon to toggle/ontoggle the children tree
   */
  @Prop({ mutable: true }) leaf = false;

  /**
   * The presence of this attribute sets the tree-item as selected
   */
  @Prop({ mutable: true }) selected = false;

  /**
   * Sets the tree item icon
   */
  @Prop() readonly icon: string;

  /**
   * This property is for passing a tree structure from the tree.
   */
  @Prop() treeModel: HTMLGxgTreeElement;

  /**
   * This property is for internal use, when using the treeModel.
   */
  @Prop() numberOfChildren = 0;

  /**
   * This property is for internal use. It indicates that the item has children.
   */
  @Prop({ mutable: true }) hasChildTree = false;

  /**
   * This property is for internal use. It indicates that the checkbox has an indeterminate state.
   */
  @Prop({ mutable: true }) indeterminate = false;

  // 5.EVENTS (EMIT) //

  /**
   * Emitted when the checkbox was toggled
   */
  @Event() checkboxToggled: EventEmitter<GxgTreeItemData>;

  /**
   * Emitted when the item was double-clicked
   */
  @Event() doubleClicked: EventEmitter<GxgTreeItemData>;

  /**
   * Emitted when the item is not lazy anymore
   */
  @Event() lazyChanged: EventEmitter<GxgTreeItemData>;

  /**
   * Emitted when the icon selection was changes
   */
  @Event() selectionChanged: EventEmitter<GxgTreeItemData>;

  /**
   * Emitted when the toggle icon was clicked
   */
  @Event() toggleIconClicked: EventEmitter<GxgTreeItemData>;

  // 6.COMPONENT LIFECYCLE METHODS //

  componentWillLoad(): void {
    //Count number of parent trees in order to set the appropriate padding-left
    this.numberOfParentTrees = this.getParentsNumber();
    this.numberOfChildren = this.getChildrenNumber();

    //If is last item of tree
    const nextItem = this.el.nextElementSibling;
    if (nextItem === null) {
      this.lastTreeItem = true;
    }
    if (this.numberOfParentTrees === 1) {
      this.parentTreeIsMasterTree = true;
      const prevItem = this.el.previousElementSibling;
      if (prevItem === null) {
        //If is first item of parent tree...
        this.firstItem = true;
      }
    }
    if (!this.el.nextElementSibling) {
      this.lastItem = true;
    }

    this.evaluateId();
    this.evaluateLazy();
    this.defineLineHeight();
    this.defineStartPosition();
    this.cascadeConfig();
    this.attachExportParts();
    this.initiateMutationObserver();
  }

  // 7.LISTENERS //

  // 8.PUBLIC METHODS API //

  @Method()
  async reRender(): Promise<void> {
    this.defineLineHeight();
  }

  @Method() evaluateCheckboxStatus(): void {
    const allChildren = this.el.querySelectorAll("gxg-tree-item");
    let checked = 0;
    if (allChildren?.length) {
      Array.from(allChildren).forEach(item => {
        if (item.checked) {
          checked++;
        }
      });
      if (allChildren.length === checked) {
        //all checked
        this.checked = true;
        this.indeterminate = false;
      } else if (checked === 0) {
        //all unchecked
        this.checked = false;
        this.indeterminate = false;
      } else {
        //indeterminate
        this.indeterminate = true;
      }
    }
  }
  // 9.LOCAL METHODS //

  private evaluateId = (): void => {
    if (!this.id) {
      this.id = this.el.getAttribute("id");
    }
  };

  private evaluateLazy = (): void => {
    if (!this.leaf && this.numberOfChildren === 0) {
      this.lazy = true;
      this.opened = false;
    }
  };

  private observer = new MutationObserver(mutationsList => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        this.lazy = false;
        this.opened = true;
        this.reRender();
        this.openedHandler;
      }
    }
  });

  private initiateMutationObserver = (): void => {
    this.observer.observe(this.el, { childList: true, subtree: true });
  };

  /**
   * @description Set some properties based on the parent tree configuration, unless this item has this properties already set.
   */
  private cascadeConfig = (): void => {
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

  private defineLineHeight = (): void => {
    let offset = 11.5;
    if (this.parentTreeIsMasterTree) {
      offset = 0;
      if (this.lastItem) {
        offset = 11;
      }
    }
    let total = 0;
    if (!this.leaf && !this.lazy) {
      const allItemsLength = this.el.querySelectorAll("gxg-tree-item").length;
      const directGxgTree = this.el.querySelector(":scope > gxg-tree");
      const directTreeItems = directGxgTree.querySelectorAll(
        ":scope > gxg-tree-item"
      );
      if (!this.parentTreeIsMasterTree) {
        const lastDirectTreeItem = directTreeItems[directTreeItems.length - 1];
        const lastDirectItemItemsLength =
          lastDirectTreeItem.querySelectorAll("gxg-tree-item").length;
        total = allItemsLength - lastDirectItemItemsLength;
      } else {
        total = allItemsLength;
      }
    }
    this.lineHeight = `${total * 24.2 - offset}px`;
  };

  /**
   * @description returns the appropriate start padding and start position for the item, horizontal line, and vertical line.
   */
  private defineStartPosition = (): void => {
    let value = 0;
    let horizontalLineStartPosition = 13;
    if (this.numberOfParentTrees > 1) {
      value = (this.numberOfParentTrees - 1) * 45;
      if (this.numberOfParentTrees > 2) {
        horizontalLineStartPosition = value - 36;
      }
    } else {
      value = 5;
    }
    this.verticalLineStartPosition = `${value + 7}px`;
    this.leftPadding = `${value}px`;
    this.horizontalLineStartPosition = `${horizontalLineStartPosition}px`;
  };

  private liTextClickedHandler = (e: MouseEvent): void => {
    const toggleWasClicked = (e.target as HTMLElement).classList.contains(
      "toggle-icon"
    );
    const checkboxClicked =
      (e.target as HTMLElement).nodeName === "GXG-FORM-CHECKBOX";
    if (toggleWasClicked || checkboxClicked) return;
    if (e.ctrlKey) {
      this.selected = !this.selected;
    } else {
      this.selected = true;
    }
    this.selectionChanged.emit(this.getItemData(e.ctrlKey));
  };

  private liTextDoubleClicked = (): void => {
    this.doubleClicked.emit(this.getItemData(false));
    !this.leaf && this.toggleClickedHandler();
  };

  private liTextKeyDownPressed = (e: KeyboardEvent): void => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault(); //prevents scrolling
    }
    //ENTER
    if (e.key === "Enter") {
      //Enter should check/uncheck the checkbox (if present)
      this.checkboxClickedHandler();
    }
    //LEFT/RIGHT NAVIGATION
    if (e.key === "ArrowRight" && !this.leaf) {
      //Toggle the tree
      if (!this.opened) {
        this.opened = true;
      } else {
        const childTree = this.el.querySelector("gxg-tree");
        const childTreeFirstChildren = childTree.querySelector("gxg-tree-item");
        const childTreeFirstChildrenLiText =
          childTreeFirstChildren.shadowRoot.querySelector(".li-text");
        (childTreeFirstChildrenLiText as HTMLElement).focus();
      }
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

      if (this.leaf) {
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
    }

    // UP/DOWN NAVIGATION
    if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
      e.preventDefault();
      if (!this.firstItem) {
        //Is not the first element of the parent
        //Set focus on the prev item
        let prevItem;
        const prevElementSibling = this.el.previousElementSibling;

        if (e.shiftKey && e.key !== "Tab") {
          //if shift key was pressed, navigate to the previous sibling
          if (prevElementSibling !== null) {
            prevItem =
              prevElementSibling.shadowRoot.querySelector("li .li-text");
          }
        } else {
          if (prevElementSibling === null) {
            const parentItem = this.el.parentElement;
            const parentParentItem = parentItem.parentElement;
            prevItem = parentParentItem.shadowRoot.querySelector("li .li-text");
          } else {
            prevItem =
              prevElementSibling.shadowRoot.querySelector("li .li-text");
            if (prevElementSibling !== null) {
              //If the preceding tree-item has tree inside...
              const prevElementSiblingHasChildTree = (
                prevElementSibling as unknown as GxgTreeItem
              ).hasChildTree;
              if (prevElementSiblingHasChildTree) {
                const prevElementSiblingHasOpenTree = (
                  prevElementSibling as unknown as GxgTreeItem
                ).opened;
                if (prevElementSiblingHasOpenTree) {
                  //If preceding tree-item tree is opened, then the prev item is the last item of that tree
                  const prevElemSiblingTreeItem =
                    this.el.previousElementSibling;
                  const prevElemSiblingTreeItemTree =
                    prevElemSiblingTreeItem.querySelector("gxg-tree");
                  //
                  if (
                    (
                      prevElemSiblingTreeItemTree.lastElementChild as unknown as GxgTreeItem
                    ).hasChildTree
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
                      prevItem =
                        prevElemSiblingTreeItemTree.lastElementChild.shadowRoot.querySelector(
                          "li .li-text"
                        );
                    }
                  } else {
                    prevItem =
                      prevElemSiblingTreeItemTree.lastElementChild.shadowRoot.querySelector(
                        "li .li-text"
                      );
                  }
                  //
                } else {
                  //The preciding item has a tree, but it is closed
                  prevItem =
                    this.el.previousElementSibling.shadowRoot.querySelector(
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
            nextItem =
              this.el.nextElementSibling.shadowRoot.querySelector(
                "li .li-text"
              );
          }
        } else {
          if (this.lastTreeItem) {
            if (this.hasChildTree && this.opened) {
              nextItem =
                this.el.firstElementChild.firstElementChild.shadowRoot.querySelector(
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
                  nextItem =
                    thisTreeParent.parentElement.parentElement.nextElementSibling.shadowRoot.querySelector(
                      ".li-text"
                    );
                }
              } else {
                nextItem = (
                  thisTreeParentNextTree as HTMLElement
                ).shadowRoot.querySelector(".li-text");
              }
            }
          } else {
            if (this.hasChildTree && this.opened) {
              nextItem = this.el
                .querySelector("gxg-tree gxg-tree-item")
                .shadowRoot.querySelector("li .li-text");
            } else {
              nextItem =
                this.el.nextElementSibling.shadowRoot.querySelector(".li-text");
            }
          }
        }
        if (nextItem !== null && nextItem !== undefined) {
          (nextItem as HTMLElement).focus();
        }
      } else {
        //Last element of parent tree
        if (!this.leaf && this.opened) {
          const childTreeFirstTreeItem =
            this.el.firstElementChild.firstElementChild.shadowRoot.querySelector(
              "li .li-text"
            );
          (childTreeFirstTreeItem as HTMLElement).focus();
        }
      }
    }
  };

  private returnToggleIconType = (): string => {
    //Returns the type of icon : expand or collapse
    if (!this.opened || this.lazy) {
      return "gemini-tools/add";
    } else {
      return "gemini-tools/minus";
    }
  };

  /**
   * When a checkbox is clicked, it state changes and so it's children, and parent items do.
   * First evaluate the children, and then the parent items.
   */
  private checkboxClickedHandler = (): void => {
    if (this.checkbox) {
      this.checked = !this.checked;
      if (!this.leaf) {
        this.toggleChildrenCheckboxes(this.checked);
      }
      const parentItems = this.getParentItems();
      parentItems.forEach(parentItem => {
        parentItem.evaluateCheckboxStatus();
      });
    }
  };

  private toggleChildrenCheckboxes = (checked): void => {
    this.indeterminate = false;
    const allChildren = this.el.querySelectorAll("gxg-tree-item");
    if (allChildren?.length) {
      Array.from(allChildren).forEach(item => {
        item.indeterminate = false;
        item.checked = checked;
      });
    }
  };

  private getParentItems = (): HTMLGxgTreeItemElement[] => {
    const parentItems: HTMLGxgTreeItemElement[] = [];
    let parentItem = this.el.parentElement.parentElement;

    while (parentItem?.nodeName === "GXG-TREE-ITEM") {
      parentItems.push(parentItem as HTMLGxgTreeItemElement);
      parentItem = parentItem.parentElement?.parentElement;
    }
    return parentItems;
  };

  private getParentsNumber = (): number => {
    let count = 0;
    let parentElement = this.el.parentElement;

    while (parentElement?.nodeName === "GXG-TREE") {
      count++;
      parentElement = parentElement.parentElement?.parentElement;
    }
    return count;
  };

  private getChildrenNumber = (): number => {
    if (this.numberOfChildren === 0) {
      //If this.numberOfChildren === 0 it might be because the whole tree was created with markup, and not by passing a model. In that case, count the children with querySelectorAll.
      return this.el.querySelectorAll("gxg-tree-item").length;
    }
  };

  private toggleClickedHandler = (): void => {
    if (this.lazy && !this.opened) {
      this.downloading = true;
      this.toggleIconClicked.emit(this.getItemData());
    }
    if (!this.lazy) {
      this.opened = !this.opened;
    }
  };

  private getItemData = (ctrl = false) => {
    return {
      ref: this.el,
      checkbox: this.checkbox,
      checked: this.checked,
      ctrl: ctrl,
      description: this.description,
      disabled: this.disabled,
      icon: this.icon,
      id: this.id,
      indeterminate: this.indeterminate,
      label: this.label,
      lazy: this.lazy,
      leaf: this.leaf,
      opened: this.opened,
      selected: this.selected
    };
  };

  // 10.RENDER() FUNCTION //

  render(): void {
    return (
      <Host
        class={{ leaf: this.leaf, "not-leaf": !this.leaf }}
        exportParts={this.exportparts ? this.exportparts : null}
      >
        <li
          class={{
            "tree-open": this.opened,
            "tree-closed": !this.opened,
            disabled: this.disabled
          }}
        >
          <div
            class={{
              "li-text": true,
              "li-text--not-leaf": !this.leaf,
              "li-text--leaf": this.leaf,
              "li-text--first-tree-item": this.firstItem,
              "li-text--has-child-tree": this.hasChildTree,
              "li-text--selected": this.selected
            }}
            style={{ paddingLeft: this.leftPadding }}
            onClick={this.liTextClickedHandler.bind(this)}
            onDblClick={this.liTextDoubleClicked.bind(this)}
            onKeyDown={this.liTextKeyDownPressed.bind(this)}
            tabIndex={-1}
            part={this.parts.item}
          >
            {!this.leaf
              ? [
                  <span
                    class={{ "vertical-line": true }}
                    style={{
                      height: this.lineHeight,
                      left: this.verticalLineStartPosition
                    }}
                  ></span>,
                  <div class={{ "closed-opened-icons": true }}>
                    <gxg-icon
                      onClick={this.toggleClickedHandler.bind(this)}
                      type={this.returnToggleIconType()}
                      color="auto"
                      class="icon toggle-icon"
                      part={this.parts.toggleButton}
                    ></gxg-icon>
                  </div>
                ]
              : null}
            {this.numberOfParentTrees > 1 ? (
              <span
                class={{
                  "horizontal-line": true
                }}
                style={{
                  left: this.horizontalLineStartPosition,
                  width: this.horizontalLineWidth
                }}
              ></span>
            ) : null}
            {this.checkbox ? (
              <gxg-form-checkbox
                checked={this.checked}
                class={{ checkbox: true }}
                tabIndex={-1}
                indeterminate={this.indeterminate}
                disabled={this.disabled}
                onClick={this.checkboxClickedHandler}
                part={this.parts.checkbox}
              ></gxg-form-checkbox>
            ) : null}
            {this.icon ? (
              <gxg-icon
                type={this.icon}
                color="auto"
                class="icon icon--left"
                style={{
                  "--icon-size": "14px"
                }}
              ></gxg-icon>
            ) : null}
            {this.downloading && this.lazy ? (
              <span class="loading"></span>
            ) : null}
            <span class="text">
              <slot></slot>
            </span>
          </div>
          <slot name="tree"></slot>
          {this.treeModel ? this.treeModel : null}
        </li>
      </Host>
    );
  }
}

export type GxgTreeItemData = {
  ref?: HTMLGxgTreeItemElement;
  checkbox?: boolean;
  checked?: boolean;
  ctrl?: boolean;
  description?: string;
  disabled?: boolean;
  icon?: string;
  id: string;
  indeterminate?: boolean;
  items?: GxgTreeItemData[];
  label: string;
  lazy?: boolean;
  leaf?: boolean;
  opened?: boolean;
  selected?: boolean;
};

export type GxgTreeItemSelectedData = {
  checked: boolean;
  ctrlKey?: boolean;
  id: string;
  label: string;
  selected: boolean;
};

export type ToggleIconClicked = {
  id: string;
  lazy?: boolean;
};

export type DoubleClicked = {
  id: string;
};
