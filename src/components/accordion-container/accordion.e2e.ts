import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

//ACCORDION CONTAINER WITHOUT ANY ATTRIBUTES
describe("gxg-accordion-container-01", () => {
  let page: E2EPage;
  //accordion container
  let accordionContainer: E2EElement;
  //accordion 1
  let accordion1: E2EElement;
  let accordion1Header: E2EElement;
  let accordion1Title: E2EElement;
  let accordion1Icon: E2EElement;
  //accordion 2
  let accordion2: E2EElement;
  let accordion2Header: E2EElement;
  let accordion2Title: E2EElement;
  let accordion2Icon: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-accordion-container>
        <gxg-accordion tab-title="tab-01" open>some content on accordion 1.</gxg-accordion>
        <gxg-accordion tab-title="tab-02">some content on accordion 2.</gxg-accordion>
      </gxg-accordion-container>`
    );
    //accordion container
    accordionContainer = await page.find("gxg-accordion-container");
    //accordion 1
    accordion1 = await page.find("gxg-accordion[tab-title='tab-01']");
    accordion1Header = await page.find(
      "gxg-accordion[tab-title='tab-01'] >>> .tab__header"
    );
    accordion1Icon = await page.find(
      "gxg-accordion[tab-title='tab-01'] >>> gxg-icon"
    );

    accordion1Title = await page.find(
      "gxg-accordion[tab-title='tab-01'] >>> .tab__header__title"
    );
    //accordion 2
    accordion2 = await page.find("gxg-accordion[tab-title='tab-02']");
    accordion2Header = await page.find(
      "gxg-accordion[tab-title='tab-02'] >>> .tab__header"
    );
    accordion2Icon = await page.find(
      "gxg-accordion[tab-title='tab-02'] >>> gxg-icon"
    );
    accordion2Title = await page.find(
      "gxg-accordion[tab-title='tab-02'] >>> .tab__header__title"
    );
  });

  it("has the right classes", async () => {
    //accordion container
    expect(accordionContainer).toHaveClass("hydrated");
    //accordion1
    expect(accordion1).toHaveClass("hydrated");
    expect(accordion1Header).toHaveClass("tab__header");
    expect(accordion1Title).toHaveClass("tab__header__title");
    //accordion2
    expect(accordion2).toHaveClass("hydrated");
    expect(accordion2Header).toHaveClass("tab__header");
    expect(accordion2Title).toHaveClass("tab__header__title");
  });

  it("has the right attributes", async () => {
    //accordion1
    expect(accordion1).toEqualAttribute("mode", "classical");
    expect(accordion1).toEqualAttribute("tab-title", "tab-01");
    expect(accordion1Icon).toEqualAttribute("type", "chevron-up");
    expect(accordion1Icon).toEqualAttribute("size", "small");
    expect(accordion1Icon).toEqualAttribute("color", "onbackground");

    //accordion2
    expect(accordion2).toEqualAttribute("mode", "classical");
    expect(accordion2).toEqualAttribute("tab-title", "tab-02");
    expect(accordion2Icon).toEqualAttribute("type", "chevron-down");
    expect(accordion2Icon).toEqualAttribute("size", "small");
    expect(accordion2Icon).toEqualAttribute("color", "onbackground");
  });

  it("displays text", async () => {
    //accordion1
    await page.waitForChanges();
    expect(accordion1.textContent).toBe("some content on accordion 1.");
    expect(accordion1Title.textContent).toBe("tab-01");
    //accordion2
    expect(accordion2.textContent).toBe("some content on accordion 2.");
    expect(accordion2Title.textContent).toBe("tab-02");
  });
});

//ACCORDION CONTAINER DISABLED
describe("gxg-accordion-container-02", () => {
  let page: E2EPage;
  //accordion container
  let accordionContainer: E2EElement;
  //accordion 1
  let accordion1: E2EElement;
  let accordion1Tab: E2EElement;
  let accordion1Title: E2EElement;
  let accordion1Icon: E2EElement;
  //accordion 2
  let accordion2: E2EElement;
  let accordion2Tab: E2EElement;
  let accordion2Title: E2EElement;
  let accordion2Icon: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-accordion-container disabled>
        <gxg-accordion tab-title="tab-01" open>some content on accordion 1.</gxg-accordion>
        <gxg-accordion tab-title="tab-02">some content on accordion 2.</gxg-accordion>
      </gxg-accordion-container>`
    );

    //accordion container
    accordionContainer = await page.find("gxg-accordion-container");

    //accordion 1
    accordion1 = await page.find("gxg-accordion[tab-title='tab-01']");
    accordion1Tab = await page.find(
      "gxg-accordion[tab-title='tab-01'] >>> .tab"
    );
    accordion1Icon = await page.find(
      "gxg-accordion[tab-title='tab-01'] >>> gxg-icon"
    );
    accordion1Title = await page.find(
      "gxg-accordion[tab-title='tab-01'] >>> .tab__header__title"
    );

    //accordion 2
    accordion2 = await page.find("gxg-accordion[tab-title='tab-02']");
    accordion2Tab = await page.find(
      "gxg-accordion[tab-title='tab-02'] >>> .tab"
    );
    accordion2Icon = await page.find(
      "gxg-accordion[tab-title='tab-02'] >>> gxg-icon"
    );
    accordion2Title = await page.find(
      "gxg-accordion[tab-title='tab-02'] >>> .tab__header__title"
    );
  });

  it("has the right classes", async () => {
    //accordion container
    expect(accordionContainer).toHaveClass("hydrated");
    //accordion1
    expect(accordion1Tab).toHaveClasses(["tab", "tab--disabled"]);
    expect(accordion1Title).toHaveClass("tab__header__title");
    //accordion2
    expect(accordion2Tab).toHaveClasses(["tab", "tab--disabled"]);
    expect(accordion2Title).toHaveClass("tab__header__title");
  });

  it("has the right attributes", async () => {
    //accordion1
    expect(accordion1Icon).toEqualAttribute("type", "chevron-down");
    expect(accordion1Icon).toEqualAttribute("size", "small");
    expect(accordion1Icon).toEqualAttribute("color", "negative");

    //accordion2
    expect(accordion2Icon).toEqualAttribute("type", "chevron-down");
    expect(accordion2Icon).toEqualAttribute("size", "small");
    expect(accordion2Icon).toEqualAttribute("color", "negative");
  });

  it("displays text", async () => {
    //accordion1
    await page.waitForChanges();
    expect(accordion1Title.textContent).toBe("tab-01");
    //accordion2
    expect(accordion2Title.textContent).toBe("tab-02");
  });
});

