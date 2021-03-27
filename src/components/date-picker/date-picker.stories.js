import { storiesOf } from "@storybook/html";
import readme from "./readme.md";
import {
  withKnobs,
  text,
  boolean,
  number,
  select,
  radios,
} from "@storybook/addon-knobs";

const stories = storiesOf("Controls/Date Picker", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("Date Picker", () => {
  //Always show
  const alwaysShowLabel = "Always show";
  const defaultValuealwaysShow = false;
  const alwaysShowValue = boolean(alwaysShowLabel, defaultValuealwaysShow);

  //Default date
  const labelDefaultDate = "Default date";
  const defaultValueDefault = "2020, 12, 20";
  const valueDefaultDate = text(labelDefaultDate, defaultValueDefault);

  //Label
  const labelLabel = "Label";
  const defaultValueLabel = "Set your birthday:";
  const valueLabel = text(labelLabel, defaultValueLabel);

  //MaxWidth
  const labelMaxWidth = "Label";
  const defaultValueMaxWidth = "100%";
  const valueMaxWidth = text(labelMaxWidth, defaultValueMaxWidth);

  //Max. date
  const labelMaxDate = "Max. date (yyyy,mm,dd)";
  const defaultValueMaxDate = "2023, 12, 20";
  const valueMaxDate = text(labelMaxDate, defaultValueMaxDate);

  //Min. date
  const labelMinDate = "Min. date (yyyy,mm,dd)";
  const defaultValueMinDate = "2019, 12, 20";
  const valueMinDate = text(labelMinDate, defaultValueMinDate);

  //No weekends
  const noWeekendsLabel = "No weekends available";
  const defaultValuenoWeekends = false;
  const noWeekendsValue = boolean(noWeekendsLabel, defaultValuenoWeekends);

  function alwaysShowFunc() {
    if (alwaysShowValue) {
      return "always-show";
    }
  }

  function noWeekendsFunc() {
    if (noWeekendsValue) {
      return "no-weekends";
    }
  }

  return `
  <style>
  #root {
    width:700px;
  }
  #root gxg-date-picker {
    margin:0 auto;
  }
  </style>
  <gxg-date-picker
  ${alwaysShowFunc()}
  default-date="${valueDefaultDate}"
  label="${valueLabel}"
  max-width=${valueMaxWidth}
  max-date="${valueMaxDate}"
  min-date="${valueMinDate}"
  ${noWeekendsFunc()}
></gxg-date-picker>`;
});
