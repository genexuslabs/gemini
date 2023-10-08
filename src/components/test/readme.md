# gxg-test

<!-- Auto Generated Below -->

## Properties

| Property      | Attribute | Description                                             | Type                                                                                                                                                | Default                                                                                                                                                                                                                                                                                                                                                                     |
| ------------- | --------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `comboValues` | --        | The presence of this attribute makes the input disabled | `({ id: string; label: string; iconName: string; selected: boolean; } \| { id: string; label: string; iconName: string; selected?: undefined; })[]` | `[ { id: "web-net", label: "Web (.NET)", iconName: null, }, { id: "android", label: "Android", iconName: "general/android", selected: true, }, { id: "apple", label: "Apple", iconName: "general/apple", }, { id: "web-angular", label: "Web (Angular)", iconName: "general/angular", }, { id: "we-chat-mini-program", label: "We Chat Mini Program", iconName: null, }, ]` |

## Dependencies

### Depends on

- [gxg-combo-box-item](../combo-box-item)
- [gxg-combo-box](../combo-box)

### Graph

```mermaid
graph TD;
  gxg-test --> gxg-combo-box-item
  gxg-test --> gxg-combo-box
  gxg-combo-box-item --> gxg-icon
  gxg-icon --> ch-icon
  gxg-combo-box --> gxg-label
  gxg-combo-box --> gxg-form-text
  gxg-combo-box --> gxg-button
  gxg-combo-box --> gxg-form-message
  gxg-label --> gxg-tooltip
  gxg-form-text --> gxg-icon
  gxg-form-text --> gxg-label
  gxg-form-text --> gxg-form-message
  gxg-form-message --> gxg-icon
  gxg-button --> gxg-icon
  style gxg-test fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
