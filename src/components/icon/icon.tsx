import {
  Component,
  Element,
  Host,
  Prop,
  State,
  Watch,
  getAssetPath,
  h
} from "@stencil/core";
import { getSvgContent, iconContent } from "./requests";

const DEFAULT_COLOR = "onbackground";

const COLOR_MAPPINGS = {
  /*NOTE: If you add, or remove colors from this mapping, remember to update the fixes on /components/button/button.scss. Search for : "Icon color fix" 
  These fixes force the icon color inside the button to be always the color it should be for a particular button.
  For example, all icons inside a "primary" button type should always be white, even if the user set the color for the icon as "warning" which 
  should be orange.*/

  onbackground: "color-on-background",
  negative: "color-on-primary",
  error: "color-error-dark",
  warning: "color-warning-dark",
  success: "color-success-dark"
};

const CAMEL_CASE_TO_HYPHENED_REGEX = /(.)([A-Z])/g;

@Component({
  tag: "gxg-icon",
  styleUrl: "icon.scss",
  shadow: true,
  assetsDirs: ["assets"]
})
export class Icon {
  private io?: IntersectionObserver;

  @Element() element: HTMLElement;

  @State() private svgContent?: string;
  @State() private isVisible = false;

  /**
   * The color of the icon.
   *
   */
  @Prop() color: "onbackground" | "negative" | "error" | "success" | "warning";

  /**
   * If enabled, the icon will be loaded lazily when it's visible in the viewport.
   */
  @Prop() lazy = false;

  /**
   * The size of the icon. Possible values: regular, small.
   */
  @Prop() size: "regular" | "small" = "regular";

  /**
   * The type of icon. Possible values: each of the icons in /assets. The value is always the name of the svg file without the "gxg-icon-" prefix.
   * Example: the value for the "gxg-icon-add.svg" file is "add".
   */
  @Prop() type: IconType = "none";

  connectedCallback() {
    // purposely do not return the promise here because loading
    // the svg file should not hold up loading the app
    // only load the svg if it's visible
    this.waitUntilVisible(this.element, "50px", () => {
      this.isVisible = true;
      this.getIcon();
    });
  }

  disconnectedCallback() {
    if (this.io) {
      this.io.disconnect();
      this.io = undefined;
    }
  }

  private waitUntilVisible(
    el: HTMLElement,
    rootMargin: string,
    callback: () => void
  ) {
    if (
      this.lazy &&
      typeof window !== "undefined" &&
      (window as any).IntersectionObserver
    ) {
      const io = (this.io = new (window as any).IntersectionObserver(
        (data: IntersectionObserverEntry[]) => {
          if (data[0].isIntersecting) {
            io.disconnect();
            this.io = undefined;
            callback();
          }
        },
        { rootMargin }
      ));

      io.observe(el);
    } else {
      // browser doesn't support IntersectionObserver
      // so just fallback to always show it
      callback();
    }
  }

  @Watch("type")
  private async getIcon() {
    if (this.isVisible) {
      if (this.type === "none") {
        this.svgContent = "";
        return;
      }

      const fileName = this.getFileName();

      const url = getAssetPath(`assets/${fileName}`);
      if (url) {
        if (iconContent.has(url)) {
          this.svgContent = iconContent.get(url);
        } else {
          this.svgContent = await getSvgContent(url);
        }
      }
    }
  }

  private getFileName() {
    const name = this.type
      .replace(CAMEL_CASE_TO_HYPHENED_REGEX, "$1-$2")
      .toLowerCase();
    return `${name}.svg`;
  }

  render() {
    return (
      <Host
        class={{
          svgIcon: true
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
          innerHTML={this.svgContent}
        />
      </Host>
    );
  }

  private mapColorToCssVar(color: string): string {
    if (color) {
      return `var(--${color})`;
    }

    return null;
  }
}

export type IconType =
  | "none"
  | "add"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "chevron-up"
  | "close"
  | "color-picker"
  | "deleted"
  | "down"
  | "drag"
  | "duplicate"
  | "edit-wand"
  | "edit"
  | "error"
  | "level-up"
  | "more-info"
  | "search"
  | "settings"
  | "show-more"
  | "success"
  | "up"
  | "warning";
