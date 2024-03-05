export default function () {
  // or export default async function()
  const head = document.head || document.getElementsByTagName("head")[0];
  const chStyle = document.createElement("ch-style");
  chStyle.innerText = `
  /*This style-sheet being included in ch-style on globals/global.js. It helps styling chameleon-controls-library components styles that are inaccesible by using parts, such as the scrollbar*/
  ::-webkit-scrollbar {
    width: var(--gxg-scrollbar-width);
    height: var(--gxg-scrollbar-width);
    cursor: initial;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background-color: var(--gxg-scrollbar-track-background);
    border-radius: var(--gxg-scrollbar-track-border-radius);
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: var(--gxg-scrollbar-track-thumb-background);
    border-radius: var(--gxg-scrollbar-track-thumb-radius);
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background-color: var(--gxg-scrollbar-track-thumb-hover-background);
  }
  ::-webkit-scrollbar-corner {
    background: rgba(0, 0, 0, 0);
  }`;
  head.appendChild(chStyle);
}
