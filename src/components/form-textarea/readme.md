# gxg-form-textarea

<!-- Auto Generated Below -->

## Usage

### Usage

```
<gxg-form-textarea
id="gxg-textarea"
max-width="240px"
label="Describe your experience"
placeholder="I have experience as a.."
rows="4">
</gxg-form-textarea>
<br>
<gxg-button id="btn-show-errors">Show errors</gxg-button>

<script>
//Display error message
const btnShowErrors = document.getElementById("btn-show-errors");
btnShowErrors.addEventListener("click", function(){
    const gxgFormTextArea = document.getElementById("gxg-textarea");
    const gxgFormMessage = document.createElement("gxg-form-message");
    gxgFormMessage.innerHTML = "Please, describe your experience";
    gxgFormMessage.setAttribute("type", "error");
    gxgFormMessage.setAttribute("slot", "message");
    gxgFormTextArea.setAttribute("error",true);
    gxgFormTextArea.appendChild(gxgFormMessage);
});
</script>
```

## Properties

| Property                   | Attribute                    | Description                                                                                                                                                    | Type                                                   | Default     |
| -------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------- |
| `disabled`                 | `disabled`                   | The presence of this attribute makes the component disabled                                                                                                    | `boolean`                                              | `false`     |
| `displayValidationMessage` | `display-validation-message` | The presence of this attribute will display validation styles, such as a red, orange, or green border dependening on the validation status                     | `boolean`                                              | `false`     |
| `displayValidationStyles`  | `display-validation-styles`  | The presence of this attribute will display validation styles, such as a red, orange, or green border dependening on the validation status                     | `boolean`                                              | `false`     |
| `error`                    | `error`                      | The presence of this attribute gives the component error styles                                                                                                | `boolean`                                              | `false`     |
| `errorCondition`           | --                           | A function that will return true or false depending on wether the error condition is met or not                                                                | `Function`                                             | `undefined` |
| `height`                   | `height`                     | The textarea height                                                                                                                                            | `string`                                               | `"auto"`    |
| `hideValidationMessage`    | `hide-validation-message`    | The presence of this attribute will show a validation message if the input has an error                                                                        | `boolean`                                              | `false`     |
| `informationMessage`       | `information-message`        | An informative message to help the user filling the information                                                                                                | `string`                                               | `undefined` |
| `label`                    | `label`                      | The textarea label                                                                                                                                             | `string`                                               | `undefined` |
| `maxWidth`                 | `max-width`                  | The max-width                                                                                                                                                  | `string`                                               | `"100%"`    |
| `placeholder`              | `placeholder`                | The textarea placeholder                                                                                                                                       | `string`                                               | `undefined` |
| `required`                 | `required`                   | Make the radio-buttons required                                                                                                                                | `boolean`                                              | `false`     |
| `rows`                     | `rows`                       | The number of rows                                                                                                                                             | `number`                                               | `4`         |
| `validationMessage`        | `validation-message`         | The required message if this input is required and no value is provided (optional). If this is not provided, the default browser required message will show up | `string`                                               | `undefined` |
| `validationStatus`         | `validation-status`          | The validation status                                                                                                                                          | `"error" \| "indeterminate" \| "success" \| "warning"` | `undefined` |
| `value`                    | `value`                      | The textarea value                                                                                                                                             | `string`                                               | `undefined` |
| `warning`                  | `warning`                    | The presence of this attribute gives the component warning styles                                                                                              | `boolean`                                              | `false`     |
| `warningCondition`         | --                           | A function that will return true or false depending on wether the warning condition is met or not                                                              | `Function`                                             | `undefined` |

## Events

| Event    | Description                | Type               |
| -------- | -------------------------- | ------------------ |
| `change` | Returns the textarea value | `CustomEvent<any>` |
| `input`  | Returns the textarea value | `CustomEvent<any>` |

## Methods

### `validate() => Promise<boolean>`

#### Returns

Type: `Promise<boolean>`

## Dependencies

### Depends on

- [gxg-label](../label)
- [gxg-form-message](../form-message)

### Graph

```mermaid
graph TD;
  gxg-form-textarea --> gxg-label
  gxg-form-textarea --> gxg-form-message
  gxg-label --> gxg-tooltip
  gxg-form-message --> gxg-icon
  gxg-icon --> ch-icon
  style gxg-form-textarea fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
