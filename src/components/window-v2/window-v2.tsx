import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "gxg-window-v2",
  styleUrl: "window.scss",
  shadow: true
})
export class GxgWindowV2 {
  /*
INDEX:
1.OWN PROPERTIES 
2.REFERENCE TO ELEMENTS
3.STATE() VARIABLES
4.PUBLIC PROPERTY API | WATCH'S
5.EVENTS (EMIT)
6.COMPONENT LIFECYCLE METHODS
7.LISTENERS
8.PUBLIC METHODS API
9.LOCAL METHODS
10.RENDER() FUNCTION
*/

  // 1.OWN PROPERTIES //

  // 2. REFERENCE TO ELEMENTS //

  // 3.STATE() VARIABLES //

  // 4.PUBLIC PROPERTY API | WATCH'S //

  /**
   * If true it displays the component title on the header
   */
  @Prop() readonly displayTitle = false;

  // 5.EVENTS (EMIT) //

  // 6.COMPONENT LIFECYCLE METHODS //

  // 7.LISTENERS //

  // 8.PUBLIC METHODS API //

  // 9.LOCAL METHODS //

  // 10.RENDER() FUNCTION //

  render() {
    return <Host>window</Host>;
  }
}
