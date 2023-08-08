# gxg-contextual-menu-item

<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description   | Type     | Default     |
| -------- | --------- | ------------- | -------- | ----------- |
| `icon`   | `icon`    | Optional icon | `string` | `null`      |
| `id`     | `id`      | The id        | `string` | `undefined` |

## Events

| Event                        | Description | Type                  |
| ---------------------------- | ----------- | --------------------- |
| `contextualMenuItemSelected` |             | `CustomEvent<string>` |

## Dependencies

### Depends on

- [gxg-icon](../icon)

### Graph

```mermaid
graph TD;
  gxg-contextual-menu-item --> gxg-icon
  gxg-icon --> ch-icon
  style gxg-contextual-menu-item fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
