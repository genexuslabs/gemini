import { Component, Prop, h, State, Watch } from "@stencil/core";
@Component({
  tag: "gxg-demo",
  styleUrl: "demo.scss",
  shadow: true
})
export class GxgDemo {
  @Prop() layerZIndex = 100;
  @Prop() initiateDemo = false;
  @Prop() modalMessage = "Welcome to the demo!";

  @State() gxgDemoItems: NodeList;
  @State() numberOfItems = 0;
  @State() currentItem = 0;
  @State() instructionMessage = "This is the default message";
  @State() instructionPosition = "top-right";
  @State() leftPosition: string;
  @State() rightPosition: string;
  @State() topPosition: string;

  //Item styles
  @State() previosItemZIndex: string;
  @State() previosItemPosition: string;
  @State() previosItemBoxShadow: string;

  componentDidLoad() {
    //Retrieve all the demo items
    this.gxgDemoItems = document.querySelectorAll("*[gxg-demo-item]");
    this.numberOfItems = this.gxgDemoItems.length;
    this.setCoordinates(this.gxgDemoItems[0]);
  }

  setCoordinates(item) {
    //MESSAGE POSITION
    const itemCoordinates = item.getBoundingClientRect();
    const x = itemCoordinates.x;
    const y = itemCoordinates.y;
    const right = itemCoordinates.right;
    const height = itemCoordinates.height;
    const top = itemCoordinates.top;
    const width = itemCoordinates.width;
    this.instructionPosition = (item as HTMLElement).getAttribute(
      "instruction-position"
    );

    //Position
    let documentWidth;
    const offsetDistance = 7;
    const scrollWidth = 17;
    switch (this.instructionPosition) {
      case "bottom-left":
        this.leftPosition = x + "px";
        this.rightPosition = "auto";
        this.topPosition = y + height + offsetDistance + "px";
        break;
      case "bottom-center":
        this.leftPosition = x + width / 2 + "px";
        this.topPosition = y + height + offsetDistance + "px";
        break;
      case "bottom-right":
        documentWidth = document.body.clientWidth;
        this.leftPosition = "auto";
        this.rightPosition = documentWidth - right + scrollWidth + "px";
        this.topPosition = y + height + offsetDistance + "px";
        break;
      case "top-left":
        this.leftPosition = x + "px";
        this.topPosition = top - offsetDistance + "px";
        this.rightPosition = "auto";
        break;
      case "top-center":
        this.leftPosition = x + width / 2 + "px";
        this.topPosition = top - offsetDistance + "px";
        break;
      case "top-right":
        documentWidth = document.body.clientWidth;
        this.leftPosition = "auto";
        this.rightPosition = documentWidth - right + scrollWidth + "px";
        this.topPosition = top - offsetDistance + "px";
        break;
    }

    //Message
    this.instructionMessage = (item as HTMLElement).getAttribute(
      "instruction-message"
    );
  }

  setItemStyles(item) {
    //reset previous item styles to as they where on the begining
    if (this.currentItem !== 0) {
      const prevItem = this.gxgDemoItems[this.currentItem - 1];
      (prevItem as HTMLElement).style.zIndex = this.previosItemZIndex;
      (prevItem as HTMLElement).style.position = this.previosItemPosition;
      (prevItem as HTMLElement).style.boxShadow = this.previosItemBoxShadow;
    }

    //Apply styles to highlight element
    setTimeout(
      function() {
        item.style.zIndex = this.layerZIndex + 1;
        item.style.position = "relative";
        item.style.boxShadow = "0px 0px 8px 3px rgba(255,255,255,1)";
        item.style.pointerEvents = "none";
      }.bind(this),
      50
    );
  }

  @Watch("initiateDemo")
  initiateDemoHandler() {
    //save current styles of first item
    this.previosItemZIndex = (this.gxgDemoItems[0] as HTMLElement).style.zIndex;
    this.previosItemPosition = (this
      .gxgDemoItems[0] as HTMLElement).style.position;
    this.previosItemBoxShadow = (this
      .gxgDemoItems[0] as HTMLElement).style.boxShadow;
    this.setItemStyles(this.gxgDemoItems[0]);
  }

  nextDemoItem() {
    const newItem = this.gxgDemoItems[++this.currentItem];
    this.setCoordinates(newItem);
    this.setItemStyles(newItem);
  }

  // endDemo() {}

  render() {
    if (this.initiateDemo === true) {
      return [
        <div
          class={{
            tooltip: true,
            "bottom-left": this.instructionPosition === "bottom-left",
            "bottom-center": this.instructionPosition === "bottom-center",
            "bottom-right": this.instructionPosition === "bottom-right",
            "top-left": this.instructionPosition === "top-left",
            "top-center": this.instructionPosition === "top-center",
            "top-right": this.instructionPosition === "top-right"
          }}
          style={{
            zIndex: (this.layerZIndex + 1).toString(),
            left: this.leftPosition,
            right: this.rightPosition,
            top: this.topPosition
          }}
        >
          <div class="tooltip__number">{this.currentItem + 1}</div>
          <div class="tooltip__message">{this.instructionMessage}</div>
        </div>,
        <div
          class="modal"
          style={{
            zIndex: (this.layerZIndex + 1).toString()
          }}
        >
          <div class="col-left">
            <p>{this.modalMessage}</p>
          </div>
          <div class="col-right">
            <gxg-button type="outlined" onClick={this.endDemo.bind(this)}>
              End demo
            </gxg-button>
            <gxg-button
              type="primary-text-only"
              onClick={this.nextDemoItem.bind(this)}
            >
              {this.currentItem + 1 !== this.numberOfItems ? "Next" : "Finish"}
            </gxg-button>
          </div>
        </div>,
        <div
          class="layer"
          style={{ zIndex: this.layerZIndex.toString() }}
        ></div>
      ];
    }
  }
}
