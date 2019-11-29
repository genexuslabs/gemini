import { Component, Prop, h, Host } from "@stencil/core";

/*Icons (plugin needed for this --> https://www.npmjs.com/package/stencil-inline-svg)*/
import add from "../../assets/icons/gx-icon-add.svg";
import addSmall from "../../assets/icons/gx-icon-add-small.svg";
import chevronDown from "../../assets/icons/gx-icon-chevron-down.svg";
import chevronDownSmall from "../../assets/icons/gx-icon-chevron-down-small.svg";
import chevronLeft from "../../assets/icons/gx-icon-chevron-left.svg";
import chevronLeftSmall from "../../assets/icons/gx-icon-chevron-left-small.svg";
import chevronRight from "../../assets/icons/gx-icon-chevron-right.svg";
import chevronRightSmall from "../../assets/icons/gx-icon-chevron-right-small.svg";
import chevronUp from "../../assets/icons/gx-icon-chevron-up.svg";
import chevronUpSmall from "../../assets/icons/gx-icon-chevron-up-small.svg";
import chevronClose from "../../assets/icons/gx-icon-close.svg";
import chevronCloseSmall from "../../assets/icons/gx-icon-close-small.svg";
import chevronColorPicker from "../../assets/icons/gx-icon-color-picker.svg";
import chevronColorPickerSmall from "../../assets/icons/gx-icon-color-picker-small.svg";
import deleted from "../../assets/icons/gx-icon-deleted.svg";
import deletedSmall from "../../assets/icons/gx-icon-deleted-small.svg";
import down from "../../assets/icons/gx-icon-down.svg";
import downSmall from "../../assets/icons/gx-icon-down-small.svg";
import drag from "../../assets/icons/gx-icon-drag.svg";
import dragSmall from "../../assets/icons/gx-icon-drag-small.svg";
import duplicate from "../../assets/icons/gx-icon-duplicate.svg";
import duplicateSmall from "../../assets/icons/gx-icon-duplicate-small.svg";
import edit from "../../assets/icons/gx-icon-edit.svg";
import editSmall from "../../assets/icons/gx-icon-edit-small.svg";
import editWand from "../../assets/icons/gx-icon-edit-wand.svg";
import editWandSmall from "../../assets/icons/gx-icon-edit-wand-small.svg";
import error from "../../assets/icons/gx-icon-error.svg";
import errorSmall from "../../assets/icons/gx-icon-error-small.svg";
import levelUp from "../../assets/icons/gx-icon-level-up.svg";
import levelUpSmall from "../../assets/icons/gx-icon-level-up-small.svg";
import moreInfo from "../../assets/icons/gx-icon-more-info.svg";
import moreInfoSmall from "../../assets/icons/gx-icon-more-info-small.svg";
import search from "../../assets/icons/gx-icon-search.svg";
import searchSmall from "../../assets/icons/gx-icon-search-small.svg";
import settings from "../../assets/icons/gx-icon-settings.svg";
import settingsSmall from "../../assets/icons/gx-icon-settings-small.svg";
import showMore from "../../assets/icons/gx-icon-show-more.svg";
import showMoreSmall from "../../assets/icons/gx-icon-show-more-small.svg";
import success from "../../assets/icons/gx-icon-success.svg";
import successSmall from "../../assets/icons/gx-icon-success-small.svg";
import up from "../../assets/icons/gx-icon-up.svg";
import upSmall from "../../assets/icons/gx-icon-up-small.svg";
import warning from "../../assets/icons/gx-icon-warning.svg";
import warningSmall from "../../assets/icons/gx-icon-warning-small.svg";

const DEFAULT_COLOR = "onbackground";

const COLOR_MAPPINGS = {
  onbackground: "color-on-background",
  error: "color-error-dark",
  warning: "color-warning-dark",
  success: "color-success-dark"
};

const ICONS_MAPPINGS = {
  add,
  addSmall,
  chevronDown,
  chevronDownSmall,
  chevronLeft,
  chevronLeftSmall,
  chevronRight,
  chevronRightSmall,
  chevronUp,
  chevronUpSmall,
  chevronClose,
  chevronCloseSmall,
  chevronColorPicker,
  chevronColorPickerSmall,
  deleted,
  deletedSmall,
  down,
  downSmall,
  drag,
  dragSmall,
  duplicate,
  duplicateSmall,
  edit,
  editSmall,
  editWand,
  editWandSmall,
  error,
  errorSmall,
  levelUp,
  levelUpSmall,
  moreInfo,
  moreInfoSmall,
  search,
  searchSmall,
  settings,
  settingsSmall,
  showMore,
  showMoreSmall,
  success,
  successSmall,
  up,
  upSmall,
  warning,
  warningSmall
};
@Component({
  tag: "gxg-icon",
  styleUrl: "icon.scss",
  shadow: true
})
export class Icon {
  /**
   * The type of icon. Possible values: each of the icons in src/assets/icons. The value is always the name of the svg file without the "gxg-icon-" prefix.
   * Example: the value for the "gxg-icon-add.svg" file is "add".
   */
  @Prop() type = "none";

  /**
   * The size of the icon. Possible values: regular, small.
   */
  @Prop() size = "regular";

  /**
   * The color of the icon. To see the
   *
   */
  @Prop() color: string;

  testAction() {
    return "add";
  }

  render() {
    const icons = ICONS_MAPPINGS;
    return (
      <Host
        class={{
          svgIcon: true,
          "svgIcon--black": this.color === "black"
        }}
      >
        <div
          class="svg-icon-native"
          style={{
            "--icon-color": this.mapColorToCssVar(COLOR_MAPPINGS[this.color]),
            "--icon-color-default": this.mapColorToCssVar(
              COLOR_MAPPINGS[DEFAULT_COLOR]
            )
          }}
          innerHTML={
            this.size == "small" ? icons[this.type + "Small"] : icons[this.type]
          }
        />
      </Host>
    );
  }

  private mapColorToCssVar(color): string {
    if (color) {
      return `var(--${color})`;
    }

    return null;
  }
}
