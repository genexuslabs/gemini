import { storiesOf } from '@storybook/html';
import readme from "./readme.md";

storiesOf('Button', module)
.add('Primary', () => `
        <gxg-button type="primary">Button</gxg-button>
        <gxg-button type="primary" disabled>Button</gxg-button>
        `, {
        notes: {
                markdown: readme
        }
})
.add('Secondary', () => `
        <gxg-button type="secondary">Button</gxg-button>
        <gxg-button type="secondary" disabled>Button</gxg-button>
        `, {
        notes: {
               markdown: readme
        }
})
.add('Text only', () => `
        <gxg-button type="text-only">Button</gxg-button>
        <gxg-button type="text-only" disabled>Button</gxg-button>
        `, {
        notes: {
                markdown: readme
        }
})
.add('Icon only', () => `
        <gxg-button type="icon-only"><span slot="icon" class="icon-checkbox-checked"></span></gxg-button>
        <gxg-button type="icon-only" disabled><span slot="icon" class="icon-checkbox-checked"></span></gxg-button>
        `
        , {
        notes: {
                markdown: readme
        }
});