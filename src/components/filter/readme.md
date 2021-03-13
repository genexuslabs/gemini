# gxg-filter-item

<p>The content of the <code>gxg-filter-item</code> has to be passed as slotted content.</p>

## Properties

| Property | Attribute | Description         | Type  | Default     |
| -------- | --------- | ------------------- | ----- | ----------- |
| `type`   | `type`    | The type (optional) | `any` | `undefined` |

## Events

| Event              | Description                                                                                                 | Type               |
| ------------------ | ----------------------------------------------------------------------------------------------------------- | ------------------ |
| `itemClickedEvent` | This event is fired when the user clicks on an item. event.detail carries the item type property, and text. | `CustomEvent<any>` |

# gxg-filter

<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description                                                                             | Type     | Default |
| -------- | --------- | --------------------------------------------------------------------------------------- | -------- | ------- |
| `left`   | `left`    | The left position of the filter, relative to the closest parent with relative position. | `string` | `"0px"` |
| `top`    | `top`     | The top position of the filter, relative to the closest parent with relative position.  | `string` | `"0px"` |

## Dependencies

### Depends on

- [gxg-form-text](../form-text)
- [gxg-button](../button)

### Graph

```mermaid
graph TD;
  gxg-filter --> gxg-form-text
  gxg-filter --> gxg-button
  gxg-form-text --> gxg-icon
  gxg-form-text --> gxg-form-message
  gxg-form-message --> gxg-icon
  gxg-button --> gxg-icon
  style gxg-filter fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
