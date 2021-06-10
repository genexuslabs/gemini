# gxg-combo

<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description | Type       | Default     |
| -------- | --------- | ----------- | ---------- | ----------- |
| `items`  | --        |             | `object[]` | `undefined` |
| `width`  | `width`   |             | `string`   | `"240px"`   |

## Events

| Event         | Description                                                                                                    | Type               |
| ------------- | -------------------------------------------------------------------------------------------------------------- | ------------------ |
| `itemClicked` | This event is triggered when the user clicks on an item. event.detail contains the item index, and item value. | `CustomEvent<any>` |

## Dependencies

### Depends on

- [gxg-form-text](../form-text)
- [gxg-icon](../icon)

### Graph

```mermaid
graph TD;
  gxg-combo --> gxg-form-text
  gxg-combo --> gxg-icon
  gxg-form-text --> gxg-icon
  gxg-form-text --> gxg-form-message
  gxg-icon --> ch-icon
  gxg-form-message --> gxg-icon
  style gxg-combo fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
