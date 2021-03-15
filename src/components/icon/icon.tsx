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

/*********************************
CONSTANTS
*********************************/

const DEFAULT_COLOR = "onbackground";

const COLOR_MAPPINGS = {
  alwaysblack: "color-always-black",
  disabled: "color-primary-disabled",
  ondisabled: "color-on-disabled",
  error: "color-error-dark",
  negative: "color-on-primary",
  onbackground: "color-on-background",
  primary: "color-primary-active",
  success: "color-success-dark",
  warning: "color-warning-dark"
};

const CAMEL_CASE_TO_HYPHENED_REGEX = /(.)([A-Z])/g;

@Component({
  tag: "gxg-icon",
  styleUrl: "icon.scss",
  shadow: true,
  assetsDirs: ["assets"]
})
export class GxgIcon {
  private io?: IntersectionObserver;

  @Element() element: HTMLElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/
  /**
   * The color of the icon.
   *
   */
  @Prop({ reflect: true }) color: Color;

  /**
   * If enabled, the icon will be loaded lazily when it's visible in the viewport.
   */
  @Prop() lazy = false;

  /**
   * The size of the icon. Possible values: regular, small.
   */
  @Prop({ reflect: true }) size: Size = "regular";

  /**
   * The type of icon.
   */
  @Prop({ reflect: true }) type;

  @State() private isVisible = false;

  @State() private svgContent?: string;

  /*********************************
  METHODS
  *********************************/

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
      <Host class={{ empty: this.type === "gemini-tools/empty" }}>
        <div
          class={{
            "svg-icon-native": true
          }}
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

export type Color =
  | "primary"
  | "onbackground"
  | "negative"
  | "disabled"
  | "ondisabled"
  | "error"
  | "success"
  | "warning"
  | "alwaysblack"
  | "auto";

export type Size = "regular" | "small";
