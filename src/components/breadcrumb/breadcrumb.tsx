import { Component, Host, h, Prop, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "gxg-breadcrumb",
  styleUrl: "breadcrumb.scss",
  shadow: true,
})
export class GxgBreadcrumb {
  /**
   * This event emmits the breadcrumb id
   */
  @Event() breadcrumbClicked: EventEmitter;

  /**
   * The breadcrumb icon (optional)
   */
  @Prop() icon: string;

  /**
   * The breadcrumb id
   */
  @Prop() id: string;

  breadcrumbClickedFunc(id) {
    this.breadcrumbClicked.emit(id);
  }

  render() {
    return (
      <Host>
        <div
          class={{ container: true }}
          onClick={() => this.breadcrumbClickedFunc(this.id)}
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
