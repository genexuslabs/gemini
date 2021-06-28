# gxg-pill

<!-- Auto Generated Below -->

## Usage

### Usage

```
<gxg-pill icon="objects/procedure" type="static">Salt</gxg-pill>
<gxg-pill icon="objects/procedure" type="static-with-action">Salt</gxg-pill>
<gxg-pill icon="gx-server/lock-without-changes" type="button">Salt</gxg-pill>
<gxg-pill icon="gx-server/changes-commit-pending" type="button-with-action">Salt</gxg-pill>
```

## Properties

| Property     | Attribute     | Description                                                                       | Type                                                                   | Default     |
| ------------ | ------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------- |
| `disabled`   | `disabled`    | The presence of this attribute disables the pillgit a                             | `boolean`                                                              | `false`     |
| `heightAuto` | `height-auto` | The presence of this attribute sets auto-height. Usefull when the text overflows. | `boolean`                                                              | `false`     |
| `icon`       | `icon`        | The icon                                                                          | `string`                                                               | `undefined` |
| `type`       | `type`        | The type of pill                                                                  | `"button" \| "button-with-action" \| "static" \| "static-with-action"` | `"static"`  |

## Dependencies

### Depends on

- [gxg-icon](../icon)

### Graph

```mermaid
graph TD;
  gxg-pill --> gxg-icon
  gxg-icon --> ch-icon
  style gxg-pill fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
