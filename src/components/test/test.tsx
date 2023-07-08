import {
  Component,
  h,
  Host,
  Prop,
  State,
  Method,
  Element,
} from "@stencil/core";
//import { GxgComboBox } from "../combo-box/combo-box";
//import { GxgFormSelect } from "../form-select/gxg-select";
//import { GxgModal } from "../modal/modal";
import state from "../store";

@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true,
})
export class GxgTest {
  @Element() el: HTMLElement;
  @Prop() name = "Andres";
  @Prop() show = false;
  @Prop() showValidationMessage = false;
  @State() comboListArray = [];
  private formText!: HTMLGxgFormTextElement;

  @Method()
  async validate(): Promise<boolean> {
    //const isValid = this.validateData();
    return true;
  }

  private validateText = () => {
    this.formText.validate();
  };

  componentDidLoad() {
    const radioGroup = this.el.shadowRoot.querySelector("gxg-form-radio-group");
    console.log(radioGroup);
    const radioBlue = radioGroup.querySelector(
      "gxg-form-radio[radio-id='red']"
    );
    (radioBlue as HTMLGxgFormRadioElement).disabled = true;
  }

  render() {
    return (
      <Host
        class={{
          large: state.large,
        }}
      >
        <gxg-form-radio-group label="my favorite color">
          <gxg-form-radio
            label="red"
            name="colors"
            value="red"
            radio-id="red"
          ></gxg-form-radio>
          <gxg-form-radio
            label="blue"
            name="colors"
            value="blue"
            radio-id="blue"
          ></gxg-form-radio>
          <gxg-form-radio
            label="green"
            name="colors"
            value="green"
            radio-id="green"
          ></gxg-form-radio>
          <gxg-form-radio
            label="yellow"
            name="colors"
            value="yellow"
            radio-id="yellow"
          ></gxg-form-radio>
        </gxg-form-radio-group>
        {/* <gxg-form-text
          value="uno"
          minLength="5"
          display-validation-styles
          display-validation-message
          ref={(el: HTMLGxgFormTextElement) =>
            (this.formText = el as HTMLGxgFormTextElement)
          }
        ></gxg-form-text>
        <gxg-button onClick={this.validateText}>Validate</gxg-button> */}
      </Host>
    );
  }
}
