import { newSpecPage } from "@stencil/core/testing";
import { GxgMenuList } from "../gxg-menu-list";

describe("gxg-menu-list", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [GxgMenuList],
      html: `<gxg-menu-list></gxg-menu-list>`,
    });
    expect(page.root).toEqualHtml(`
      <gxg-menu-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gxg-menu-list>
    `);
  });
});
