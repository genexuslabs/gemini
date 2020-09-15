import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";
import { Alert } from "./alert";

let page: E2EPage;
let alert: E2EElement;
let alertMessage: E2EElement;
let title: E2EElement;
let message: E2EElement;
let moreInfoIcon: E2EElement;
let closeIcon: E2EElement;

//ALERT MORE INFO
describe("gxg-alert-notice", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `
      <gxg-alert
      id="alert-notice"
      type="notice"
      position="center"
      alert-title="more info title"
      active-time="xxslow"
    >This is the content of the notice alert</gxg-alert>
    `
    );

    alert = await page.find("gxg-alert");
    alertMessage = await page.find("gxg-alert >>> .alert-message");
    title = await page.find("gxg-alert >>> .alert-message--title");
    message = await page.find("gxg-alert >>> .alert-message--description");
    moreInfoIcon = await page.find(
      "gxg-alert >>> gxg-icon[type='general/notice']"
    );
    closeIcon = await page.find("gxg-alert >>> gxg-icon[type='general/close']");
  });

  it("has the right classes", async () => {
    expect(alertMessage).toHaveClass("alert-message--notice");
    expect(title).toHaveClass("alert-message--title");
    expect(message).toHaveClass("alert-message--description");
  });

  it("has the right attributes", async () => {
    //more info icon
    expect(moreInfoIcon).toEqualAttribute("aria-label", "general/notice");
    expect(moreInfoIcon).toEqualAttribute("size", "regular");
    expect(moreInfoIcon).toEqualAttribute("type", "general/notice");
  });

  it("displays text", async () => {
    await page.waitForChanges();
    expect(title.textContent).toBe("more info title");
    expect(alert.textContent).toBe("This is the content of the notice alert");
  });

  it("has the right inline styles", async () => {
    await page.waitForChanges();
    // expect((await alert.getComputedStyle()).transform).toBe(
    //   "matrix(1, 0, 0, 1, -175, 62)"
    // );
    //Can´t do the preceding test, since the last value is different each time I run the test.
    expect(alert.textContent).toBe("This is the content of the notice alert");
  });

  it("shows the alertbox", async () => {
    alert.setAttribute("active", true);
    await page.waitForChanges();
    expect(await alert.isIntersectingViewport()).toBe(true);
  });
});

//ALERT ERROR
describe("gxg-alert-error", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `
      <gxg-alert
      id="alert-error"
      type="error"
      position="center"
      alert-title="error title"
      active-time="xxslow"
    >This is the content of the error alert</gxg-alert>
    `
    );

    alert = await page.find("gxg-alert");
    alertMessage = await page.find("gxg-alert >>> .alert-message");
    title = await page.find("gxg-alert >>> .alert-message--title");
    message = await page.find("gxg-alert >>> .alert-message--description");
    moreInfoIcon = await page.find(
      "gxg-alert >>> gxg-icon[type='general/error']"
    );
    closeIcon = await page.find("gxg-alert >>> gxg-icon[type='close']");
  });

  it("has the right classes", async () => {
    expect(alertMessage).toHaveClass("alert-message--error");
    expect(title).toHaveClass("alert-message--title");
    expect(message).toHaveClass("alert-message--description");
  });

  it("has the right attributes", async () => {
    //more info icon
    expect(moreInfoIcon).toEqualAttribute("aria-label", "general/error");
    expect(moreInfoIcon).toEqualAttribute("size", "regular");
    expect(moreInfoIcon).toEqualAttribute("type", "general/error");
  });

  it("displays text", async () => {
    await page.waitForChanges();
    expect(title.textContent).toBe("error title");
    expect(alert.textContent).toBe("This is the content of the error alert");
  });
});

