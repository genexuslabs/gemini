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

//ACCORDION CONTAINER DISABLED
describe("gxg-accordion disabled", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-accordion-container disabled>
          <gxg-accordion tab-title="tab-01" status="open">some content on accordion 1.</gxg-accordion>
          <gxg-accordion tab-title="tab-02">some content on accordion 2.</gxg-accordion>
        </gxg-accordion-container>`
    );

    //accordion container
    accordionContainer = await page.find("gxg-accordion-container");

    //accordion 1
    accordion1 = await page.find("gxg-accordion[tab-title='tab-01']");
    accordion1Item = await page.find(
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
    accordion2Item = await page.find(
      "gxg-accordion[tab-title='tab-02'] >>> .tab"
    );
    accordion2Icon = await page.find(
      "gxg-accordion[tab-title='tab-02'] >>> gxg-icon"
    );
    accordion2Title = await page.find(
      "gxg-accordion[tab-title='tab-02'] >>> .tab__header__title"
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
