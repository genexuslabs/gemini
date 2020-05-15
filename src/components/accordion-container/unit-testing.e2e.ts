import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

//Accordion container without any attrobutes
describe("gxg-accordion-container-01", () => {
  let page: E2EPage;
  let accordionContainer: E2EElement;
  let accordion1: E2EElement;
  let accordion2: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-accordion-container>
        <gxg-accordion tab-title="tab-01" open>some content on accordion 1.</gxg-accordion>
        <gxg-accordion tab-title="tab-02">some content on accordion 2.</gxg-accordion>
      </gxg-accordion-container>`
    );
    accordionContainer = await page.find("gxg-accordion-container");
    accordion1 = await page.find("gxg-accordion[tab-title='tab-01']");
    accordion2 = await page.find("gxg-accordion[tab-title='tab-02']");
  });

  it("has the right classes", async () => {
    //accordion container
    expect(accordionContainer).toHaveClass("hydrated");
    //accordion1
    expect(accordion1).toHaveClass("hydrated");
    //accordion2
    expect(accordion2).toHaveClass("hydrated");
  });

  it("has the right attributes", async () => {
    //accordion1
    expect(accordion1).toEqualAttribute("mode", "classical");
    expect(accordion1).toEqualAttribute("tab-title", "tab-01");
    //accordion2
    expect(accordion2).toEqualAttribute("mode", "classical");
    expect(accordion2).toEqualAttribute("tab-title", "tab-02");
  });

  it("displays text", async () => {
    //accordion1
    await page.waitForChanges();
    expect(accordion1.textContent).toBe("some content on accordion 1.");
    //accordion2
    expect(accordion2.textContent).toBe("some content on accordion 2.");
  });

  it("has html", async () => {
    //accordion1
    await page.waitForChanges();
    expect(accordion1.shadowRoot).toEqualHtml(`
    
    <div class="tab">
      <header class="tab__header">
        <div class="tab__header__title">
          tab-01
        </div>
        <gxg-icon slot="icon" aria-label="chevron-up" class="svgIcon hydrated" size="small" type="chevron-up"></gxg-icon>
      </header>
      <div class="tab__container">
        <slot></slot>
      </div>
    </div>`);
    //accordion2
    expect(accordion2.shadowRoot).toEqualHtml(`
    <div class="tab">
      <header class="tab__header">
        <div class="tab__header__title">tab-02</div>
        <gxg-icon slot="icon" aria-label="chevron-down" class="svgIcon hydrated" size="small" type="chevron-down"></gxg-icon>
      </header>
    </div>`);
  });
});

//Accordion container without any attrobutes
describe("gxg-accordion-container-01", () => {
  let page: E2EPage;
  let accordionContainer: E2EElement;
  let accordion1: E2EElement;
  let accordion2: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-accordion-container>
        <gxg-accordion tab-title="tab-01" open>some content on accordion 1.</gxg-accordion>
        <gxg-accordion tab-title="tab-02">some content on accordion 2.</gxg-accordion>
      </gxg-accordion-container>`
    );
    accordionContainer = await page.find("gxg-accordion-container");
    accordion1 = await page.find("gxg-accordion[tab-title='tab-01']");
    accordion2 = await page.find("gxg-accordion[tab-title='tab-02']");
  });

  it("has the right classes", async () => {
    //accordion container
    expect(accordionContainer).toHaveClass("hydrated");
    //accordion1
    expect(accordion1).toHaveClass("hydrated");
    //accordion2
    expect(accordion2).toHaveClass("hydrated");
  });

  it("has the right attributes", async () => {
    //accordion1
    expect(accordion1).toEqualAttribute("mode", "classical");
    expect(accordion1).toEqualAttribute("tab-title", "tab-01");
    //accordion2
    expect(accordion2).toEqualAttribute("mode", "classical");
    expect(accordion2).toEqualAttribute("tab-title", "tab-02");
  });

  it("displays text", async () => {
    //accordion1
    await page.waitForChanges();
    expect(accordion1.textContent).toBe("some content on accordion 1.");
    //accordion2
    expect(accordion2.textContent).toBe("some content on accordion 2.");
  });

  it("has html", async () => {
    //accordion1
    await page.waitForChanges();
    expect(accordion1.shadowRoot).toEqualHtml(`
    
    <div class="tab">
      <header class="tab__header">
        <div class="tab__header__title">
          tab-01
        </div>
        <gxg-icon slot="icon" aria-label="chevron-up" class="svgIcon hydrated" size="small" type="chevron-up"></gxg-icon>
      </header>
      <div class="tab__container">
        <slot></slot>
      </div>
    </div>`);
    //accordion2
    expect(accordion2.shadowRoot).toEqualHtml(`
    <div class="tab">
      <header class="tab__header">
        <div class="tab__header__title">tab-02</div>
        <gxg-icon slot="icon" aria-label="chevron-down" class="svgIcon hydrated" size="small" type="chevron-down"></gxg-icon>
      </header>
    </div>`);
  });
});

//Accordion container disabled
describe("gxg-accordion-container-02", () => {
  let page: E2EPage;
  let accordionContainer: E2EElement;
  let accordion1: E2EElement;
  let accordion1Title: E2EElement;
  let accordion2: E2EElement;
  let accordion2Title: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-accordion-container disabled>
        <gxg-accordion tab-title="tab-01" open>some content on accordion 1.</gxg-accordion>
        <gxg-accordion tab-title="tab-02">some content on accordion 2.</gxg-accordion>
      </gxg-accordion-container>`
    );
    accordionContainer = await page.find("gxg-accordion-container");
    accordion1 = await page.find("gxg-accordion[tab-title='tab-01']");
    accordion1Title = await page.find(
      "gxg-accordion[tab-title='tab-01'] tab__header__title"
    );
    accordion2 = await page.find("gxg-accordion[tab-title='tab-02']");
    accordion2Title = await page.find(
      "gxg-accordion[tab-title='tab-02'] tab__header__title"
    );
  });

  it("has the right attributes", async () => {
    //accordion1
    expect(accordion1).toEqualAttribute("mode", "classical");
    expect(accordion1).toEqualAttribute("tab-title", "tab-01");
    //accordion2
    expect(accordion2).toEqualAttribute("mode", "classical");
    expect(accordion2).toEqualAttribute("tab-title", "tab-02");
  });

  it("displays text", async () => {
    //accordion1
    await page.waitForChanges();
    expect(accordion1.textContent).toBe("some content on accordion 1.");
    //accordion2
    expect(accordion2.textContent).toBe("some content on accordion 2.");
  });

  it("has html", async () => {
    //accordion1
    await page.waitForChanges();
    expect(accordion1.shadowRoot).toEqualHtml(`
    <div class="tab">
      <header class="tab__header">
        <div class="tab__header__title">
          tab-01
        </div>
        <gxg-icon slot="icon" aria-label="chevron-up" class="svgIcon hydrated" size="small" type="chevron-up"></gxg-icon>
      </header>
      <div class="tab__container">
        <slot></slot>
      </div>
    </div>`);

    //accordion2
    expect(accordion2.shadowRoot).toEqualHtml(`
    <div class="tab">
      <header class="tab__header">
        <div class="tab__header__title">tab-02</div>
        <gxg-icon slot="icon" aria-label="chevron-down" class="svgIcon hydrated" size="small" type="chevron-down"></gxg-icon>
      </header>
    </div>`);
  });
});