//ALERT SUCCESS
describe("gxg-alert-success", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-alert
          id="alert-success"
          type="success"
          position="center"
          alert-title="success title"
          active-time="xxslow"
          >This is the content of the success alert</gxg-alert>`
    );

    alert = await page.find("gxg-alert");
    alertMessage = await page.find("gxg-alert >>> .alert-message");
    title = await page.find("gxg-alert >>> .alert-message--title");
    message = await page.find("gxg-alert >>> .alert-message--description");
    moreInfoIcon = await page.find(
      "gxg-alert >>> gxg-icon[type='general/success']"
    );
    closeIcon = await page.find("gxg-alert >>> gxg-icon[type='close']");
  });

  it("has the right classes", async () => {
    expect(alertMessage).toHaveClass("alert-message--success");
    expect(title).toHaveClass("alert-message--title");
    expect(message).toHaveClass("alert-message--description");
  });

  it("has the right attributes", async () => {
    //more info icon
    expect(moreInfoIcon).toEqualAttribute("aria-label", "general/success");
    expect(moreInfoIcon).toEqualAttribute("size", "regular");
    expect(moreInfoIcon).toEqualAttribute("type", "general/success");
  });

  it("displays text", async () => {
    await page.waitForChanges();
    expect(title.textContent).toBe("success title");
    expect(alert.textContent).toBe("This is the content of the success alert");
  });
});

//ALERT WARNING
describe("gxg-alert-warning", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-alert
          id="alert-warning"
          type="warning"
          position="center"
          alert-title="warning title"
          active-time="xxslow"
          >This is the content of the warning alert</gxg-alert>`
    );

    alert = await page.find("gxg-alert");
    alertMessage = await page.find("gxg-alert >>> .alert-message");
    title = await page.find("gxg-alert >>> .alert-message--title");
    message = await page.find("gxg-alert >>> .alert-message--description");
    moreInfoIcon = await page.find(
      "gxg-alert >>> gxg-icon[type='general/warning']"
    );
    closeIcon = await page.find("gxg-alert >>> gxg-icon[type='close']");
  });

  it("has the right classes", async () => {
    expect(alertMessage).toHaveClass("alert-message--warning");
    expect(title).toHaveClass("alert-message--title");
    expect(message).toHaveClass("alert-message--description");
  });

  it("has the right attributes", async () => {
    //more info icon
    expect(moreInfoIcon).toEqualAttribute("aria-label", "general/warning");
    expect(moreInfoIcon).toEqualAttribute("size", "regular");
    expect(moreInfoIcon).toEqualAttribute("type", "general/warning");
  });

  it("displays text", async () => {
    await page.waitForChanges();
    expect(title.textContent).toBe("warning title");
    expect(alert.textContent).toBe("This is the content of the warning alert");
  });
});

describe("gxg-alert position left", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-alert
          id="alert-warning"
          type="warning"
          position="left"
          left-right="s"
          bottom="s"
          alert-title="warning title"
          active-time="xxslow"
          >This is the content of the warning alert</gxg-alert>`
    );

    alert = await page.find("gxg-alert");
  });

  it("has the right styles", async () => {
    expect((await alert.getComputedStyle()).left).toBe("8px");
  });
});

describe("gxg-alert position right", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-alert
          id="alert-warning"
          type="warning"
          position="right"
          left-right="s"
          bottom="s"
          alert-title="warning title"
          active-time="xxslow"
          >This is the content of the warning alert</gxg-alert>`
    );

    alert = await page.find("gxg-alert");
  });

  it("has the right styles", async () => {
    expect((await alert.getComputedStyle()).right).toBe("8px");
    expect((await alert.getComputedStyle()).left).toBe("442px"); //testing page width is 800px
  });
});

