# gxg-button-group

<h2>General notes</h2>
<ul>
    <li>
        button elements inside <code>gxg-button-group</code> share the same basic styles with <code>gxg-button</code> by using a mixin, and then, some styles that differ are overriden, such as the <em>border radius</em>. Styles for pseudo-selectors, such as <em>:hover</em>, <em>:focus</em>, or <em>:active</em> cannot be part of the mixin, because of syntax rules, hence, styles for pseudo-selectors are repeated on both, <code>gxg-button</code> and <code>gxg-button-group</code> elements.
    </li>
</ul>

<h2>Configuring a Button Group</h2>
<ol>
    <li>
        Set the <em>title</em> attribute on the component. This will show up as a main title, above the button group component.
    </li>
    <li>
        Inside the component, add as many <em>button</em> elements as you need.
    </li>
    <li>
        For each button, set an <em>id</em> attribute, <em>value</em> attribute, and the button <em>content</em>. The button <em>id</em> will be used to catch the <em>value</em> of the selected/active button, and send it to the commponent itself, under the <em>button-value</em> attribute. 
    </li>
    <li>
        By default, the first button will be the active button, but, if you would like another button to be active, set the <em>selected-button-id</em> attribute with the <em>id</em> of the button you would like to be active.
    </li>
    <li>
        When the user clicks on any button, the component <em>button-value</em> will be updated with the value of the clicked button, so that the client that uses the component, can catch the value from there.
    </li>
</ol>

<!-- Auto Generated Below -->

## Properties

| Property           | Attribute            | Description                                                       | Type                            | Default     |
| ------------------ | -------------------- | ----------------------------------------------------------------- | ------------------------------- | ----------- |
| `SelectedButtonId` | `selected-button-id` | The id of the button that you would like to show active initially | `string`                        | `undefined` |
| `title`            | `title`              | The main title that will show up above the buttons group          | `string`                        | `undefined` |
| `titleAlignment`   | `title-alignment`    | The main title alignment                                          | `"center" \| "left" \| "right"` | `"left"`    |

---

_Built with [StencilJS](https://stenciljs.com/)_
