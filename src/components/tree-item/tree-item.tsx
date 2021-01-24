import {
  Component,
  Event,
  EventEmitter,
  Element,
  Prop,
  State,
  Listen,
  h
} from "@stencil/core";
@Component({
  tag: "gxg-tree-item",
  styleUrl: "tree-item.scss",
  shadow: true
})
export class GxgTreeItem {
  //PROP
  @Prop() treeOpen = false;
  @Prop() emptyTree = false;

  //STATE
  @Prop() isLeaf = false;
  @State() paddingLeft = "4px";
  @State() numberOfParentTrees = 1;
  @State() height = 0;

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
    if (treeItemHasTree === null && !this.emptyTree) {
      this.isLeaf = true;
    }

    //Count number of parent trees in order to set the apporpiate padding-left
    this.numberOfParentTrees = this.getParents(this.el);

    //Defines the height of the vertical line that associates the chid items with the parent item
    this.returnVerticalLineHeight();
  }

  componentDidLoad() {
    //Get the item height
    this.calculateItemHeight();
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
      if (this.treeOpen) {
        this.treeOpen = false;
      } else {
        this.treeOpen = true;
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
    if (this.treeOpen) {
      return "gemini-tools/minus";
    } else {
      return "gemini-tools/add";
    }
  }

  returnPaddingLeft() {
    //returns the appropriate padding left to the .li-text element
    if (this.isLeaf) {
      return 14 * this.numberOfParentTrees + "px";
    } else {
      return 14 * this.numberOfParentTrees - 5 + "px";
    }
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
    return this.height - 27 + "px";
  }
  returnVerticalLineLeftPosition() {
    //Returns the left position of the vertical line that associates the chid-items with the parent item
    if (this.numberOfParentTrees === 1) {
      return "18px";
    } else {
      return 18 + this.numberOfParentTrees * 6 + "px";
    }
  }
  returnHorizontallLineLeftPosition() {
    //Returns the left position of the horizontal line that associates the chid-items with the parent item
    if (this.numberOfParentTrees !== 1) {
      return this.numberOfParentTrees * 11 + "px";
    }
  }

  render() {
    return (
      <li
        class={{
          "tree-open": this.treeOpen
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
          {!this.isLeaf ? (
            [
              <span
                class={{ "vertical-line": true }}
                style={{
                  height: this.returnVerticalLineHeight(),
                  left: this.returnVerticalLineLeftPosition()
                }}
              ></span>,
              <gxg-icon
                type={this.returnToggleIconType()}
                size="small"
                onClick={this.toggleTreeIconClicked.bind(this)}
              ></gxg-icon>
            ]
          ) : (
            <span
              class={{
                "horizontal-line": true,
                "display-none": this.numberOfParentTrees === 1
              }}
              style={{
                left: this.returnHorizontallLineLeftPosition()
              }}
            ></span>
          )}
          <slot></slot>
        </div>
        <slot name="tree"></slot>
      </li>
    );
  }
}