describe("gxg-alert spacings left-right", () => {
  let alert2: E2EElement;
  let alert3: E2EElement;
  let alert4: E2EElement;
  let alert5: E2EElement;
  let alert6: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(
      `
      <gxg-alert id="alert-01" type="warning" left-right="no-space">Content</gxg-alert>
      <gxg-alert id="alert-02" type="warning" left-right="xs">Content</gxg-alert>
      <gxg-alert id="alert-03" type="warning" left-right="s">Content</gxg-alert>
      <gxg-alert id="alert-04" type="warning" left-right="m">Content</gxg-alert>
      <gxg-alert id="alert-05" type="warning" left-right="l">Content</gxg-alert>
      <gxg-alert id="alert-06" type="warning" left-right="xl">Content</gxg-alert>
      `
    );

    alert = await page.find("gxg-alert#alert-01");
    alert2 = await page.find("gxg-alert#alert-02");
    alert3 = await page.find("gxg-alert#alert-03");
    alert4 = await page.find("gxg-alert#alert-04");
    alert5 = await page.find("gxg-alert#alert-05");
    alert6 = await page.find("gxg-alert#alert-06");
  });

  //0
  it("has the right spacing value", async () => {
    expect((await alert.getComputedStyle()).left).toBe("0px");
    expect((await alert.getComputedStyle()).right).toBe("0px");
  });

  //xs
  it("has the right spacing value", async () => {
    expect((await alert2.getComputedStyle()).left).toBe("4px");
    expect((await alert2.getComputedStyle()).right).toBe("4px");
  });

  //s
  it("has the right spacing value", async () => {
    expect((await alert3.getComputedStyle()).left).toBe("8px");
    expect((await alert3.getComputedStyle()).right).toBe("8px");
  });

  //m
  it("has the right spacing value", async () => {
    expect((await alert4.getComputedStyle()).left).toBe("16px");
    expect((await alert4.getComputedStyle()).right).toBe("16px");
  });

  //l
  it("has the right spacing value", async () => {
    expect((await alert5.getComputedStyle()).left).toBe("32px");
    expect((await alert5.getComputedStyle()).right).toBe("32px");
  });

  //xl
  it("has the right spacing value", async () => {
    expect((await alert6.getComputedStyle()).left).toBe("64px");
    expect((await alert6.getComputedStyle()).right).toBe("64px");
  });
});

describe("gxg-alert spacings bottom", () => {
  let alert2: E2EElement;
  let alert3: E2EElement;
  let alert4: E2EElement;
  let alert5: E2EElement;
  let alert6: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `
      <gxg-alert id="alert-01" type="warning" bottom="0">Content</gxg-alert>
      <gxg-alert id="alert-02" type="warning" bottom="xs">Content</gxg-alert>
      <gxg-alert id="alert-03" type="warning" bottom="s">Content</gxg-alert>
      <gxg-alert id="alert-04" type="warning" bottom="m">Content</gxg-alert>
      <gxg-alert id="alert-05" type="warning" bottom="l">Content</gxg-alert>
      <gxg-alert id="alert-06" type="warning" bottom="xl">Content</gxg-alert>
      `
    );

    alert = await page.find("gxg-alert#alert-01");
    alert2 = await page.find("gxg-alert#alert-02");
    alert3 = await page.find("gxg-alert#alert-03");
    alert4 = await page.find("gxg-alert#alert-04");
    alert5 = await page.find("gxg-alert#alert-05");
    alert6 = await page.find("gxg-alert#alert-06");
  });

  //0
  it("has the right spacing value", async () => {
    expect((await alert.getComputedStyle()).bottom).toBe("0px");
  });

  //xs
  it("has the right spacing value", async () => {
    alert2.setProperty("active", true);
    await page.waitForChanges();
    await page.waitForChanges();
    expect((await alert2.getComputedStyle()).transform).toBe(
      "matrix(1, 0, 0, 1, 0, -4)"
    );
  });

  //s
  it("has the right spacing value", async () => {
    alert3.setProperty("active", true);
    await page.waitForChanges();
    await page.waitForChanges();
    expect((await alert3.getComputedStyle()).transform).toBe(
      "matrix(1, 0, 0, 1, 0, -8)"
    );
  });

  //m
  it("has the right spacing value", async () => {
    alert4.setProperty("active", true);
    await page.waitForChanges();
    await page.waitForChanges();
    expect((await alert4.getComputedStyle()).transform).toBe(
      "matrix(1, 0, 0, 1, 0, -16)"
    );
  });

  //l
  it("has the right spacing value", async () => {
    alert5.setProperty("active", true);
    await page.waitForChanges();
    await page.waitForChanges();
    expect((await alert5.getComputedStyle()).transform).toBe(
      "matrix(1, 0, 0, 1, 0, -32)"
    );
  });

  //xl
  it("has the right spacing value", async () => {
    alert6.setProperty("active", true);
    await page.waitForChanges();
    await page.waitForChanges();
    expect((await alert6.getComputedStyle()).transform).toBe(
      "matrix(1, 0, 0, 1, 0, -64)"
    );
  });
});
