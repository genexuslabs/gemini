import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";
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

//ACCORDION ALTERNATE
describe("gxg-accordion container alternate", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-accordion mode="alternate" disabled>
          <gxg-accordion-item tab-title="tab-01" status="open">some content on accordion 1.</gxg-accordion-item>
          <gxg-accordion-item tab-title="tab-02">some content on accordion 2.</gxg-accordion-item>
          <gxg-accordion-item tab-title="tab-03">some content on accordion 3.</gxg-accordion-item>
        </gxg-accordion>`
    );

    //accordion 1
    accordion1 = await page.find("gxg-accordion-item[tab-title='tab-01']");
    accordion1Icon = await page.find(
      "gxg-accordion-item[tab-title='tab-01'] >>> gxg-icon"
    );
    //accordion 2
    accordion2 = await page.find("gxg-accordion-item[tab-title='tab-02']");
    accordion2Icon = await page.find(
      "gxg-accordion-item[tab-title='tab-02'] >>> gxg-icon"
    );
    //accordion 3
    accordion3 = await page.find("gxg-accordion-item[tab-title='tab-03']");
    accordion3Icon = await page.find(
      "gxg-accordion-item[tab-title='tab-03'] >>> gxg-icon"
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
});
