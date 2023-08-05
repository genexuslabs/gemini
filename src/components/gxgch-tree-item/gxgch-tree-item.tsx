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
import { GxgChTree } from "../gxgch-tree/gxgch-tree";

let treeRef: HTMLGxgchTreeElement;
@Component({
  tag: "gxgch-tree-item",
  styleUrl: "gxgch-tree-item.scss",
  shadow: true,
  assetsDirs: ["tree-item-assets"],
})
export class GxgChTreeItem {
  checkboxInput!: HTMLInputElement;

  //PROPS
  /**
   * Set this attribute if you want the gxgch-tree-item to display a checkbox
   */
  @Prop({ mutable: true }) checkbox = false;

  /**
   * Set this attribute if you want the gxgch-tree-item checkbox to be checked by default
   */
  @Prop({ mutable: true }) checked = false;

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
   * Set thhe right side icon from the available Gemini icon set : https://gx-gemini.netlify.app/?path=/story/icons-icons--controls
   */
  @Prop() readonly rightIcon: string;

  /**
   * If this tree-item has a nested tree, set this attribute to make the tree open by default
   */
  @Prop({ mutable: true }) opened = false;

  /**
   * The presence of this attribute sets the tree-item as selected
   */
  @Prop({ mutable: true }) selected = false;

  /**
   * The presence of this attribute displays a +/- icon to toggle/untoggle the tree
   */
  @Prop({ mutable: true }) isLeaf: boolean = undefined;

  //PROPS
  @Prop({ mutable: true }) hasChildTree = false;
  @Prop({ mutable: true }) firstTreeItem = false;
  @Prop({ mutable: true }) indeterminate: boolean;
  @Prop() readonly disabled: boolean = false;

  //STATE
  @State() numberOfParentTrees = 1;
  @State() itemPaddingLeft;
  //@State() verticalLineHeight: string;
  @State() horizontalLinePaddingLeft = 0;
  @State() lastTreeItem = false;
  @State() firstTreeItemOfParentTree = false;
  @State() lastTreeItemOfParentTree = false;
  @State() rightIconColor: Color = "auto";
  @State() numberOfDirectTreeItemsDescendants = 0;

  //EVENTS
  @Event() liItemClicked: EventEmitter;
  @Event() toggleIconClicked: EventEmitter;

  /**
   * Emits the checkbox information (chTreeItemData) that includes: the id, name(innerText) and checkbox value.
   */
  @Event() checkboxClickedEvent: EventEmitter<chTreeItemData>;

  @Element() el: HTMLGxgchTreeItemElement;

