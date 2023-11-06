# gxg-test

<!-- Auto Generated Below -->

## Dependencies

### Depends on

- [gxg-grid](../grid)
- ch-grid
- ch-grid-columnset
- ch-grid-column
- [gxg-icon](../icon)
- ch-grid-rowset-empty

### Graph

```mermaid
graph TD;
  gxg-test --> gxg-grid
  gxg-test --> ch-grid
  gxg-test --> ch-grid-columnset
  gxg-test --> ch-grid-column
  gxg-test --> gxg-icon
  gxg-test --> ch-grid-rowset-empty
  ch-grid --> ch-grid-settings
  ch-grid --> ch-grid-settings-columns
  ch-grid-settings --> ch-window
  ch-window --> ch-window-close
  ch-grid-column --> ch-grid-column-settings
  ch-grid-column --> ch-grid-column-resize
  ch-grid-column-settings --> ch-window
  gxg-icon --> ch-icon
  style gxg-test fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
