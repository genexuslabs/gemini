import {
  Component,
  Prop,
  Host,
  Watch,
  State,
  getAssetPath,
  h,
  Element
} from "@stencil/core";
import { getSvgContent, iconContent } from "./requests";

const DEFAULT_COLOR = "onbackground";

const COLOR_MAPPINGS = {
  onbackground: "color-on-background",
  error: "color-error-dark",
  warning: "color-warning-dark",
  success: "color-success-dark"
};

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
  @Prop() type = "none";

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
      const fileName = `${this.type}.svg`;

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
