import { Component, Host, h, Method, Element } from "@stencil/core";
import state from "../store";
@Component({
  tag: "gxg-pills",
  styleUrl: "pills.scss",
  shadow: true,
})
export class GxgPills {
  @Element() el: HTMLElement;

  /**
   * Returns an array with the id's of all the pills
   */
  @Method()
  async getPills(onlyEnabled = true): Promise<string[]> {
    const pillsIds: string[] = [];
    let pills = Array.from(this.el.querySelectorAll("gxg-pill"));
    if (onlyEnabled) {
      pills = pills.filter((pill) => !pill.disabled);
    }
    pills.forEach((pill) => {
      pillsIds.push(pill.id);
    });
    return pillsIds;
  }

  render() {
    return (
      <Host class={{ mercury: state.mercury }}>
        <div class="pills-wrapper">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
