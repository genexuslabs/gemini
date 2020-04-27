# gxg-button-group

<h2>General notes</h2>
<ul>
    <li>
        button elements inside <code>gxg-button-group</code> share the same basic styles of <code>gxg-button</code> by using a mixin, and then, some styles that differ are overriden, such as the <em>border radius</em>. Styles for pseudo-selectors, such as <em>:hover</em>, <em>:focus</em>, or <em>:active</em> cannot be part of the mixin, because of syntax rules, hence, styles for pseudo-selectors are repeated on both, <code>gxg-button</code> and <code>gxg-button-group</code> elements.
    </li>
</ul>

<h2>Using a button group</h2>
<ol>
    <li>
        Set the component <em>title</em> attribute. This will show up as a main title, above the button group component. The title will also be used as the <em>aria-label</em> value on the component.
    </li>
    <li>
        Inside the component, add as many <em>button</em> elements as you need.
    </li>
    <li>
        For each button, set an <em>id</em> attribute, <em>value</em> attribute, and <em>content</em>. By default, the first button will active/selected. If you want another button to be active/selected by default, rather than the first one, just set the <em>default-selected-btn-id</em> equal to the button id. That is the purpose of the button id.
    </li>
    <li>
        When the user clicks on any button, the component <em>value</em> property will be updated, matching the value of the clicked button. 
    </li>
</ol>

<!-- Auto Generated Below -->

## Properties

| Property               | Attribute                 | Description                                                        | Type                            | Default     |
| ---------------------- | ------------------------- | ------------------------------------------------------------------ | ------------------------------- | ----------- |
| `buttonGroupTitle`     | `button-group-title`      | The title that will show up above the buttons group                | `string`                        | `undefined` |
| `defaultSelectedBtnId` | `default-selected-btn-id` | The id of the button that you would like to show active by default | `string`                        | `undefined` |
| `disabled`             | `disabled`                | Wether the button group is disabled or not.                        | `boolean`                       | `false`     |
| `titleAlignment`       | `title-alignment`         | The main title alignment                                           | `"center" \| "left" \| "right"` | `"left"`    |

---

_Built with [StencilJS](https://stenciljs.com/)_
