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
  Watch,
} from "@stencil/core";
import { Color } from "../icon/icon";
@Component({
  tag: "gxg-tree-item",
  styleUrl: "tree-item.scss",
  shadow: true,
})
export class GxgTreeItem {
  checkboxInput!: HTMLInputElement;

  //PROPS
  /**
   * Set this attribute if you want the gxg-treeitem to display a checkbox
   */
  @Prop() checkbox = false;

  /**
   * Set this attribute if you want the gxg-treeitem checkbox to be checked by default
   */
  @Prop() checked = false;

  /**
   * Set this attribute if this tree-item has a resource to be downloaded;
   */
  @Prop() download = false;

  /**
   * Set this attribute when you are downloading a resource
   */
  @Prop() downloading = false;

  /**
   * Set this attribute when you have downloaded the resource
   */
  @Prop() downloaded = false;

  /**
   * Set the left side icon from the available Gemini icon set : https://gx-gemini.netlify.app/?path=/story/icons-icons--controls
   */
  @Prop() leftIcon: string;

  /**
   * Set thhe right side icon from the available Gemini icon set : https://gx-gemini.netlify.app/?path=/story/icons-icons--controls
   */
  @Prop() rightIcon: string;

  /**
   * If this tree-item has a nested tree, set this attribute to make the tree open by default
   */
  @Prop() opened = false;

  /**
   * The presence of this attribute displays a +/- icon to toggle/untoggle the tree
   */
  @Prop() isLeaf: boolean = undefined;

  //PROPS
  @Prop() hasChildTree = false;
  @Prop() firstTreeItem = false;
  @Prop() indeterminate: boolean;
  @Prop() disabled = false;

  //STATE
  @State() numberOfParentTrees = 1;
  @State() itemPaddingLeft;
  @State() verticalLineHeight: string;
  @State() horizontalLinePaddingLeft = 0;
  @State() lastTreeItem = false;
  @State() firstTreeItemOfParentTree = false;
  @State() lastTreeItemOfParentTree = false;
  @State() rightIconColor: Color = "auto";

  //EVENTS
  @Event() liItemClicked: EventEmitter;
  @Event() toggleIconClicked: EventEmitter;

  @Element() el: HTMLElement;

  componentWillLoad() {
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
      this.rightIconColor = "primary";
    } else if (this.disabled) {
      this.rightIconColor = "disabled";
    }

    //If this tree item has a source to download, this item has child tree, and is not leaf
    if (this.download) {
      this.hasChildTree = true;
      this.isLeaf = false;
    }
  }

  componentDidLoad() {
    setTimeout(
      function () {
        this.getChildTreeHeight();
      }.bind(this),
      100
    );
  }

  @Watch("downloaded")
  watchHandler(newValue: boolean) {
    if (newValue) {
      this.updateTreeVerticalLineHeight();
    }
  }

  getParents(elem) {
    // Returns the number of parent tree items in order to set the appropriate paddding-left
    // Set up a parent array
    const numberOfTreeParents = [];

    // Push each parent element to the array
    for (; elem && elem !== document; elem = elem.parentNode) {
      const elemTagNAme = elem.tagName;
      if (elemTagNAme === "GXG-TREE") {
        numberOfTreeParents.push(elem);
      }
    }
    return numberOfTreeParents.length;
  }

  toggleTreeIconClicked() {
    if (this.opened) {
      console.log("opened");
      this.opened = false;
    } else {
      console.log("closed");
      this.opened = true;
    }
    this.toggleIconClicked.emit();
  }

  @Method()
  async updateTreeVerticalLineHeight() {
    setTimeout(
      function () {
        this.getChildTreeHeight();
      }.bind(this),
      50
    );
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
      if (this.checkbox) {
        if (this.checked) {
          this.checked = false;
        } else {
          this.checked = true;
        }
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
                if (prevElementSiblingHasOpenTree) {
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
      console.log("arrow down");
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
            console.log("last tree item");
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
            console.log("this is not the last tree item");
            console.log(this.hasChildTree);
            if (this.hasChildTree && this.opened) {
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
    //Returns the type of icon : gemini-tools/add or gemini-tools/minus
    if (!this.opened || this.download) {
      return "gemini-tools/add";
    } else {
      return "gemini-tools/minus";
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

  getChildTreeHeight() {
    //Get the children tree height to calculate the vertical line that associates the chid-items with the parent item
    const childrenTree = this.el.children;
    if (childrenTree.item(0) !== null) {
      const childrenTreeChildTreeItems = childrenTree.item(0).children;
      const lastChildrenTreeChildTreeItemHeight = (childrenTreeChildTreeItems.item(
        childrenTreeChildTreeItems.length - 1
      ) as HTMLElement).offsetHeight;

      //If this tree-item has a child tree element, get its height
      const childTreeHeight = (childrenTree.item(0) as HTMLElement)
        .offsetHeight;
      this.verticalLineHeight =
        childTreeHeight - lastChildrenTreeChildTreeItemHeight + 10 + "px";
    }
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

  render() {
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
            }}
            style={{ paddingLeft: this.returnPaddingLeft() }}
            onDblClick={this.liTextDoubleClicked.bind(this)}
            onKeyDown={this.liTextKeyDownPressed.bind(this)}
            tabIndex={this.liTextTabIndex()}
          >
            {!this.isLeaf || this.download
              ? [
                  <span
                    class={{ "vertical-line": true }}
                    style={{
                      height: this.verticalLineHeight,
                      left: this.returnVerticalLineLeftPosition(),
                    }}
                  ></span>,
                  <div class={{ "closed-opened-icons": true }}>
                    <gxg-icon
                      type={this.returnToggleIconType()}
                      size="small"
                      onClick={this.toggleTreeIconClicked.bind(this)}
                      class="toggle-icon"
                    ></gxg-icon>
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
              <gxg-form-checkbox
                checked={this.checked}
                class={{ checkbox: true }}
                tabIndex={this.checkboxTabIndex()}
                indeterminate={this.setIndeterminate()}
                disabled={this.disabled}
              ></gxg-form-checkbox>
            ) : null}
            {this.leftIcon ? (
              <gxg-icon
                size="small"
                type={this.leftIcon}
                color={this.disabled ? "disabled" : "auto"}
              ></gxg-icon>
            ) : null}
            <span class="text">
              <slot></slot>
            </span>
            {this.rightIcon ? (
              <gxg-icon
                size="small"
                type={this.rightIcon}
                color={this.rightIconColor}
                class={{ "right-icon": true }}
              ></gxg-icon>
            ) : null}
            {this.download ? <span class={{ loading: true }}></span> : null}
          </div>
          <slot name="tree"></slot>
        </li>
      </Host>
    );
  }
}
