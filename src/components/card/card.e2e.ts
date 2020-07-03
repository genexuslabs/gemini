import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

describe("gxg-card", () => {
  let page: E2EPage;
  let card: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<div style="width:500px">
      <gxg-card width="260px" padding="xs" box-shadow="xxs">Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.</gxg-card></div>`
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

  it("has the right box shadow", async () => {
    await page.waitForChanges();
    //xxs
    expect((await card.getComputedStyle()).boxShadow).toBe(
      "rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 2px 1px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px 0px"
    );
    //xs
    card.setProperty("boxShadow", "xs");
    await page.waitForChanges();
    expect((await card.getComputedStyle()).boxShadow).toBe(
      "rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px, rgba(0, 0, 0, 0.2) 0px 1px 5px 0px"
    );
    //s
    card.setProperty("boxShadow", "s");
    await page.waitForChanges();
    expect((await card.getComputedStyle()).boxShadow).toBe(
      "rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 3px 3px -2px, rgba(0, 0, 0, 0.2) 0px 1px 8px 0px"
    );
    //m
    card.setProperty("boxShadow", "m");
    await page.waitForChanges();
    expect((await card.getComputedStyle()).boxShadow).toBe(
      "rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px, rgba(0, 0, 0, 0.2) 0px 2px 4px -1px"
    );
    //l
    card.setProperty("boxShadow", "l");
    await page.waitForChanges();
    expect((await card.getComputedStyle()).boxShadow).toBe(
      "rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px, rgba(0, 0, 0, 0.2) 0px 3px 5px -1px"
    );
    //xl
    card.setProperty("boxShadow", "xl");
    await page.waitForChanges();
    expect((await card.getComputedStyle()).boxShadow).toBe(
      "rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px, rgba(0, 0, 0, 0.2) 0px 5px 5px -3px"
    );
    //xxl
    card.setProperty("boxShadow", "xxl");
    await page.waitForChanges();
    expect((await card.getComputedStyle()).boxShadow).toBe(
      "rgba(0, 0, 0, 0.14) 0px 9px 12px 1px, rgba(0, 0, 0, 0.12) 0px 3px 16px 2px, rgba(0, 0, 0, 0.2) 0px 5px 6px -3px"
    );
    //xxxl
    card.setProperty("boxShadow", "xxxl");
    await page.waitForChanges();
    expect((await card.getComputedStyle()).boxShadow).toBe(
      "rgba(0, 0, 0, 0.14) 0px 12px 17px 2px, rgba(0, 0, 0, 0.12) 0px 5px 22px 4px, rgba(0, 0, 0, 0.2) 0px 7px 8px -4px"
    );
  });

  it("is full width", async () => {
    card.setProperty("fullWidth", true);
    await page.waitForChanges();
    expect((await card.getComputedStyle()).width).toBe("492px");
  });
});
