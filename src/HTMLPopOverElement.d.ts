export interface HTMLPopOverElement extends HTMLElement {
  popover: string;
  showPopover: () => void;
  hidePopover: () => void;
  togglePopover: () => void;
}
