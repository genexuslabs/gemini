import {
  Component,
  Event,
  EventEmitter,
  Element,
  Prop,
  State,
  Listen,
  h,
  getAssetPath
} from "@stencil/core";
@Component({
  tag: "gxg-tree-item",
  styleUrl: "tree-item.scss",
  shadow: true,
  assetsDirs: ["tree-item-assets"]
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
  @Prop() open = false;

  //STATE
  @Prop() isLeaf: boolean;
  @State() paddingLeft = "4px";
  @State() numberOfParentTrees = 1;
  @State() height = 0;
  @State() parentHasCheckbox = false;
  @State() hasParentTree = false;
  @State() itemPaddingLeft;
  @State() horizontalLinePaddingLeft = 0;

  //EVENTS
  @Event() itemToggled: EventEmitter;

  //LISTEN
  @Listen("itemToggled")
  itemToggledHandler() {
    this.calculateItemHeight();
  }

  @Element() el: HTMLElement;

  componentWillLoad() {
    //If tree item has not a tree-item inside, is leaf
    const treeItemHasTree = this.el.querySelector('[slot="tree"]');
    if (this.isLeaf === undefined) {
      if (treeItemHasTree === null) {
        this.isLeaf = true;
      }
    }
    //Defines the height of the vertical line that associates the chid items with the parent item
    this.returnVerticalLineHeight();

    //If has parent tree
    const parentElementNodeName = this.el.parentElement.nodeName;
    if (parentElementNodeName === "GXG-TREE") {
      this.hasParentTree = true;
    }
  }

  componentDidLoad() {
    //Count number of parent trees in order to set the apporpiate padding-left
    this.numberOfParentTrees = this.getParents(this.el);
    //Get the item height
    this.calculateItemHeight();
    //If parent has checkbox...
    const parentHasCheckbox = this.el.parentElement.getAttribute("checkbox");
    if (parentHasCheckbox !== null) {
      this.parentHasCheckbox = true;
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
      if (this.open) {
        this.open = false;
      } else {
        this.open = true;
        //Play click open sound
        const audio = new Audio(
          getAssetPath("./tree-item-assets/click-open.mp3")
        );
        audio.play();
      }
      this.calculateItemHeight();
      //Recalculate item`s parents tree-items height
      this.itemToggled.emit();
    }
  }

  liTextDoubleClicked() {
    this.toggleTreeIconClicked();
  }

  returnToggleIconType() {
    //Returns the type of icon : gemini-tools/add or gemini-tools/minus
    if (this.open) {
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

  calculateItemHeight() {
    setTimeout(
      function() {
        this.height = this.el.offsetHeight;
      }.bind(this),
      50
    );
  }

  //Lines
  returnVerticalLineHeight() {
    //Returns the height of the vertical line that associates the chid-items with the parent item
    return this.height - 29 + "px";
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
          "tree-open": this.open
        }}
      >
        <div
          class={{
            "li-text": true,
            "li-text--not-leaf": !this.isLeaf
          }}
          style={{ paddingLeft: this.returnPaddingLeft() }}
          onDblClick={this.liTextDoubleClicked.bind(this)}
        >
          {!this.isLeaf
            ? [
                <span
                  class={{ "vertical-line": true }}
                  style={{
                    height: this.returnVerticalLineHeight(),
                    left: this.returnVerticalLineLeftPosition()
                  }}
                ></span>,
                this.downloading ? (
                  <span class="loading"></span>
                ) : (
                  <gxg-icon
                    type={this.returnToggleIconType()}
                    size="small"
                    onClick={this.toggleTreeIconClicked.bind(this)}
                  ></gxg-icon>
                )
              ]
            : null}
          <span
            class={{
              "horizontal-line": true,
              "display-none": this.numberOfParentTrees === 1
            }}
            style={{
              left: this.itemPaddingLeft + "px"
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
