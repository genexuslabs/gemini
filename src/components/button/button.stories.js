import { storiesOf } from '@storybook/html';
import readme from "./readme.md";

storiesOf('Button', module)
.add('Primary - Text', () => `
        <gxg-button type="primary">Button</gxg-button>
        <gxg-button type="primary" disabled>Button</gxg-button>
        `, {
        notes: {
                markdown: readme
        }
})
.add('Primary - Text / Icon', () => `
        <gxg-button>Button<img slot="icon" src="./assets/icons/gxg-icon-add.svg"></gxg-button>
        <gxg-button disabled><img slot="icon" src="./assets/icons/gxg-icon-add.svg">Button</gxg-button>
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
        <gxg-button type="text-only">Button</gxg-button>
        <gxg-button type="text-only" disabled>Button</gxg-button>
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
        <gxg-button type="outlined">Button</gxg-button>
        <gxg-button type="outlined" disabled>Button</gxg-button>
        `, {
        notes: {
                markdown: readme
        }
});