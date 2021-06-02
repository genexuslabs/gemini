```
<gxg-breadcrumbs id="breadcrumbs">
    <gxg-breadcrumb id="main-table" icon="objects/table">MainTable</gxg-breadcrumb>
    <gxg-breadcrumb id="grid" icon="objects/table">Grid</gxg-breadcrumb>
    <gxg-breadcrumb id="image" icon="objects/image">Image</gxg-breadcrumb>
</gxg-breadcrumbs>

<script>
    let breadcrumbs = document.getElementById("breadcrumbs");
    breadcrumbs.addEventListener("breadcrumbClicked", function(e){
    console.log(e.detail);
    })
</script>
```
