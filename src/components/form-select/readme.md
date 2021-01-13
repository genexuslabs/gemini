# gxg-option

## Properties

| Property   | Attribute  | Description                                                         | Type      | Default     |
| ---------- | ---------- | ------------------------------------------------------------------- | --------- | ----------- |
| `selected` | `selected` | The presence of this attribute makes the option selected by default | `boolean` | `undefined` |
| `value`    | `value`    | The value                                                           | `string`  | `undefined` |

# gxg-form-select

<h2>Using a gxg-select</h2>
<ol>
   <li>Insert a <code>gxg-select</code> element</li>
   <li>Insert insde the <code>gxg-select</code>, any number of options by using the <code>gxg-form-option</code> element</li>
   <li>Set the <code>value</code> attribute for each <code>gxg-option</code>, and provide the <code>selected</code> attribute for the option you want to be selected by default</li>
</ol>

<!-- Auto Generated Below -->

## Properties

| Property        | Attribute        | Description                                                                                                           | Type                 | Default     |
| --------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `disabled`      | `disabled`       | The presence of this attribute disables the component                                                                 | `boolean`            | `false`     |
| `error`         | `error`          | The presence of this attribute stylizes the component with error attributes                                           | `boolean`            | `false`     |
| `label`         | `label`          | The select label                                                                                                      | `string`             | `undefined` |
| `labelPosition` | `label-position` | The input label                                                                                                       | `"above" \| "start"` | `"above"`   |
| `maxWidth`      | `max-width`      | The select max. width                                                                                                 | `string`             | `"100%"`    |
| `minimal`       | `minimal`        | The presence of this attribute hides the border, and sets the background to transparent when the element has no focus | `boolean`            | `true`      |
| `required`      | `required`       | The presence of this attribute makes this input required                                                              | `boolean`            | `false`     |
| `size`          | `size`           | The maximum number of visible options                                                                                 | `string`             | `undefined` |
| `value`         | `value`          | This holds the value of the selected option                                                                           | `string`             | `undefined` |
| `warning`       | `warning`        | The presence of this attribute stylizes the component with warning attributes                                         | `boolean`            | `false`     |

## Events

| Event    | Description                              | Type               |
| -------- | ---------------------------------------- | ------------------ |
| `change` | Returns the value of the selected option | `CustomEvent<any>` |

---

_Built with [StencilJS](https://stenciljs.com/)_
