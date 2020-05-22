import { Component, Prop, h, Element, Host } from "@stencil/core";
import datepicker from "js-datepicker";

@Component({
  tag: "gxg-date-picker",
  styleUrl: "date-picker.scss",
  shadow: true
})
export class DatePicker {
  @Element() el: HTMLElement;

  /**
   * always show
   */
  @Prop() alwaysShow = false;

  /**
   * initial date
   */
  @Prop() defaultDate: string;

  /**
   * label
   */
  @Prop() label: string;

  /**
   * no weekends
   */
  @Prop() noWeekends = false;

  /**
   * min date
   */
  @Prop() minDate: string;

  /**
   * max date
   */
  @Prop() maxDate: string;

  /**
   * input width
   */
  @Prop() width = "240px";

  componentDidLoad() {
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
      onSelect: instance => {
        // Show which date was selected.
        console.log(instance.dateSelected);
      },
      onShow: instance => {
        console.log("Calendar showing." + instance);
      },
      onHide: instance => {
        console.log("Calendar hidden." + instance);
      },
      onMonthChange: instance => {
        // Show the month of the selected date.
        console.log(instance.currentMonthName);
      },

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
        "😀",
        "😂",
        "😎",
        "😍",
        "🤩",
        "😜",
        "😬",
        "😳",
        "🤪",
        "🤓 ",
        "😝",
        "😮"
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
      disabler: date => date.getDay() === 2 && date.getMonth() === 9, // Disabled every Tuesday in October
      disabledDates: [new Date(2050, 0, 1), new Date(2050, 0, 3)], // Specific disabled dates.
      disableMobile: true, // Conditionally disabled on mobile devices.
      disableYearOverlay: true, // Clicking the year or month will *not* bring up the year overlay.

      // ID - be sure to provide a 2nd picker with the same id to create a daterange pair.
      id: "date-picker"
    });
    //picker.setDate(new Date(2099, 0, 1), true);
    picker.calendarContainer.style.setProperty("font-size", "9px");
  }

  printLabel() {
    if (this.label) {
      return <label class="label">{this.label}</label>;
    }
  }

  render() {
    return (
      <Host
        class={{}}
        style={{
          width: this.width
        }}
      >
        {this.printLabel()}
        <input type="text" id="date-picker"></input>
      </Host>
    );
  }
}