  componentWillLoad() {
    if (!treeRef) {
      treeRef = this.el.parentElement as HTMLGxgchTreeElement;
    }

    //Count number of parent trees in order to set the apporpiate padding-left
    this.numberOfParentTrees = this.getParents(this.el);

    //If tree item has not a tree-item inside, is leaf
    const treeItemHasTree = this.el.querySelector('[slot="tree"]');
    if (this.isLeaf === undefined) {
      if (treeItemHasTree === null) {
        this.isLeaf = true;
      } else {
        this.hasChildTree = true;
      }
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
    //If is last item of parent Tree
    if (this.numberOfParentTrees === 1) {
      const nextItem = this.el.nextElementSibling;
      if (nextItem === null) {
        this.lastTreeItemOfParentTree = true;
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

    //CONFIGURATIONS THAT COME FROM FROM MASTER TREE
    if (treeRef.checkbox) {
      this.checkbox = true;
      this.checked = treeRef.checked;
    }
  }

  getNumberOfVisibleDescendants() {
    const directTree = this.el.querySelector(":scope > gxgch-tree");

    if (directTree !== null && this.opened) {
      //if tree item has a tree inside and is open...
      const visibleChildren = directTree.querySelectorAll(
        "gxgch-tree-item.visible"
      );

      //direct descendants
      const directDescendants = directTree.querySelectorAll(
        ":scope > gxgch-tree-item.visible"
      );

      //last direct descendant
      const lastDirectDescendant =
        directDescendants[directDescendants.length - 1];

      const lastDirectDescendantIsOpened = ((lastDirectDescendant as unknown) as GxgChTreeItem)
        .opened;

      let lastDirectDescendantTreeItemsLength = 0;
      if (lastDirectDescendantIsOpened) {
        const lastDirectDescendantTree = lastDirectDescendant.querySelector(
          ":scope > gxgch-tree"
        );
        lastDirectDescendantTreeItemsLength = lastDirectDescendantTree.querySelectorAll(
          ":scope > gxgch-tree-item"
        ).length;
      }

      if (visibleChildren.length > 0) {
        this.numberOfDirectTreeItemsDescendants =
          visibleChildren.length - lastDirectDescendantTreeItemsLength;
      }
    }
  }

  setVisibleTreeItems() {
    const directTree = this.el.querySelector(":scope > gxgch-tree");
    if (directTree !== null) {
      const directTreeDirectTreeItems = directTree.querySelectorAll(
        ":scope > gxgch-tree-item"
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
    this.getNumberOfVisibleDescendants();
  }

  @Watch("downloaded")
  watchHandler(newValue: boolean) {
    if (newValue) {
      //this.updateTreeVerticalLineHeight();
    }
  }

  getParents(elem) {
    // Returns the number of parent tree items in order to set the appropriate paddding-left
    // Set up a parent array
    const numberOfTreeParents = [];

    // Push each parent element to the array
    for (; elem && elem !== document; elem = elem.parentNode) {
      const elemTagNAme = elem.tagName;
      if (elemTagNAme === "GXGCH-TREE") {
        numberOfTreeParents.push(elem);
      }
    }
    return numberOfTreeParents.length;
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
    this.getNumberOfVisibleDescendants();
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
        const childTree = this.el.querySelector("ch-tree");
        const childTreeFirstChildren = childTree.querySelector(
          "gxgch-tree-item"
        );
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
      const parentGxgChTreeItem = this.el.parentElement.parentElement;
      let parentGxgChTreeItemLiText = null;
      if (parentGxgChTreeItem.tagName === "GXGCH-TREE-ITEM") {
        hasParent = true;
        parentGxgChTreeItemLiText = parentGxgChTreeItem.shadowRoot.querySelector(
          ".li-text"
        ) as HTMLElement;
      }

      if (this.isLeaf) {
        if (hasParent) {
          parentGxgChTreeItemLiText.focus();
        }
      } else {
        const li = this.el.shadowRoot.querySelector("li");
        if (li.classList.contains("tree-open")) {
          this.opened = false;
        } else {
          if (hasParent) {
            parentGxgChTreeItemLiText.focus();
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
              const prevElementSiblingHasChildTree = ((prevElementSibling as unknown) as GxgChTreeItem)
                .hasChildTree;
              if (prevElementSiblingHasChildTree) {
                const prevElementSiblingHasOpenTree = ((prevElementSibling as unknown) as GxgChTreeItem)
                  .opened;
                if (prevElementSiblingHasOpenTree && !this.download) {
                  //If preceding tree-item tree is opened, then the prev item is the last item of that tree
                  const prevElemSiblingTreeItem = this.el
                    .previousElementSibling;
                  const prevElemSiblingTreeItemTree = prevElemSiblingTreeItem.querySelector(
                    "ch-tree"
                  );
                  //
                  if (
                    ((prevElemSiblingTreeItemTree.lastElementChild as unknown) as GxgChTreeItem)
                      .hasChildTree
                  ) {
                    if (
                      prevElemSiblingTreeItemTree.lastElementChild.shadowRoot
                        .querySelector("li")
                        .classList.contains("tree-open")
                    ) {
                      prevItem = prevElemSiblingTreeItemTree.lastElementChild
                        .querySelector("ch-tree")
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
                .querySelector("ch-tree gxgch-tree-item")
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
      return "expand-icon";
    } else {
      return "collapse-icon";
    }
  }

  returnPaddingLeft() {
    //returns the appropriate padding left to the .li-text element
    let paddingLeft = 0;

    if (this.numberOfParentTrees !== 1) {
      paddingLeft = (this.numberOfParentTrees - 1) * 31 + 5;
    } else {
      paddingLeft = 5;
    }
    if (!this.isLeaf && this.numberOfParentTrees !== 1) {
      //paddingLeft -= 5;
    }
    this.itemPaddingLeft = paddingLeft;
    return paddingLeft + "px";
  }

  returnVerticalLineLeftPosition() {
    //Returns the left position of the vertical line that associates the chid-items with the parent item
    if (this.numberOfParentTrees !== 1) {
      return this.itemPaddingLeft + 5 + "px";
    } else {
      return this.itemPaddingLeft + 5 + "px";
    }
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
    if (treeRef.toggleCheckboxes) {
      const items = this.el.querySelectorAll("gxgch-tree-item");
      items.forEach((item) => {
        if (item.checkbox) {
          item.checked = !item.checked;
        }
      });
    }
  }

  toggleTreeItemsCheckboxes(checked) {
    //Only do if toggleCheckboxes property exists in parent tree
    const parentTree = (this.el.parentElement as unknown) as GxgChTree;
    if (parentTree.toggleCheckboxes) {
      this.indeterminate = false;
      const childTree = this.el.querySelector("ch-tree");
      if (childTree !== null) {
        const childTreeItems = childTree.querySelectorAll("gxgch-tree-item");
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
    console.log(this.numberOfDirectTreeItemsDescendants);
    return (
      <Host class={{ leaf: this.isLeaf, "not-leaf": !this.isLeaf }}>
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
          >
            {!this.isLeaf || this.download
              ? [
                  <span
                    class={{ "vertical-line": true }}
                    style={{
                      //height: this.verticalLineHeight,
                      height:
                        this.numberOfDirectTreeItemsDescendants * 20 -
                        10 +
                        "px",
                      left: this.returnVerticalLineLeftPosition(),
                    }}
                  ></span>,
                  <div class={{ "closed-opened-icons": true }}>
                    <div
                      part={this.returnToggleIconType()}
                      class="icon toggle-icon"
                      onClick={this.toggleTreeIconClicked.bind(this)}
                    ></div>
                  </div>,
                ]
              : null}
            <span
              class={{
                "horizontal-line": true,
                "display-none": this.numberOfParentTrees === 1,
              }}
              style={{
                left: this.itemPaddingLeft + "px",
              }}
            ></span>
            {this.checkbox ? (
              <ch-form-checkbox
                part="checkbox"
                checked={this.checked}
                class={{ checkbox: true }}
                tabIndex={this.checkboxTabIndex()}
                indeterminate={this.setIndeterminate()}
                disabled={this.disabled}
                onClick={this.checkboxClicked.bind(this)}
              ></ch-form-checkbox>
            ) : null}
            <span part="left-icon"></span>
            {this.leftIcon ? (
              <ch-icon
                src={this.resolveLeftIcon()}
                auto-color={this.disabled ? "disabled" : "auto"}
                class="icon"
                style={{
                  "--icon-size": "14px",
                }}
              ></ch-icon>
            ) : null}
            <span class="text">
              <slot></slot>
            </span>
            {this.rightIcon ? (
              <ch-icon
                src={this.resolveRightIcon()}
                color={this.rightIconColor}
                class={{ "right-icon": true }}
                style={{
                  "--icon-size": "14px",
                }}
              ></ch-icon>
            ) : null}
            <span part="right-icon"></span>
            {this.download ? <span class={{ loading: true }}></span> : null}
          </div>
          <slot name="tree"></slot>
        </li>
      </Host>
    );
  }
}

export type chTreeItemData = {
  checked: boolean;
  id: string;
};
