import {
  Component,
  Host,
  h,
  Prop,
  State,
  Element,
  Event,
  EventEmitter,
  Method,
} from "@stencil/core";
import Split from "split.js";

@Component({
  tag: "gxg-splitter",
  styleUrl: "splitter.scss",
  shadow: true,
})
export class GxgSplitter {
  /**
   * This event is fired when the gutter is being dragged
   */
  @Event() dragging: EventEmitter;
  /**
   * This event is fired when the dragging has stopped
   */
  @Event() dragEnded: EventEmitter;

  @Element() el: HTMLElement;

  /**
   * The splitter direction
   */
  @Prop() direction: Direction = "horizontal";

  /**
   * The splitter direction
   */
  @Prop() forceCollapseZero = false;
  /**
   * The type of knob
   */
  @Prop({ reflect: true }) knob: Knob = "none";
  /**
   * The splitter min. sizes in pixels
   */
  @Prop() minSize = "0,0";
  /**
   * The splitter initial sizes, in percentages. The sum should equal 100
   */
  @Prop() sizes = "50,50";

  @State() split;
  @State() minSizeArray: Array<number>;
  @State() sizesArray: Array<number>;
  @State() idsArray: Array<string> = [];
  @State() currentSizes: number;
  @State() leftSplitReachedMin = false;
  @State() rightSplitReachedMin = false;

  @State() collapsedToZero = false;

