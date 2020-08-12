# gxg-modal

<h2>Notes</h2>
<ul>
   <li>To insert any html tag into the modal footer, use a <code>slot</code> attribute and assign the "footer" value to it. ie.: <code>&lt;button slot="footer"&gt;Save&lt;/button&gt;</code> This will ensure that the button is placed on the modal footer.</li>
</ul>

<!-- Auto Generated Below -->

## Properties

| Property     | Attribute     | Description                        | Type                                                   | Default     |
| ------------ | ------------- | ---------------------------------- | ------------------------------------------------------ | ----------- |
| `modalTitle` | `modal-title` | The modal title                    | `string`                                               | `undefined` |
| `padding`    | `padding`     |                                    | `"l" \| "m" \| "s" \| "xl" \| "xs" \| "xxl" \| "xxxl"` | `"s"`       |
| `visible`    | `visible`     | Wether the modal is visible or not | `boolean`                                              | `false`     |
| `width`      | `width`       | The modal width                    | `string`                                               | `"304px"`   |
| `zIndex`     | `z-index`     | The z-index value of the modal     | `string`                                               | `"10"`      |

## Dependencies

### Depends on

- [gxg-button](../button)

### Graph

```mermaid
graph TD;
  gxg-modal --> gxg-button
  gxg-button --> gxg-icon
  style gxg-modal fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
