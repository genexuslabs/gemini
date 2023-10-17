# gxg-columns (the container)

## Properties

| Property         | Attribute         | Description                 | Type                            | Default     |
| ---------------- | ----------------- | --------------------------- | ------------------------------- | ----------- |
| `alignY`         | `align-y`         | The vertical alignment      | `"bottom" \| "center" \| "top"` | `"top"`     |
| `collapseBellow` | `collapse-bellow` | The collapse breakpoint     | `"lg"`                          | `undefined` |
| `space`          | `space`           | The spacing between columns | `"m" \| "none" \| "s" \| "xs"`  | `"none"`    |

# gxg-column (the child)

<h2>Notes:</h2>
<ul>
    <li>To create a row of columns, wrap the <code>gxg-column</code>'s inside a <code>gxg-columns</code> container</li>
    <li>Set the spacing between the columns on the <code>gxg-columns</code> container, by setting one of the available values of the <code>space</code> attribute</li>
    <li>To set vertical space between <code>gxg-columns</code> wrap them all with a <code><a href="/story/stack--stack" target="_blank">gxg-stack</a></code> element and set one the available <code>space</code> values</li>
    <li>Set <code>width</code> equal to <code>fluid</code> on a <code>gxg-column</code> to make the column content span along the available width</li>
    <li>To set the spacing between the columns, set one of the available values on the <code>space</code> attribute on the <code>gxg-columns</code> component</li>
</ul>

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description            | Type                                                                                                    | Default   |
| -------- | --------- | ---------------------- | ------------------------------------------------------------------------------------------------------- | --------- |
| `width`  | `width`   | The column width value | `"1/2" \| "1/3" \| "1/4" \| "1/5" \| "2/3" \| "2/5" \| "3/4" \| "3/5" \| "4/5" \| "content" \| "fluid"` | `"fluid"` |


## Shadow Parts

| Part                | Description |
| ------------------- | ----------- |
| `"inner-container"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
