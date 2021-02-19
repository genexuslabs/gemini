import { Component, Prop, h, State, Watch } from "@stencil/core";
@Component({
  tag: "gxg-demo",
  styleUrl: "demo.scss",
  shadow: true,
})
export class GxgDemo {
  @Prop() layerZIndex = 100;
  @Prop() initiateDemo = false;
  @Prop() modalMessage = "Welcome to the demo!";

  @State() gxgDemoItems: NodeList;
  @State() numberOfItems = 0;
  @State() currentItem = 0;
  @State() message = "Set the message for this item";
  @State() position = "top-end";
  @State() leftPosition: string;
  @State() rightPosition: string;
  @State() topPosition: string;
  @State() layerVisible = false;
  @State() instructionVisible = false;
  @State() modalVisible = false;
  @State() nextItemClicked: boolean;
  @State() disableNextButton = false;
  @State() rtl = false;

  //Current Item styles
  @State() currentItemZIndex: string;
  @State() currentItemPosition: string;
  @State() currentItemBoxShadow: string;
  @State() currentItemPointerEvents: string;

  componentDidLoad() {
    //Retrieve all the demo items
    this.gxgDemoItems = document.querySelectorAll("*[gxg-demo-item]");
    this.numberOfItems = this.gxgDemoItems.length;
    this.setCoordinates(this.gxgDemoItems[0]);
    this.resizeObserver();

    //Reading Direction
    const dirHtml = document
      .getElementsByTagName("html")[0]
      .getAttribute("dir");
    const dirBody = document
      .getElementsByTagName("body")[0]
      .getAttribute("dir");
    if (dirHtml === "rtl" || dirBody === "rtl") {
      this.rtl = true;
    }
  }

  resizeObserver() {
    const resizeObserver = new ResizeObserver(() => {
      this.setCoordinates(this.gxgDemoItems[this.currentItem]);
    });

    const body = document.querySelector("body");
    resizeObserver.observe(body);
  }

  @Watch("initiateDemo")
  initiateDemoHandler() {
    //Show overlay, instrucction and modal
    if (this.initiateDemo === true) {
      setTimeout(
        function () {
          this.layerVisible = true;
        }.bind(this),
        100
      );
      setTimeout(
        function () {
          this.instructionVisible = true;
        }.bind(this),
        200
      );
      setTimeout(
        function () {
          this.modalVisible = true;
        }.bind(this),
        800
      );

      this.saveCurrentItemStyles(this.gxgDemoItems[0]);
      this.setItemStyles(this.gxgDemoItems[0]);
    }
  }

  saveCurrentItemStyles(currentItem) {
    this.currentItemZIndex = currentItem.style.zIndex;
    this.currentItemPosition = currentItem.style.position;
    this.currentItemBoxShadow = currentItem.style.boxShadow;
    this.currentItemPointerEvents = currentItem.style.pointerEvents;
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
    this.position = (item as HTMLElement).getAttribute("position");

    //Position
    const offsetDistance = 7;
    switch (this.position) {
      case "bottom-start":
        this.topPosition = y + height + offsetDistance + "px";
        if (this.rtl) {
          this.leftPosition = "auto";
          this.rightPosition = window.innerWidth - right + "px";
        } else {
          this.leftPosition = x + "px";
          this.rightPosition = "auto";
        }
        break;
      case "bottom-center":
        this.leftPosition = x + width / 2 + "px";
        this.rightPosition = "auto";
        this.topPosition = y + height + offsetDistance + "px";
        break;
      case "bottom-end":
        this.topPosition = y + height + offsetDistance + "px";
        if (this.rtl) {
          this.leftPosition = x + "px";
          this.rightPosition = "auto";
        } else {
          this.leftPosition = "auto";
          this.rightPosition = window.innerWidth - right + "px";
        }
        break;
      case "top-start":
        this.topPosition = top - offsetDistance + "px";
        if (this.rtl) {
          this.leftPosition = "auto";
          this.rightPosition = window.innerWidth - right + "px";
        } else {
          this.leftPosition = x + "px";
          this.rightPosition = "auto";
        }
        break;
      case "top-center":
        this.leftPosition = x + width / 2 + "px";
        this.topPosition = top - offsetDistance + "px";
        this.rightPosition = "auto";
        break;
      case "top-end":
        this.topPosition = top - offsetDistance + "px";
        if (this.rtl) {
          this.leftPosition = x + "px";
          this.rightPosition = "auto";
        } else {
          this.leftPosition = "auto";
          this.rightPosition = window.innerWidth - right + "px";
        }
        break;
    }

    //Message
    this.message = (item as HTMLElement).getAttribute("message");
  }

