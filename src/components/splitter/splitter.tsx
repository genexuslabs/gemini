import { Component, Host, h, Prop, State, Element } from "@stencil/core";
import Split from "split.js";

@Component({
  tag: "gxg-splitter",
  styleUrl: "splitter.scss",
  shadow: true,
})
export class GxgSplitter {
  @Element() el: HTMLElement;

  @Prop() direction: Direction = "horizontal";
  @Prop() knob = false;
  @Prop() minSize: string = undefined;
  @Prop() sizes: string = undefined;

  @State() dragged = false;
  @State() split;
  @State() sizesBeforeCollapse;
  @State() collapsed = false;
  @State() minSizeArray: Array<number>;
  @State() sizesArray: Array<number>;
  @State() idsArray: Array<string> = [];

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

        if (this.knob) {
          //KNOB
          const knob = document.createElement("span");
          knob.classList.add("knob");
          knob.style.backgroundColor = `var(--gray-05)`;
          knob.style.display = "block";
          knob.style.opacity = "0";
          knob.style.zIndex = "5";
          knob.style.cursor = "pointer";

          if (this.direction === "horizontal") {
            knob.style.height = "40px";
            knob.style.width = "8px";
          } else if (this.direction === "vertical") {
            knob.style.width = "40px";
            knob.style.height = "8px";
          }
          knob.onclick = this.knobClicked.bind(this);
          knob.onmouseover = this.knobOver.bind(this);
          knob.onmouseout = this.knobOut.bind(this);
          gutter.appendChild(knob);
          //End of KNOB
        }

        gutter.className = `gutter gutter-${this.direction}`;
        return gutter;
      },
    });

    //set classes
    const slottedSplits = document.querySelectorAll("gxg-split");
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
    const slottedSplits = document.querySelectorAll("gxg-split");
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
  knobClicked() {
    if (!this.dragged) {
      //add class to make the transition smooth
      const slottedSplits = document.querySelectorAll("gxg-split");
      slottedSplits.forEach(function (split) {
        split.classList.add("smooth-transition");
      });

      if (!this.collapsed) {
        this.split.collapse(0);
        this.collapsed = true;
      } else {
        //uncollapse
        this.split.setSizes(this.sizesBeforeCollapse);
        this.collapsed = false;
      }
    } else {
    }
  }
  knobOver() {
    this.el.classList.add("knob-hover");
  }
  knobOut() {
    this.el.classList.remove("knob-hover");
  }

  //DRAG FUNCS
  onDragStartFunc() {
    //remove class to make the transition smooth
    const slottedSplits = document.querySelectorAll("gxg-split");
    slottedSplits.forEach(function (split) {
      split.classList.remove("smooth-transition");
    });
  }
  onDragFunc() {
    this.dragged = true;
  }
  onDragEndFunc() {
    setTimeout(
      function () {
        this.dragged = false;
      }.bind(this),
      25
    );
    //save current width on a state variable if the user wants to uncollapse later
    if (this.split.getSizes()[0] > 1) {
      console.log(this.split.getSizes()[0]);
      this.sizesBeforeCollapse = this.split.getSizes();
      this.collapsed = false;
    }
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}

export type Direction = "horizontal" | "vertical";
