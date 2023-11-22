/* STENCIL IMPORTS */
import { h } from "@stencil/core";

/*A function that helps highlighting characters when searching.*/

export const escapeRegExp = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const hiChar = function (text: string, filterValue: string) {
  if (text && filterValue) {
    /* this function highlights the character(s) that match(es) the filter value. (hi)light (Char)acters */
    const escapedFilterValue = escapeRegExp(filterValue);
    const re = new RegExp(escapedFilterValue, "gi");
    console.log("text", text);
    return (
      <span
        innerHTML={text.replace(re, '<span class="hiChar">$&</span>')}
      ></span>
    );
  } else {
    return text;
  }
};
