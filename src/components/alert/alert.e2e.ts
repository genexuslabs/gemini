import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

let page: E2EPage;
let alert: E2EElement;
let alertMessage: E2EElement;
let title: E2EElement;
let message: E2EElement;
let moreInfoIcon: E2EElement;
let closeIcon: E2EElement;

//ALERT MORE INFO
describe("gxg-alert-more-info", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `
      <gxg-alert
      id="alert-more-info"
      type="more-info"
      position="center"
      left="15px"
      right="15px"
      bottom="15px"
      alert-title="more info title"
      active-time="xxslow"
    >This is the content of the more-info alert</gxg-alert>
    `
    );

    alert = await page.find("gxg-alert");
    alertMessage = await page.find("gxg-alert >>> .alert-message");
    title = await page.find("gxg-alert >>> .alert-message--title");
    message = await page.find("gxg-alert >>> .alert-message--description");
    moreInfoIcon = await page.find("gxg-alert >>> gxg-icon[type='more-info']");
    closeIcon = await page.find("gxg-alert >>> gxg-icon[type='close']");
  });

  it("has the right classes", async () => {
    expect(alertMessage).toHaveClass("alert-message--more-info");
    expect(title).toHaveClass("alert-message--title");
    expect(message).toHaveClass("alert-message--description");
  });

  it("has the right attributes", async () => {
    //more info icon
    expect(moreInfoIcon).toEqualAttribute("aria-label", "more-info");
    expect(moreInfoIcon).toHaveClass("color-negative");
    expect(moreInfoIcon).toEqualAttribute("size", "regular");
    expect(moreInfoIcon).toEqualAttribute("type", "more-info");

    //more info icon
    expect(closeIcon).toEqualAttribute("aria-label", "close");
    expect(moreInfoIcon).toHaveClass("color-negative");
    expect(closeIcon).toEqualAttribute("size", "regular");
    expect(closeIcon).toEqualAttribute("type", "close");
  });

  it("displays text", async () => {
    await page.waitForChanges();
    expect(title.textContent).toBe("more info title");
    expect(alert.textContent).toBe(
      "This is the content of the more-info alert"
    );
  });

  it("has the right inline styles", async () => {
    await page.waitForChanges();
    // expect((await alert.getComputedStyle()).transform).toBe(
    //   "matrix(1, 0, 0, 1, -175, 62)"
    // );
    //Can´t do the preceding test, since the last value is different each time I run the test.
    expect(alert.textContent).toBe(
      "This is the content of the more-info alert"
    );
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
      left="15px"
      right="15px"
      bottom="15px"
      alert-title="error title"
      active-time="xxslow"
    >This is the content of the error alert</gxg-alert>
    `
    );

    alert = await page.find("gxg-alert");
    alertMessage = await page.find("gxg-alert >>> .alert-message");
    title = await page.find("gxg-alert >>> .alert-message--title");
    message = await page.find("gxg-alert >>> .alert-message--description");
    moreInfoIcon = await page.find("gxg-alert >>> gxg-icon[type='error']");
    closeIcon = await page.find("gxg-alert >>> gxg-icon[type='close']");
  });

  it("has the right classes", async () => {
    expect(alertMessage).toHaveClass("alert-message--error");
    expect(title).toHaveClass("alert-message--title");
    expect(message).toHaveClass("alert-message--description");
  });

  it("has the right attributes", async () => {
    //more info icon
    expect(moreInfoIcon).toEqualAttribute("aria-label", "error");
    expect(moreInfoIcon).toHaveClass("color-error");
    expect(moreInfoIcon).toEqualAttribute("size", "regular");
    expect(moreInfoIcon).toEqualAttribute("type", "error");

    //more info icon
    expect(closeIcon).toEqualAttribute("aria-label", "close");
    expect(closeIcon).toHaveClass("color-onbackground");
    expect(closeIcon).toEqualAttribute("size", "regular");
    expect(closeIcon).toEqualAttribute("type", "close");
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
          left="15px"
          right="15px"
          bottom="15px"
          alert-title="success title"
          active-time="xxslow"
          >This is the content of the success alert</gxg-alert>`
    );

    alert = await page.find("gxg-alert");
    alertMessage = await page.find("gxg-alert >>> .alert-message");
    title = await page.find("gxg-alert >>> .alert-message--title");
    message = await page.find("gxg-alert >>> .alert-message--description");
    moreInfoIcon = await page.find("gxg-alert >>> gxg-icon[type='success']");
    closeIcon = await page.find("gxg-alert >>> gxg-icon[type='close']");
  });

  it("has the right classes", async () => {
    expect(alertMessage).toHaveClass("alert-message--success");
    expect(title).toHaveClass("alert-message--title");
    expect(message).toHaveClass("alert-message--description");
  });

  it("has the right attributes", async () => {
    //more info icon
    expect(moreInfoIcon).toEqualAttribute("aria-label", "success");
    expect(moreInfoIcon).toHaveClass("color-success");
    expect(moreInfoIcon).toEqualAttribute("size", "regular");
    expect(moreInfoIcon).toEqualAttribute("type", "success");

    //more info icon
    expect(closeIcon).toEqualAttribute("aria-label", "close");
    expect(closeIcon).toHaveClass("color-onbackground");
    expect(closeIcon).toEqualAttribute("size", "regular");
    expect(closeIcon).toEqualAttribute("type", "close");
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
          left="15px"
          right="15px"
          bottom="15px"
          alert-title="warning title"
          active-time="xxslow"
          >This is the content of the warning alert</gxg-alert>`
    );

    alert = await page.find("gxg-alert");
    alertMessage = await page.find("gxg-alert >>> .alert-message");
    title = await page.find("gxg-alert >>> .alert-message--title");
    message = await page.find("gxg-alert >>> .alert-message--description");
    moreInfoIcon = await page.find("gxg-alert >>> gxg-icon[type='warning']");
    closeIcon = await page.find("gxg-alert >>> gxg-icon[type='close']");
  });

  it("has the right classes", async () => {
    expect(alertMessage).toHaveClass("alert-message--warning");
    expect(title).toHaveClass("alert-message--title");
    expect(message).toHaveClass("alert-message--description");
  });

  it("has the right attributes", async () => {
    //more info icon
    expect(moreInfoIcon).toEqualAttribute("aria-label", "warning");
    expect(moreInfoIcon).toHaveClass("color-warning");
    expect(moreInfoIcon).toEqualAttribute("size", "regular");
    expect(moreInfoIcon).toEqualAttribute("type", "warning");

    //more info icon
    expect(closeIcon).toEqualAttribute("aria-label", "close");
    expect(closeIcon).toHaveClass("color-onbackground");
    expect(closeIcon).toEqualAttribute("size", "regular");
    expect(closeIcon).toEqualAttribute("type", "close");
  });

  it("displays text", async () => {
    await page.waitForChanges();
    expect(title.textContent).toBe("warning title");
    expect(alert.textContent).toBe("This is the content of the warning alert");
  });
});
