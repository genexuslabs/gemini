import { storiesOf } from "@storybook/html";
import readme from "./readme.md";
import {
  withKnobs,
  text,
  boolean,
  number,
  select,
  radios,
} from "@storybook/addon-knobs";

const stories = storiesOf("Navigation/Breadcrumbs", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("Breadcrumbs", () => {
  //FIRST BREADCRUMB

  //First Breadcrumb content
  const labelFirstBreadcrumbText = "First Breadcrumb content";
  const defaultValueFirstBreadcrumbText = "MainTable";
  const valueFirstBreadcrumbText = text(
    labelFirstBreadcrumbText,
    defaultValueFirstBreadcrumbText
  );

  //First Breadcrumb icon
  const labelFirstBreadcrumbIcon = "First Breadcrumb icon";
  const defaultValueFirstBreadcrumbIcon = "objects/table";
  const valueFirstBreadcrumbIcon = text(
    labelFirstBreadcrumbIcon,
    defaultValueFirstBreadcrumbIcon
  );

  //First Breadcrumb id
  const labelFirstBreadcrumbId = "First Breadcrumb id";
  const defaultValueFirstBreadcrumbId = "main-table";
  const valueFirstBreadcrumbId = text(
    labelFirstBreadcrumbId,
    defaultValueFirstBreadcrumbId
  );

  return `<gxg-breadcrumbs id="breadcrumbs">
  <gxg-breadcrumb id=${valueFirstBreadcrumbId} icon=${valueFirstBreadcrumbIcon}>${valueFirstBreadcrumbText}</gxg-breadcrumb>
  <gxg-breadcrumb id="grid" icon="objects/table">Grid</gxg-breadcrumb>
  <gxg-breadcrumb id="image" icon="objects/image">Image</gxg-breadcrumb>
</gxg-breadcrumbs>

<gxg-alert
id="alert"
type="notice"
position="center"
bottom="s"
title="CLICKED!"
active-time="fast">
First icon was clicked!
</gxg-alert>

<script>
  let breadcrumbs = document.getElementById("breadcrumbs");
  breadcrumbs.addEventListener("breadcrumbClicked", function(e){
    let breadcrumbId = e.detail;
    let alert = document.getElementById('alert');
    alert.title = "breadcrumb clicked!";
    alert.innerHTML = e.detail + " breadcrumb was clicked";
    document.getElementById('alert').setAttribute('active', 'true');
  })
</script>

`;
});
