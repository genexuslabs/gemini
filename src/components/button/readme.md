# gxg-button

<!-- Auto Generated Below -->

## Properties

| Property               | Attribute                | Description                                                                                                                              | Type                                                                                                                                                                       | Default               |
| ---------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `alwaysBlack`          | `always-black`           | The prescence of this attribute makes the icon always black                                                                              | `boolean`                                                                                                                                                                  | `false`               |
| `buttonStylesEditable` | `button-styles-editable` | The presence of this attribute lets the button styles be editable from outside of the component by referencing the "native-button" part. | `boolean`                                                                                                                                                                  | `false`               |
| `disabled`             | `disabled`               | The state of the button, whether it is disabled or not                                                                                   | `boolean`                                                                                                                                                                  | `false`               |
| `fullWidth`            | `full-width`             | The presence of this attribute makes the component full-width                                                                            | `boolean`                                                                                                                                                                  | `false`               |
| `icon`                 | `icon`                   | The button icon                                                                                                                          | `any`                                                                                                                                                                      | `undefined`           |
| `negative`             | `negative`               | The prescence of this attribute turns the icon white                                                                                     | `boolean`                                                                                                                                                                  | `false`               |
| `type`                 | `type`                   | The kind of button                                                                                                                       | `"outlined" \| "primary-icon-only" \| "primary-text-icon" \| "primary-text-only" \| "secondary-icon-only" \| "secondary-text-icon" \| "secondary-text-only" \| "tertiary"` | `"primary-text-only"` |

## Dependencies

### Used by

- [gxg-alert](../alert)
- [gxg-combo](../combo)
- [gxg-demo](../demo)
- [gxg-drag-box](../drag-box)
- [gxg-filter](../filter)
- [gxg-modal](../modal)
- [gxg-tab-bar](../tab-bar)
- [gxg-window](../window)

### Depends on

- [gxg-icon](../icon)

### Graph

```mermaid
graph TD;
  gxg-button --> gxg-icon
  gxg-icon --> ch-icon
  gxg-alert --> gxg-button
  gxg-combo --> gxg-button
  gxg-demo --> gxg-button
  gxg-drag-box --> gxg-button
  gxg-filter --> gxg-button
  gxg-modal --> gxg-button
  gxg-tab-bar --> gxg-button
  gxg-window --> gxg-button
  style gxg-button fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