  setItemStyles(item) {
    setTimeout(
      function () {
        item.style.zIndex = this.layerZIndex + 1;
        item.style.position = "relative";
        item.style.boxShadow = "0px 0px 8px 3px rgba(255,255,255,1)";
        item.style.pointerEvents = "none";
      }.bind(this),
      50
    );
  }

  removeStyles(item) {
    item.style.zIndex = this.currentItemZIndex;
    item.style.position = this.currentItemPosition;
    item.style.boxShadow = this.currentItemBoxShadow;
    item.style.pointerEvents = this.currentItemPointerEvents;
  }

  previousItem() {
    this.nextItemClicked = false;
    this.nextOrPrevItem();
  }
  nextItem() {
    if (this.currentItem + 1 === this.numberOfItems) {
      this.endDemo();
    } else {
      this.nextItemClicked = true;
      this.nextOrPrevItem();
    }
    //Dehabilitate momentarily Next button to prevent more than one item to be focused
    this.disableNextButton = true;
    setTimeout(
      function () {
        this.disableNextButton = false;
      }.bind(this),
      250
    );
  }
  nextOrPrevItem() {
    //remove styles from previous item
    this.removeStyles(this.gxgDemoItems[this.currentItem]);
    this.instructionVisible = false;
    setTimeout(
      function () {
        let newItem;
        if (this.nextItemClicked) {
          newItem = this.gxgDemoItems[++this.currentItem];
        } else {
          newItem = this.gxgDemoItems[--this.currentItem];
        }
        //save styles from current new item
        this.saveCurrentItemStyles(newItem);
        this.setCoordinates(newItem);
        this.setItemStyles(newItem);
        setTimeout(
          function () {
            this.instructionVisible = true;
          }.bind(this),
          250
        );
      }.bind(this),
      250
    );
  }

  endDemo() {
    this.instructionVisible = false;
    setTimeout(
      function () {
        this.removeStyles(this.gxgDemoItems[this.currentItem]);
        setTimeout(
          function () {
            this.modalVisible = false;
            setTimeout(
              function () {
                this.layerVisible = false;
                setTimeout(
                  function () {
                    this.initiateDemo = false;
                    this.currentItem = 0;
                    this.setCoordinates(this.gxgDemoItems[this.currentItem]);
                  }.bind(this),
                  250
                );
              }.bind(this),
              250
            );
          }.bind(this),
          250
        );
      }.bind(this),
      250
    );
  }

  render() {
    if (this.initiateDemo === true) {
      return [
        <div
          class={{
            tooltip: true,
            visible: this.instructionVisible,
            rtl: this.rtl,
            "bottom-start": this.position === "bottom-start",
            "bottom-center": this.position === "bottom-center",
            "bottom-end": this.position === "bottom-end",
            "top-start": this.position === "top-start",
            "top-center": this.position === "top-center",
            "top-end": this.position === "top-end",
          }}
          style={{
            zIndex: (this.layerZIndex + 2).toString(),
            left: this.leftPosition,
            right: this.rightPosition,
            top: this.topPosition,
          }}
        >
          <div class="tooltip__number">{this.currentItem + 1}</div>
          <div class="tooltip__message">{this.message}</div>
        </div>,
        <div
          class={{
            modal: true,
            visible: this.modalVisible,
          }}
          style={{
            zIndex: (this.layerZIndex + 1).toString(),
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
              onClick={this.previousItem.bind(this)}
              disabled={this.currentItem === 0}
            >
              Previous
            </gxg-button>
            <gxg-button
              type="primary-text-only"
              onClick={this.nextItem.bind(this)}
              class={{
                "next-button": true,
                disabled: this.disableNextButton === true,
              }}
            >
              {this.currentItem + 1 !== this.numberOfItems ? "Next" : "Finish"}
            </gxg-button>
          </div>
        </div>,
        <div
          class={{
            layer: true,
            visible: this.layerVisible,
          }}
          style={{ zIndex: this.layerZIndex.toString() }}
        ></div>,
      ];
    }
  }
}
