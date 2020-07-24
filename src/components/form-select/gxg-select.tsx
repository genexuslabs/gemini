import {
  Component,
  Prop,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  State,
  Watch
} from "@stencil/core";
import { requiredLabel, formMessage } from "../../common.js";

@Component({
  tag: "gxg-select",
  styleUrl: "select.scss",
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
   * The presence of this attribute disables the component
   */
  @Prop() disabled = false;

  /**
   * The presence of this attribute stylizes the component with error attributes
   */
  @Prop() error = false;

  /**
   * The select label
   */
  @Prop() label: string;

  /**
   * The presence of this attribute hides the border, and sets the background to transparent when the element has no focus
   */
  @Prop() minimal = true;

  /**
   * The presence of this attribute makes this input required
   */
  @Prop({ reflect: true }) required = false;

  /**
   * The maximum number of visible options
   */
  @Prop() size: string;

  /**
   * An variable to hold the value of the selected option (for internal use)
   */
  @State() value: string;

  /**
   * The presence of this attribute stylizes the component with warning attributes
   */
  @Prop() warning = false;

  /**
   * The select max. width
   */
  @Prop() maxWidth = "100%";

  /**
   * Returns the value of the selected option
   */
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

    //set the selected option as "active"
    this.el.shadowRoot.querySelector(".select-items");

    for (i = 0; i < x.length; i++) {
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.setAttribute("tabindex", "0");
      a.setAttribute("role", "listbox");
      a.addEventListener("keydown", event => {
        //event.preventDefault();
        const select = this.el.shadowRoot.querySelector(".select-items");
        let selected = select.querySelector(".same-as-selected");

        if (event.keyCode === 13) {
          //enter key was pressed
          select.classList.toggle("select-hide");
        } else if (event.keyCode === 38) {
          //key up pressed
          if (selected !== null) {
            if (selected.previousElementSibling !== null) {
              selected.classList.remove("same-as-selected");
              selected.previousElementSibling.classList.add("same-as-selected");
            }
          } else {
            //do nothing
          }
        } else if (event.keyCode === 40) {
          //key down pressed
          if (selected !== null) {
            if (selected.nextElementSibling !== null) {
              selected.classList.remove("same-as-selected");
              selected.nextElementSibling.classList.add("same-as-selected");
            }
          } else {
            selected = select.querySelector("div[role='option']:first-child");
            selected.classList.add("same-as-selected");
          }
        } else if (event.keyCode === 27) {
          //escape key was pressed
          select.classList.add("select-hide");
        }

        if (selected !== null) {
          const newSelectedOption = this.el.shadowRoot.querySelector(
            ".select-items .same-as-selected"
          );
          this.el.shadowRoot.querySelector(".select-selected").textContent =
            newSelectedOption.textContent;
          if (select.classList.contains("select-hide")) {
            this.change.emit(newSelectedOption.getAttribute("value"));
          }
        }
      });
      const optionsNodeList = this.el.querySelectorAll("gxg-option");
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

      const listOfOptions = this.el.querySelectorAll("gxg-option");

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

      this.el.shadowRoot
        .querySelector(
          ".select-items div[role='option'][value='" + this.value + "']"
        )
        .classList.add("same-as-selected");
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
    this.change.emit(newValue);
  }

  handlerOnKeyDown(event) {
    if (event.keyCode == 9) {
      //tab key was pressed
      console.log("tab was pressed");
      if (event.shiftKey) {
        //shift key was also pressed
        console.log("tab and shift was pressed");
        console.log(this.el.previousSibling.previousSibling);
        (this.el.previousSibling.previousSibling as HTMLElement).focus();
      }
    }
  }

  render() {
    return (
      <Host
        style={{
          maxWidth: this.maxWidth,
          "--size": this.size
        }}
        onKeyDown={this.handlerOnKeyDown.bind(this)}
      >
        <div class="outer-wrapper">
          {this.label !== undefined ? (
            <label
              class={{
                label: true
              }}
            >
              {this.label}
              {requiredLabel(this)}
            </label>
          ) : (
            ""
          )}
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
