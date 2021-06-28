import { Component, h, Host } from "@stencil/core";
@Component({
  tag: "gxg-test",
  styleUrls: {
    ios: "test.ios.scss",
    md: "test.md.scss",
    big: "test.big.scss",
  },
  shadow: true,
})
export class GxgTest {
  render() {
    return <Host>hola</Host>;
  }
}
