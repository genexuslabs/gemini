# gxg-form-select

<h2>Notes</h2>
<ul>
   <li>Pass any number of options by using the <code>gxg-form-option</code> element</li>
   <li>Set the <code>value</code> attribute for each <code>gxg-form-option</code>, and provide the <code>selected</code> attribute for the option you want to be selected by default</li>
</ul>

<!-- Auto Generated Below -->

## Properties

| Property   | Attribute   | Description                                                                                                           | Type      | Default     |
| ---------- | ----------- | --------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `disabled` | `disabled`  | The presence of this attribute disables the component                                                                 | `boolean` | `false`     |
| `error`    | `error`     | The presence of this attribute stylizes the component with error attributes                                           | `boolean` | `false`     |
| `label`    | `label`     | The select label                                                                                                      | `string`  | `undefined` |
| `maxWidth` | `max-width` | The select max. width                                                                                                 | `string`  | `"100%"`    |
| `minimal`  | `minimal`   | The presence of this attribute hides the border, and sets the background to transparent when the element has no focus | `boolean` | `true`      |
| `name`     | `name`      | The select name                                                                                                       | `string`  | `undefined` |
| `required` | `required`  | The presence of this attribute makes this input required                                                              | `boolean` | `false`     |
| `selectId` | `select-id` | The select id                                                                                                         | `string`  | `undefined` |
| `size`     | `size`      | The maximum number of visible options                                                                                 | `string`  | `undefined` |
| `warning`  | `warning`   | The presence of this attribute stylizes the component with warning attributes                                         | `boolean` | `false`     |

## Events

| Event    | Description | Type               |
| -------- | ----------- | ------------------ |
| `change` |             | `CustomEvent<any>` |
| `input`  |             | `CustomEvent<any>` |

---

_Built with [StencilJS](https://stenciljs.com/)_
