import { storiesOf } from "@storybook/html";
import readme from "./readme.md";
import {
  withKnobs,
  text,
  boolean,
  number,
  select,
  radios
} from "@storybook/addon-knobs";

const stories = storiesOf("Date Picker", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories.add("Date Picker", () => {
  //Min. date
  const labelMinDate = "Min. date";
  const defaultValueMinDate = "2019, 12, 20";
  const valueMinDate = text(labelMinDate, defaultValueMinDate);

  //Max. date
  const labelMaxDate = "Max. date";
  const defaultValueMaxDate = "2023, 12, 20";
  const valueMaxDate = text(labelMaxDate, defaultValueMaxDate);

  //Default date
  const labelDefaultDate = "Default date";
  const defaultValueDefault = "2020, 12, 20";
  const valueDefaultDate = text(labelDefaultDate, defaultValueDefault);

  //No weekends
  const noWeekendsLabel = "No weekends available";
  const defaultValuenoWeekends = false;
  const noWeekendsValue = boolean(noWeekendsLabel, defaultValuenoWeekends);

  function noWeekendsFunc() {
    if (noWeekendsValue) {
      return "no-weekends";
    }
  }

  function test() {
    return "2020, 1, 20";
  }

  return `<gxg-date-picker
  min-date="2018, 12, 20"
  max-date="2021, 1, 20"
  ${noWeekendsFunc()}
></gxg-date-picker>`;
});
