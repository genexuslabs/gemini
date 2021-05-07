import { storiesOf } from "@storybook/html";
import readme from "./readme.md";
import {
  withKnobs,
  text,
  boolean,
  number,
  select,
  radios,
} from "@storybook/addon-knobs";

const stories = storiesOf("Other/Accordion", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories
  .add("Classical", () => {
    //Title
    const labelTitle = "Title (first item on this example)";
    const defaultValueTitle = "Dr. Seuss";
    const valueTitle = text(labelTitle, defaultValueTitle);

    //Editable Title
    const labelEditableTitle =
      "Editable Title (open the accordion and hover the title)";
    const defaultValueEditableTitle = false;
    const valueEditableTitle = boolean(
      labelEditableTitle,
      defaultValueEditableTitle
    );

    //Content
    const labelValueContent = "Content (first item on this example)";
    const defaultValueContent =
      "“You know you're in love when you can't fall asleep because reality is finally better than your dreams.”― Dr. Seuss";
    const valueContent = text(labelValueContent, defaultValueContent);

    //Initial State
    const labelInitialState = "Opened by default (first item on this example)";
    const defaultValueInitialState = false;
    const valueInitialState = boolean(
      labelInitialState,
      defaultValueInitialState
    );

    //Single Item Open
    const labelSingleItemOpen =
      "Single Item Open (only one accordion can be open at the same time)";
    const defaultValueSingleItemOpen = false;
    const valueSingleItemOpen = boolean(
      labelSingleItemOpen,
      defaultValueSingleItemOpen
    );

    //Max Width
    const labelMaxWidth = "Max Width (default: 100%)";
    const defaultValueMaxWidth = "100%";
    const valueMaxWidth = text(labelMaxWidth, defaultValueMaxWidth);

    //No padding
    const labelNoPadding = "No padding";
    const defaultValueNoPadding = false;
    const valueNoPadding = boolean(labelNoPadding, defaultValueNoPadding);

    //One item disabled
    const labelSingleItemDisabled = "Disabled (first item on this example)";
    const defaultValueSingleItemDisabled = false;
    const valueSingleItemDisabled = boolean(
      labelSingleItemDisabled,
      defaultValueSingleItemDisabled
    );

    //All items disabled
    const labelAllDisabled =
      "All items disabled (by setting 'disabled' on the accordion-container component)";
    const defaultValueAllDisabled = false;
    const valueAllDisabled = boolean(labelAllDisabled, defaultValueAllDisabled);

    function editableTitle() {
      if (valueEditableTitle) {
        return "editable-title";
      }
    }

    function itemOpen() {
      if (valueInitialState) {
        return "open";
      }
    }

    function singleDisabled() {
      if (valueSingleItemDisabled) {
        return "disabled";
      }
    }

    function singleItemOpen() {
      if (valueSingleItemOpen) {
        return "single-item-open";
      } else {
        return "";
      }
    }

    function allDisabled() {
      if (valueAllDisabled) {
        return "disabled";
      }
    }

    function noPadding() {
      if (valueNoPadding) {
        return "no-padding";
      }
    }

    return `<style>#root {width: 700px; display:flex; justify-content: center;}</style>
  <gxg-accordion ${allDisabled()} ${singleItemOpen()} ${noPadding()} mode="classical"  max-width="${valueMaxWidth}">
    <gxg-accordion-item ${editableTitle()} item-title="${valueTitle}" item-id="tab 1" ${singleDisabled()} status="${itemOpen()}"> ${valueContent}</gxg-accordion-item>
    <gxg-accordion-item ${editableTitle()} item-title="J.K. Rowling" item-id="tab 2">“If you want to know what a man's like, take a good look at how he
    treats his inferiors, not his equals.” ― J.K. Rowling, Harry Potter and
    the Goblet of Fire</gxg-accordion-item> 
    <gxg-accordion-item ${editableTitle()} item-title="Maya Angelou" item-id="tab 3">“I've learned that people will forget what you said, people will forget
    what you did, but people will never forget how you made them feel.” ―
    Maya Angelou</gxg-accordion-item>
  </gxg-accordion>`;
  })
  .add("Boxed", () => {
    //Title
    const labelTitle = "Title (first item on this example)";
    const defaultValueTitle = "Dr. Seuss";
    const valueTitle = text(labelTitle, defaultValueTitle);

    //Editable Title
    const labelEditableTitle =
      "Editable Title (open the accordion and hover the title)";
    const defaultValueEditableTitle = false;
    const valueEditableTitle = boolean(
      labelEditableTitle,
      defaultValueEditableTitle
    );

    //Content
    const labelValueContent = "Content (first item on this example)";
    const defaultValueContent =
      "“You know you're in love when you can't fall asleep because reality is finally better than your dreams.”― Dr. Seuss";
    const valueContent = text(labelValueContent, defaultValueContent);

    //Initial State
    const labelInitialState = "Opened by default (first item on this example)";
    const defaultValueInitialState = false;
    const valueInitialState = boolean(
      labelInitialState,
      defaultValueInitialState
    );

    //Single Item Open
    const labelSingleItemOpen =
      "Single Item Open (only one accordion can be open at the same time)";
    const defaultValueSingleItemOpen = false;

    const valueSingleItemOpen = boolean(
      labelSingleItemOpen,
      defaultValueSingleItemOpen
    );

    //Max Width
    const labelMaxWidth = "Max Width (default: 100%)";
    const defaultValueMaxWidth = "100%";
    const valueMaxWidth = text(labelMaxWidth, defaultValueMaxWidth);

    //No padding
    const labelNoPadding = "No padding";
    const defaultValueNoPadding = false;
    const valueNoPadding = boolean(labelNoPadding, defaultValueNoPadding);

    //One item disabled
    const labelSingleItemDisabled = "Disabled (first item on this example)";
    const defaultValueSingleItemDisabled = false;
    const valueSingleItemDisabled = boolean(
      labelSingleItemDisabled,
      defaultValueSingleItemDisabled
    );

    //All items disabled
    const labelAllDisabled =
      "All items disabled (by setting 'disabled' on the accordion-container component)";
    const defaultValueAllDisabled = false;
    const valueAllDisabled = boolean(labelAllDisabled, defaultValueAllDisabled);

    function singleItemOpen() {
      if (valueSingleItemOpen) {
        return "single-item-open";
      } else {
        return "";
      }
    }

    function allDisabled() {
      if (valueAllDisabled) {
        return "disabled";
      }
    }

    function editableTitle() {
      if (valueEditableTitle) {
        return "editable-title";
      }
    }

    function initialState() {
      if (valueInitialState === true) {
        return "open";
      }
    }

    function singleDisabled() {
      if (valueSingleItemDisabled) {
        return "disabled";
      }
    }

    function noPadding() {
      if (valueNoPadding) {
        return "no-padding";
      }
    }

    return `<style>#root {width: 700px; display:flex; justify-content: center;}</style>
    <gxg-accordion ${allDisabled()} ${singleItemOpen()} ${noPadding()} mode="boxed" max-width="${valueMaxWidth}">
      <gxg-accordion-item ${editableTitle()} status="${initialState()}" item-title="${valueTitle}" item-id="tab 1" ${singleDisabled()}>${valueContent}</gxg-accordion-item>
      <gxg-accordion-item ${editableTitle()} item-title="J.K. Rowling" item-id="tab 2">“If you want to know what a man's like, take a good look at how he
      treats his inferiors, not his equals.” ― J.K. Rowling, Harry Potter and
      the Goblet of Fire</gxg-accordion-item> 
      <gxg-accordion-item ${editableTitle()} item-title="Maya Angelou" item-id="tab 3">“I've learned that people will forget what you said, people will forget
      what you did, but people will never forget how you made them feel.” ―
      Maya Angelou</gxg-accordion-item>
    </gxg-accordion>`;
  })
  .add("Slim", () => {
    //Title
    const labelTitle = "Title (first item on this example)";
    const defaultValueTitle = "Dr. Seuss";
    const valueTitle = text(labelTitle, defaultValueTitle);

    //Content
    const labelValueContent = "Content (first item on this example)";
    const defaultValueContent =
      "“You know you're in love when you can't fall asleep because reality is finally better than your dreams.”― Dr. Seuss";
    const valueContent = text(labelValueContent, defaultValueContent);

    //Initial State
    const labelInitialState = "Opened by default (first item on this example)";
    const defaultValueInitialState = false;
    const valueInitialState = boolean(
      labelInitialState,
      defaultValueInitialState
    );

    //Single Item Open
    const labelSingleItemOpen =
      "Single Item Open (only one accordion can be open at the same time)";
    const defaultValueSingleItemOpen = false;
    const valueSingleItemOpen = boolean(
      labelSingleItemOpen,
      defaultValueSingleItemOpen
    );

    //Max Width
    const labelMaxWidth = "Max Width (default: 100%)";
    const defaultValueMaxWidth = "100%";
    const valueMaxWidth = text(labelMaxWidth, defaultValueMaxWidth);

    //No padding
    const labelNoPadding = "No padding";
    const defaultValueNoPadding = false;
    const valueNoPadding = boolean(labelNoPadding, defaultValueNoPadding);

    //One item disabled
    const labelSingleItemDisabled = "Disabled (first item on this example)";
    const defaultValueSingleItemDisabled = false;
    const valueSingleItemDisabled = boolean(
      labelSingleItemDisabled,
      defaultValueSingleItemDisabled
    );

    //All items disabled
    const labelAllDisabled =
      "All items disabled (by setting 'disabled' on the accordion-container component)";
    const defaultValueAllDisabled = false;
    const valueAllDisabled = boolean(labelAllDisabled, defaultValueAllDisabled);

    function singleItemOpen() {
      if (valueSingleItemOpen) {
        return "single-item-open";
      } else {
        return "";
      }
    }

    function allDisabled() {
      if (valueAllDisabled) {
        return "disabled";
      }
    }

    function singleDisabled() {
      if (valueSingleItemDisabled) {
        return "disabled";
      }
    }

    function initialState() {
      if (valueInitialState === true) {
        return "open";
      }
    }

    function noPadding() {
      if (valueNoPadding) {
        return "no-padding";
      }
    }

    return `<style>#root {width: 700px; display:flex; justify-content: center;}</style>
  <gxg-accordion ${allDisabled()} ${singleItemOpen()} ${noPadding()} mode="slim" max-width="${valueMaxWidth}">
    <gxg-accordion-item status="${initialState()}" item-title="${valueTitle}" item-id="tab 1" ${singleDisabled()}>${valueContent}</gxg-accordion-item>
    <gxg-accordion-item item-title="J.K. Rowling" item-id="tab 2">“If you want to know what a man's like, take a good look at how he
    treats his inferiors, not his equals.” ― J.K. Rowling, Harry Potter and
    the Goblet of Fire</gxg-accordion-item> 
    <gxg-accordion-item item-title="Maya Angelou" item-id="tab 3">“I've learned that people will forget what you said, people will forget
    what you did, but people will never forget how you made them feel.” ―
    Maya Angelou</gxg-accordion-item>
  </gxg-accordion>`;
  })
  .add("Minimal", () => {
    //Title
    const labelTitle = "Title (first item on this example)";
    const defaultValueTitle = "Dr. Seuss";
    const valueTitle = text(labelTitle, defaultValueTitle);

    //Content
    const labelValueContent = "Content (first item on this example)";
    const defaultValueContent =
      "“You know you're in love when you can't fall asleep because reality is finally better than your dreams.”― Dr. Seuss";
    const valueContent = text(labelValueContent, defaultValueContent);

    //Initial State
    const labelInitialState = "Opened by default (first item on this example)";
    const defaultValueInitialState = false;
    const valueInitialState = boolean(
      labelInitialState,
      defaultValueInitialState
    );

    //Single Item Open
    const labelSingleItemOpen =
      "Single Item Open (only one accordion can be open at the same time)";
    const defaultValueSingleItemOpen = false;
    const valueSingleItemOpen = boolean(
      labelSingleItemOpen,
      defaultValueSingleItemOpen
    );

    //Max Width
    const labelMaxWidth = "Max Width (default: 100%)";
    const defaultValueMaxWidth = "100%";
    const valueMaxWidth = text(labelMaxWidth, defaultValueMaxWidth);

    //No padding
    const labelNoPadding = "No padding";
    const defaultValueNoPadding = false;
    const valueNoPadding = boolean(labelNoPadding, defaultValueNoPadding);

    //One item disabled
    const labelSingleItemDisabled = "Disabled (first item on this example)";
    const defaultValueSingleItemDisabled = false;
    const valueSingleItemDisabled = boolean(
      labelSingleItemDisabled,
      defaultValueSingleItemDisabled
    );

    //All items disabled
    const labelAllDisabled =
      "All items disabled (by setting 'disabled' on the accordion-container component)";
    const defaultValueAllDisabled = false;
    const valueAllDisabled = boolean(labelAllDisabled, defaultValueAllDisabled);

    function singleItemOpen() {
      if (valueSingleItemOpen) {
        return "single-item-open";
      } else {
        return "";
      }
    }

    function allDisabled() {
      if (valueAllDisabled) {
        return "disabled";
      }
    }

    function singleDisabled() {
      if (valueSingleItemDisabled) {
        return "disabled";
      }
    }

    function initialState() {
      if (valueInitialState === true) {
        return "open";
      }
    }

    function noPadding() {
      if (valueNoPadding) {
        return "no-padding";
      }
    }

    return `<style>#root {width: 700px; display:flex; justify-content: center;}</style>
  <gxg-accordion ${allDisabled()} ${singleItemOpen()} ${noPadding()} mode="minimal" max-width="${valueMaxWidth}">
    <gxg-accordion-item status="${initialState()}" item-title="${valueTitle}" item-id="tab 1" ${singleDisabled()}>${valueContent}</gxg-accordion-item>
    <gxg-accordion-item item-title="J.K. Rowling" item-id="tab 2">“If you want to know what a man's like, take a good look at how he
    treats his inferiors, not his equals.” ― J.K. Rowling, Harry Potter and
    the Goblet of Fire</gxg-accordion-item> 
    <gxg-accordion-item item-title="Maya Angelou" item-id="tab 3">“I've learned that people will forget what you said, people will forget
    what you did, but people will never forget how you made them feel.” ―
    Maya Angelou</gxg-accordion-item>
  </gxg-accordion>`;
  })
  .add("Classcial nested", () => {
    return `<style>#root {width: 700px; display:flex; justify-content: center;}</style>
    <gxg-accordion mode="classical">
      <gxg-accordion-item item-title="fruits" item-id="fruits">
        <gxg-accordion mode="slim">
          <gxg-accordion-item item-title="apple" item-id="apple">
            An apple is an edible fruit produced by an apple tree (Malus domestica). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found today.
          </gxg-accordion-item>
          <gxg-accordion-item item-title="banana" item-id="banana">
            A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa. 
          </gxg-accordion-item>
          <gxg-accordion-item item-title="mango" item-id="mango">
            A mango is a juicy stone fruit (drupe) produced from numerous species of tropical trees belonging to the flowering plant genus Mangifera.
          </gxg-accordion-item>
      </gxg-accordion>
      </gxg-accordion-item>
      <gxg-accordion-item item-title="vegetables" item-id="vegetables">
        <gxg-accordion mode="slim">
        <gxg-accordion-item item-title="lettuce" item-id="lettuce">
          Lettuce (Lactuca sativa) is an annual plant of the daisy family, Asteraceae. It is most often grown as a leaf vegetable, but sometimes for its stem and seeds.
        </gxg-accordion-item>
        <gxg-accordion-item item-title="carrot" item-id="carrot">
          The carrot (Daucus carota subsp. sativus) is a root vegetable, usually orange in colour, though purple, black, red, white, and yellow cultivars exist. 
        </gxg-accordion-item>
        <gxg-accordion-item item-title="onion" item-id="onion">
          The onion also known as the bulb onion or common onion, is a vegetable that is the most widely cultivated species of the genus Allium.
        </gxg-accordion-item>
        </gxg-accordion>
      </gxg-accordion-item>
  </gxg-accordion>`;
  })
  .add("Boxed nested", () => {
    return `<style>#root {width: 700px; display:flex; justify-content: center;}</style>
    <gxg-accordion mode="boxed">
      <gxg-accordion-item item-title="fruits" item-id="fruits">
        <gxg-accordion mode="slim">
          <gxg-accordion-item item-title="apple" item-id="apple">
            An apple is an edible fruit produced by an apple tree (Malus domestica). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found today.
          </gxg-accordion-item>
          <gxg-accordion-item item-title="banana" item-id="banana">
            A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa. 
          </gxg-accordion-item>
          <gxg-accordion-item item-title="mango" item-id="mango">
            A mango is a juicy stone fruit (drupe) produced from numerous species of tropical trees belonging to the flowering plant genus Mangifera.
          </gxg-accordion-item>
      </gxg-accordion>
      </gxg-accordion-item>
      <gxg-accordion-item item-title="vegetables" item-id="vegetables">
        <gxg-accordion mode="slim">
        <gxg-accordion-item item-title="lettuce" item-id="lettuce">
          Lettuce (Lactuca sativa) is an annual plant of the daisy family, Asteraceae. It is most often grown as a leaf vegetable, but sometimes for its stem and seeds.
        </gxg-accordion-item>
        <gxg-accordion-item item-title="carrot" item-id="carrot">
          The carrot (Daucus carota subsp. sativus) is a root vegetable, usually orange in colour, though purple, black, red, white, and yellow cultivars exist. 
        </gxg-accordion-item>
        <gxg-accordion-item item-title="onion" item-id="onion">
          The onion also known as the bulb onion or common onion, is a vegetable that is the most widely cultivated species of the genus Allium.
        </gxg-accordion-item>
        </gxg-accordion>
      </gxg-accordion-item>
  </gxg-accordion>`;
  })
  .add("Classical Subtitle", () => {
    //Subtitle
    const labelValueSubtitle = "Subtitle (attribute)";
    const defaultValueSubtitle = "The best seasonal fruits";
    const valueSubtitle = text(labelValueSubtitle, defaultValueSubtitle);
    return `<style>#root {width: 700px; display:flex; justify-content: center;}</style>
    <gxg-accordion mode="classical">
      <gxg-accordion-item item-title="fruits" item-subtitle="${valueSubtitle}"  item-id="fruits">
        <gxg-accordion mode="slim">
          <gxg-accordion-item item-title="apple" item-id="apple">
            An apple is an edible fruit produced by an apple tree (Malus domestica). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found today.
          </gxg-accordion-item>
          <gxg-accordion-item item-title="banana" item-id="banana">
            A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa. 
          </gxg-accordion-item>
          <gxg-accordion-item item-title="mango" item-id="mango">
            A mango is a juicy stone fruit (drupe) produced from numerous species of tropical trees belonging to the flowering plant genus Mangifera.
          </gxg-accordion-item>
      </gxg-accordion>
      </gxg-accordion-item>
    </gxg-accordion>`;
  })
  .add("Boxed Subtitle", () => {
    //Subtitle
    const labelValueSubtitle = "Subtitle (attribute)";
    const defaultValueSubtitle = "The best seasonal fruits";
    const valueSubtitle = text(labelValueSubtitle, defaultValueSubtitle);
    return `<style>#root {width: 700px; display:flex; justify-content: center;}</style>
    <gxg-accordion mode="boxed">
      <gxg-accordion-item item-title="fruits" item-subtitle="${valueSubtitle}" item-id="fruits">
        <gxg-accordion mode="slim">
          <gxg-accordion-item item-title="apple" item-id="apple">
            An apple is an edible fruit produced by an apple tree (Malus domestica). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found today.
          </gxg-accordion-item>
          <gxg-accordion-item item-title="banana" item-id="banana">
            A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa. 
          </gxg-accordion-item>
          <gxg-accordion-item item-title="mango" item-id="mango">
            A mango is a juicy stone fruit (drupe) produced from numerous species of tropical trees belonging to the flowering plant genus Mangifera.
          </gxg-accordion-item>
      </gxg-accordion>
      </gxg-accordion-item>
    </gxg-accordion>`;
  })
  .add("Classical Meta", () => {
    //Subtitle
    const labelValueMeta = "Meta (slotted content)";
    const defaultValueMeta = "Click to see fruits";
    const valueMeta = text(labelValueMeta, defaultValueMeta);
    return `<style>#root {width: 700px; display:flex; justify-content: center;}</style>
    <gxg-accordion mode="classical">
      <gxg-accordion-item item-title="fruits" item-id="fruits">
        <div slot="meta">${valueMeta}</div>
        <gxg-accordion mode="slim">
          <gxg-accordion-item item-title="apple" item-id="apple">
            An apple is an edible fruit produced by an apple tree (Malus domestica). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found today.
          </gxg-accordion-item>
          <gxg-accordion-item item-title="banana" item-id="banana">
            A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa. 
          </gxg-accordion-item>
          <gxg-accordion-item item-title="mango" item-id="mango">
            A mango is a juicy stone fruit (drupe) produced from numerous species of tropical trees belonging to the flowering plant genus Mangifera.
          </gxg-accordion-item>
      </gxg-accordion>
      </gxg-accordion-item>
    </gxg-accordion>`;
  })
  .add("Boxed Meta", () => {
    //Subtitle
    const labelValueMeta = "Meta (slotted content)";
    const defaultValueMeta = "Click to see fruits";
    const valueMeta = text(labelValueMeta, defaultValueMeta);
    return `<style>#root {width: 700px; display:flex; justify-content: center;}</style>
    <gxg-accordion mode="boxed">
      <gxg-accordion-item item-title="fruits" item-id="fruits">
        <div slot="meta">${valueMeta}</div>
        <gxg-accordion mode="slim">
          <gxg-accordion-item item-title="apple" item-id="apple">
            An apple is an edible fruit produced by an apple tree (Malus domestica). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found today.
          </gxg-accordion-item>
          <gxg-accordion-item item-title="banana" item-id="banana">
            A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa. 
          </gxg-accordion-item>
          <gxg-accordion-item item-title="mango" item-id="mango">
            A mango is a juicy stone fruit (drupe) produced from numerous species of tropical trees belonging to the flowering plant genus Mangifera.
          </gxg-accordion-item>
      </gxg-accordion>
      </gxg-accordion-item>
    </gxg-accordion>`;
  })
  .add("Classical Icon", () => {
    //Subtitle
    const labelIcon = "Icon";
    const defaultValueIcon = "navigation/level-down";
    const iconValue = text(labelIcon, defaultValueIcon);
    return `<style>#root {width: 700px; display:flex; justify-content: center;}</style>
    <gxg-accordion mode="classical">
      <gxg-accordion-item title-icon=${iconValue} item-title="fruits" item-id="fruits">
        <gxg-accordion mode="slim">
          <gxg-accordion-item item-title="apple" item-id="apple">
            An apple is an edible fruit produced by an apple tree (Malus domestica). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found today.
          </gxg-accordion-item>
          <gxg-accordion-item item-title="banana" item-id="banana">
            A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa. 
          </gxg-accordion-item>
          <gxg-accordion-item item-title="mango" item-id="mango">
            A mango is a juicy stone fruit (drupe) produced from numerous species of tropical trees belonging to the flowering plant genus Mangifera.
          </gxg-accordion-item>
      </gxg-accordion>
      </gxg-accordion-item>
    </gxg-accordion>`;
  })
  .add("Boxed Icon", () => {
    //Subtitle
    const labelIcon = "Icon";
    const defaultValueIcon = "navigation/level-down";
    const iconValue = text(labelIcon, defaultValueIcon);
    return `<style>#root {width: 700px; display:flex; justify-content: center;}</style>
    <gxg-accordion mode="boxed">
      <gxg-accordion-item title-icon=${iconValue} item-title="fruits" item-id="fruits">
        <gxg-accordion mode="slim">
          <gxg-accordion-item item-title="apple" item-id="apple">
            An apple is an edible fruit produced by an apple tree (Malus domestica). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found today.
          </gxg-accordion-item>
          <gxg-accordion-item item-title="banana" item-id="banana">
            A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa. 
          </gxg-accordion-item>
          <gxg-accordion-item item-title="mango" item-id="mango">
            A mango is a juicy stone fruit (drupe) produced from numerous species of tropical trees belonging to the flowering plant genus Mangifera.
          </gxg-accordion-item>
      </gxg-accordion>
      </gxg-accordion-item>
    </gxg-accordion>`;
  });
