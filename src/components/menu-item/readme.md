# todo-list

<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description | Type                                                                                                                                                                                                                                                                                                                                                                           | Default     |
| -------- | --------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `active` | `active`  |             | `boolean`                                                                                                                                                                                                                                                                                                                                                                      | `false`     |
| `icon`   | `icon`    |             | `"error" \| "success" \| "warning" \| "none" \| "add" \| "arrow-down" \| "arrow-left" \| "arrow-right" \| "arrow-up" \| "chevron-down" \| "chevron-left" \| "chevron-right" \| "chevron-up" \| "close" \| "color-picker" \| "deleted" \| "drag" \| "duplicate" \| "edit-wand" \| "edit" \| "level-down" \| "level-up" \| "more-info" \| "search" \| "settings" \| "show-more"` | `null`      |
| `label`  | `label`   |             | `string`                                                                                                                                                                                                                                                                                                                                                                       | `undefined` |

## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `menuItemActive` |             | `CustomEvent<any>` |

## Dependencies

### Depends on

- [gxg-icon](../icon)

### Graph

```mermaid
graph TD;
  gxg-menu-item --> gxg-icon
  style gxg-menu-item fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
