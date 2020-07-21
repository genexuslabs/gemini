import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

let page: E2EPage;
let gxgColumns: E2EElement;
let gxgColumnsContainer: E2EElement;
let gxgColumn1: E2EElement;
let gxgColumn2: E2EElement;
let gxgColumn3: E2EElement;

async function expectValidColumnWidth(
  gxgActualColumn: E2EElement,
  expectedWidth: number
) {
  let receivedWidth = (await gxgActualColumn.getComputedStyle()).width;
  receivedWidth = receivedWidth.substring(0, expectedWidth);
  const receivedWidthInt = parseInt(receivedWidth, 10);
  expect(receivedWidthInt).toBeGreaterThan(expectedWidth - 3);
  expect(receivedWidthInt).toBeLessThan(expectedWidth + 3);
}

describe("gxg-columns space general", () => {
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
    const gxgColumn1ComputedStyle = await gxgColumn1.getComputedStyle();
    expect(gxgColumn1ComputedStyle.display).toBe("flex");
    // expect(gxgColumn1ComputedStyle.width).toBe("252px");
    expect(gxgColumn1ComputedStyle.minWidth).toBe("0px");
    expect(gxgColumn1ComputedStyle.fontSize).toBe("16px");
    expect(gxgColumn1ComputedStyle.fontFamily).toBe("arial");
    //column2 : content width
    expect((await gxgColumn2.getComputedStyle()).display).toBe("flex");
    // expectValidColumnWidth(gxgColumn2, 64);

    const gxgColumn2ComputedStyle = await gxgColumn2.getComputedStyle();
    expect(gxgColumn2ComputedStyle.minWidth).toBe("0px");
    expect(gxgColumn2ComputedStyle.flexShrink).toBe("0");
    expect(gxgColumn2ComputedStyle.fontSize).toBe("16px");
    expect(gxgColumn2ComputedStyle.fontFamily).toBe("arial");
    //column3 : flex width
    expect((await gxgColumn3.getComputedStyle()).display).toBe("block");
    // expectValidColumnWidth(gxgColumn3, 188);
    expect((await gxgColumn3.getComputedStyle()).fontSize).toBe("16px");
    expect((await gxgColumn3.getComputedStyle()).fontFamily).toBe("arial");
  });

  //TEST SPACING BETWEEN COLUMNS

  it("has the right spacing", async () => {
    await page.waitForChanges();

    //xs
    expect((await gxgColumn1.getComputedStyle()).paddingLeft).toBe("4px");
    expect((await gxgColumn2.getComputedStyle()).paddingLeft).toBe("4px");
    expect((await gxgColumn3.getComputedStyle()).paddingLeft).toBe("4px");
    //"".columns-container" margin-left should be equal to ".column" margin-left, but negative
    expect((await gxgColumnsContainer.getComputedStyle()).marginLeft).toBe(
      "-4px"
    );

    //s
    gxgColumns.setProperty("space", "s");
    await page.waitForChanges();

    expect((await gxgColumn1.getComputedStyle()).paddingLeft).toBe("8px");
    expect((await gxgColumn2.getComputedStyle()).paddingLeft).toBe("8px");
    expect((await gxgColumn3.getComputedStyle()).paddingLeft).toBe("8px");
    //"".columns-container" margin-left should be equal to ".column" margin-left, but negative
    expect((await gxgColumnsContainer.getComputedStyle()).marginLeft).toBe(
      "-8px"
    );

    //m
    gxgColumns.setProperty("space", "m");
    await page.waitForChanges();
    expect((await gxgColumn1.getComputedStyle()).paddingLeft).toBe("16px");
    expect((await gxgColumn2.getComputedStyle()).paddingLeft).toBe("16px");
    expect((await gxgColumn3.getComputedStyle()).paddingLeft).toBe("16px");
    //"".columns-container" margin-left should be equal to ".column" margin-left, but negative
    expect((await gxgColumnsContainer.getComputedStyle()).marginLeft).toBe(
      "-16px"
    );
  });
});

describe("gxg-columns check column widths", () => {
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
    expect((await gxgColumn1.getComputedStyle()).flex).toBe("0 0 50%");
    expect((await gxgColumn2.getComputedStyle()).flex).toBe("0 0 33.3333%");
    expect((await gxgColumn3.getComputedStyle()).flex).toBe("0 0 25%");
    expect((await gxgColumn4.getComputedStyle()).flex).toBe("0 0 20%");
    expect((await gxgColumn5.getComputedStyle()).flex).toBe("0 0 66.6667%");
    expect((await gxgColumn6.getComputedStyle()).flex).toBe("0 0 40%");
    expect((await gxgColumn7.getComputedStyle()).flex).toBe("0 0 60%");
    expect((await gxgColumn8.getComputedStyle()).flex).toBe("0 0 80%");
  });

  // it("has the right width", async () => {
  //   await page.waitForChanges();

  //   //col 1
  //   expectValidColumnWidth(gxgColumn1, 252);
  //   //col 2
  //   expectValidColumnWidth(gxgColumn2, 168);
  //   //col 3
  //   expectValidColumnWidth(gxgColumn3, 126);
  //   //col 4
  //   expectValidColumnWidth(gxgColumn4, 100);
  //   //col 5
  //   expectValidColumnWidth(gxgColumn5, 336);
  //   //col 6
  //   expectValidColumnWidth(gxgColumn6, 201);
  //   //col 7
  //   expectValidColumnWidth(gxgColumn7, 302);
  //   //col 8
  //   expectValidColumnWidth(gxgColumn8, 403);
  // });
});

// describe("gxg-columns check column width content fluid", () => {
//   beforeEach(async () => {
//     page = await newE2EPage();

//     await page.setContent(`
//                 <div style="width:500px; font-size:16px;">
//                     <gxg-columns space="xs">
//                         <gxg-column width="content">Content</gxg-column>
//                         <gxg-column width="fluid">Fluid</gxg-column>
//                     </gxg-columns>
//                 </div>
//               `);
//     gxgColumn1 = await page.find("gxg-columns gxg-column:first-child");
//     gxgColumn2 = await page.find("gxg-columns gxg-column:nth-child(2)");
//   });

//   it("has the right width", async () => {
//     await page.waitForChanges();
//     //col 6
//     expectValidColumnWidth(gxgColumn2, 444);
//   });
// });
