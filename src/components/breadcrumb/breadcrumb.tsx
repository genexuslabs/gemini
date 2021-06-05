import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  Element,
} from "@stencil/core";

@Component({
  tag: "gxg-breadcrumb",
  styleUrl: "breadcrumb.scss",
  shadow: true,
})
export class GxgBreadcrumb {
  @Element() el: HTMLElement;

  /**
   * This event emmits the breadcrumb id
   */
  @Event() breadcrumbClicked: EventEmitter;

  /**
   * The breadcrumb icon (optional)
   */
  @Prop() icon: string;

  breadcrumbClickedFunc() {
    const index = parseInt(this.el.getAttribute("data-index"), 10);
    this.breadcrumbClicked.emit({
      index: index,
    });
  }

  render() {
    return (
      <Host>
        <div
          class={{ container: true }}
          onClick={() => this.breadcrumbClickedFunc()}
        >
          {this.icon !== undefined ? (
            <gxg-icon
              class={{ "custom-icon": true }}
              type={this.icon}
              size="regular"
              color="auto"
            ></gxg-icon>
          ) : null}
          <slot></slot>
        </div>
        <gxg-icon
          class={{ "arrow-icon": true }}
          type="navigation/chevron-right"
        ></gxg-icon>
      </Host>
    );
  }
}
