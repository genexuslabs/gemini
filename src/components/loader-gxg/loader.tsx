import { Component, Prop, h, Host, State, Watch } from "@stencil/core";
@Component({
  tag: "gxg-loader",
  styleUrl: "loader.scss",
  shadow: true,
})
export class GxgLodaer {
  /**
   * The text you want to show under the loader (optional)
   */
  @Prop() text: string;

  /**
   * The prescence of this attribute shows the loader
   */
  @Prop() show = false;

  /**
   * The z-index positive value you want for the loader when visible (default: 100)
   */
  @Prop() visibleZIndex = "100";

  @State() layerOpacity100 = false;
  @State() squaresOpacity100 = false;
  @State() textOpacity100 = false;
  @State() sendLayerBack = true;

  componentDidLoad() {
    console.log(this.text);
  }

  @Watch("show")
  showHandler() {
    if (this.show) {
      this.sendLayerBack = false;
      setTimeout(
        function () {
          this.layerOpacity100 = true;
          setTimeout(
            function () {
              this.squaresOpacity100 = true;
              setTimeout(
                function () {
                  this.textOpacity100 = true;
                }.bind(this),
                250
              );
            }.bind(this),
            250
          );
        }.bind(this),
        250
      );
    } else {
      setTimeout(
        function () {
          this.textOpacity100 = false;
          setTimeout(
            function () {
              this.squaresOpacity100 = false;
              setTimeout(
                function () {
                  this.layerOpacity100 = false;
                  setTimeout(
                    function () {
                      this.sendLayerBack = true;
                    }.bind(this),
                    250
                  );
                }.bind(this),
                250
              );
            }.bind(this),
            250
          );
        }.bind(this),
        250
      );
    }
  }

  render() {
    return (
      <Host
        style={{ zIndex: this.visibleZIndex }}
        class={{
          sendLayerBack: this.sendLayerBack,
          layerOpacity100: this.layerOpacity100,
          squaresOpacity100: this.squaresOpacity100,
          textOpacity100: this.textOpacity100,
        }}
      >
        <div class="layer">
          <div class="loader">
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
          </div>
          {this.text !== undefined ? (
            <span class="loader-text">
              {this.text}
              <span class="dot1">.</span>
              <span class="dot2">.</span>
              <span class="dot3">.</span>
            </span>
          ) : null}
        </div>
      </Host>
    );
  }
}
