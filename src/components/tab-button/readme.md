# gxg-tab-button

<!-- Auto Generated Below -->

## Properties

| Property     | Attribute     | Description                                                                   | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Default |
| ------------ | ------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `disabled`   | `disabled`    | Provide this attribute to make this button disabled                           | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `false` |
| `icon`       | `icon`        | (Optional) provide an icon to this button                                     | `"error" \| "success" \| "warning" \| "none" \| "add" \| "add-circle" \| "arrow-down" \| "arrow-left" \| "arrow-right" \| "arrow-up" \| "chevron-down" \| "chevron-left" \| "chevron-right" \| "chevron-up" \| "close" \| "color-picker" \| "deleted" \| "drag" \| "duplicate" \| "edit-wand" \| "edit" \| "empty" \| "file" \| "folder" \| "level-down" \| "level-up" \| "minus" \| "minus-circle" \| "more-info" \| "reset" \| "search" \| "settings" \| "show-more-horizontal" \| "show-more-vertical"` | `null`  |
| `isSelected` | `is-selected` | Provide this attribute to make this button selected by default                | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `false` |
| `tab`        | `tab`         | The tab id. Should match the "tab" value of the correlative "gxg-tab" element | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `null`  |
| `tabLabel`   | `tab-label`   | The button label                                                              | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `null`  |

## Events

| Event          | Description | Type               |
| -------------- | ----------- | ------------------ |
| `tabActivated` |             | `CustomEvent<any>` |

## Dependencies

### Depends on

- [gxg-icon](../icon)

### Graph

```mermaid
graph TD;
  gxg-tab-button --> gxg-icon
  style gxg-tab-button fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
