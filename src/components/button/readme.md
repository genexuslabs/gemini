# Button

<ul>
    <li style="margin-bottom:10px">
        <h2>About Default Button / Primary Button</h2>
        By default, if the user does not provide a value for the 'type' property which defines the type of button, the button will be a 'Primary' button type. For this reason, the styles thar are applied for the '.button' class apply for the 'Primary' button time automatically. At the same time, the .button properties are 'inherited' or shared accross the other type of buttons, and overrided when needed.
    </li>
    <li style="margin-bottom:10px">
        <h2>About button margin</h2>
        Button margin prevents outline overlapping with adjacent elements. For this reason, button margin should be at least, the same width of the button outline. Button outline is visible when the button is on focus, and only visible, at the time of writting, for the 'primary' and 'secondary' types.
    </li>
    <li>
        <p>
        <h2>About properties 'inheritance'</h2>
        There are, at the time of writting, four type of buttons: Primary, Secondary, Text Only, and Icon Only. Some button properties are 'global', meaning that all the buttons share the same value for that given property. For example, the border-style, or the border-width, is a global property, because the four buttons use a solid border type, and a 1px border-width.</p><p>On the other hand, there are 'individual' properties. These type of properties could be different for each single type of button.For example, the background-color is an individual property, because 'Primary' button uses a blue background, and 'Secondary' button uses a white background.</p><p>Global properties are defined on the .button class, which is shared across all the type of buttons, and are not redefined for on the individual button type classes (.button--secondary, .button--text-only, etc)</p><p>Individual properties are defined on the .button class (which are the properties for the 'Primary' button, since it is the default button) and are then redefined for each button type.</p><p>Finally, there are some properties that are shared, and not shared at the same time. padding-left and padding-right is such an example. 'Primary' and 'Secondary' button types share the same padding-left/right, but 'Text Only', and 'Icon Only' button type use a different value, each one. For this cases, we only redifine the property value when it changes. This means that 'Secondary' button padding is not redefined, but 'inhertied' from the 'Primary' button padding, since it is the same value.</p><h3>Global css properties</h3>
        <ul>
            <li>border-syle</li>
            <li>border-width</li>
            <li>border-radius</li>
            <li>display</li>
            <li>align-items</li>
            <li>justify-content</li>
            <li>margin-top</li>
            <li>margin-right</li>
            <li>margin-bottom</li>
            <li>margin-left</li>
            <li>min-height</li>
            <li>font-family</li>
            <li>font-size</li>
            <li>font-style</li>
            <li>font-weight</li>
            <li>letter-spacing</li>
            <li>line-height</li>
            <li>outline-style</li>
            <li>outline-color</li>
            <li>outline-width</li>
            <li>cursor</li>
        </ul>
        <h3>Individual css properties</h3>
        <ul>
            <li>background</li>
            <li>border-color</li>
            <li>color</li>
            <li>padding-top</li>
            <li>padding-right</li>
            <li>padding-botton</li>
            <li>padding-left</li>
        </ul>
    </li>
</ul>
<style>
    ol,ul {
        list-style-type: none;
        padding-left: 0 !important;
    }
</style>
<!-- Auto Generated Below -->

## Properties

| Property   | Attribute  | Description                                                                       | Type      | Default     |
| ---------- | ---------- | --------------------------------------------------------------------------------- | --------- | ----------- |
| `disabled` | `disabled` | The state of the button. Whether is disabled or not. Possible values: false, true | `boolean` | `false`     |
| `type`     | `type`     | The kind of button Possible values: primary, secondary, text-only, icon-only      | `string`  | `'primary'` |

---

_Built with [StencilJS](https://stenciljs.com/)_
