# gxg-accordion

<!-- Auto Generated Below -->

## Usage

### Usage

```
<gxg-accordion mode="classical">
    <gxg-accordion-item item-title="tab-01" item-id="tab-01">
    Some content on accordion 1
    </gxg-accordion-item>
    <gxg-accordion-item title-icon="navigation/level-down" item-title="tab-02" item-id="tab-02">some content on accordion 2.</gxg-accordion-item>
    <gxg-accordion-item item-title="tab-03" item-subtitle="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita eligendi Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita eligendi" item-id="tab-03">some content on accordion 3.</gxg-accordion-item>
    <gxg-accordion-item item-title="tab-04" item-id="tab-04">
    some content on accordion 4.
    <div slot="meta">
        some meta
    </div>
    </gxg-accordion-item>
</gxg-accordion>
```

## Properties

| Property         | Attribute          | Description                                                                                                                                                                 | Type                                            | Default       |
| ---------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------- |
| `disabled`       | `disabled`         | The presence of this attribute makes all of the accordion-items disabled and not focusable                                                                                  | `boolean`                                       | `false`       |
| `maxWidth`       | `max-width`        | The accordion max-width                                                                                                                                                     | `string`                                        | `"100%"`      |
| `mode`           | `mode`             | The accordion flavor                                                                                                                                                        | `"boxed" \| "classical" \| "minimal" \| "slim"` | `"classical"` |
| `noPadding`      | `no-padding`       | The presence of this attribues removes the padding (internal spacing) from the accordion items containers. This property only applies for the "classical" or "boxed" modes. | `boolean`                                       | `false`       |
| `singleItemOpen` | `single-item-open` | If this attribute is present, only one accordion-item can be open at the same time                                                                                          | `boolean`                                       | `false`       |

---

_Built with [StencilJS](https://stenciljs.com/)_
