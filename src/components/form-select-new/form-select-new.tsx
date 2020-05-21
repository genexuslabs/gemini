import {
  Component,
  Prop,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Watch
} from "@stencil/core";
import { formMessage } from "../../common.js";

@Component({
  tag: "gxg-form-select-new",
  styleUrl: "form-select.scss",
  shadow: true
})
export class FormSelectNew {
  //A reference to the select

  slottedContent!: HTMLCollection;

  select!: HTMLElement;
  @Element() el: HTMLElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * If select is disabled
   */
  @Prop() disabled = false;

  /**
   * If select has errors
   */
  @Prop() error = false;

  /**
   * If select is full width
   */
  @Prop({ reflect: true }) fullWidth = false;

  /**
   * The select label
   */
  @Prop() label: string;

  /**
   * The maximum number of visible options (scroll will apear if the total number exceeds this value)
   */
  @Prop() maxVisibleOptions: string;

  /**
   * The select name
   */
  @Prop() name: string;

  /**
   * If required
   */
  @Prop() required = false;

  /**
   * The select id
   */
  @Prop() selectId: string;

  /**
   * The selected option
   */
  @Prop() value: string;

  /**
   * If select has warnings
   */
  @Prop() warning = false;

  /**
   * The select width
   */
  @Prop() width = "240px";

  @Event() input: EventEmitter;

  @Event() change: EventEmitter;

  /*********************************
  METHODS
  *********************************/

  public clickTest(event: MouseEvent, listOfOptions, updateValue): void {
    let y, i, k;
    const cElement: HTMLElement = event.srcElement as HTMLElement;
    const parent: HTMLElement = cElement.parentNode.parentNode as HTMLElement;
    const s = parent.getElementsByTagName("select")[0];
    const h = cElement.parentNode.previousSibling as HTMLElement;

    for (i = 0; i < listOfOptions.length; i++) {
      if (listOfOptions[i].innerHTML == cElement.innerHTML) {
        const selectedValue = cElement.getAttribute("value");
        updateValue(selectedValue);
        s.selectedIndex = i;
        h.innerHTML = cElement.innerHTML;
        y = (cElement.parentNode as HTMLElement).getElementsByClassName(
          "same-as-selected"
        );
        for (k = 0; k < y.length; k++) {
          y[k].removeAttribute("class");
        }
        cElement.setAttribute("class", "same-as-selected");
        cElement.setAttribute("aria-selected", "true");

        this.input.emit({
          selectedValue: selectedValue,
          selectedLabel: h.innerHTML
        });

        break;
      }
    }
    h.click();
  }

  componentDidLoad() {
    const updateValue = selectedOption => {
      this.value = selectedOption;
    };

    let i, j, a, b, c;

    const x = this.el.shadowRoot.querySelectorAll(".custom-select");

    for (i = 0; i < x.length; i++) {
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.setAttribute("tabindex", "0");
      a.setAttribute("role", "listbox");
      const optionsNodeList = this.el.querySelectorAll("gxg-form-option");
      let selectedOption = optionsNodeList[0];

      if (this.disabled) {
        a.setAttribute("disabled", "disabled");
      }
      for (let i = 0; i < optionsNodeList.length; i++) {
        if (optionsNodeList[i].selected === true) {
          selectedOption = optionsNodeList[i];
        }
      }
      a.innerHTML = selectedOption.innerHTML;
      this.value = selectedOption.value;

      const listOfOptions = this.el.querySelectorAll("gxg-form-option");

      x[i].appendChild(a);

      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");

      for (j = 0; j < listOfOptions.length; j++) {
        c = document.createElement("DIV");
        c.setAttribute("role", "option");
        c.innerHTML = listOfOptions[j].innerHTML;

        const optionValue = document.createAttribute("value");
        optionValue.value = listOfOptions[j].value;
        c.setAttributeNode(optionValue);

        c.addEventListener("click", (event: MouseEvent) =>
          this.clickTest(event, listOfOptions, updateValue)
        );

        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function(e) {
        e.stopPropagation();

        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }

    function closeAllSelect(elmnt) {
      let i;
      const arrNo = [];

      const x = this.el.shadowRoot.querySelectorAll(".select-items");
      const y = this.el.shadowRoot.querySelectorAll(".select-selected");

      for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i);
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide");
        }
      }
    }

    document.addEventListener("click", closeAllSelect.bind(this));
  }

  @Watch("value")
  valueHandler(newValue: boolean) {
    console.log(newValue);
    this.change.emit(newValue);
  }

  render() {
    return (
      <Host
        style={{
          width: this.width,
          "--maxVisibleOptions": this.maxVisibleOptions
        }}
      >
        <div class="outer-wrapper">
          <label
            class={{
              label: true
            }}
            htmlFor={this.selectId}
          >
            {this.label}
          </label>
          <div
            class={{
              "custom-select": true,
              select: true,
              "select--error": this.error === true,
              "select--warning": this.warning === true
            }}
            ref={el => (this.select = el as HTMLDivElement)}
          >
            <select id="original">
              <slot></slot>
            </select>
          </div>
        </div>
        {formMessage()}
      </Host>
    );
  }
}
