import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

describe("gxg-spacer-one", () => {
  let page: E2EPage;
  let spacer: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(`<gxg-spacer-one space="xs"></gxg-spacer-one>`);
    spacer = await page.find("gxg-spacer-one");
  });

  it("renders", async () => {
    expect(spacer).toHaveClass("hydrated");
  });

  it("has the right classes", async () => {
    await page.waitForChanges();
    expect(spacer).toHaveClass("xs");
  });

  //test other sizes:
  it("has the right sizes", async () => {
    //s
    spacer.setProperty("space", "s");
    await page.waitForChanges();
    expect(spacer).toHaveClass("s");

    //m
    spacer.setProperty("space", "m");
    await page.waitForChanges();
    expect(spacer).toHaveClass("m");

    //l
    spacer.setProperty("space", "l");
    await page.waitForChanges();
    expect(spacer).toHaveClass("l");

    //xl
    spacer.setProperty("space", "xl");
    await page.waitForChanges();
    expect(spacer).toHaveClass("xl");
  });
});
