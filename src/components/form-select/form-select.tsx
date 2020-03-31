import { Component, Host, Prop, h, Element } from "@stencil/core";

@Component({
  tag: "gxg-form-select",
  styleUrl: "form-select.scss",
  shadow: true
})
export class FormSelect {
  //A reference to the select

  slottedContent!: HTMLCollection;

  select!: HTMLElement;
  @Element() el: HTMLElement;

  /**
   * If select has errors
   */
  @Prop() error = false;

  /**
   * If select is disabled
   */
  @Prop() disabled = false;

  /**
   * If select is full width
   */
  @Prop({ reflect: true }) fullWidth = false;

  /**
   * Wether the select is inline or block
   */
  @Prop({ reflect: true }) inline = false;

  /**
   * The select label
   */
  @Prop() label: string;

  /**
   * The select name
   */
  @Prop() name: string;

  /**
   * The maximum number of visible options (scroll will apear if the total number exceeds this value)
   */
  @Prop() maxVisibleOptions: string;

  /**
   * The select id
   */
  @Prop() selectId: string;

  /**
   * The selected option
   */
  @Prop({ reflect: true }) value: string;

  /**
   * If select has warnings
   */
  @Prop() warning = false;

  /**
   * The select width
   */
  @Prop() width = "240px";

  componentDidLoad() {
    const updateValue = selectedOption => {
      this.value = selectedOption;
    };

    let i, j, a, b, c;
    /*look for any elements with the class "custom-select":*/
    const x = this.el.shadowRoot.querySelectorAll(".custom-select");

    for (i = 0; i < x.length; i++) {
      /*for each element, create a new DIV that will act as the selected item:*/
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      const optionsNodeList = this.el.querySelectorAll("option");
      let selectedOption = optionsNodeList[0];

      //if disabled prop is true, set as disabled
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

      const listOfOptions = this.el.querySelectorAll("option");

      x[i].appendChild(a);
      /*for each element, create a new DIV that will contain the option list:*/
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");

      for (j = 1; j < listOfOptions.length; j++) {
        /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
        c = document.createElement("DIV");
        c.innerHTML = listOfOptions[j].innerHTML;

        const optionValue = document.createAttribute("value");
        optionValue.value = listOfOptions[j].value;
        c.setAttributeNode(optionValue);

        c.addEventListener("click", function() {
          /*when an item is clicked, update the original select box,
            and the selected item:*/
          let y, i, k;

          const s = this.parentNode.parentNode.getElementsByTagName(
            "select"
          )[0];
          const h = this.parentNode.previousSibling;

          for (i = 0; i < listOfOptions.length; i++) {
            if (listOfOptions[i].innerHTML == this.innerHTML) {
              const selectedValue = this.getAttribute("value");
              updateValue(selectedValue);
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              for (k = 0; k < y.length; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
        });
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function(e) {
        /*when the select box is clicked, close any other select boxes,
          and open/close the current select box:*/
        e.stopPropagation();
        //closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }
    function closeAllSelect(elmnt) {
      /*a function that will close all select boxes in the document,
      except the current select box:*/
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
    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", closeAllSelect.bind(this));
  }

  render() {
    return (
      <Host
        value={this.value}
        style={{
          width: this.width,
          "--maxVisibleOptions": this.maxVisibleOptions
        }}
      >
        <div class="form-element-wrapper">
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
        <div class="messages-wrapper"></div>
      </Host>
    );
  }
}
