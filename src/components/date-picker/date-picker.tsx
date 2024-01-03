import {
  Component,
  Prop,
  h,
  Element,
  Host,
  State,
  Event,
  EventEmitter,
  Watch
} from "@stencil/core";
import datepicker from "js-datepicker";
import state from "../store";
import { exportParts } from "../../common/export-parts";
import { commonClassesNames } from "../../common/classesNames";

@Component({
  tag: "gxg-date-picker",
  styleUrl: "date-picker.scss",
  shadow: true
})
export class GxgDatePicker {
  private parts = {
    input: "input"
  };
  private exportparts: string;
  private valueBeforeDisabled;

  @Element() el: HTMLElement;

  /**
   * It disabled the date-picker
   */
  @Prop() disabled = false;
  @Watch("disabled")
  disabledHandler(newValue): void {
    if (newValue === true) {
      this.valueBeforeDisabled = this.value;
      this.value = null;
    } else {
      this.value = this.valueBeforeDisabled;
    }
  }

  /**
   * The presence of this attribute makes the date-picker always visible
   */
  @Prop() alwaysShow = false;

  /**
   * initial date
   */
  @Prop() value: DatePickerDate;

  /**
   * The datepicker label
   */
  @Prop() label: string = undefined;

  /**
   * no weekends available
   */
  @Prop() noWeekends = false;

  /**
   * The min. date
   */
  @Prop() minDate: DatePickerDate;

  /**
   * The max. date
   */
  @Prop() maxDate: DatePickerDate;

  /**
   * The max. width
   */
  @Prop() maxWidth = "100%";

  /**
   * Reading direction
   */
  @State() rtl = false;

  /**
   * Emits the new selected date
   */
  @Event() valueChanged: EventEmitter<DatePickerDate>;

  // Whenever `busy` changes, this method will fire.
  @Watch("value")
  watchStateHandler(newValue: DatePickerDate) {
    this.valueChanged.emit(newValue);
  }

  componentWillLoad() {
    this.attachExportParts();
  }

  private attachExportParts = (): void => {
    const part = this.el.getAttribute("part");
    const exportPartsResult = exportParts(part, this.parts);
    exportPartsResult.length && (this.exportparts = exportPartsResult);
  };

  componentDidLoad() {
    //Reading Direction
    const dirHtml = document
      .getElementsByTagName("html")[0]
      .getAttribute("dir");
    const dirBody = document
      .getElementsByTagName("body")[0]
      .getAttribute("dir");
    if (dirHtml === "rtl" || dirBody === "rtl") {
      this.rtl = true;
    }

    if (this.value !== undefined && this.value !== "") {
      //default/initial date
      const d = new Date(this.value);
      if (Object.prototype.toString.call(d) === "[object Date]") {
        // it is a date
        if (isNaN(d.getTime())) {
          // d.valueOf() could also work
          // date is not valid
        } else {
          // date is valid
        }
      } else {
        // not a date
      }
    }

    //min date
    const minDate = this.minDate ? new Date(this.minDate) : undefined;
    const minDateYear = minDate?.getFullYear();
    const minDateMonth = minDate?.getMonth();
    const minDateDay = minDate?.getDate();
    //max date
    const maxDate = this.maxDate ? new Date(this.maxDate) : undefined;
    const maxDateYear = maxDate?.getFullYear();
    const maxDateMonth = maxDate?.getMonth();
    const maxDateDay = maxDate?.getDate();

    const pickerSelector = this.el.shadowRoot.querySelector("#date-picker");
    const picker = datepicker(pickerSelector, {
      // Event callbacks.
      onSelect: instance => {
        const newValue = instance.dateSelected;
        this.value = newValue;
      },
      // onShow: instance => {

      // },
      // onHide: instance => {

      // },
      // onMonthChange: instance => {

      // },

      // Customizations.
      formatter: (input, date) => {
        // This will display the date as `1/1/2019`.
        input.value = date.toDateString();
      },
      position: "bl", // Top right.
      startDay: 1, // Calendar week starts on a Monday.
      customDays: ["S", "M", "T", "W", "T", "F", "S"],
      customMonths: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      customOverlayMonths: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC"
      ],
      overlayButton: "Go!",
      overlayPlaceholder: "Enter a 4-digit year",

      // Settings.
      alwaysShow: this.alwaysShow, // Never hide the calendar.
      //dateSelected: new Date(valueYear, valueMonth, valueDay),
      maxDate: maxDate && new Date(maxDateYear, maxDateMonth, maxDateDay), // Jan 1st, 2099.
      minDate: minDate && new Date(minDateYear, minDateMonth, minDateDay), // June 1st, 2016.
      startDate: this.value, // This month.
      showAllDates: true, // Numbers for leading & trailing days outside the current month will show.

      // Disabling things.
      noWeekends: this.noWeekends, // Saturday's and Sunday's will be unselectable.
      disabler: date => date.getDay() === 2 && date.getMonth() === 9, // Disabled every Tuesday in October
      // disabledDates: [new Date(2050, 0, 1), new Date(2050, 0, 3)], // Specific disabled dates.
      disableMobile: true, // Conditionally disabled on mobile devices.
      disableYearOverlay: false, // Clicking the year or month will *not* bring up the year overlay.

      // ID - be sure to provide a 2nd picker with the same id to create a daterange pair.
      id: "date-picker"
    });
    //picker.setDate(new Date(2099, 0, 1), true);
    picker.calendarContainer.style.setProperty("font-size", "9px");
  }

  render() {
    return (
      <Host
        class={{
          rtl: this.rtl,
          large: state.large,
          [commonClassesNames["DISABLED_CLASS"]]: this.disabled
        }}
        style={{
          maxWidth: this.maxWidth
        }}
        exportParts={this.exportparts ? this.exportparts : null}
      >
        {this.label ? <gxg-label class="label">{this.label}</gxg-label> : null}
        <input
          type="text"
          id="date-picker"
          part={this.parts.input}
          readOnly
          class="form-element"
        ></input>
      </Host>
    );
  }
}

export type DatePickerDate = string | Date;
