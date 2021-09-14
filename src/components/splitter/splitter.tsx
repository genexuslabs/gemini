import {
  Component,
  Host,
  h,
  Prop,
  State,
  Element,
  Method,
  Event,
  EventEmitter,
} from "@stencil/core";
import Split from "split.js";

@Component({
  tag: "gxg-splitter",
  styleUrl: "splitter.scss",
  shadow: true,
})
export class GxgSplitter {
  @Element() el: HTMLElement;

  /**
   * The splitter direction
   */
  @Prop() direction: Direction = "horizontal";

  /**
   * The prescence of this attributes forces the splitter to collapse to zero
   */
  @Prop() forceCollapseZero = false;
  /**
   * The type of knob (simple: only draggable - bidirectional: draggable and collapsable by clicking the arrows)
   */
  @Prop({ reflect: true }) knob: Knob = "simple";
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
  @State() currentSizes: Array<number>;
  @State() dragging = false;

  @State() leftCollapsedToZero = false;
  @State() rightCollapsedToZero = false;

  @Event() draggingEvt: EventEmitter;
  @Event() dragEndedEvt: EventEmitter;

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
          knob.style.width = `var(--spacing-comp-05)`;
          knob.style.height = `var(--spacing-comp-05)`;
          knob.style.display = "block";
          knob.style.zIndex = "5";
          knob.style.position = "absolute";
          if (this.direction === "vertical") {
            knob.style.transform = "rotate(90deg)";
          }

          //KNOB middle line
          const knobMiddleLine = document.createElement("span");
          knobMiddleLine.style.backgroundColor = `var(--gray-03)`;
          knobMiddleLine.style.width = "2px";
          knobMiddleLine.style.height = "16px";
          knobMiddleLine.style.position = "relative";
          knobMiddleLine.style.left = "11px";
          knobMiddleLine.style.top = "4px";
          knobMiddleLine.style.display = "block";
          knobMiddleLine.style.transition = "0.25s all";
          knobMiddleLine.classList.add("middle-line");
          knob.appendChild(knobMiddleLine);

