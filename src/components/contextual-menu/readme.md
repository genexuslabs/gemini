# gxg-contextual-menu

<h2>Using a contextual-menu</h2>
<ol>
    <li>Insert <code>gxg-contextual-menu</code> anyplace in the document.</li>
    <li>Inside the <code>gxg-contextual-menu</code> include as many <code>gxg-contextual-menu-item</code>'s as needed, passing the desired content for each item.</li>
    <li>If you wish to add a sub-menu for a <code>gxg-contextual-menu-item</code>, insert after the content a <code>gxg-contextual-menu-submenu</code>, and then, insert inside of it as many <code>gxg-contextual-menu-item</code>'s as desired, just as you would inside the main menu. (Optional).</li>
    <li>If you wish to add an icon to a <code>gxg-contextual-menu-item</code>, add the <code>icon</code> attribute and pass as the value any of the available icons. (Optional).</li>
</ol>

<h2>Displaying the contextual-menu</h2>
<ol>
    <li>Attach to the element you want to display the contextual-menu on (lets call it the "Host"), the <code>contextmenu</code> event listener.</li>
    <li>Inside the function attached to the event listener, prevent the default behavior.</li>
    <li>do a <code>contextualMenuHost.removeAttribute("visible");</code></li>
    <li>Then do a <code>contextualMenuHost.setAttribute("visible", "");</code></li>
</ol>

# gxg-contextual-menu-item

| Property | Attribute | Description   | Type     | Default |
| -------- | --------- | ------------- | -------- | ------- |
| `icon`   | `icon`    | Optional icon | `string` | `null`  |

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                           | Type      | Default |
| --------- | --------- | ----------------------------------------------------- | --------- | ------- |
| `visible` | `visible` | The presence of this attribute makes the menu visible | `boolean` | `false` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