  makeId(length) {
    const result = [];
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength))
      );
    }
    result.unshift("a"); // this prevents the id begining with a number, which is not allowed
    return result.join("");
  }

  componentWillLoad() {
    const splits = this.el.querySelectorAll("gxg-split");
    splits.forEach(
      function (split) {
        const randomId = this.makeId(5);
        split.setAttribute("id", randomId);
      }.bind(this)
    );
  }

  componentDidLoad() {
    this.getIds();
    this.convertStringPropertiesToArray();
    this.validateSizes();

    this.split = Split(this.idsArray, {
      gutterSize: 8,
      cursor: "col-resize",
      minSize: this.minSizeArray,
      sizes: this.sizesArray,
      direction: this.direction,
      onDragStart: this.onDragStartFunc.bind(this),
      onDrag: this.onDragFunc.bind(this),
      onDragEnd: this.onDragEndFunc.bind(this),
      gutter: () => {
        const gutter = document.createElement("div");

        if (this.knob === "bidirectional") {
          //KNOB
          const knob = document.createElement("span");
          knob.classList.add("knob");
          knob.style.backgroundColor = `var(--gray-01)`;
          knob.style.width = `var(--spacing-comp-05)`;
          knob.style.height = `var(--spacing-comp-05)`;
          knob.style.display = "block";
          knob.style.zIndex = "5";
          knob.style.position = "absolute";
          knob.style.borderRadius = "50%";
          knob.style.cursor = "pointer";
          if (this.direction === "vertical") {
            knob.style.transform = "rotate(90deg)";
          }

          //KNOB middle line
          const knobMiddleLine = document.createElement("span");
          knobMiddleLine.style.backgroundColor = `var(--gray-06)`;
          knobMiddleLine.style.width = "2px";
          knobMiddleLine.style.height = "16px";
          knobMiddleLine.style.position = "relative";
          knobMiddleLine.style.left = "11px";
          knobMiddleLine.style.top = "4px";
          knobMiddleLine.style.display = "block";
          knob.appendChild(knobMiddleLine);

          //KNOB left side
          const knobLeftSide = document.createElement("span");
          knobLeftSide.style.width = "11px";
          knobLeftSide.style.height = `var(--spacing-comp-05)`;
          knobLeftSide.style.display = "block";
          knobLeftSide.style.top = "-16px";
          knobLeftSide.style.position = "relative";
          knobLeftSide.style.borderBottomLeftRadius = "40px";
          knobLeftSide.style.borderTopLeftRadius = "40px";
          knobLeftSide.style.backgroundColor = "transparent";
          knobLeftSide.style.cursor = "pointer";
          knobLeftSide.style.zIndex = "20";
          knobLeftSide.style.pointerEvents = "auto";

          knobLeftSide.addEventListener(
            "click",
            this.knobLeftClicked.bind(this)
          );
          knobLeftSide.onmouseover = this.knobLeftOver.bind(this);
          knobLeftSide.onmouseout = this.knobLeftOut.bind(this);
          knob.appendChild(knobLeftSide);

          //KNOB right side
          const knobRightSide = document.createElement("span");
          knobRightSide.style.width = "11px";
          knobRightSide.style.height = `var(--spacing-comp-05)`;
          knobRightSide.style.display = "block";
          knobRightSide.style.top = "-40px";
          knobRightSide.style.right = "-13px";
          knobRightSide.style.position = "relative";
          knobRightSide.style.borderBottomRightRadius = "40px";
          knobRightSide.style.borderTopRightRadius = "40px";
          knobRightSide.style.backgroundColor = "transparent";
          knobRightSide.style.cursor = "pointer";
          knobRightSide.style.zIndex = "20";
          knobRightSide.style.pointerEvents = "auto";
          knobRightSide.addEventListener(
            "click",
            this.knobRightClicked.bind(this)
          );
          knobRightSide.onmouseover = this.knobRightOver.bind(this);
          knobRightSide.onmouseout = this.knobRightOut.bind(this);
          knob.appendChild(knobRightSide);
          gutter.appendChild(knob);
          //End of KNOB
        }

        gutter.className = `gutter gutter-${this.direction}`;
        return gutter;
      },
    });

    //set classes
    const slottedSplits = this.el.querySelectorAll("gxg-split");
    if (this.direction === "horizontal") {
      slottedSplits.forEach(function (split) {
        split.classList.add("split-horizontal");
      });
    }
  }

  convertStringPropertiesToArray() {
    this.minSizeArray = this.minSize.split(",").map(function (number) {
      return parseInt(number, 10);
    });

    this.sizesArray = this.sizes.split(",").map(function (number) {
      return parseInt(number, 10);
    });
  }

  getIds() {
    const slottedSplits = this.el.querySelectorAll("gxg-split");
    slottedSplits.forEach(
      function (split) {
        const splitId = split.getAttribute("id");
        this.idsArray.push("#" + splitId);
      }.bind(this)
    );
  }

  validateSizes() {
    let totalSize = 0;
    let eachSplitSize = 0;
    const sizesArrayLength = this.sizesArray.length;
    this.sizesArray.forEach(function (splitSize) {
      totalSize += splitSize;
    });
    if (totalSize > 100) {
      eachSplitSize = 100 / sizesArrayLength;
      this.sizesArray = [];
      for (let i = 0; i < sizesArrayLength; i++) {
        this.sizesArray.push(eachSplitSize);
      }
    }
  }

  //KNOB
  knobLeftClicked() {
    //add class to make the transition smooth
    const slottedSplits = this.el.querySelectorAll("gxg-split");
    slottedSplits.forEach(function (split) {
      split.classList.add("smooth-transition");
    });
    if (this.forceCollapseZero) {
      if (this.collapsedToZero) {
        console.log("collapsed to zero");
        this.split.collapse(1);
        this.rightSplitReachedMin = true;
        this.collapsedToZero = false;
      } else if (this.leftSplitReachedMin) {
        console.log("left Split Reached Min");
        const leftSplit = slottedSplits[0];
        const rightSplit = slottedSplits[1];
        if (this.direction === "horizontal") {
          leftSplit.style.width = "0";
          rightSplit.style.width = "calc(100% - 8px)";
          this.collapsedToZero = true;
        } else if (this.direction === "vertical") {
          leftSplit.style.height = "0";
          rightSplit.style.height = "calc(100% - 8px)";
          this.collapsedToZero = true;
        }
      } else {
        this.split.collapse(0);
        this.leftSplitReachedMin = true;
        this.rightSplitReachedMin = false;
      }
    } else {
      this.split.collapse(0);
      setTimeout(
        function () {
          this.detectDragEndReachedMinimum();
        }.bind(this),
        350 // This value has to the be same as transition speed on split.scss on the .smooth-transition class
      );
    }
  }
  knobRightClicked() {
    //add class to make the transition smooth
    const slottedSplits = this.el.querySelectorAll("gxg-split");
    slottedSplits.forEach(function (split) {
      split.classList.add("smooth-transition");
    });
    if (this.forceCollapseZero) {
      if (this.collapsedToZero) {
        console.log("collapsed to zero");
        this.split.collapse(0);
        this.rightSplitReachedMin = false;
        this.collapsedToZero = false;
      } else if (this.rightSplitReachedMin) {
        console.log("right Split Reached Min");
        const leftSplit = slottedSplits[0];
        const rightSplit = slottedSplits[1];
        if (this.direction === "horizontal") {
          leftSplit.style.width = "calc(100% - 8px)";
          rightSplit.style.width = "0";
          this.collapsedToZero = true;
        } else if (this.direction === "vertical") {
          leftSplit.style.height = "calc(100% - 8px)";
          rightSplit.style.height = "0";
          this.collapsedToZero = true;
        }
      } else {
        console.log("collapse 1");
        this.split.collapse(1);
        this.rightSplitReachedMin = true;
        this.leftSplitReachedMin = false;
      }
    } else {
      this.split.collapse(1);
      setTimeout(
        function () {
          this.detectDragEndReachedMinimum();
        }.bind(this),
        350 // This value has to the be same as transition speed on split.scss on the .smooth-transition class
      );
    }
  }
  knobLeftOver() {
    this.el.classList.add("knob-left-hover");
  }
  knobLeftOut() {
    this.el.classList.remove("knob-left-hover");
  }
  knobRightOver() {
    this.el.classList.add("knob-right-hover");
  }
  knobRightOut() {
    this.el.classList.remove("knob-right-hover");
  }

  //DRAG FUNCS
  onDragStartFunc() {
    //remove class that makes the transition smooth
    const slottedSplits = this.el.querySelectorAll("gxg-split");
    slottedSplits.forEach(function (split) {
      split.classList.remove("smooth-transition");
    });
  }
  onDragFunc() {
    this.detectDragEndReachedMinimum();

    //emmit dragging event
    this.dragging.emit("dragging");
  }
  onDragEndFunc() {
    setTimeout(
      function () {
        //Emmit drag ended event
        this.dragEnded.emit("drag ended");
      }.bind(this),
      350 // This value has to the be same as transition speed on split.scss on the .smooth-transition class
    );
  }
  detectDragEndReachedMinimum() {
    let splitterLength;
    if (this.direction === "horizontal") {
      splitterLength = this.el.clientWidth;
    } else if (this.direction === "vertical") {
      splitterLength = this.el.clientHeight;
    }
    //actual sizes in percentages
    const rightActualSize = this.split.getSizes()[1];
    const leftActualSize = this.split.getSizes()[0];
    //actual sizes in pixels
    const rightActualSizePixels = Math.trunc(
      (rightActualSize * splitterLength) / 100
    );
    const leftActualSizePixels = Math.trunc(
      (leftActualSize * splitterLength) / 100
    );
    if (
      (rightActualSizePixels < this.minSizeArray[1] + 15 &&
        rightActualSizePixels > this.minSizeArray[1] - 15) ||
      (leftActualSizePixels < this.minSizeArray[0] + 15 &&
        leftActualSizePixels > this.minSizeArray[0] - 15)
    ) {
      this.el.classList.add("gutter-reached-end");
      setTimeout(
        function () {
          this.el.classList.remove("gutter-reached-end");
        }.bind(this),
        350 // This value has to the be same as transition speed on split.scss on the .smooth-transition class
      );
    } else {
      this.el.classList.remove("gutter-reached-left");
      this.el.classList.remove("gutter-reached-right");
      this.rightSplitReachedMin = false;
      this.leftSplitReachedMin = false;
    }
    //if guttter reached right:
    if (
      rightActualSizePixels < this.minSizeArray[1] + 15 &&
      rightActualSizePixels > this.minSizeArray[1] - 15
    ) {
      if (!this.forceCollapseZero) {
        this.el.classList.add("gutter-reached-right");
        this.el.classList.remove("gutter-reached-left");
      } else {
        this.rightSplitReachedMin = true;
        this.leftSplitReachedMin = false;
      }
    }
    //if guttter reached left:
    if (
      leftActualSizePixels < this.minSizeArray[0] + 15 &&
      leftActualSizePixels > this.minSizeArray[0] - 15
    ) {
      if (!this.forceCollapseZero) {
        this.el.classList.add("gutter-reached-left");
        this.el.classList.remove("gutter-reached-right");
      } else {
        this.leftSplitReachedMin = true;
        this.rightSplitReachedMin = false;
      }
    }
  }
  /**
   * This method allows to collapse the split passsed as argument
   */
  @Method()
  async collapse(split: number, forceCollapseZero = false) {
    //add class to make the transition smooth
    const slottedSplits = this.el.querySelectorAll("gxg-split");
    slottedSplits.forEach(function (split) {
      split.classList.add("smooth-transition");
    });
    const leftSplit = slottedSplits[0];
    const rightSplit = slottedSplits[1];
    if (this.forceCollapseZero && forceCollapseZero) {
      if (this.direction === "horizontal") {
        if (split === 0) {
          leftSplit.style.width = "0";
          rightSplit.style.width = "calc(100% - 8px)";
        } else if (split === 1) {
          leftSplit.style.width = "calc(100% - 8px)";
          rightSplit.style.width = "0";
        }
      } else if (this.direction === "vertical") {
        if (split === 0) {
          leftSplit.style.height = "0";
          rightSplit.style.height = "calc(100% - 8px)";
        } else if (split === 1) {
          leftSplit.style.height = "calc(100% - 8px)";
          rightSplit.style.height = "0";
        }
      }
      this.collapsedToZero = true;
    } else {
      this.split.collapse(split);
    }
  }

  render() {
    return (
      <Host class={{ "collapsed-to-zero": this.collapsedToZero }}>
        <slot></slot>
      </Host>
    );
  }
}

export type Direction = "horizontal" | "vertical";
export type Knob = "bidirectional" | "none";