          //KNOB left side
          const knobLeftSide = document.createElement("span");
          knobLeftSide.style.width = "11px";
          knobLeftSide.style.height = `var(--spacing-comp-05)`;
          knobLeftSide.style.display = "block";
          knobLeftSide.style.top = "-36px";
          knobLeftSide.style.left = "6px";
          knobLeftSide.style.position = "relative";
          knobLeftSide.style.borderBottomLeftRadius = "40px";
          knobLeftSide.style.borderTopLeftRadius = "40px";
          knobLeftSide.style.backgroundColor = "transparent";
          knobLeftSide.style.cursor = "pointer";
          knobLeftSide.style.zIndex = "20";
          knobLeftSide.style.pointerEvents = "auto";
          knobLeftSide.classList.add("left-knob");

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
          knobRightSide.style.top = "-20px";
          knobRightSide.style.right = "-6px";
          knobRightSide.style.position = "relative";
          knobRightSide.style.borderBottomRightRadius = "40px";
          knobRightSide.style.borderTopRightRadius = "40px";
          knobRightSide.style.backgroundColor = "transparent";
          knobRightSide.style.cursor = "pointer";
          knobRightSide.style.zIndex = "20";
          knobRightSide.style.pointerEvents = "auto";
          knobRightSide.classList.add("right-knob");
          knobRightSide.addEventListener(
            "click",
            this.knobRightClicked.bind(this)
          );
          knobRightSide.onmouseover = this.knobRightOver.bind(this);
          knobRightSide.onmouseout = this.knobRightOut.bind(this);
          knob.appendChild(knobRightSide);
          gutter.appendChild(knob);
          //End of KNOB
        } else {
          //KNOB
          const knob = document.createElement("span");
          knob.classList.add("knob");
          knob.style.width = `var(--spacing-comp-05)`;
          knob.style.height = `var(--spacing-comp-05)`;
          knob.style.display = "block";
          knob.style.zIndex = "5";
          knob.style.position = "absolute";
          if (this.direction === "vertical") {
            knob.style.transform = "rotate(90deg)";
          }

          //KNOB middle line
          const knobMiddleLine = document.createElement("span");
          knobMiddleLine.style.backgroundColor = `var(--gray-03)`;
          knobMiddleLine.style.width = "2px";
          knobMiddleLine.style.height = "16px";
          knobMiddleLine.style.position = "relative";
          knobMiddleLine.style.left = "11px";
          knobMiddleLine.style.top = "4px";
          knobMiddleLine.style.display = "block";
          knobMiddleLine.style.transition = "0.25s all";
          knobMiddleLine.classList.add("middle-line");
          knob.appendChild(knobMiddleLine);

          gutter.appendChild(knob);
        }

        gutter.className = `gutter gutter-${this.direction}`;
        return gutter;
      },
    });
    this.detectDragEndReachedMinimum();
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
    this.dragging = true;
    const middleLine = this.el.querySelector(".middle-line");
    ((middleLine as unknown) as HTMLElement).style.backgroundColor =
      "var(--color-on-primary)";
    setTimeout(
      function () {
        this.dragging = false;
        ((middleLine as unknown) as HTMLElement).style.backgroundColor =
          "var(--gray-03)";
      }.bind(this),
      450
    );
    if (this.forceCollapseZero) {
      if (!this.rightCollapsedToZero) {
        this.currentSizes = this.split.getSizes();

        const leftSplit = slottedSplits[0];
        const rightSplit = slottedSplits[1];

        if (this.direction === "horizontal") {
          leftSplit.style.width = "0";
          rightSplit.style.width = "calc(100% - 8px)";
          this.leftCollapsedToZero = true;
        } else if (this.direction === "vertical") {
          leftSplit.style.height = "0";
          rightSplit.style.height = "calc(100% - 8px)";
          this.leftCollapsedToZero = true;
        }

        const leftKnob = this.el.querySelector(".left-knob");
        ((leftKnob as unknown) as HTMLElement).style.pointerEvents = "none";
        const middleLine = this.el.querySelector(".middle-line");
        ((middleLine as unknown) as HTMLElement).style.opacity = "0";
        ((middleLine as unknown) as HTMLElement).style.pointerEvents = "none";
        const rightKnob = this.el.querySelector(".right-knob");
        ((rightKnob as unknown) as HTMLElement).style.top = "-40px";
      } else {
        //Right split is collapsed to zero. Set sizes to last saved positions
        this.split.setSizes(this.currentSizes);
        this.rightCollapsedToZero = false;

        const middleLine = this.el.querySelector(".middle-line");
        ((middleLine as unknown) as HTMLElement).style.opacity = "1";
        ((middleLine as unknown) as HTMLElement).style.pointerEvents = "auto";

        const rightKnob = this.el.querySelector(".right-knob");
        ((rightKnob as unknown) as HTMLElement).style.pointerEvents = "auto";

        const leftKnob = this.el.querySelector(".left-knob");
        ((leftKnob as unknown) as HTMLElement).style.top = "-36px";
      }
    } else {
      this.split.collapse(0);
    }
    this.detectDragEndReachedMinimum();
  }
  knobRightClicked() {
    //add class to make the transition smooth
    const slottedSplits = this.el.querySelectorAll("gxg-split");
    slottedSplits.forEach(function (split) {
      split.classList.add("smooth-transition");
    });
    this.dragging = true;
    const middleLine = this.el.querySelector(".middle-line");
    ((middleLine as unknown) as HTMLElement).style.backgroundColor =
      "var(--color-on-primary)";
    setTimeout(
      function () {
        this.dragging = false;
        ((middleLine as unknown) as HTMLElement).style.backgroundColor =
          "var(--gray-03)";
      }.bind(this),
      450
    );

    if (this.forceCollapseZero) {
      if (!this.leftCollapsedToZero) {
        this.currentSizes = this.split.getSizes();

        const leftSplit = slottedSplits[0];
        const rightSplit = slottedSplits[1];

        if (this.direction === "horizontal") {
          leftSplit.style.width = "calc(100% - 8px)";
          rightSplit.style.width = "0";
          this.rightCollapsedToZero = true;
        } else if (this.direction === "vertical") {
          leftSplit.style.height = "calc(100% - 8px)";
          rightSplit.style.height = "0";
          this.rightCollapsedToZero = true;
        }

        const rightKnob = this.el.querySelector(".right-knob");
        ((rightKnob as unknown) as HTMLElement).style.pointerEvents = "none";
        const middleLine = this.el.querySelector(".middle-line");
        ((middleLine as unknown) as HTMLElement).style.opacity = "0";
        ((middleLine as unknown) as HTMLElement).style.pointerEvents = "none";
        const leftKnob = this.el.querySelector(".left-knob");
        ((leftKnob as unknown) as HTMLElement).style.top = "-16px";
      } else {
        //Left split is collapsed to zero. Set sizes to last saved positions
        this.split.setSizes(this.currentSizes);
        this.leftCollapsedToZero = false;

        const middleLine = this.el.querySelector(".middle-line");
        ((middleLine as unknown) as HTMLElement).style.opacity = "1";
        ((middleLine as unknown) as HTMLElement).style.pointerEvents = "auto";

        const leftKnob = this.el.querySelector(".left-knob");
        ((leftKnob as unknown) as HTMLElement).style.pointerEvents = "auto";

        const rightKnob = this.el.querySelector(".right-knob");
        ((rightKnob as unknown) as HTMLElement).style.top = "-20px";
      }
    } else {
      this.split.collapse(1);
    }
    this.detectDragEndReachedMinimum();
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
    this.dragging = true;
    //remove class that makes the transition smooth
    const slottedSplits = this.el.querySelectorAll("gxg-split");
    slottedSplits.forEach(function (split) {
      split.classList.remove("smooth-transition");
    });

    const middleLine = this.el.querySelector(".middle-line");
    ((middleLine as unknown) as HTMLElement).style.backgroundColor =
      "var(--color-on-primary)";
  }
  onDragFunc() {
    this.detectDragEndReachedMinimum();
    this.draggingEvt.emit("dragging");
  }
  onDragEndFunc() {
    this.dragging = false;
    this.dragEndedEvt.emit("dragg ended");

    const middleLine = this.el.querySelector(".middle-line");
    ((middleLine as unknown) as HTMLElement).style.backgroundColor =
      "var(--gray-03)";
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
    }
    //if guttter reached right:
    if (
      rightActualSizePixels < this.minSizeArray[1] + 15 &&
      rightActualSizePixels > this.minSizeArray[1] - 15
    ) {
      if (!this.forceCollapseZero) {
        this.el.classList.add("gutter-reached-right");
        this.el.classList.remove("gutter-reached-left");
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
      }
    }
  }

  /**
   * This method allows to collapse the split passsed as argument
   */
  @Method()
  async collapse(split: number, forceCollapseToZero = false) {
    if (!forceCollapseToZero) {
      if (split === 0) {
        const leftKnob = this.el.querySelector(".left-knob");
        ((leftKnob as unknown) as HTMLElement).click();
      } else if (split === 1) {
        const rightKnob = this.el.querySelector(".right-knob");
        ((rightKnob as unknown) as HTMLElement).click();
      }
    } else {
      //Collapse to zero
      const slottedSplits = this.el.querySelectorAll("gxg-split");
      slottedSplits.forEach(function (split) {
        split.classList.add("smooth-transition");
      });
      const leftSplit = slottedSplits[0];
      const rightSplit = slottedSplits[1];

      if (this.direction === "horizontal") {
        if (split === 0) {
          const leftKnob = this.el.querySelector(".left-knob");
          ((leftKnob as unknown) as HTMLElement).click();
          ((leftKnob as unknown) as HTMLElement).click();
          leftSplit.style.width = "0";
          rightSplit.style.width = "calc(100% - 8px)";
        } else if (split === 1) {
          const rightKnob = this.el.querySelector(".right-knob");
          ((rightKnob as unknown) as HTMLElement).click();
          ((rightKnob as unknown) as HTMLElement).click();
          leftSplit.style.width = "calc(100% - 8px)";
          rightSplit.style.width = "0";
        }
      } else if (this.direction === "vertical") {
        if (split === 0) {
          const leftKnob = this.el.querySelector(".left-knob");
          ((leftKnob as unknown) as HTMLElement).click();
          ((leftKnob as unknown) as HTMLElement).click();
          leftSplit.style.height = "0";
          rightSplit.style.height = "calc(100% - 8px)";
        } else if (split === 1) {
          const rightKnob = this.el.querySelector(".right-knob");
          ((rightKnob as unknown) as HTMLElement).click();
          ((rightKnob as unknown) as HTMLElement).click();
          leftSplit.style.height = "calc(100% - 8px)";
          rightSplit.style.height = "0";
        }
      }
    }
  }

  render() {
    return (
      <Host
        class={{
          "left-collapsed-to-zero": this.leftCollapsedToZero,
          "right-collapsed-to-zero": this.rightCollapsedToZero,
          dragging: this.dragging,
        }}
      >
        <slot></slot>
      </Host>
    );
  }
}

export type Direction = "horizontal" | "vertical";
export type Knob = "bidirectional" | "simple";
