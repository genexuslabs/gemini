import { Component, Element, h } from "@stencil/core";

@Component({
  tag: "gxg-drag-container",
  styleUrl: "drag-container.scss",
  shadow: true
})
export class DragContainer {
  @Element() el: HTMLElement;

  componentDidLoad() {
    const dragabbleItems = this.el.querySelectorAll("*");
    dragabbleItems.forEach(listItem => {
      listItem.setAttribute("draggable", "true");
    });

    /*-----------------------------------------------*/

    let dragSrcEl;

    // Code By Webdevtrick ( https://webdevtrick.com )

    function dragStart(e) {
      this.style.opacity = "0.3";
      dragSrcEl = this;
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", this.innerHTML);
    }

    function dragEnter() {
      this.classList.add("over");
    }

    function dragLeave(e) {
      e.stopPropagation();
      this.classList.remove("over");
    }

    function dragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      return false;
    }

    function dragDrop(e) {
      if (dragSrcEl != this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData("text/html");
      }
      return false;
    }

    function dragEnd() {
      [].forEach.call(dragabbleItems, function(item) {
        item.classList.remove("over");
      });
      this.style.opacity = "1";
    }

    function addEventsDragAndDrop(el) {
      el.addEventListener("dragstart", dragStart, false);
      el.addEventListener("dragenter", dragEnter, false);
      el.addEventListener("dragover", dragOver, false);
      el.addEventListener("dragleave", dragLeave, false);
      el.addEventListener("drop", dragDrop, false);
      el.addEventListener("dragend", dragEnd, false);
    }

    [].forEach.call(dragabbleItems, function(item) {
      addEventsDragAndDrop(item);
    });
  }

  render() {
    return (
      <div>
        <slot></slot>
      </div>
    );
  }
}
