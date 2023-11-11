import { Component, h, Prop, Listen, State, Element } from "@stencil/core";
@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true,
})
export class GxgTest {
  @Element() el: HTMLElement;

  render() {
    return (
      <div class="card">
        <p>
          The universe is incredibly vast and mysterious. One interesting fact
          is that there are more stars in the observable universe than there are
          grains of sand on all the beaches on Earth. It's mind-boggling! 🌌🌟
        </p>
        <p>
          The universe is about 13.8 billion years old, but we can only observe
          a tiny fraction of it due to the speed of light.
        </p>
        <p>
          Black holes can be both incredibly massive and incredibly small. Some
          are as tiny as a single atom but contain the mass of a mountain!
        </p>
        <p>
          There's a phenomenon called "dark matter," which makes up about 27% of
          the universe's mass, yet we can't see or detect it directly. It's a
          big cosmic mystery.
        </p>
        <p>
          The Hubble Space Telescope has captured images of galaxies that are
          billions of light-years away, showing us what they looked like in the
          distant past.
        </p>
      </div>
    );
  }
}