//ACCORDION CONTAINER SINGLE TAB OPEN
describe("gxg-accordion-container-03", () => {
  let page: E2EPage;

  //accordion 1
  let accordion1: E2EElement;
  let accordion1Tab: E2EElement;
  let accordion1Icon: E2EElement;
  //accordion 2
  let accordion2: E2EElement;
  let accordion2Tab: E2EElement;
  let accordion2Icon: E2EElement;
  //accordion 3
  let accordion3: E2EElement;
  let accordion3Tab: E2EElement;
  let accordion3Icon: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-accordion-container single-tab-open>
        <gxg-accordion tab-title="tab-01" status="open">some content on accordion 1.</gxg-accordion>
        <gxg-accordion tab-title="tab-02" status="open">some content on accordion 2.</gxg-accordion>
        <gxg-accordion tab-title="tab-03" status="open">some content on accordion 3.</gxg-accordion>
      </gxg-accordion-container>`
      /*
      If "single-tab-open" attribute is present on accordion-container, and more than one "accordion"
      has also the "open" attribute, only the first accordion should appear open.
      */
    );

    //accordion 1
    accordion1 = await page.find("gxg-accordion[tab-title='tab-01']");
    accordion1Tab = await page.find(
      "gxg-accordion[tab-title='tab-01'] >>> .tab"
    );
    accordion1Icon = await page.find(
      "gxg-accordion[tab-title='tab-01'] >>> gxg-icon"
    );
    //accordion 2
    accordion2 = await page.find("gxg-accordion[tab-title='tab-02']");
    accordion2Tab = await page.find(
      "gxg-accordion[tab-title='tab-02'] >>> .tab"
    );
    accordion2Icon = await page.find(
      "gxg-accordion[tab-title='tab-02'] >>> gxg-icon"
    );
    //accordion 3
    accordion3 = await page.find("gxg-accordion[tab-title='tab-03']");
    accordion3Tab = await page.find(
      "gxg-accordion[tab-title='tab-03'] >>> .tab"
    );
    accordion3Icon = await page.find(
      "gxg-accordion[tab-title='tab-03'] >>> gxg-icon"
    );
  });
  it("has 'open' attribute", async () => {
    expect(accordion1).toEqualAttribute("status", "open");
    expect(accordion2).toEqualAttribute("status", "closed");
    expect(accordion3).toEqualAttribute("status", "closed");

    //accordion1
    expect(accordion1Icon).toEqualAttribute("type", "chevron-up");
    expect(accordion1Icon).toEqualAttribute("size", "small");
    expect(accordion1Icon).toEqualAttribute("color", "onbackground");

    //accordion2
    expect(accordion2Icon).toEqualAttribute("type", "chevron-down");
    expect(accordion2Icon).toEqualAttribute("size", "small");
    expect(accordion2Icon).toEqualAttribute("color", "onbackground");

    //accordion3
    expect(accordion3Icon).toEqualAttribute("type", "chevron-down");
    expect(accordion3Icon).toEqualAttribute("size", "small");
    expect(accordion3Icon).toEqualAttribute("color", "onbackground");
  });
});

//ACCORDION ALTERNATE
describe("gxg-accordion-container-04", () => {
  let page: E2EPage;

  //accordion 1
  let accordion1: E2EElement;
  let accordion1Icon: E2EElement;
  //accordion 2
  let accordion2: E2EElement;
  let accordion2Icon: E2EElement;
  //accordion 3
  let accordion3: E2EElement;
  let accordion3Icon: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-accordion-container mode="alternate" disabled>
        <gxg-accordion tab-title="tab-01" status="open">some content on accordion 1.</gxg-accordion>
        <gxg-accordion tab-title="tab-02">some content on accordion 2.</gxg-accordion>
        <gxg-accordion tab-title="tab-03">some content on accordion 3.</gxg-accordion>
      </gxg-accordion-container>`
      /*
      If "single-tab-open" attribute is present on accordion-container, and more than one "accordion"
      has also the "open" attribute, only the first accordion should appear open.
      */
    );

    //accordion 1
    accordion1 = await page.find("gxg-accordion[tab-title='tab-01']");
    accordion1Icon = await page.find(
      "gxg-accordion[tab-title='tab-01'] >>> gxg-icon"
    );
    //accordion 2
    accordion2 = await page.find("gxg-accordion[tab-title='tab-02']");
    accordion2Icon = await page.find(
      "gxg-accordion[tab-title='tab-02'] >>> gxg-icon"
    );
    //accordion 3
    accordion3 = await page.find("gxg-accordion[tab-title='tab-03']");
    accordion3Icon = await page.find(
      "gxg-accordion[tab-title='tab-03'] >>> gxg-icon"
    );
  });
  it("has 'open' attribute", async () => {
    //accordion1
    expect(accordion1).toEqualAttribute("mode", "alternate");
    expect(accordion1Icon).toEqualAttribute("type", "chevron-up");
    expect(accordion1Icon).toEqualAttribute("size", "small");
    expect(accordion1Icon).toEqualAttribute("color", "negative");
    //accordion2
    expect(accordion2).toEqualAttribute("mode", "alternate");
    expect(accordion2Icon).toEqualAttribute("type", "chevron-down");
    expect(accordion2Icon).toEqualAttribute("size", "small");
    expect(accordion2Icon).toEqualAttribute("color", "negative");
    //accordion3
    expect(accordion3).toEqualAttribute("mode", "alternate");
    expect(accordion3Icon).toEqualAttribute("type", "chevron-down");
    expect(accordion3Icon).toEqualAttribute("size", "small");
    expect(accordion3Icon).toEqualAttribute("color", "negative");
  });
});

