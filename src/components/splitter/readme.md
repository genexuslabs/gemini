# gxg-splitter

<h2>Notes</h2>
<ul>
   <li><strong style="color:red">Important notice:</strong> 'bidirectional' knob is only supported for two splits. If you need to use more than two splits use the 'simple' knob.</li>
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

| Property            | Attribute             | Description                                                                                                 | Type                          | Default           |
| ------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------- | ----------------- |
| `direction`         | `direction`           | The splitter direction                                                                                      | `"horizontal" \| "vertical"`  | `"horizontal"`    |
| `forceCollapseZero` | `force-collapse-zero` | The prescence of this attributes forces the splitter to collapse to zero                                    | `boolean`                     | `false`           |
| `knob`              | `knob`                | The type of knob (simple: only draggable - bidirectional: draggable and collapsable by clicking the arrows) | `"bidirectional" \| "simple"` | `"bidirectional"` |
| `minSize`           | `min-size`            | The splitter min. sizes in pixels                                                                           | `string`                      | `"0,0"`           |
| `sizes`             | `sizes`               | The splitter initial sizes, in percentages. The sum should equal 100                                        | `string`                      | `"50,50"`         |


## Events

| Event       | Description | Type               |
| ----------- | ----------- | ------------------ |
| `dragEnded` |             | `CustomEvent<any>` |
| `dragging`  |             | `CustomEvent<any>` |


## Methods

### `collapse(split: number, forceCollapseToZero?: boolean) => Promise<void>`

This method allows to collapse the split passsed as argument

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
