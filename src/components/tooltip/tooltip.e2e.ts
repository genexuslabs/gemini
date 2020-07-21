import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

describe("gxg-tooltip", () => {
  let page: E2EPage;
  let tooltip: E2EElement;
  let tooltipTooltip: E2EElement;
  let tooltipTooltiptext: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-tooltip label="Paleolithic age" position="top"
      >Paleolithic period</gxg-tooltip
    >`
    );
    tooltip = await page.find("gxg-tooltip");
    tooltipTooltiptext = await page.find("gxg-tooltip >>> .tooltiptext");
  });

  it("renders", async () => {
    expect(tooltip).toHaveClass("hydrated");
  });

  it("displays text", async () => {
    await page.waitForChanges();
    // expect(tooltipTooltip.textContent).toBe("Paleolithic age");
    expect(tooltipTooltiptext.textContent).toBe("Paleolithic age");
  });

  it("has the right classes", async () => {
    await page.waitForChanges();
    expect(tooltip).toHaveClass("hydrated");
    expect(tooltipTooltiptext).toHaveClass("tooltiptext");
  });
});
