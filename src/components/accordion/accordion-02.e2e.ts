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

//ACCORDION CONTAINER SINGLE TAB OPEN
describe("gxg-accordion single tab open", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-accordion-container single-tab-open>
          <gxg-accordion tab-title="tab-01" status="open">some content on accordion 1.</gxg-accordion>
          <gxg-accordion tab-title="tab-02" status="open">some content on accordion 2.</gxg-accordion>
          <gxg-accordion tab-title="tab-03" status="open">some content on accordion 3.</gxg-accordion>
        </gxg-accordion-container>`
    );

    //accordion 1
    accordion1 = await page.find("gxg-accordion[tab-title='tab-01']");
    accordion1Item = await page.find(
      "gxg-accordion[tab-title='tab-01'] >>> .tab"
    );
    accordion1Icon = await page.find(
      "gxg-accordion[tab-title='tab-01'] >>> gxg-icon"
    );
    //accordion 2
    accordion2 = await page.find("gxg-accordion[tab-title='tab-02']");
    accordion2Item = await page.find(
      "gxg-accordion[tab-title='tab-02'] >>> .tab"
    );
    accordion2Icon = await page.find(
      "gxg-accordion[tab-title='tab-02'] >>> gxg-icon"
    );
    //accordion 3
    accordion3 = await page.find("gxg-accordion[tab-title='tab-03']");
    accordion3Item = await page.find(
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
