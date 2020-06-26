import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

describe("gxg-tooltip", () => {
  let page: E2EPage;
  let tooltip: E2EElement;
  let tooltipTooltip: E2EElement;
  let tooltipTooltiptext: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-tooltip message="In the Paleolithic period (roughly 2.5 million years ago to 10,000 B.C.), early humans lived in caves or simple huts or tepees and were hunters and gatherers. They used basic stone and bone tools, as well as crude stone axes, for hunting birds and wild animals." position="top">Paleolithic age</gxg-tooltip>`
    );
    tooltip = await page.find("gxg-tooltip");
    tooltipTooltip = await page.find("gxg-tooltip >>> .tooltip");
    tooltipTooltiptext = await page.find("gxg-tooltip >>> .tooltiptext");
  });

  it("renders", async () => {
    expect(tooltip).toHaveClass("hydrated");
  });

  it("displays text", async () => {
    await page.waitForChanges();
    // expect(tooltipTooltip.textContent).toBe("Paleolithic age");
    expect(tooltipTooltiptext.textContent).toBe(
      "In the Paleolithic period (roughly 2.5 million years ago to 10,000 B.C.), early humans lived in caves or simple huts or tepees and were hunters and gatherers. They used basic stone and bone tools, as well as crude stone axes, for hunting birds and wild animals."
    );
  });

  it("has the right classes", async () => {
    await page.waitForChanges();
    expect(tooltipTooltip).toHaveClass("tooltip");
    expect(tooltipTooltiptext).toHaveClass("tooltiptext");
  });
});
