export default function () {
  // or export default async function()
  const head = document.head || document.getElementsByTagName("head")[0];
  const chStyle = document.createElement("ch-style");
  chStyle.setAttribute("href", "/globals/ch-styles.css");
  head.appendChild(chStyle);
}
