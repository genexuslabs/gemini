import { storiesOf } from '@storybook/html';
import readme from "./readme.md";
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';

/*************
KNOBS
*************/

/*Icons Knob*/
const label = 'Icon';
const options = {
  Add: './assets/icons/gxg-icon-add.svg',
  ArrowDown: './assets/icons/gxg-icon-arrow-down.svg',
};
const defaultValue = options.Add;

/*Disabled Knob*/
const labelDisabled = 'Disabled';
const defaultValueDisabled = false;


/*************
STORIES
*************/
const stories = storiesOf("Button", module);
stories.addDecorator(withKnobs);
// storiesOf('Button', module)
stories.add('Primary - Text', () => `
        <gxg-button type="primary" disabled=${boolean(labelDisabled, defaultValueDisabled)}> ${text("Button Label","Button")}</gxg-button>
        `, {
        notes: {
                markdown: readme
        }
})
.add('Primary - Text / Icon', () => `
        <gxg-button disabled=${boolean(labelDisabled, defaultValueDisabled)}><img slot="icon" src="${select(label, options, defaultValue)}">${text("Button Label","Button")}</gxg-button>
        `, {
        notes: {
                markdown: readme
        }
})
.add('Primary - Icon', () => `
        <gxg-button type="icon-only" disabled=${boolean(labelDisabled, defaultValueDisabled)}><img slot="icon" src="${select(label, options, defaultValue)}"></gxg-button>
        `
        , {
        notes: {
                markdown: readme
        }
})
.add('Secondary - Text', () => `
        <gxg-button type="text-only" disabled=${boolean(labelDisabled, defaultValueDisabled)}>${text("Button Label","Button")}</gxg-button>
        `, {
        notes: {
               markdown: readme
        }
})
.add('Secondary - Icon', () => `
        <gxg-button type="icon-only-secondary" disabled=${boolean(labelDisabled, defaultValueDisabled)}><img slot="icon" src="${select(label, options, defaultValue)}"></gxg-button>
        `, {
        notes: {
               markdown: readme
        }
})
.add('Outlined', () => `
        <gxg-button type="outlined" disabled=${boolean(labelDisabled, defaultValueDisabled)}>${text("Button Label","Button")}</gxg-button>
        `, {
        notes: {
                markdown: readme
        }
});