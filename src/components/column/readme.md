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
    <li>To create a row of columns, wrap the <code>gxg-column</code> components inside a <code>gxg-columns</code> component</li>
    <li>Set the spacing between the columns on the <code>gxg-columns</code> container, by setting a value to the <code>space</code> attribute</li>
    <li>To set vertical space between the columns, wrap them all with a <code>gxg-stack</code> component and set the space value</li>
    <li>Set <code>width</code> equal to <code>fluid</code> on a <code>column</code> component to make the column content span along the available width</li>
    <li>You can set the <em>padding</em> to an indivdual <code>gxg-column</code>, or to a row of columns by setting the padding value on the <code>gxg-columns</code> container</li>
</ul>

<!-- Auto Generated Below -->

## Properties

| Property  | Attribute | Description            | Type                                                                                                    | Default   |
| --------- | --------- | ---------------------- | ------------------------------------------------------------------------------------------------------- | --------- |
| `padding` | `padding` |                        | `"l" \| "m" \| "s" \| "xl" \| "xs" \| "xxl" \| "xxxl"`                                                  | `"xs"`    |
| `width`   | `width`   | The column width value | `"1/2" \| "1/3" \| "1/4" \| "1/5" \| "2/3" \| "2/5" \| "3/4" \| "3/5" \| "4/5" \| "content" \| "fluid"` | `"fluid"` |

---

_Built with [StencilJS](https://stenciljs.com/)_
