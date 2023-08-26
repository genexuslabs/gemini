import { Component, Host, h, Prop, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "gxg-menu-list",
  styleUrl: "menu-list.scss",
  shadow: true,
})
/* OTHER LIBRARIES IMPORTS */
/* CUSTOM IMPORTS */
export class GxgMenuList {
  /*
INDEX:
1.OWN PROPERTIES 
2.REFERENCE TO ELEMENTS
3.STATE() VARIABLES
4.PUBLIC PROPERTY API | WATCH'S
5.EVENTS (EMIT)
6.METHODS
7.LISTENERS
8.PUBLIC METHODS API
9.LOCAL METHODS
10.RENDER() FUNCTION
*/

  // 1.OWN PROPERTIES //

  /**
   * The menu-list title
   */
  @Prop() listTitle: string;

  // 2. REFERENCE TO ELEMENTS //

  // 3.STATE() VARIABLES //

  // 4.PUBLIC PROPERTY API | WATCH'S //

  // 5.EVENTS (EMIT) //

  // 6.METHODS //

  // 7.LISTENERS //

  // 8.PUBLIC METHODS API //

  // 9.LOCAL METHODS //

  // 10.RENDER() FUNCTION //

  render() {
    return (
      <Host>
        <div class="wrapper" part="wrapper">
          {this.listTitle ? (
            <span class="title-wrapper" part="title-wrapper">
              <gxg-title type="title-05" part="title">
                {this.listTitle}
              </gxg-title>
            </span>
          ) : null}
          <ul part="list">
            <slot></slot>
          </ul>
        </div>
      </Host>
    );
  }
}
