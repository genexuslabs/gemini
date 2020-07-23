# gxg-tabs

<h2>Implementing a gxg-tabs</h2>
<ol>
   <li>Insert a <code>gxg-tabs</code> element</li>
   <li>Inside the <code>gxg-tabs</code> insert a <code>gxg-tab-bar</code> element</li>
   <li> For each item: Insert inside the <code>gxg-tab-bar</code> a <code>gxg-tab-button</code> and provide the following properties: <code>slot="tab-bar"</code>, <code>tab-label={the tab label}</code>, <code>tab={the tab id}</code><br>Optionally, provide an icon by passing the name of the icon to the <code>icon</code> property.<br>Optionally, provide the <code>is-selected</code> atribute to one of the <code>gxg-tab-button</code> to set it selected by default.
   </li>
   <li>Provide for each of the <code>gxg-tab-button</code> inserted above, the corresponding <code>gxg-tab</code> as a child of the <code>gxg-tabs</code> element.</li>
   <li>Insert inside each of the <code>gxg-tab</code>'s the content you want to show when clicking the corresponding <code>gxg-tab-button</code></li>
</ol>

# gxg-tab-button

## Properties

| Property     | Attribute     | Description                                                                   | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Default |
| ------------ | ------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `disabled`   | `disabled`    | Provide this attribute to make this button disabled                           | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `false` |
| `icon`       | `icon`        | (Optional) provide an icon to this button                                     | `"error" \| "success" \| "warning" \| "none" \| "add" \| "add-circle" \| "arrow-down" \| "arrow-left" \| "arrow-right" \| "arrow-up" \| "chevron-down" \| "chevron-left" \| "chevron-right" \| "chevron-up" \| "close" \| "color-picker" \| "deleted" \| "drag" \| "duplicate" \| "edit-wand" \| "edit" \| "empty" \| "file" \| "folder" \| "level-down" \| "level-up" \| "minus" \| "minus-circle" \| "more-info" \| "reset" \| "search" \| "settings" \| "show-more-horizontal" \| "show-more-vertical"` | `null`  |
| `isSelected` | `is-selected` | Provide this attribute to make this button selected by default                | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `false` |
| `tab`        | `tab`         | The tab id. Should match the "tab" value of the correlative "gxg-tab" element | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `null`  |
| `tabLabel`   | `tab-label`   | The button label                                                              | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `null`  |

# gxg-tab

| Property | Attribute | Description                                                           | Type     | Default     |
| -------- | --------- | --------------------------------------------------------------------- | -------- | ----------- |
| `tab`    | `tab`     | The tab id. Should match the "tab" value of the correlative "gxg-tab" | `string` | `undefined` |

<!-- Auto Generated Below -->

---

_Built with [StencilJS](https://stenciljs.com/)_
