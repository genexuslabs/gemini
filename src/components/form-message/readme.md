# gxg-form-message

<h2>Notes</h2>
<ul>
    <li>The <code>gxg-form-message</code> component is intended to be used inside form related components, in order to display warning or error messages relative to the fields validation.</li>
    <li>Just append a <code>gxg-form-message</code> inside a gxg-form-x component with the following attributes: <code>type="warining"</code> or <code>"error"</code>, and <code>slot="message"</code></li>
</ul>
<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description         | Type                   | Default     |
| -------- | --------- | ------------------- | ---------------------- | ----------- |
| `type`   | `type`    | The type of message | `"error" \| "warning"` | `undefined` |

## Dependencies

### Used by

- [gxg-form-radio-group](../form-radio-group)
- [gxg-form-text](../form-text)
- [gxg-form-textarea](../form-textarea)

### Depends on

- [gxg-icon](../icon)

### Graph

```mermaid
graph TD;
  gxg-form-message --> gxg-icon
  gxg-icon --> ch-icon
  gxg-form-radio-group --> gxg-form-message
  gxg-form-text --> gxg-form-message
  gxg-form-textarea --> gxg-form-message
  style gxg-form-message fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
