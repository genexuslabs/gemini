export default function () {
  // or export default async function()
  const head = document.head || document.getElementsByTagName("head")[0];
  const chStyle = document.createElement("ch-style");
  const style = document.createElement("style");
  chStyle.innerText =
    "::-webkit-scrollbar{width:var(--gxg-scrollbar-width);height:var(--gxg-scrollbar-width);cursor:initial}::-webkit-scrollbar-track{background-color:var(--gxg-scrollbar-track-background);border-radius:var(--gxg-scrollbar-track-border-radius)}::-webkit-scrollbar-thumb{background-color:var(--gxg-scrollbar-track-thumb-background);border-radius:var(--gxg-scrollbar-track-thumb-radius);}::-webkit-scrollbar-thumb:hover{background-color:var(--gxg-scrollbar-track-thumb-hover-background)}::-webkit-scrollbar-corner{background:rgba(0,0,0,0)}";
  head.appendChild(chStyle);
}
