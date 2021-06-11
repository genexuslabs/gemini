import { Component, Host, h, Element, Prop } from "@stencil/core";

@Component({
  tag: "gxg-window",
  styleUrl: "window.scss",
  shadow: true,
})
export class GxgWindow {
  /**
   * The window min. height
   */
  @Prop() minHeight: string;

  /**
   * The window min. width
   */
  @Prop() minWidth: string;

  /**
   * The window max. height
   */
  @Prop() maxHeight = "100%";

  /**
   * The window max. width
   */
  @Prop() maxWidth = "100%";

  @Element() el: HTMLElement;
  header!: HTMLElement;
  draggableResizableDiv!: HTMLElement;

  dragElement(elm, mainElm) {
    let p1 = 0,
      p2 = 0,
      p3 = 0,
      p4 = 0;

    function dragElm(e) {
      p1 = p3 - e.clientX;
      p2 = p4 - e.clientY;
      p3 = e.clientX;
      p4 = e.clientY;

      mainElm.style.top = mainElm.offsetTop - p2 + "px";
      mainElm.style.left = mainElm.offsetLeft - p1 + "px";

      if (mainElm.offsetTop < 0) {
        mainElm.style.top = 0;
      }

      if (mainElm.offsetLeft < 0) {
        mainElm.style.left = 0;
      }

      if (mainElm.offsetTop + mainElm.offsetHeight > window.innerHeight) {
        mainElm.style.top = window.innerHeight - mainElm.offsetHeight + "px";
      }

      if (mainElm.offsetLeft + mainElm.offsetWidth > window.innerWidth) {
        mainElm.style.left = window.innerWidth - mainElm.offsetWidth + "px";
      }

      elm.style.cursor = "grabbing";
    }

    function dropElm() {
      document.onmousemove = null;
      document.onmouseup = null;

      elm.style.cursor = "grab";
    }
    function dragMouseDown(e) {
      p3 = e.clientX;
      p4 = e.clientY;

      document.onmousemove = dragElm;
      document.onmouseup = dropElm;
    }

    if (elm) {
      elm.onmousedown = dragMouseDown;
    }
  }

  resizeElement(elm, mainElm) {
    //resize top
    let oldT = 0,
      oldH = 0,
      oldCY = 0;

    //drop resize element
    function dropElm() {
      document.onmousemove = null;
      document.onmouseup = null;

      document.querySelector("html").style.cursor = "default";
      elm[4].style.cursor = "default";
    }

    function dragElmTop(e) {
      mainElm.style.top = e.clientY + "px";
      elm[4].style.height = oldH - (e.clientY - oldCY) + "px";

      if (mainElm.offsetHeight < 214) {
        mainElm.style.top = oldT + "px";
      }

      document.querySelector("html").style.cursor = "ns-resize";
      elm[4].style.cursor = "ns-resize";
    }

    function dragMouseDownTop(e) {
      oldT = mainElm.offsetTop + mainElm.offsetHeight - 212;
      oldH = elm[4].offsetHeight;
      oldCY = e.clientY;

      document.onmousemove = dragElmTop;
      document.onmouseup = dropElm;
    }

    //resize left
    let oldL = 0,
      oldW = 0,
      oldCX = 0;

    function dragElmLeft(e) {
      mainElm.style.left = e.clientX + "px";
      elm[4].style.width = oldW - (e.clientX - oldCX) + "px";

      if (mainElm.offsetWidth < 213) {
        mainElm.style.left = oldL + "px";
      }

      document.querySelector("html").style.cursor = "ew-resize";
      elm[4].style.cursor = "ew-resize";
    }

    function dragMouseDownLeft(e) {
      oldL = mainElm.offsetLeft + mainElm.offsetWidth - 212;
      oldW = elm[4].offsetWidth;
      oldCX = e.clientX;

      document.onmousemove = dragElmLeft;
      document.onmouseup = dropElm;
    }

    if (elm[0]) {
      elm[0].onmousedown = dragMouseDownTop;
    }

    if (elm[1]) {
      elm[1].onmousedown = dragMouseDownLeft;
    }
    function dragElmBottom(e) {
      elm[4].style.height = e.clientY - mainElm.offsetTop - 12 + "px";

      document.querySelector("html").style.cursor = "ns-resize";
      elm[4].style.cursor = "ns-resize";
    }
    function dragMouseDownBottom() {
      document.onmousemove = dragElmBottom;
      document.onmouseup = dropElm;
    }

    //resize bottom
    if (elm[2]) {
      elm[2].onmousedown = dragMouseDownBottom;
    }
    function dragElmRight(e) {
      elm[4].style.width = e.clientX - mainElm.offsetLeft - 10 + "px";

      document.querySelector("html").style.cursor = "ew-resize";
      elm[4].style.cursor = "ew-resize";
    }
    function dragMouseDownRight() {
      document.onmousemove = dragElmRight;
      document.onmouseup = dropElm;
    }

    //resize right
    if (elm[3]) {
      elm[3].onmousedown = dragMouseDownRight;
    }
  }

  componentDidLoad() {
    const childrenDivs = this.el.shadowRoot.querySelectorAll(
      "#draggable-resizable-div>div"
    );

    this.dragElement(this.header, this.draggableResizableDiv);
    this.resizeElement(childrenDivs, this.draggableResizableDiv);

    (function (elm) {
      elm.style.left = window.innerWidth / 2 - elm.offsetWidth / 2 + "px";
      elm.style.top = window.innerHeight / 2 - elm.offsetHeight / 2 + "px";
    })(this.draggableResizableDiv);
  }

  render() {
    return (
      <Host>
        <div
          id="draggable-resizable-div"
          ref={(el) => (this.draggableResizableDiv = el as HTMLElement)}
          style={{
            maxWidth: "800px",
            minWidth: "400px",
            minHeight: "200px",
            maxHeight: "600px",
          }}
        >
          <div id="top"></div>
          <div id="left"></div>
          <div id="bottom"></div>
          <div id="right"></div>
          <div
            id="center"
            style={{
              maxWidth: "800px",
              minWidth: "400px",
              minHeight: "200px",
              maxHeight: "600px",
            }}
          >
            <div
              id="header"
              style={{ cursor: "grab" }}
              ref={(el) => (this.header = el as HTMLElement)}
            ></div>
            <div id="content">
              <span style={{ display: "inline-block", paddingTop: "50px" }}>
                <slot></slot>
              </span>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
