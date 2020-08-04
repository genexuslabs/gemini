# gxg-spacer-layout

<h2>Notes</h2>
<ul>
   <li>The purpose of the <code>gxg-spacer-layout</code> is to provide spacing between a set of random components. By wrapping the components within a <code>gxg-spacer-layout</code> and setting the <code>space</code>, <code>orientation</code> and <code>justify-content</code> properties, you can create different configurations of spacing, orientation, justification</li>
</ul>
<ol>
   <li>Wrapp the elements insisde a <code>gxg-spacer-layout</code></li>
   <li>Set the desired spacing by providing a value to the <code>space</code> property on the <code>gxg-spacer-layout</code></li>
   <li>Set the desired orientation (horizontal or vertical)</li>
   <li>Set the desired content justification by providing one of the possible values to the <code>justify-content</code> property</li>
</ol>

<!-- Auto Generated Below -->

## Properties

| Property         | Attribute         | Description                                                     | Type      | Default        |
| ---------------- | ----------------- | --------------------------------------------------------------- | --------- | -------------- |
| `fullHeight`     | `full-height`     | Add this attribute to make the spacer-layout full height        | `boolean` | `false`        |
| `justifyContent` | `justify-content` | Content justify                                                 | `string`  | `"flex-start"` |
| `orientation`    | `orientation`     | The orientation                                                 | `string`  | `"horizontal"` |
| `space`          | `space`           | The spacing value, taken from the "token-spacing" global values | `string`  | `undefined`    |

---

_Built with [StencilJS](https://stenciljs.com/)_
