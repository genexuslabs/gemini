# gxg-ide-loader

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute        | Description                                                  | Type          | Default     |
| ---------------- | ---------------- | ------------------------------------------------------------ | ------------- | ----------- |
| `abortTime`      | `abort-time`     | The time the loader will await before abort.                 | `number`      | `300000`    |
| `borderRadius`   | `border-radius`  | The border radius value that applies on the .loader__wrapper | `string`      | `"0"`       |
| `cancelCallback` | --               | The cancel callback                                          | `() => void`  | `undefined` |
| `cancelLabel`    | `cancel-label`   | The cancel button label (optional)                           | `string`      | `undefined` |
| `container`      | --               | The container element for the loader.                        | `HTMLElement` | `undefined` |
| `description`    | `description`    | The loader description (optional)                            | `string`      | `undefined` |
| `displayBorder`  | `display-border` | Displays a border all around                                 | `boolean`     | `false`     |
| `loaderTitle`    | `loader-title`   | The loader title (optional)                                  | `string`      | `undefined` |
| `show`           | `show`           | It shows the loader                                          | `boolean`     | `false`     |


## Events

| Event            | Description | Type                |
| ---------------- | ----------- | ------------------- |
| `loaderFinished` |             | `CustomEvent<void>` |


## Shadow Parts

| Part               | Description |
| ------------------ | ----------- |
| `"loader-wrapper"` |             |


## Dependencies

### Depends on

- [gxg-title](../title)
- [gxg-text](../text)
- [gxg-button](../button)
- ch-window

### Graph
```mermaid
graph TD;
  gxg-ide-loader --> gxg-title
  gxg-ide-loader --> gxg-text
  gxg-ide-loader --> gxg-button
  gxg-ide-loader --> ch-window
  gxg-text --> gxg-icon
  gxg-icon --> ch-icon
  gxg-button --> gxg-icon
  ch-window --> ch-window-close
  style gxg-ide-loader fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
