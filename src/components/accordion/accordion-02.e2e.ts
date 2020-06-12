import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

let page: E2EPage;
//accordion 1
let accordion1: E2EElement;
let accordion1Item: E2EElement;
let accordion1Icon: E2EElement;
//accordion 2
let accordion2: E2EElement;
let accordion2Item: E2EElement;
let accordion2Icon: E2EElement;
//accordion 3
let accordion3: E2EElement;
let accordion3Item: E2EElement;
let accordion3Icon: E2EElement;

//ACCORDION CONTAINER SINGLE TAB OPEN
describe("gxg-accordion single tab open", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-accordion single-item-open>
          <gxg-accordion-item item-title="tab-01" status="open">some content on accordion 1.</gxg-accordion-item>
          <gxg-accordion-item item-title="tab-02" status="open">some content on accordion 2.</gxg-accordion-item>
          <gxg-accordion-item item-title="tab-03" status="open">some content on accordion 3.</gxg-accordion-item>
        </gxg-accordion>`
    );

    //accordion 1
    accordion1 = await page.find("gxg-accordion-item[item-title='tab-01']");
    accordion1Item = await page.find(
      "gxg-accordion-item[item-title='tab-01'] >>> .item"
    );
    accordion1Icon = await page.find(
      "gxg-accordion-item[item-title='tab-01'] >>> gxg-icon"
    );
    //accordion 2
    accordion2 = await page.find("gxg-accordion-item[item-title='tab-02']");
    accordion2Item = await page.find(
      "gxg-accordion-item[item-title='tab-02'] >>> .item"
    );
    accordion2Icon = await page.find(
      "gxg-accordion-item[item-title='tab-02'] >>> gxg-icon"
    );
    //accordion 3
    accordion3 = await page.find("gxg-accordion-item[item-title='tab-03']");
    accordion3Item = await page.find(
      "gxg-accordion-item[item-title='tab-03'] >>> .item"
    );
    accordion3Icon = await page.find(
      "gxg-accordion-item[item-title='tab-03'] >>> gxg-icon"
    );
  });
  it("has 'open' attribute", async () => {
    expect(accordion1).toEqualAttribute("status", "open");
    expect(accordion2).toEqualAttribute("status", "closed");
    expect(accordion3).toEqualAttribute("status", "closed");

    //accordion1
    expect(accordion1Icon).toEqualAttribute("type", "chevron-up");
    expect(accordion1Icon).toEqualAttribute("size", "small");
    expect(accordion1Icon).toEqualAttribute("color", "alwaysblack");

    //accordion2
    expect(accordion2Icon).toEqualAttribute("type", "chevron-down");
    expect(accordion2Icon).toEqualAttribute("size", "small");
    expect(accordion2Icon).toEqualAttribute("color", "alwaysblack");

    //accordion3
    expect(accordion3Icon).toEqualAttribute("type", "chevron-down");
    expect(accordion3Icon).toEqualAttribute("size", "small");
    expect(accordion3Icon).toEqualAttribute("color", "alwaysblack");
  });
});
