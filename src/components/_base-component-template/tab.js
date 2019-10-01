import { storiesOf } from '@storybook/html';
import readme from "./readme.md";

storiesOf('Tab', module)
.add('Tab', () => `
        <gxg-tab></gxg-tab>
        `
        , {
        notes: {
                markdown: readme
        }
});