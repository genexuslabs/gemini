import {
  Component,
  Event,
  EventEmitter,
  Element,
  Prop,
  State,
  getAssetPath,
  Watch,
} from "@stencil/core";
@Component({
  tag: "gxg-tree-item",
  styleUrl: "tree-item.scss",
  shadow: true,
  assetsDirs: ["tree-item-assets"],
})

// return "./card-assets/new-card.svg";
export class GxgTreeItem {
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
   * Set this attribute when you are downloading a resource
   */
  @Prop() downloading = false;

  /**
   * Set thhe left side icon from the available Gemini icon set : https://gx-gemini.netlify.app/?path=/story/icons-icons--controls
   */
  @Prop() leftIcon: string;
  /**
   

  /**
   * Set thhe right side icon from the available Gemini icon set : https://gx-gemini.netlify.app/?path=/story/icons-icons--controls
   */
  @Prop() rightIcon: string;
  /**

  /**
   * If this tree-item has a nested tree, set this attribute to make the tree open by default
   */
  @Prop() opened = false;

  /**
   * The presence of this attribute displays a +/- icon to toggle/untoggle the tree
   */
  @Prop() isLeaf: boolean = undefined;

  /**
   * The presence of this attribute sets focus on it
   */
  @Prop() focused = false;

  //STATE
  @State() numberOfParentTrees = 1;
  @State() itemPaddingLeft;
  @State() verticalLineHeight: string;
  @State() horizontalLinePaddingLeft = 0;
  @State() hidePlusMinusIcon: boolean;
  @State() showDownloadingIcon = false;

  //EVENTS
  @Event() liItemClicked: EventEmitter;

  @Element() el: HTMLElement;

  componentWillLoad() {
    //If tree item has not a tree-item inside, is leaf
    const treeItemHasTree = this.el.querySelector('[slot="tree"]');
    if (this.isLeaf === undefined) {
      if (treeItemHasTree === null) {
        this.isLeaf = true;
      }
    }
  }

  componentDidLoad() {
    //Count number of parent trees in order to set the apporpiate padding-left
    this.numberOfParentTrees = this.getParents(this.el);

    setTimeout(
      function () {
        this.getChildTreeHeight();
      }.bind(this),
      100
    );
  }

  @Watch("downloading")
  downloadingHandler() {
    if (this.downloading) {
      this.hidePlusMinusIcon = true;
      setTimeout(() => (this.showDownloadingIcon = true), 250);
    } else {
      this.showDownloadingIcon = false;
      setTimeout(() => (this.hidePlusMinusIcon = false), 250);
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
    //If tree is collapsed, uncollapse.
    //If tree is uncollapsed, collapse.
    if (!this.isLeaf) {
      if (this.opened) {
        this.opened = false;
      } else {
        this.opened = true;
        //Play click open sound
        const audio = new Audio(
          getAssetPath("./tree-item-assets/click-open.mp3")
        );
        audio.play();
      }
    }
  }

  liTextDoubleClicked() {
    this.toggleTreeIconClicked();
  }

  liTextClicked() {
    //Remove focus from current focused item (if any)
    this.liItemClicked.emit();

    //Set focus to the element
    this.focused = true;
  }

  returnToggleIconType() {
    //Returns the type of icon : gemini-tools/add or gemini-tools/minus
    if (this.opened) {
      return "gemini-tools/minus";
    } else {
      return "gemini-tools/add";
    }
  }

  returnPaddingLeft() {
    //returns the appropriate padding left to the .li-text element
    let paddingLeft = 0;

    paddingLeft = this.numberOfParentTrees * 35;
    if (!this.isLeaf) {
      paddingLeft -= 5;
    }
    this.itemPaddingLeft = paddingLeft;
    return paddingLeft + "px";
  }

  getChildTreeHeight() {
    //Get the children tree height to calculate the vertical line that associates the chid-items with the parent item
    const childrenTree = this.el.children;
    if (childrenTree.item(0) !== null) {
      //If this tree-item has a child tree element, get its height
      const childTreeHeight = (childrenTree.item(0) as HTMLElement)
        .offsetHeight;
      this.verticalLineHeight = childTreeHeight - 10 + "px";
    }
  }

  returnVerticalLineLeftPosition() {
    //Returns the left position of the vertical line that associates the chid-items with the parent item
    return this.itemPaddingLeft + 10 + "px";
  }
  returnHorizontallLineLeftPosition() {
    //Returns the left position of the horizontal line that associates the chid-items with the parent item
    return this.numberOfParentTrees * 10 + "px";
  }

  render() {
    return (
      <li
        class={{
          "tree-open": this.opened,
          "show-downloading-icon": this.showDownloadingIcon,
          "hide-plus-minus-icon": this.hidePlusMinusIcon,
        }}
      >
        <div
          class={{
            "li-text": true,
            "li-text--not-leaf": !this.isLeaf,
            "li-text--focused": this.focused,
          }}
          style={{ paddingLeft: this.returnPaddingLeft() }}
          onDblClick={this.liTextDoubleClicked.bind(this)}
          onClick={this.liTextClicked.bind(this)}
        >
          {!this.isLeaf
            ? [
                <span
                  class={{ "vertical-line": true }}
                  style={{
                    height: this.verticalLineHeight,
                    left: this.returnVerticalLineLeftPosition(),
                  }}
                ></span>,
                <div class={{ "closed-opened-loading-icons": true }}>
                  <gxg-icon
                    type={this.returnToggleIconType()}
                    size="small"
                    onClick={this.toggleTreeIconClicked.bind(this)}
                    class="toggle-icon"
                  ></gxg-icon>
                  <span class="loading"></span>
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
            ></gxg-form-checkbox>
          ) : null}
          {this.leftIcon ? (
            <gxg-icon size="small" type={this.leftIcon} color="auto"></gxg-icon>
          ) : null}
          <span class="text">
            <slot></slot>
          </span>
          {this.rightIcon ? (
            <gxg-icon
              size="small"
              type={this.rightIcon}
              color="auto"
              class="right-icon"
            ></gxg-icon>
          ) : null}
        </div>
        <slot name="tree"></slot>
      </li>
    );
  }
}
