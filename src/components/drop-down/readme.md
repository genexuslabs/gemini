# gxg-drop-down

<h2>Notes</h2>
<ul>
  <li>For each item inside the <code>gxg-drop-down</code>, add a <code>data-value</code> with the corresponding value. This is what will be shown on the select input when you select the item.</li>
</ul>

<!-- Auto Generated Below -->

## Properties

| Property      | Attribute      | Description                   | Type      | Default   |
| ------------- | -------------- | ----------------------------- | --------- | --------- |
| `maxHeight`   | `max-height`   | the dropdown max. height      | `string`  | `"120px"` |
| `showContent` | `show-content` | Displays the dropdown content | `boolean` | `false`   |
| `width`       | `width`        | the dropdown width            | `string`  | `"240px"` |

## Events

| Event         | Description                                                                                    | Type               |
| ------------- | ---------------------------------------------------------------------------------------------- | ------------------ |
| `itemClicked` | This events gets fired when the user clicks on an item. The event emmits the item "data-value" | `CustomEvent<any>` |

---

_Built with [StencilJS](https://stenciljs.com/)_
