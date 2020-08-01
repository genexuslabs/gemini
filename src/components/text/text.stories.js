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

const stories = storiesOf("Text/Text", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories
  .add("Text", () => {
    return `
    <style>#root {width: 600px;  }</style>
    <gxg-text type=${radios(
      "Type",
      {
        regular: "regular",
        gray: "gray",
        quote: "quote"
      },
      "regular"
    )}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</gxg-text>
`;
  })
  .add("Link", () => {
    return `
    <style>#root {width: 600px; text-align: center} </style>
    <gxg-text href="${text("href", "http://www.google.com")}" type=${radios(
      "Type",
      {
        link: "link",
        "link-gray": "link-gray"
      },
      "link"
    )} target=${radios(
      "Target",
      {
        _self: "_self",
        _blank: "_blank"
      },
      "_self"
    )}>A link</gxg-text>
`;
  })
  .add("Alerts", () => {
    return `
  <style>#root {width: 600px; text-align: center} </style>
  <gxg-text type=${radios(
    "Type",
    {
      "alert-error": "alert-error",
      "alert-warning": "alert-warning",
      "alert-success": "alert-success"
    },
    "alert-error"
  )}>An alert message</gxg-text>
`;
  });