//ACCORDION ALTERNATE DISABLED
describe("gxg-accordion-container-05", () => {
  let page: E2EPage;

  //accordion 1
  let accordion1: E2EElement;
  let accordion1Tab: E2EElement;
  let accordion1Icon: E2EElement;
  //accordion 2
  let accordion2: E2EElement;
  let accordion2Tab: E2EElement;
  let accordion2Icon: E2EElement;
  //accordion 3
  let accordion3: E2EElement;
  let accordion3Tab: E2EElement;
  let accordion3Icon: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-accordion-container mode="alternate">
        <gxg-accordion tab-title="tab-01" status="open">some content on accordion 1.</gxg-accordion>
        <gxg-accordion tab-title="tab-02">some content on accordion 2.</gxg-accordion>
        <gxg-accordion tab-title="tab-03">some content on accordion 3.</gxg-accordion>
      </gxg-accordion-container>`
      /*
      If "single-tab-open" attribute is present on accordion-container, and more than one "accordion"
      has also the "open" attribute, only the first accordion should appear open.
      */
    );

    //accordion 1
    accordion1 = await page.find("gxg-accordion[tab-title='tab-01']");
    accordion1Tab = await page.find(
      "gxg-accordion[tab-title='tab-01'] >>> .tab"
    );
    accordion1Icon = await page.find(
      "gxg-accordion[tab-title='tab-01'] >>> gxg-icon"
    );
    //accordion 2
    accordion2 = await page.find("gxg-accordion[tab-title='tab-02']");
    accordion2Tab = await page.find(
      "gxg-accordion[tab-title='tab-02'] >>> .tab"
    );
    accordion2Icon = await page.find(
      "gxg-accordion[tab-title='tab-02'] >>> gxg-icon"
    );
    //accordion 3
    accordion3 = await page.find("gxg-accordion[tab-title='tab-03']");
    accordion3Tab = await page.find(
      "gxg-accordion[tab-title='tab-03'] >>> .tab"
    );
    accordion3Icon = await page.find(
      "gxg-accordion[tab-title='tab-03'] >>> gxg-icon"
    );
  });
  it("has 'open' attribute", async () => {
    //accordion1
    expect(accordion1).toEqualAttribute("mode", "alternate");
    expect(accordion1Icon).toEqualAttribute("type", "chevron-down");
    expect(accordion1Icon).toEqualAttribute("size", "small");
    expect(accordion1Icon).toEqualAttribute("color", "negative");
    //accordion2
    expect(accordion2).toEqualAttribute("mode", "alternate");
    expect(accordion2Icon).toEqualAttribute("type", "chevron-down");
    expect(accordion2Icon).toEqualAttribute("size", "small");
    expect(accordion2Icon).toEqualAttribute("color", "negative");
    //accordion3
    expect(accordion3).toEqualAttribute("mode", "alternate");
    expect(accordion3Icon).toEqualAttribute("type", "chevron-down");
    expect(accordion3Icon).toEqualAttribute("size", "small");
    expect(accordion3Icon).toEqualAttribute("color", "negative");
  });

  it("has the right classes", async () => {
    //accordion1
    expect(accordion1Tab).toHaveClass("tab--disabled");
    //accordion2
    expect(accordion2Tab).toHaveClass("tab--disabled");
    //accordion3
    expect(accordion3Tab).toHaveClass("tab--disabled");
  });
});
