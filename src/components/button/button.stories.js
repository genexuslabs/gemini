import { storiesOf } from '@storybook/html';
import readme from "./readme.md";
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';


const stories = storiesOf("Button", module);
stories.addDecorator(withKnobs);
// storiesOf('Button', module)
stories.add('Primary - Text', () => `
        <gxg-button type="primary">${text("Button Label","Button")}</gxg-button>
        <gxg-button type="primary" disabled>${text("Button Label","Button")}</gxg-button>
        `, {
        notes: {
                markdown: readme
        }
})
.add('Primary - Text / Icon', () => `
        <gxg-button><img slot="icon" src="./assets/icons/gxg-icon-add.svg">${text("Button Label","Button")}</gxg-button>
        <gxg-button disabled><img slot="icon" src="./assets/icons/gxg-icon-add.svg">${text("Button Label","Button")}</gxg-button>
        `, {
        notes: {
                markdown: readme
        }
})
.add('Primary - Icon', () => `
        <gxg-button type="icon-only"><img slot="icon" src="./assets/icons/gxg-icon-add.svg"></gxg-button>
        <gxg-button type="icon-only" disabled><img slot="icon" src="./assets/icons/gxg-icon-add.svg"></gxg-button>
        `
        , {
        notes: {
                markdown: readme
        }
})
.add('Secondary - Text', () => `
        <gxg-button type="text-only">${text("Button Label","Button")}</gxg-button>
        <gxg-button type="text-only" disabled>${text("Button Label","Button")}</gxg-button>
        `, {
        notes: {
               markdown: readme
        }
})
.add('Secondary - Icon', () => `
        <gxg-button type="icon-only-secondary"><img slot="icon" src="./assets/icons/gxg-icon-add.svg"></gxg-button>
        <gxg-button type="icon-only-secondary" disabled><img slot="icon" src="./assets/icons/gxg-icon-add.svg"></gxg-button>
        `, {
        notes: {
               markdown: readme
        }
})
.add('Outlined', () => `
        <gxg-button type="outlined">${text("Button Label","Button")}</gxg-button>
        <gxg-button type="outlined" disabled>${text("Button Label","Button")}</gxg-button>
        `, {
        notes: {
                markdown: readme
        }
});