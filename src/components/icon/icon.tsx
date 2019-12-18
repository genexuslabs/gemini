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
  onbackground: "color-on-background",
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
  @Prop() color: "black" | "error" | "onbackground" | "success" | "warning";

  /**
   * If enabled, the icon will be loaded lazily when it's visible in the viewport.
   */
  @Prop() lazy = false;

  /**
   * The size of the icon. Possible values: regular, small.
   */
  @Prop() size: "regular" | "small" = "regular";

  /**
   * The type of icon. Possible values: each of the icons in src/assets/icons. The value is always the name of the svg file without the "gxg-icon-" prefix.
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
          svgIcon: true,
          "svgIcon--black": this.color === "black",
          "svgIcon--small": this.size === "small"
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
  | "chevron-down-small"
  | "chevron-down"
  | "chevron-left-small"
  | "chevron-left"
  | "chevron-right-small"
  | "chevron-right"
  | "chevron-up-small"
  | "chevron-up"
  | "close-small"
  | "close"
  | "color-picker-small"
  | "color-picker"
  | "deleted-small"
  | "deleted"
  | "down-small"
  | "down"
  | "drag-small"
  | "drag"
  | "duplicate-small"
  | "duplicate"
  | "edit-small"
  | "edit-wand-small"
  | "edit-wand"
  | "edit"
  | "error-small"
  | "error"
  | "level-up-small"
  | "level-up"
  | "more-info-small"
  | "more-info"
  | "search-small"
  | "search"
  | "settings-small"
  | "settings"
  | "show-more-small"
  | "show-more"
  | "success-small"
  | "success"
  | "up-small"
  | "up"
  | "warning-small"
  | "add-small"
  | "warning";
