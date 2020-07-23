# gxg-form-radio-group

<h2>Notes</h2>
<ul>
    <li>Wrap all the <code>gxg-form-radio</code> inputs with a <code>gxg-form-radio-group</code></li>
    <li>You can optionally set a title to the radio group, by providing a value to the <code>label</code> attribute</li>
</ul>

## Properties

| Property     | Attribute     | Description              | Type     | Default     |
| ------------ | ------------- | ------------------------ | -------- | ----------- |
| `RadioId`    | `radio-id`    | The selected radio id    | `string` | `undefined` |
| `RadioValue` | `radio-value` | The selected radio value | `string` | `undefined` |
| `label`      | `label`       | The radio group label    | `string` | `undefined` |

# gxg-form-radio

<!-- Auto Generated Below -->

## Properties

| Property   | Attribute  | Description                                                                 | Type      | Default     |
| ---------- | ---------- | --------------------------------------------------------------------------- | --------- | ----------- |
| `RadioId`  | `radio-id` | The radio id                                                                | `string`  | `undefined` |
| `checked`  | `checked`  | The presence of this attribute makes this radio selected by default         | `boolean` | `false`     |
| `disabled` | `disabled` | The presence of this attribute disables this radio                          | `boolean` | `false`     |
| `label`    | `label`    | The radio label                                                             | `string`  | `undefined` |
| `name`     | `name`     | The radio name (should be the same for every radio of the same radio-group) | `string`  | `undefined` |
| `value`    | `value`    | The radio value                                                             | `string`  | `undefined` |

## Events

| Event        | Description | Type               |
| ------------ | ----------- | ------------------ |
| `change`     |             | `CustomEvent<any>` |
| `keyPressed` |             | `CustomEvent<any>` |

---

_Built with [StencilJS](https://stenciljs.com/)_
