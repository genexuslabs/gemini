# gxg-filter-item

<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description                                                                                    | Type     | Default     |
| -------- | --------- | ---------------------------------------------------------------------------------------------- | -------- | ----------- |
| `icon`   | `icon`    | Any icon that belongs to Gemini icon library: https://gx-gemini.netlify.app/?path=/story/icons | `string` | `undefined` |
| `type`   | `type`    | The type (optional)                                                                            | `any`    | `undefined` |

## Events

| Event              | Description                                                                                                 | Type               |
| ------------------ | ----------------------------------------------------------------------------------------------------------- | ------------------ |
| `itemClickedEvent` | This event is fired when the user clicks on an item. event.detail carries the item type property, and text. | `CustomEvent<any>` |

## Dependencies

### Depends on

- [gxg-icon](../icon)

### Graph

```mermaid
graph TD;
  gxg-filter-item --> gxg-icon
  style gxg-filter-item fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
