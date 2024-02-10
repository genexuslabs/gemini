# gxg-listbox

<!-- Auto Generated Below -->


## Properties

| Property              | Attribute              | Description                                                                                                                                                    | Type                                                   | Default                                                                                                                                           |
| --------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allowsEmpty`         | `allows-empty`         | The presence of this attribute allows the list-box to not have any list-box-item selected                                                                      | `boolean`                                              | `false`                                                                                                                                           |
| `borderBottom`        | `border-bottom`        | The presence of this attribute adds a border to the bottom                                                                                                     | `boolean`                                              | `false`                                                                                                                                           |
| `borderEnd`           | `border-end`           | The presence of this attribute adds a border to the end                                                                                                        | `boolean`                                              | `false`                                                                                                                                           |
| `borderStart`         | `border-start`         | The presence of this attribute adds a border to the start                                                                                                      | `boolean`                                              | `false`                                                                                                                                           |
| `borderTop`           | `border-top`           | The presence of this attribute adds a border to the top                                                                                                        | `boolean`                                              | `false`                                                                                                                                           |
| `checkboxes`          | `checkboxes`           | The presence of this attribute will display a checkbox for every item                                                                                          | `boolean`                                              | `false`                                                                                                                                           |
| `disableSuggestions`  | `disable-suggestions`  | Disable suggestions about keyboard combinations                                                                                                                | `boolean`                                              | `false`                                                                                                                                           |
| `disabled`            | `disabled`             | The presence of this attribute makes the component disabled                                                                                                    | `boolean`                                              | `false`                                                                                                                                           |
| `emitEmptySelection`  | `emit-empty-selection` | The presence of this attribute prevents 'selectionChanged' event from being emitted if the selection is empty.                                                 | `boolean`                                              | `false`                                                                                                                                           |
| `informationMessage`  | `information-message`  | An informative message to help the user filling the information                                                                                                | `string`                                               | `undefined`                                                                                                                                       |
| `keyboardSuggestions` | --                     | An object with suggestions about the possible keyboard combinations                                                                                            | `{ checkCheckbox: string; uncheckCheckbox: string; }`  | `{     checkCheckbox: "to check a checkbox press (shift + space)",     uncheckCheckbox: "to uncheck a checkbox press (shift + ctrl + space)"   }` |
| `noBorder`            | `no-border`            | The presence of this attribute disables the border all around                                                                                                  | `boolean`                                              | `false`                                                                                                                                           |
| `required`            | `required`             | Make the radio-buttons required                                                                                                                                | `boolean`                                              | `false`                                                                                                                                           |
| `singleSelection`     | `single-selection`     | The presence of this attribute will deactivate multi-selection                                                                                                 | `boolean`                                              | `false`                                                                                                                                           |
| `theTitle`            | `the-title`            | The listbox title that appears on the header                                                                                                                   | `string`                                               | `undefined`                                                                                                                                       |
| `validationMessage`   | `validation-message`   | The required message if this input is required and no value is provided (optional). If this is not provided, the default browser required message will show up | `string`                                               | `undefined`                                                                                                                                       |
| `validationStatus`    | `validation-status`    | The validation status                                                                                                                                          | `"error" \| "indeterminate" \| "success" \| "warning"` | `"indeterminate"`                                                                                                                                 |


## Events

| Event              | Description                                                                                                                                                                                                                          | Type                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| `checkedChanged`   |                                                                                                                                                                                                                                      | `CustomEvent<any>`                            |
| `selectionChanged` | This event emits the items that are currently selected. event.detail contains the selected items as objects. Each object contains the item idex and the item value. If value was not provided, the value will be the item innerText. | `CustomEvent<{ items: ItemsInformation[]; }>` |


## Methods

### `getSelectedItems() => Promise<ItemsInformation[]>`

*******************************
METHODS
*******************************

#### Returns

Type: `Promise<ItemsInformation[]>`




## Dependencies

### Depends on

- [gxg-button](../button)
- [gxg-form-message](../form-message)
- [gxg-tooltip](../tooltip)
- [gxg-icon](../icon)

### Graph
```mermaid
graph TD;
  gxg-list-box --> gxg-button
  gxg-list-box --> gxg-form-message
  gxg-list-box --> gxg-tooltip
  gxg-list-box --> gxg-icon
  gxg-button --> gxg-icon
  gxg-icon --> ch-icon
  gxg-form-message --> gxg-icon
  style gxg-list-box fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
