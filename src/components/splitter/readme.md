# gxg-splitter

<h2>Notes</h2>
<ul>
   <li>Give each <code>gxg-split</code> a unique id</li>
   <li><strong style="color:red">Important notice:</strong> The knob is only supported for two splits. If you need to use more than two splits do not use the knob.</li>
</ul>

<!-- Auto Generated Below -->

## Usage

### Usage

```
<gxg-splitter direction="vertical" sizes="25,75" min-size="50,300" knob="simple">
    <gxg-split></gxg-split>
    <gxg-split></gxg-split>
</gxg-splitter>
```

## Properties

| Property    | Attribute   | Description                                                          | Type                                            | Default        |
| ----------- | ----------- | -------------------------------------------------------------------- | ----------------------------------------------- | -------------- |
| `direction` | `direction` | The splitter direction test                                          | `"horizontal" \| "vertical"`                    | `"horizontal"` |
| `knob`      | `knob`      | The type of knob                                                     | `"bidirectional" \| "none" \| "unidirectional"` | `"none"`       |
| `minSize`   | `min-size`  | The splitter min. sizes in pixels                                    | `string`                                        | `"0,0"`        |
| `sizes`     | `sizes`     | The splitter initial sizes, in percentages. The sum should equal 100 | `string`                                        | `"50,50"`      |

## Events

| Event       | Description                                          | Type               |
| ----------- | ---------------------------------------------------- | ------------------ |
| `dragEnded` | This event is fired when the dragging has stopped    | `CustomEvent<any>` |
| `dragging`  | This event is fired when the gutter is being dragged | `CustomEvent<any>` |

## Methods

### `collapse(split: number) => Promise<void>`

This method allows to collapse the split passsed as argument

#### Returns

Type: `Promise<void>`

---

_Built with [StencilJS](https://stenciljs.com/)_