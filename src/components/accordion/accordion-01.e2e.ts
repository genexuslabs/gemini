import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";
let page: E2EPage;
//accordion container
let accordionContainer: E2EElement;
//accordion 1
let accordion1: E2EElement;
let accordion1Item: E2EElement;
let accordion1Title: E2EElement;
let accordion1Icon: E2EElement;
//accordion 2
let accordion2: E2EElement;
let accordion2Item: E2EElement;
let accordion2Title: E2EElement;
let accordion2Icon: E2EElement;

//ACCORDION CONTAINER DISABLED
describe("gxg-accordion disabled", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-accordion disabled>
          <gxg-accordion-item tab-title="tab-01" status="open">some content on accordion 1.</gxg-accordion-item>
          <gxg-accordion-item tab-title="tab-02">some content on accordion 2.</gxg-accordion-item>
        </gxg-accordion>`
    );

    //accordion container
    accordionContainer = await page.find("gxg-accordion");

    //accordion 1
    accordion1 = await page.find("gxg-accordion-item[tab-title='tab-01']");
    accordion1Item = await page.find(
      "gxg-accordion-item[tab-title='tab-01'] >>> .tab"
    );
    accordion1Icon = await page.find(
      "gxg-accordion-item[tab-title='tab-01'] >>> gxg-icon"
    );
    accordion1Title = await page.find(
      "gxg-accordion-item[tab-title='tab-01'] >>> .tab__header__title"
    );

    //accordion 2
    accordion2 = await page.find("gxg-accordion-item[tab-title='tab-02']");
    accordion2Item = await page.find(
      "gxg-accordion-item[tab-title='tab-02'] >>> .tab"
    );
    accordion2Icon = await page.find(
      "gxg-accordion-item[tab-title='tab-02'] >>> gxg-icon"
    );
    accordion2Title = await page.find(
      "gxg-accordion-item[tab-title='tab-02'] >>> .tab__header__title"
    );
    // expect(accordion2Title).not.toBeNull();
  });

  it("has the right classes", async () => {
    //accordion container
    expect(accordionContainer).toHaveClass("hydrated");
    //accordion1
    expect(accordion1Item).toHaveClasses(["tab", "tab--disabled"]);
    expect(accordion1Title).toHaveClass("tab__header__title");
    //accordion2
    expect(accordion2Item).toHaveClasses(["tab", "tab--disabled"]);
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
