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

| Property            | Attribute             | Description                                                          | Type                          | Default        |
| ------------------- | --------------------- | -------------------------------------------------------------------- | ----------------------------- | -------------- |
| `direction`         | `direction`           | The splitter direction                                               | `"horizontal" \| "vertical"`  | `"horizontal"` |
| `forceCollapseZero` | `force-collapse-zero` | The splitter direction                                               | `boolean`                     | `false`        |
| `knob`              | `knob`                | The type of knob                                                     | `"bidirectional" \| "simple"` | `"simple"`     |
| `minSize`           | `min-size`            | The splitter min. sizes in pixels                                    | `string`                      | `"0,0"`        |
| `sizes`             | `sizes`               | The splitter initial sizes, in percentages. The sum should equal 100 | `string`                      | `"50,50"`      |

## Methods

### `collapse(split: number, forceCollapseToZero?: boolean) => Promise<void>`

This method allows to collapse the split passsed as argument

#### Returns

Type: `Promise<void>`

---

_Built with [StencilJS](https://stenciljs.com/)_
