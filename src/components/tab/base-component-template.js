import { storiesOf } from '@storybook/html';
import readme from "./readme.md";

storiesOf('Button', module)
.add('Base Component Template', () => `
        <gxg-tab></gxg-tab>
        `
        , {
        notes: {
                markdown: readme
        }
});