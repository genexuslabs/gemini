import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";
let page: E2EPage;
//accordion container
let accordion: E2EElement;
//accordion 1
let accordionItem1: E2EElement;
let accordionItem1Container: E2EElement;
let accordionItem1Header: E2EElement;
let accordionItem1Title: E2EElement;
let accordionItem1Icon: E2EElement;
// let accordionItem1OuterContainer: E2EElement;
// let accordionItem1InnerContainer: E2EElement;

//accordion 2
let accordionItem2: E2EElement;
let accordionItem2Title: E2EElement;
let accordionItem2Container: E2EElement;
// let accordionItem2InnerContainer: E2EElement;

describe("gxg-accordion classical general tests", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<div style="width: 500px;">
      <gxg-accordion>
        <gxg-accordion-item item-title="tab-01" item-id="tab-01" status="open">some content on accordion 1.</gxg-accordion-item>
        <gxg-accordion-item item-title="tab-02" item-id="tab-02">some content on accordion 2.</gxg-accordion-item>
    </gxg-accordion>
  </div>`
    );

    //accordion container
    accordion = await page.find("gxg-accordion");

    //accordion 1
    accordionItem1 = await page.find("gxg-accordion-item[item-title='tab-01']");
    accordionItem1Container = await page.find(
      "gxg-accordion-item[item-title='tab-01'] >>> .item"
    );
    accordionItem1Header = await page.find(
      "gxg-accordion-item[item-title='tab-01'] >>> .item__header"
    );
    accordionItem1Title = await page.find(
      "gxg-accordion-item[item-title='tab-01'] >>> .item__header__title"
    );
    accordionItem1Icon = await page.find(
      "gxg-accordion-item[item-title='tab-01'] >>> gxg-icon"
    );

    //accordion 2
    accordionItem2 = await page.find("gxg-accordion-item[item-title='tab-02']");
    accordionItem2Title = await page.find(
      "gxg-accordion-item[item-title='tab-02'] >>> .item__header__title"
    );
    accordionItem2Container = await page.find(
      "gxg-accordion-item[item-title='tab-02'] >>> .item"
    );
  });

  it("renders", async () => {
    //accordion
    expect(accordion).toHaveClass("hydrated");
    //accordionItem1
    expect(accordionItem1).toHaveClass("hydrated");
    //accordionItem2
    expect(accordionItem2).toHaveClass("hydrated");
  });

  it("has the right attributes", async () => {
    //accordion
    expect(accordionItem1).toEqualAttribute("mode", "classical");
  });

  it("displays text", async () => {
    //accordion1
    await page.waitForChanges();
    expect(accordionItem1.textContent).toBe("some content on accordion 1.");
    //accordion2
    expect(accordionItem2.textContent).toBe("some content on accordion 2.");
  });
});

describe("gxg-accordion classical single-item-open", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<div style="width: 500px;">
      <gxg-accordion single-item-open>
        <gxg-accordion-item item-title="tab-01" item-id="tab-01" open>some content on accordion 1.</gxg-accordion-item>
        <gxg-accordion-item item-title="tab-02" item-id="tab-02" open>some content on accordion 2.</gxg-accordion-item>
    </gxg-accordion>
  </div>`
    );

    //accordion 1
    accordionItem1Container = await page.find(
      "gxg-accordion-item[item-title='tab-01'] >>> .item"
    );
    accordionItem2Container = await page.find(
      "gxg-accordion-item[item-title='tab-02'] >>> .item"
    );
  });
});

describe("gxg-accordion-item disabled", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<div style="width: 500px;">
      <gxg-accordion>
        <gxg-accordion-item item-title="tab-01" item-id="tab-01" open disabled>some content on accordion 1.</gxg-accordion-item>
        <gxg-accordion-item item-title="tab-02" item-id="tab-02">some content on accordion 2.</gxg-accordion-item>
    </gxg-accordion>
  </div>`
    );

    accordion = await page.find("gxg-accordion");
    accordionItem1Container = await page.find(
      "gxg-accordion-item[item-title='tab-01'] >>> .item"
    );
    accordionItem2Container = await page.find(
      "gxg-accordion-item[item-title='tab-02'] >>> .item"
    );
  });

  it("disables the first accordion-item", async () => {
    expect(accordionItem1Container).toHaveClass("item--disabled");
  });
});

describe("gxg-accordion disabled", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<div style="width: 500px;">
      <gxg-accordion disabled>
        <gxg-accordion-item item-title="tab-01" item-id="tab-01">some content on accordion 1.</gxg-accordion-item>
        <gxg-accordion-item item-title="tab-02" item-id="tab-02">some content on accordion 2.</gxg-accordion-item>
    </gxg-accordion>
  </div>`
    );

    accordion = await page.find("gxg-accordion");
    accordionItem1Container = await page.find(
      "gxg-accordion-item[item-title='tab-01'] >>> .item"
    );
    accordionItem2Container = await page.find(
      "gxg-accordion-item[item-title='tab-02'] >>> .item"
    );
  });

  it("disables all accordion-items", async () => {
    //disable all accordion-items
    accordion.setProperty("disabled", true);
    await page.waitForChanges();
    expect(accordionItem1Container).toHaveClass("item--disabled");
    expect(accordionItem2Container).toHaveClass("item--disabled");
  });
});
