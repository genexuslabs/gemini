export function makeDraggable(draggableItems: NodeListOf<Element>): Function {
  const items = Array.from(draggableItems);

  items.forEach(listItem => {
    listItem.setAttribute("draggable", "true");
  });

  let dragSrcEl;

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
