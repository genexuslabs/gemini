# gxg-box

## Properties

| Property     | Attribute    | Description                      | Type                                                          | Default   |
| ------------ | ------------ | -------------------------------- | ------------------------------------------------------------- | --------- |
| `background` | `background` | The background color             | `"gray-01" \| "gray-02" \| "white"`                           | `"white"` |
| `border`     | `border`     | Wether the box has border or not | `boolean`                                                     | `true`    |
| `maxWidth`   | `max-width`  | The component max. width         | `string`                                                      | `"100%"`  |
| `minHeight`  | `min-height` | The component min. height        | `string`                                                      | `"auto"`  |
| `padding`    | `padding`    | The box padding                  | `"0" \| "l" \| "m" \| "s" \| "xl" \| "xs" \| "xxl" \| "xxxl"` | `"xs"`    |

# gxg-card

<!-- Auto Generated Below -->


## Usage

### Usage

```
<gxg-box background="white" max-width="200px" padding="s">
    <q>Be who you are and say what you feel, because those who mind don’t matter, and those who matter don’t mind.– Bernard M. Baruch</q>
</gxg-box>

<gxg-card background="white" elevation="xs" max-width="200px" padding="s">
    <q>Be who you are and say what you feel, because those who mind don’t matter, and those who matter don’t mind.– Bernard M. Baruch</q>
</gxg-card>
```



## Properties

| Property         | Attribute          | Description                                                                                                            | Type                                                                                                                                                                                                                                          | Default     |
| ---------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `actionable`     | `actionable`       | It applies a different style on hover. Useful when the card is actionable (has an action attached to the click event). | `boolean`                                                                                                                                                                                                                                     | `false`     |
| `background`     | `background`       | The background color                                                                                                   | `"gray-01" \| "white"`                                                                                                                                                                                                                        | `"white"`   |
| `cardSubtitle`   | `card-subtitle`    | An optional subtitle                                                                                                   | `string`                                                                                                                                                                                                                                      | `undefined` |
| `cardTitle`      | `card-title`       | An optional title                                                                                                      | `string`                                                                                                                                                                                                                                      | `undefined` |
| `cardType`       | `card-type`        | The card type (only for mercury)                                                                                       | `"article" \| "mini" \| "section"`                                                                                                                                                                                                            | `"section"` |
| `editableTitle`  | `editable-title`   | It makes the title editable (only for mercury)                                                                         | `boolean`                                                                                                                                                                                                                                     | `false`     |
| `elevation`      | `elevation`        | The card box-shadow                                                                                                    | `"m" \| "xs"`                                                                                                                                                                                                                                 | `"xs"`      |
| `filterValue`    | `filter-value`     | This is the filter value needed for hiChar.                                                                            | `string`                                                                                                                                                                                                                                      | `undefined` |
| `height`         | `height`           | The component height                                                                                                   | `string`                                                                                                                                                                                                                                      | `"auto"`    |
| `hiChar`         | `hi-char`          | This allows to highlight any character on the card title, or subtitle.                                                 | `boolean`                                                                                                                                                                                                                                     | `false`     |
| `icon`           | `icon`             | The card type (only for mercury)                                                                                       | `string`                                                                                                                                                                                                                                      | `undefined` |
| `iconColor`      | `icon-color`       | The icon color                                                                                                         | `"alwaysblack" \| "auto" \| "disabled" \| "error" \| "indeterminate" \| "mercury" \| "mercury-primary" \| "negative" \| "onbackground" \| "ondisabled" \| "primary-active" \| "primary-enabled" \| "primary-hover" \| "success" \| "warning"` | `"auto"`    |
| `maxWidth`       | `max-width`        | The component max. width                                                                                               | `string`                                                                                                                                                                                                                                      | `"100%"`    |
| `minHeight`      | `min-height`       | The component min. height                                                                                              | `string`                                                                                                                                                                                                                                      | `"auto"`    |
| `noHeaderBorder` | `no-header-border` | Removes the header border                                                                                              | `boolean`                                                                                                                                                                                                                                     | `false`     |
| `noPaddingTop`   | `no-padding-top`   | Remove padding from the top (applies only for the "section" card type)                                                 | `boolean`                                                                                                                                                                                                                                     | `false`     |
| `noShadow`       | `no-shadow`        | Disables box-shadow                                                                                                    | `boolean`                                                                                                                                                                                                                                     | `false`     |
| `padding`        | `padding`          | The card padding                                                                                                       | `"0" \| "l" \| "m" \| "s" \| "xl" \| "xs" \| "xxl" \| "xxxl"`                                                                                                                                                                                 | `"xs"`      |
| `subtitleColor`  | `subtitle-color`   | The icon color                                                                                                         | `"alwaysblack" \| "auto" \| "disabled" \| "error" \| "indeterminate" \| "mercury" \| "mercury-primary" \| "negative" \| "onbackground" \| "ondisabled" \| "primary-active" \| "primary-enabled" \| "primary-hover" \| "success" \| "warning"` | `"auto"`    |
| `subtitleIcon`   | `subtitle-icon`    | An optional subtitle icon                                                                                              | `string`                                                                                                                                                                                                                                      | `undefined` |
| `subtitleLink`   | `subtitle-link`    | An optional subtitle link                                                                                              | `string`                                                                                                                                                                                                                                      | `undefined` |
| `titleSemibold`  | `title-semibold`   | Card title semibold                                                                                                    | `boolean`                                                                                                                                                                                                                                     | `false`     |


## Dependencies

### Depends on

- [gxg-icon](../icon)
- [gxg-title-editable](../title-editable)

### Graph
```mermaid
graph TD;
  gxg-card --> gxg-icon
  gxg-card --> gxg-title-editable
  gxg-icon --> ch-icon
  gxg-title-editable --> gxg-button
  gxg-title-editable --> gxg-form-message
  gxg-title-editable --> gxg-tooltip
  gxg-title-editable --> gxg-icon
  gxg-button --> gxg-icon
  gxg-form-message --> gxg-icon
  style gxg-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
