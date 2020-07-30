import { EventEmitter } from "@stencil/core";

export function makeDraggable(component: DraggableComponent): Function {
  const draggableItems = component.getDraggableElements();
  const items = Array.from(draggableItems);

  items.forEach(listItem => {
    listItem.setAttribute("draggable", "true");
  });

  let dragSrcEl;

  function dragStart(e) {
    const itemDragStartEvent = component.itemDragStart.emit();
    if (itemDragStartEvent.defaultPrevented) {
      return;
    }
    this.style.opacity = "0.3";
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.innerHTML);
  }

  function dragEnter() {
    const itemDragEnterEvent = component.itemDragEnter.emit(this);
    if (itemDragEnterEvent.defaultPrevented) {
      return;
    }
    this.classList.add("over");
  }

  function dragLeave(e) {
    const itemDragLeaveEvent = component.itemDragLeave.emit(this);
    if (itemDragLeaveEvent.defaultPrevented) {
      return;
    }
    e.stopPropagation();
    this.classList.remove("over");
  }

  function dragOver(e) {
    const itemDragOverEvent = component.itemDragOver.emit(this);
    if (itemDragOverEvent.defaultPrevented) {
      return;
    }
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    return false;
  }

  function dragDrop(e) {
    const itemDropEvent = component.itemDrop.emit();
    if (itemDropEvent.defaultPrevented) {
      return;
    }
    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData("text/html");
    }
    return false;
  }

  function dragEnd() {
    items.forEach(item => item.classList.remove("over"));
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

  function removeEventsDragAndDrop(el) {
    el.removeEventListener("dragstart", dragStart);
    el.removeEventListener("dragenter", dragEnter);
    el.removeEventListener("dragover", dragOver);
    el.removeEventListener("dragleave", dragLeave);
    el.removeEventListener("drop", dragDrop);
    el.removeEventListener("dragend", dragEnd);
  }

  items.forEach(item => addEventsDragAndDrop(item));

  return function cleanup() {
    items.forEach(item => removeEventsDragAndDrop(item));
  };
}

export interface DraggableComponent {
  itemDrop: EventEmitter;
  itemDragEnter: EventEmitter;
  itemDragLeave: EventEmitter;
  itemDragStart: EventEmitter;
  itemDragOver: EventEmitter;
  getDraggableElements(): NodeListOf<Element>;
}
