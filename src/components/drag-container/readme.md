# gxg-drag-container

<h2>Notes</h2>
<ul>
   <li>To make the boxes draggable, wrap any number of <code>gxg-drag-box</code>'s inside an <code>gxg-drag-container</code></li>
   <li>Add the "deletable" atribute on the <code>drag-container</code> to add a "delete" button to all of the draggable boxes</li>
   <li>When "delete" button is pressed, the "deleted" event is emitted. It is the responsability of the developer to listen to this event and remove the <code>gxg-drag-box</code></li>
</ul>

<!-- Auto Generated Below -->

## Properties

| Property    | Attribute   | Description                                                                                                               | Type                                                          | Default     |
| ----------- | ----------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ----------- |
| `deletable` | `deletable` | The presence of this attribute adds a "delete" button to each gxg-drag-box. When pressed, the "deleted" event is emmited. | `boolean`                                                     | `false`     |
| `maxWidth`  | `max-width` | The max-width of the box container                                                                                        | `string`                                                      | `"100%"`    |
| `padding`   | `padding`   | The padding (internal spacing) of the gxg-drag-boxes                                                                      | `"0" \| "l" \| "m" \| "s" \| "xl" \| "xs" \| "xxl" \| "xxxl"` | `undefined` |

## Events

| Event           | Description | Type               |
| --------------- | ----------- | ------------------ |
| `itemDragEnter` |             | `CustomEvent<any>` |
| `itemDragLeave` |             | `CustomEvent<any>` |
| `itemDragOver`  |             | `CustomEvent<any>` |
| `itemDragStart` |             | `CustomEvent<any>` |
| `itemDrop`      |             | `CustomEvent<any>` |

---

_Built with [StencilJS](https://stenciljs.com/)_
