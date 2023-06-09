import { Component, h, Host, Prop, State } from "@stencil/core";
import { GxgComboBox } from "../combo-box/combo-box";
import { GxgFormSelect } from "../form-select/gxg-select";
import { GxgModal } from "../modal/modal";
import state from "../store";

@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true,
})
export class GxgTest {
  @Prop() name = "Andres";
  @Prop() show = false;
  @Prop() showValidationMessage = false;
  @State() comboListArray = [];

  render() {
    return (
      <Host
        class={{
          large: state.large,
        }}
      >
        <gxg-tabs height="100%" id="gxgTabs">
          <gxg-tab-bar slot="tab-bar">
            <gxg-tab-button
              slot="tab-bar"
              tab-label="apples"
              tab="apples"
            ></gxg-tab-button>
            <gxg-tab-button
              slot="tab-bar"
              tab-label="bananas"
              tab="bananas"
              icon="gemini-tools/settings"
            ></gxg-tab-button>
          </gxg-tab-bar>
          <gxg-tab tab="apples">
            <div class="div-apples"></div>
          </gxg-tab>
          <gxg-tab tab="bananas"> </gxg-tab>
        </gxg-tabs>
      </Host>
    );
  }
}
