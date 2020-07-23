# gxg-form-select

<h2>Notes</h2>
<ul>
   <li>Pass any number of options by using the <code>gxg-form-option</code> element</li>
   <li>Set the <code>value</code> attribute for each <code>gxg-form-option</code>, and provide the <code>selected</code> attribute for the option you want to be selected by default</li>
</ul>

<!-- Auto Generated Below -->

## Properties

| Property     | Attribute    | Description                                                                               | Type      | Default     |
| ------------ | ------------ | ----------------------------------------------------------------------------------------- | --------- | ----------- |
| `borderless` | `borderless` | Is this attribute is present, the border and the background will only be visible on focus | `boolean` | `undefined` |
| `disabled`   | `disabled`   | The presence of this attribute disables the component                                     | `boolean` | `false`     |
| `error`      | `error`      | The presence of this attribute stylizes the component with error attributes               | `boolean` | `false`     |
| `label`      | `label`      | The select label                                                                          | `string`  | `undefined` |
| `maxWidth`   | `max-width`  | The select max. width                                                                     | `string`  | `"100%"`    |
| `name`       | `name`       | The select name                                                                           | `string`  | `undefined` |
| `selectId`   | `select-id`  | The select id                                                                             | `string`  | `undefined` |
| `size`       | `size`       | The maximum number of visible options                                                     | `string`  | `undefined` |
| `warning`    | `warning`    | The presence of this attribute stylizes the component with warning attributes             | `boolean` | `false`     |

## Events

| Event    | Description | Type               |
| -------- | ----------- | ------------------ |
| `change` |             | `CustomEvent<any>` |
| `input`  |             | `CustomEvent<any>` |

---

_Built with [StencilJS](https://stenciljs.com/)_
