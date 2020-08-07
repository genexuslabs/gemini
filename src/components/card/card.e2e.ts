import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

describe("gxg-card", () => {
  let page: E2EPage;
  let card: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<div style="width:500px">
      <gxg-card padding="xs" elevation="01">Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.</gxg-card></div>`
    );
    card = await page.find("gxg-card");
  });

  it("has the right classes", async () => {
    expect(card).toHaveClass("card");
  });

  it("displays text", async () => {
    await page.waitForChanges();
    expect(card.textContent).toBe(
      "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind."
    );
  });

  it("renders", async () => {
    expect(card).toHaveClasses(["hydrated"]);
  });

  it("has the right padding", async () => {
    await page.waitForChanges();
    //xs
    expect((await card.getComputedStyle()).padding).toBe("4px");
    //s
    card.setProperty("padding", "s");
    await page.waitForChanges();
    expect((await card.getComputedStyle()).padding).toBe("8px");
    //m
    card.setProperty("padding", "m");
    await page.waitForChanges();
    expect((await card.getComputedStyle()).padding).toBe("12px");
    //l
    card.setProperty("padding", "l");
    await page.waitForChanges();
    expect((await card.getComputedStyle()).padding).toBe("16px");
    //xl
    card.setProperty("padding", "xl");
    await page.waitForChanges();
    expect((await card.getComputedStyle()).padding).toBe("24px");
    //xxl
    card.setProperty("padding", "xxl");
    await page.waitForChanges();
    expect((await card.getComputedStyle()).padding).toBe("32px");
    //xxxl
    card.setProperty("padding", "xxxl");
    await page.waitForChanges();
    expect((await card.getComputedStyle()).padding).toBe("40px");
  });

  it("has the right elevation", async () => {
    await page.waitForChanges();
    //01
    expect((await card.getComputedStyle()).boxShadow).toBe(
      "rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 2px 1px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px 0px"
    );
    //03
    card.setProperty("elevation", "03");
    await page.waitForChanges();
    expect((await card.getComputedStyle()).boxShadow).toBe(
      "rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 3px 3px -2px, rgba(0, 0, 0, 0.2) 0px 1px 8px 0px"
    );
  });

  it("is full width", async () => {
    card.setProperty("fullWidth", true);
    await page.waitForChanges();
    expect((await card.getComputedStyle()).width).toBe("492px");
  });
});
