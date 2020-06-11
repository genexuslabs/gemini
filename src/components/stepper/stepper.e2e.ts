import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

describe("gxg-stepper", () => {
  let page: E2EPage;
  let stepper: E2EElement;
  let label: E2EElement;
  let outerWrapper: E2EElement;
  let buttonMinus: E2EElement;
  let buttonPlus: E2EElement;
  let valueContainer: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-stepper
      min="0"
      max="5"
      value="0"
      label="Stepper"
    ></gxg-stepper>`
    );
    stepper = await page.find("gxg-stepper");
    label = await page.find("gxg-stepper >>> .label");
    outerWrapper = await page.find("gxg-stepper >>> .outer-wrapper");
    buttonMinus = await page.find("gxg-stepper >>> .button--minus");
    buttonPlus = await page.find("gxg-stepper >>> .button--plus");
    valueContainer = await page.find("gxg-stepper >>> .value-container");
  });

  it("renders", async () => {
    expect(stepper).toHaveClass("hydrated");
  });

  it("displays text", async () => {
    await page.waitForChanges();
    expect(label.textContent).toBe("Stepper");
    expect(valueContainer.textContent).toBe("0");
  });

  it("check the left side button", async () => {
    await page.waitForChanges();
    expect(buttonMinus.getAttribute("disabled")).toBe("disabled");
    expect(buttonMinus.textContent).toBe("-");
  });

  it("check the right side button", async () => {
    await page.waitForChanges();
    expect(buttonPlus).not.toHaveAttribute("disabled");
    expect(buttonPlus.textContent).toBe("+");
  });

  it("sums up", async () => {
    buttonPlus.click();
    await page.waitForChanges();
    expect(valueContainer.textContent).toBe("1");

    //minus button should not be disabled now...
    await page.waitForChanges();
    expect(buttonMinus).not.toHaveAttribute("disabled");
    //plus buttons should not be disabled neither
    expect(buttonPlus).not.toHaveAttribute("disabled");

    buttonPlus.click();
    await page.waitForChanges();
    expect(valueContainer.textContent).toBe("2");

    buttonPlus.click();
    await page.waitForChanges();
    expect(valueContainer.textContent).toBe("3");

    buttonPlus.click();
    await page.waitForChanges();
    expect(valueContainer.textContent).toBe("4");

    buttonPlus.click();
    await page.waitForChanges();
    expect(valueContainer.textContent).toBe("5");

    //At this point, the value is 5, and we have reached the maximum available value.
    //plus button should be disabled now
    expect(buttonPlus.getAttribute("disabled")).toBe("disabled");
  });
});
