import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

describe("gxg-slider", () => {
  let page: E2EPage;
  let slider: E2EElement;
  let container: E2EElement;
  let rangeSlider: E2EElement;
  let boxValue: E2EElement;
  let rsLabel: E2EElement;
  let rsRangeLine: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<div style="width:500px;">
      <gxg-slider
      value="25"
      label="Slider"
      max="200"
    ></gxg-slider>
  </div>`
    );

    slider = await page.find("gxg-slider");
    container = await page.find("gxg-slider >>> .container");
    rangeSlider = await page.find("gxg-slider >>> .range-slider");
    boxValue = await page.find("gxg-slider >>> .box-value");
    rsLabel = await page.find("gxg-slider >>> .rs-label");
    rsRangeLine = await page.find("gxg-slider >>> .rs-range");
  });

  it("renders", async () => {
    expect(slider).toHaveClass("hydrated");
  });

  it("has the right classes", async () => {
    await page.waitForChanges();
    expect(container).toHaveClass("container");
    expect(rangeSlider).toHaveClass("range-slider");
    expect(boxValue).toHaveClass("box-value");
    expect(rsLabel).toHaveClass("rs-label");
    expect(rsRangeLine).toHaveClass("rs-range");
  });

  it("has the right values and left position", async () => {
    await page.waitForChanges();
    expect(rsLabel.textContent).toBe("25");
    expect(boxValue.textContent).toBe("25");
    expect((await rsLabel.getComputedStyle()).left).toBe("22.25px");

    //Update value and check label
    slider.setProperty("value", 75);
    await page.waitForChanges();
    expect(rsLabel.textContent).toBe("75");
    expect(boxValue.textContent).toBe("75");
    expect((await rsLabel.getComputedStyle()).left).toBe("66.75px");

    //fullWidth
    slider.setProperty("fullWidth", true);
    await page.waitForChanges();
    expect(rsLabel.textContent).toBe("75");
    expect(boxValue.textContent).toBe("75");
    expect((await rsLabel.getComputedStyle()).left).toBe("162.75px");
  });
});
