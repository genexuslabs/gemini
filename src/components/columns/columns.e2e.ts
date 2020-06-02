import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

let page: E2EPage;
let gxgColumns: E2EElement;
let gxgColumnsContainer: E2EElement;
let gxgColumn1: E2EElement;
let gxgColumn2: E2EElement;
let gxgColumn3: E2EElement;

describe("gxg-columns-space-general", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(`
    <div style="width:500px; font-size:16px; font-family:arial">
        <gxg-columns space="xs">
            <gxg-column width="1/2">1/2</gxg-column>
            <gxg-column width="content">Content</gxg-column>
            <gxg-column width="fluid">Fluid</gxg-column>
        </gxg-columns>
    </div>
    `);
    gxgColumns = await page.find("gxg-columns");
    gxgColumnsContainer = await page.find("gxg-columns >>> .columns-container");
    gxgColumn1 = await page.find("gxg-columns gxg-column:first-child");
    gxgColumn2 = await page.find("gxg-columns gxg-column:nth-child(2)");
    gxgColumn3 = await page.find("gxg-columns gxg-column:nth-child(3)");
  });

  it("renders", async () => {
    expect(gxgColumns).toHaveClass("columns");
    expect(gxgColumn1).toHaveClass("column");
    // expect(gxgColumn2).toHaveClass("column");
    expect(gxgColumn3).toHaveClass("column");
  });

  it("displays text", async () => {
    await page.waitForChanges();
    expect(gxgColumn1.textContent).toBe("1/2");
    expect(gxgColumn2.textContent).toBe("Content");
    expect(gxgColumn3.textContent).toBe("Fluid");
  });

  it("has the right css styles", async () => {
    await page.waitForChanges();
    expect((await gxgColumns.getComputedStyle()).display).toBe("block");
    //column1 : percentual width
    expect((await gxgColumn1.getComputedStyle()).display).toBe("flex");
    expect((await gxgColumn1.getComputedStyle()).width).toBe("252px");
    expect((await gxgColumn1.getComputedStyle()).minWidth).toBe("0px");
    expect((await gxgColumn1.getComputedStyle()).fontSize).toBe("16px");
    expect((await gxgColumn1.getComputedStyle()).fontFamily).toBe("arial");
    //column2 : content width
    expect((await gxgColumn2.getComputedStyle()).display).toBe("flex");
    expect((await gxgColumn2.getComputedStyle()).width).toBe("56.0391px");
    expect((await gxgColumn2.getComputedStyle()).minWidth).toBe("0px");
    expect((await gxgColumn2.getComputedStyle()).flexShrink).toBe("0");
    expect((await gxgColumn2.getComputedStyle()).fontSize).toBe("16px");
    expect((await gxgColumn2.getComputedStyle()).fontFamily).toBe("arial");
    //column3 : flex width
    expect((await gxgColumn3.getComputedStyle()).display).toBe("flex");
    expect((await gxgColumn3.getComputedStyle()).width).toBe("252px");
    expect((await gxgColumn3.getComputedStyle()).fontSize).toBe("16px");
    expect((await gxgColumn3.getComputedStyle()).fontFamily).toBe("arial");
  });
});

describe("gxg-columns-space-xs", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(`
          <gxg-columns space="xs">
              <gxg-column width="1/2">1/2</gxg-column>
              <gxg-column width="content">Content</gxg-column>
              <gxg-column width="fluid">Fluid</gxg-column>
          </gxg-columns>
      `);
    gxgColumnsContainer = await page.find("gxg-columns >>> .columns-container");
    gxgColumn1 = await page.find("gxg-columns gxg-column:first-child");
    gxgColumn2 = await page.find("gxg-columns gxg-column:nth-child(2)");
    gxgColumn3 = await page.find("gxg-columns gxg-column:nth-child(3)");
  });

  it("has the right spacing", async () => {
    await page.waitForChanges();
    expect((await gxgColumn1.getComputedStyle()).marginLeft).toBe("4px");
    expect((await gxgColumn2.getComputedStyle()).marginLeft).toBe("4px");
    expect((await gxgColumn3.getComputedStyle()).marginLeft).toBe("4px");
    //"".columns-container" margin-left should be equal to ".column" margin-left, but negative
    expect((await gxgColumnsContainer.getComputedStyle()).marginLeft).toBe(
      "-4px"
    );
  });
});

describe("gxg-columns-space-s", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(`
            <gxg-columns space="s">
                <gxg-column width="1/2">1/2</gxg-column>
                <gxg-column width="content">Content</gxg-column>
                <gxg-column width="fluid">Fluid</gxg-column>
            </gxg-columns>
        `);
    gxgColumnsContainer = await page.find("gxg-columns >>> .columns-container");
    gxgColumn1 = await page.find("gxg-columns gxg-column:first-child");
    gxgColumn2 = await page.find("gxg-columns gxg-column:nth-child(2)");
    gxgColumn3 = await page.find("gxg-columns gxg-column:nth-child(3)");
  });

  it("has the right spacing", async () => {
    await page.waitForChanges();
    expect((await gxgColumn1.getComputedStyle()).marginLeft).toBe("8px");
    expect((await gxgColumn2.getComputedStyle()).marginLeft).toBe("8px");
    expect((await gxgColumn3.getComputedStyle()).marginLeft).toBe("8px");
    //"".columns-container" margin-left should be equal to ".column" margin-left, but negative
    expect((await gxgColumnsContainer.getComputedStyle()).marginLeft).toBe(
      "-8px"
    );
  });
});

