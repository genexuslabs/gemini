import { Component, h, Host, Prop, Method, Watch } from "@stencil/core";
import state from "../store";

@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true,
})
export class GxgTest {
  @Prop() name = "Andres";
  @Prop() show = false;
  textInput!: HTMLInputElement;

  @Watch("show")
  onShowChanged(newValue: boolean) {
    if (newValue) {
      this.addMouseEventListener();
    } else {
      this.removeMouseEventListener();
    }
  }

  @Method()
  async setFocus() {
    console.log("focus");
  }

  @Method()
  async open() {
    this.show = true;
  }

  @Method()
  async close() {
    this.show = false;
  }

  showInput() {
    this.show = true;
  }

  addMouseEventListener() {
    document.addEventListener("mouseup", this.onMouseUp);
  }

  onMouseUp(event) {
    if (!event.composedPath().includes(this.textInput)) {
      this.show = false;
    } else {
    }
  }

  removeMouseEventListener() {
    console.log("remove event listener");
  }

  render() {
    return (
      <Host
        class={{
          large: state.large,
        }}
      >
        <gxg-combo-box
          id="gxgCombo1"
          disable-filter
          placeholder="Select item"
          value="bpm"
        >
          <gxg-combo-box-item>Common Elements</gxg-combo-box-item>
          <gxg-combo-box-item
            value="bpm"
            icon="objects/business-process-diagram"
          >
            BPM
          </gxg-combo-box-item>
          <gxg-combo-box-item value={true} icon="objects/data-provider">
            Data Management
          </gxg-combo-box-item>
          <gxg-combo-box-item value="resources" icon="objects/bg-color">
            Resources
          </gxg-combo-box-item>
          <gxg-combo-box-item value="user-interface" icon="objects/webpanel">
            User interface
          </gxg-combo-box-item>
          <gxg-combo-box-item value="dashboard" icon="objects/dashboard">
            Dashboard
          </gxg-combo-box-item>
          <gxg-combo-box-item
            value="deployment-unit"
            icon="objects/deployment-unit"
          >
            Deployment Unit
          </gxg-combo-box-item>
          <gxg-combo-box-item value="dso" icon="objects/dso">
            DSO
          </gxg-combo-box-item>
          <gxg-combo-box-item
            value="structured-data-type"
            icon="objects/structured-data-type"
          >
            Structured Data Type
          </gxg-combo-box-item>
          <gxg-combo-box-item value="url-rewrite" icon="objects/url-rewrite">
            URL Rewrite
          </gxg-combo-box-item>
          <gxg-combo-box-item value="stencil" icon="objects/stencil">
            Stencil
          </gxg-combo-box-item>
        </gxg-combo-box>
      </Host>
    );
  }
}
