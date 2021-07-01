// import { Component, h, Host, getMode } from "@stencil/core";

// /**
//  * @virtualProp {string} colormode - The mode determines which platform styles to use.
//  */

// @Component({
//   tag: "gxg-test",
//   styleUrl: "test.scss",
//   shadow: true,
// })
// export class GxgTest {
//   private mode = getMode(this);

//   componentWillLoad() {
//     console.log(this.mode);
//   }

//   render() {
//     //return <Host mode={getMode(this)}></Host>;
//     return <Host>{this.mode}</Host>;
//   }
// }

import { Component, h, Host, getMode, State } from "@stencil/core";
@Component({
  tag: "gxg-test",
  styleUrls: {
    regular: "test.scss",
    large: "test.scss",
  },
  shadow: true,
})
export class GxgTest {
  @State() private mode = getMode(this);
  componentDidLoad() {
    this.mode = getMode(this);
  }
  render() {
    return <Host mode={this.mode}>{this.mode}</Host>;
  }
}
