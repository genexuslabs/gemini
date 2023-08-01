import { KeyboardKeys as KK } from "./types";

export const repositionScroll = (
  scollableElementRef: HTMLElement,
  activeItem: HTMLElement,
  direction: typeof KK.ARROW_UP | typeof KK.ARROW_DOWN
): void => {
  console.log("scrollableElement", scollableElementRef);
  console.log("activeItem", activeItem);
  console.log("direction", direction);
  console.log("=================");
  const scrollableElement = scollableElementRef;
  const hasVerticalScrollbar =
    scrollableElement?.scrollHeight > scrollableElement?.clientHeight;
  if (hasVerticalScrollbar && activeItem) {
    const scrollableElementScrollTop = scrollableElement.scrollTop;
    if (direction === KK.ARROW_UP) {
      const scrollableElementTop = scrollableElement.getBoundingClientRect()
        .top;
      const selectedItemTop = activeItem.getBoundingClientRect().top;
      if (selectedItemTop < scrollableElementTop) {
        const offset = scrollableElementTop - selectedItemTop;
        scrollableElement.scrollTo(0, scrollableElementScrollTop - offset);
      }
    } else if (direction === KK.ARROW_DOWN) {
      const scrollableElementBottom = scrollableElement.getBoundingClientRect()
        .bottom;
      const selectedItemBottom = activeItem.getBoundingClientRect().bottom;
      if (selectedItemBottom > scrollableElementBottom) {
        const offset = selectedItemBottom - scrollableElementBottom;
        scrollableElement.scrollTo(0, scrollableElementScrollTop + offset);
      }
    }
  }
};
