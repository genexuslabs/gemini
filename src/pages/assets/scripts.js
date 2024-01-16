document.addEventListener("DOMContentLoaded", function () {
  const html = document.querySelector("html");
  const body = document.querySelector("body");

  //1. Render h1 Titles
  const sections = document.querySelectorAll("section");
  sections.forEach(section => {
    const titleCaption = section.getAttribute("data-title");
    if (titleCaption) {
      const titleEl = document.createElement("h2");
      titleEl.innerText = titleCaption;
      section.insertBefore(titleEl, section.firstChild);
    }

    /*articles*/
    const articles = section.querySelectorAll("article");
    articles.forEach(article => {
      const articleCaption = article.getAttribute("data-title");
      if (articleCaption) {
        const articleTitleEl = document.createElement("h3");
        articleTitleEl.innerText = articleCaption;
        article.insertBefore(articleTitleEl, article.firstChild);
      }
    });
  });

  //2. Render navbar with buttons
  const navBar = document.createElement("nav");
  navBar.classList.add("navbar");

  const mercuryOnly = document.body.hasAttribute("mercury");
  console.log(mercuryOnly);
  if (!mercuryOnly) {
    /*gemini button*/
    const geminiButton = document.createElement("button");
    geminiButton.innerText = "Set Gemini";
    geminiButton.addEventListener("click", () => {
      html.classList.remove("mercury");
    });
    navBar.appendChild(geminiButton);
    /*mercury button*/
    const mercuryButton = document.createElement("button");
    mercuryButton.innerText = "Set Mercury";
    mercuryButton.addEventListener("click", () => {
      html.classList.add("mercury");
    });
    navBar.appendChild(mercuryButton);
  }

  /*toggle dark*/
  const toggleDarkButton = document.createElement("button");
  toggleDarkButton.innerText = "Toggle Dark";
  toggleDarkButton.addEventListener("click", () => {
    html.classList.toggle("dark");
  });
  navBar.appendChild(toggleDarkButton);

  body.appendChild(navBar);
  html.classList.add("has-navbar");
});
