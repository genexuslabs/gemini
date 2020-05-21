import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

//ALERT MORE INFO
describe("gxg-alert-more-info", () => {
  let page: E2EPage;
  let alert: E2EElement;
  let alertMessage: E2EElement;
  let title: E2EElement;
  let message: E2EElement;
  let moreInfoIcon: E2EElement;
  let closeIcon: E2EElement;

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
    expect(moreInfoIcon).toEqualAttribute("color", "negative");
    expect(moreInfoIcon).toEqualAttribute("size", "regular");
    expect(moreInfoIcon).toEqualAttribute("type", "more-info");

    //more info icon
    expect(closeIcon).toEqualAttribute("aria-label", "close");
    expect(closeIcon).toEqualAttribute("color", "negative");
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
    expect((await alert.getComputedStyle()).transform).toBe("-50%");
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
  let page: E2EPage;
  let alert: E2EElement;
  let alertMessage: E2EElement;
  let title: E2EElement;
  let message: E2EElement;
  let moreInfoIcon: E2EElement;
  let closeIcon: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `
      function mostrarAlertError(alertId) {
        document.getElementById(alertId).setAttribute("active", "true");
      }
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
    <gxg-button id="show-more-info-alert-btn" onclick="mostrarAlertError('alert-more-info')">Show alert more info</gxg-button>
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
    expect(moreInfoIcon).toEqualAttribute("color", "negative");
    expect(moreInfoIcon).toEqualAttribute("size", "regular");
    expect(moreInfoIcon).toEqualAttribute("type", "more-info");

    //more info icon
    expect(closeIcon).toEqualAttribute("aria-label", "close");
    expect(closeIcon).toEqualAttribute("color", "negative");
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
});
