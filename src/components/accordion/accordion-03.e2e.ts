import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";
import {
  page,
  accordionContainer,
  accordion1,
  accordion1Item,
  accordion1Title,
  accordion1Icon,
  accordion2,
  accordion2Item,
  accordion2Title,
  accordion2Icon,
  accordion3,
  accordion3Item,
  accordion3Title,
  accordion3Icon
} from "./accordion-e2e-common";

//ACCORDION ALTERNATE
describe("gxg-accordion container alternate", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-accordion-container mode="alternate" disabled>
          <gxg-accordion tab-title="tab-01" status="open">some content on accordion 1.</gxg-accordion>
          <gxg-accordion tab-title="tab-02">some content on accordion 2.</gxg-accordion>
          <gxg-accordion tab-title="tab-03">some content on accordion 3.</gxg-accordion>
        </gxg-accordion-container>`
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
