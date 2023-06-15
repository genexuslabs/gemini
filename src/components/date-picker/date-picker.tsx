import { Component, Prop, h, Element, Host, State } from "@stencil/core";
import datepicker from "js-datepicker";
import state from "../store";

@Component({
  tag: "gxg-date-picker",
  styleUrl: "date-picker.scss",
  shadow: true,
})
export class GxgDatePicker {
  @Element() el: HTMLElement;

  /**
   * The presence of this attribute makes the date-picker always visible
   */
  @Prop() alwaysShow = false;

  /**
   * initial date
   */
  @Prop() defaultDate: string;

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
  @Prop() minDate = "1000, 1, 1";

  /**
   * The max. date
   */
  @Prop() maxDate = "3000, 1, 1";

  /**
   * The max. width
   */
  @Prop() maxWidth = "100%";

  /**
   * Reading direction
   */
  @State() rtl = false;

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

    //Datepicker Options
    let defaultDate = new Date();

    if (this.defaultDate !== undefined && this.defaultDate !== "") {
      //default/initial date
      const d = new Date(this.defaultDate);
      if (Object.prototype.toString.call(d) === "[object Date]") {
        // it is a date
        if (isNaN(d.getTime())) {
          // d.valueOf() could also work
          // date is not valid
        } else {
          // date is valid
          defaultDate = new Date(this.defaultDate);
        }
      } else {
        // not a date
      }
    }

    //default date
    const defaultDateYear = defaultDate.getFullYear();
    const defaultDateMonth = defaultDate.getMonth();
    const defaultDateDay = defaultDate.getDate();

    //min date
    const minDate = new Date(this.minDate);
    const minDateYear = minDate.getFullYear();
    const minDateMonth = minDate.getMonth();
    const minDateDay = minDate.getDate();
    //max date
    const maxDate = new Date(this.maxDate);
    const maxDateYear = maxDate.getFullYear();
    const maxDateMonth = maxDate.getMonth();
    const maxDateDay = maxDate.getDate();

    const pickerSelector = this.el.shadowRoot.querySelector("#date-picker");
    const picker = datepicker(pickerSelector, {
      // Event callbacks.
      // onSelect: instance => {

      // },
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
        "December",
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
        "DEC",
      ],
      overlayButton: "Go!",
      overlayPlaceholder: "Enter a 4-digit year",

      // Settings.
      alwaysShow: this.alwaysShow, // Never hide the calendar.
      dateSelected: new Date(defaultDateYear, defaultDateMonth, defaultDateDay),
      maxDate: new Date(maxDateYear, maxDateMonth, maxDateDay), // Jan 1st, 2099.
      minDate: new Date(minDateYear, minDateMonth, minDateDay), // June 1st, 2016.
      startDate: new Date(), // This month.
      showAllDates: true, // Numbers for leading & trailing days outside the current month will show.

      // Disabling things.
      noWeekends: this.noWeekends, // Saturday's and Sunday's will be unselectable.
      disabler: (date) => date.getDay() === 2 && date.getMonth() === 9, // Disabled every Tuesday in October
      // disabledDates: [new Date(2050, 0, 1), new Date(2050, 0, 3)], // Specific disabled dates.
      disableMobile: true, // Conditionally disabled on mobile devices.
      disableYearOverlay: false, // Clicking the year or month will *not* bring up the year overlay.

      // ID - be sure to provide a 2nd picker with the same id to create a daterange pair.
      id: "date-picker",
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
        }}
        style={{
          maxWidth: this.maxWidth,
        }}
      >
        {this.label ? <gxg-label class="label">{this.label}</gxg-label> : null}
        <input type="text" id="date-picker"></input>
      </Host>
    );
  }
}
