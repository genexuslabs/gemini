# gxg-listbox

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute             | Description                                                                                                                                                    | Type                                                   | Default                                                                                                                                  |
| --------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `allowsEmpty`         | `allows-empty`        | The presence of this attribute allows the list-box to not have any list-box-item selected                                                                      | `boolean`                                              | `false`                                                                                                                                  |
| `checkboxes`          | `checkboxes`          | The presence of this attribute will display a checkbox for every item                                                                                          | `boolean`                                              | `false`                                                                                                                                  |
| `disableSuggestions`  | `disable-suggestions` | Disable suggestions about keyboard combinations                                                                                                                | `boolean`                                              | `false`                                                                                                                                  |
| `disabled`            | `disabled`            | The presence of this attribute makes the component disabled                                                                                                    | `boolean`                                              | `false`                                                                                                                                  |
| `height`              | `height`              | The list-box height                                                                                                                                            | `string`                                               | `"100%"`                                                                                                                                 |
| `informationMessage`  | `information-message` | An informative message to help the user filling the information                                                                                                | `string`                                               | `undefined`                                                                                                                              |
| `keyboardSuggestions` | --                    | An object with suggestions about the possible keyboard combinations                                                                                            | `{ checkCheckbox: string; uncheckCheckbox: string; }`  | `{ checkCheckbox: "to check a checkbox press (shift + space)", uncheckCheckbox: "to uncheck a checkbox press (shift + ctrl + space)", }` |
| `maxHeight`           | `max-height`          | The list-box max-height                                                                                                                                        | `string`                                               | `"100%"`                                                                                                                                 |
| `minHeight`           | `min-height`          | The list-box min-height                                                                                                                                        | `string`                                               | `"0"`                                                                                                                                    |
| `noBorder`            | `no-border`           | The presence of this attribute disables the border                                                                                                             | `boolean`                                              | `false`                                                                                                                                  |
| `required`            | `required`            | Make the radio-buttons required                                                                                                                                | `boolean`                                              | `false`                                                                                                                                  |
| `singleSelection`     | `single-selection`    | The presence of this attribute will deactivate multi-selection                                                                                                 | `boolean`                                              | `false`                                                                                                                                  |
| `theTitle`            | `the-title`           | The listbox title that appears on the header                                                                                                                   | `string`                                               | `""`                                                                                                                                     |
| `validationMessage`   | `validation-message`  | The required message if this input is required and no value is provided (optional). If this is not provided, the default browser required message will show up | `string`                                               | `undefined`                                                                                                                              |
| `validationStatus`    | `validation-status`   | The validation status                                                                                                                                          | `"error" \| "indeterminate" \| "success" \| "warning"` | `"indeterminate"`                                                                                                                        |

## Events

| Event              | Description                                                                                                                                                                                                                          | Type               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `checkedChanged`   |                                                                                                                                                                                                                                      | `CustomEvent<any>` |
| `selectionChanged` | This event emits the items that are currently selected. event.detail contains the selected items as objects. Each object contains the item idex and the item value. If value was not provided, the value will be the item innerText. | `CustomEvent<any>` |

## Methods

### `getSelectedItems() => Promise<ItemsInformation[]>`

---

METHODS

---

#### Returns

Type: `Promise<ItemsInformation[]>`

## Dependencies

### Depends on

- [gxg-button](../button)
- [gxg-form-message](../form-message)

### Graph

```mermaid
graph TD;
  gxg-list-box --> gxg-button
  gxg-list-box --> gxg-form-message
  gxg-button --> gxg-icon
  gxg-icon --> ch-icon
  gxg-form-message --> gxg-icon
  style gxg-list-box fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
