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

const stories = storiesOf("Text/Text", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories
  .add("Text", () => {
    return `
    <style>#root {width: 600px;  }</style>
    <gxg-text type=${select(
      "Type",
      {
        "text-regular": "text-regular",
        "text-gray": "text-gray",
        "text-quote": "text-quote",
      },
      "text-regular"
    )}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</gxg-text>
`;
  })
  .add("Link", () => {
    return `
    <style>#root {width: 600px; text-align: center} </style>
    <gxg-text href="${text("href", "http://www.google.com")}" type=${select(
      "Type",
      {
        "text-link": "text-link",
        "text-link-gray": "text-link-gray",
      },
      "text-link"
    )} target=${select(
      "Target",
      {
        _self: "_self",
        _blank: "_blank",
      },
      "_self"
    )}>A link</gxg-text>
`;
  })
  .add("Alerts", () => {
    return `
  <style>#root {width: 600px; text-align: center} </style>
  <gxg-text type=${select(
    "Type",
    {
      "text-alert-error": "text-alert-error",
      "text-alert-warning": "text-alert-warning",
      "text-alert-success": "text-alert-success",
    },
    "text-alert-error"
  )}>An alert message</gxg-text>
`;
  });