describe("gxg-columns-space-m", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(`
              <gxg-columns space="m">
                  <gxg-column width="1/2">1/2</gxg-column>
                  <gxg-column width="content">Content</gxg-column>
                  <gxg-column width="fluid">Fluid</gxg-column>
              </gxg-columns>
          `);
    gxgColumnsContainer = await page.find("gxg-columns >>> .columns-container");
    gxgColumn1 = await page.find("gxg-columns gxg-column:first-child");
    gxgColumn2 = await page.find("gxg-columns gxg-column:nth-child(2)");
    gxgColumn3 = await page.find("gxg-columns gxg-column:nth-child(3)");
  });

  it("has the right spacing", async () => {
    await page.waitForChanges();
    expect((await gxgColumn1.getComputedStyle()).marginLeft).toBe("16px");
    expect((await gxgColumn2.getComputedStyle()).marginLeft).toBe("16px");
    expect((await gxgColumn3.getComputedStyle()).marginLeft).toBe("16px");
    //"".columns-container" margin-left should be equal to ".column" margin-left, but negative
    expect((await gxgColumnsContainer.getComputedStyle()).marginLeft).toBe(
      "-16px"
    );
  });
});

describe("gxg-columns-check-column-widths", () => {
  let gxgColumn4: E2EElement;
  let gxgColumn5: E2EElement;
  let gxgColumn6: E2EElement;
  let gxgColumn7: E2EElement;
  let gxgColumn8: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(`
                <div style="width:500px;">
                    <gxg-columns space="xs">
                        <gxg-column width="1/2">1/2</gxg-column>
                        <gxg-column width="1/3">1/3</gxg-column>
                        <gxg-column width="1/4">1/4</gxg-column>
                        <gxg-column width="1/5">1/5</gxg-column>
                        <gxg-column width="2/3">2/3</gxg-column>
                        <gxg-column width="2/5">2/5</gxg-column>
                        <gxg-column width="3/5">3/5</gxg-column>
                        <gxg-column width="4/5">4/5</gxg-column>
                    </gxg-columns>
                </div>
            `);
    gxgColumn1 = await page.find("gxg-columns gxg-column:first-child");
    gxgColumn2 = await page.find("gxg-columns gxg-column:nth-child(2)");
    gxgColumn3 = await page.find("gxg-columns gxg-column:nth-child(3)");
    gxgColumn4 = await page.find("gxg-columns gxg-column:nth-child(4)");
    gxgColumn5 = await page.find("gxg-columns gxg-column:nth-child(5)");
    gxgColumn6 = await page.find("gxg-columns gxg-column:nth-child(6)");
    gxgColumn7 = await page.find("gxg-columns gxg-column:nth-child(7)");
    gxgColumn8 = await page.find("gxg-columns gxg-column:nth-child(8)");
  });

  it("has the right flex basis", async () => {
    await page.waitForChanges();
    expect((await gxgColumn1.getComputedStyle()).flex).toBe("0 0 50%");
    expect((await gxgColumn2.getComputedStyle()).flex).toBe("0 0 33.3333%");
    expect((await gxgColumn3.getComputedStyle()).flex).toBe("0 0 25%");
    expect((await gxgColumn4.getComputedStyle()).flex).toBe("0 0 50%");
    expect((await gxgColumn5.getComputedStyle()).flex).toBe("0 0 66.6667%");
    expect((await gxgColumn6.getComputedStyle()).flex).toBe("0 0 40%");
    expect((await gxgColumn7.getComputedStyle()).flex).toBe("0 0 60%");
    expect((await gxgColumn8.getComputedStyle()).flex).toBe("0 0 80%");
  });

  it("has the right width", async () => {
    await page.waitForChanges();
    expect((await gxgColumn1.getComputedStyle()).width).toBe("252px");
    expect((await gxgColumn2.getComputedStyle()).width).toBe("168px");
    expect((await gxgColumn3.getComputedStyle()).width).toBe("126px");
    expect((await gxgColumn4.getComputedStyle()).width).toBe("252px");
    expect((await gxgColumn5.getComputedStyle()).width).toBe("336px");
    expect((await gxgColumn6.getComputedStyle()).width).toBe("201.594px");
    expect((await gxgColumn7.getComputedStyle()).width).toBe("302.398px");
    expect((await gxgColumn8.getComputedStyle()).width).toBe("403.195px");
  });
});

describe("gxg-columns-check-column-width-content-fluid", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(`
                <div style="width:500px;">
                    <gxg-columns space="xs">
                        <gxg-column width="content/2">Content</gxg-column>
                        <gxg-column width="fluid">Fluid</gxg-column>
                    </gxg-columns>
                </div>
              `);
    gxgColumn1 = await page.find("gxg-columns gxg-column:first-child");
    gxgColumn2 = await page.find("gxg-columns gxg-column:nth-child(2)");
  });

  it("has the right width", async () => {
    await page.waitForChanges();
    expect((await gxgColumn1.getComputedStyle()).width).toBe("56.0391px");
    expect((await gxgColumn2.getComputedStyle()).width).toBe("439.961px");
  });
});
