import { Component, Prop, h, Host, Method } from "@stencil/core";

/*Icons (plugin needed for this --> https://www.npmjs.com/package/stencil-inline-svg)*/
import add from "../../assets/icons/gxg-icon-add.svg";
import arrowDown from "../../assets/icons/gxg-icon-arrow-down.svg";
import close from "../../assets/icons/gxg-icon-close.svg";
import colorPicker from "../../assets/icons/gxg-icon-color-picker.svg";
import duplicate from "../../assets/icons/gxg-icon-duplicate.svg";
import edit from "../../assets/icons/gxg-icon-edit.svg";
import magic from "../../assets/icons/gxg-icon-magic.svg";
import more from "../../assets/icons/gxg-icon-more.svg";
import remove from "../../assets/icons/gxg-icon-remove.svg";
import triangle from "../../assets/icons/gxg-icon-triangle.svg";

@Component({
  tag: "gxg-icon",
  styleUrl: "icon.scss",
  shadow: true
})
export class Icon {
  /**
   * The type of icon
   * Possible values: each of the icons in src/assets/icons. The value is always the name of the svg file without the "gxg-icon-" prefix.
   * Example: the value for the "gxg-icon-add.svg" file is "add".
   */
  @Prop() type = "none";
  @Prop() color: string;

  testAction() {
    return "add";
  }

  render() {
    const icons = {
      add,
      arrowDown,
      close,
      colorPicker,
      duplicate,
      edit,
      magic,
      more,
      remove,
      triangle
    };
    return (
      <Host
        class={{
          svgIcon: true,
          "svgIcon--black": this.color === "black"
        }}
      >
        <div class="svg-icon-native" innerHTML={icons[this.type]} />
      </Host>
    );
  }
}
