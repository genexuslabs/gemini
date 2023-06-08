import { Component, Host, h, Prop, Listen, Watch } from "@stencil/core";
import { GxOption } from "../../gx-ide-common/definitions";
import { GxgComboBoxItem } from "../combo-box-item/combo-box-item";
import { GxgFormCheckbox } from "../form-checkbox/form-checkbox";

@Component({
  tag: "gx-ide-new-kb",
  styleUrl: "gx-ide-new-kb.scss",
  shadow: true,
})
export class GxIdeNewKb {
  /*
INDEX:
1.BASIC DATA (PROPERTIES)
2.ADVANCED DATA (PROPERTIES)
3.REFERENCES TO DOM ELEMENTS
4.EVENTS (EMMIT)
5.EVENTS (LISTEN)
6.LYFECICLE METHODS
7.CUSTOM METHODS
*/

  /********************
   *  1.BASIC DATA
   ********************/

  /**
   * It allows defining the DBMS that will be used in the solution
   */
  @Prop() readonly dataSources: GxOption[];

  /**
   * It allows selecting multiple generators for the front end
   */
  @Prop() readonly frontEnd: GxOption[];

  /**
   * Specify whether it is feasible to display information related to local configuration parameters
   */
  @Prop() readonly isAdvanced: boolean = false;

  /**
   * Default suggested path to a directory where the information related to the KB will be stored/generated
   */
  @Prop() readonly location: string = "";

  /**
   * The knowledge base default suggested name
   */
  @Prop() readonly name: string = "";

  /**
   * It allows selecting the default environment that the KB will have (additional environments can be created later)
   */
  @Prop() readonly prototypingEnvironments: GxOption[];

  /**
   * Path to a directory where the information related to the KB will be stored/generated
   */
  @Prop() readonly prototypingTargets: GxOption[];

  /**
   * Specify the language in which the application screens will be developed (default language)
   */
  @Prop() readonly UILanguages: GxOption[];

  /********************
   *  2.ADVANCED DATA
   ********************/
  /**
   * Defines the type of authentication for the connection to the previously defined database
   */
  @Prop() readonly authenticationTypes: GxOption[];

  /**
   * DB Collations
   */
  @Prop() readonly collations: GxOption[];

  /**
   * Disabled if the first item of the 'Server Name' combo is selected
   */
  @Prop() readonly createDatafilesInKBFolder: boolean = false;

  /**
   * Name of the database where we are going to persist the information of our KB
   */
  @Prop() readonly databaseName: string;

  /**
   * Password for the database connection. Visible if the Authentication Type is different from Windows Authentication (first item of the combo)
   */
  @Prop() readonly password: string;

  /**
   * Visible if something other than Windows Authentication is selected
   */
  @Prop() readonly savePassword: boolean = false;

  /**
   * Name of the DB server where we want to persist the information of our KB
   */
  @Prop() readonly serverNames: GxOption[];

  /**
   * Username for the database connection. Visible if the Authentication Type is different from Windows Authentication (first item of the combo)
   */
  @Prop() readonly userName: string;

  /**
   * The dialog visibility
   */
  @Prop({ mutable: true }) visible = false;

  /*******************************
   *  3.REFERENCES TO DOM ELEMENTS
   ******************************/
  firstElement!: HTMLElement;

  /********************
   *  4.EVENTS (EMMIT)
   ********************/

  /********************
   *  5.EVENTS (LISTEN)
   ********************/

  @Listen("modalClosed")
  modalClosedHandler(event: CustomEvent<boolean>): void {
    if (event.detail) {
      this.visible = false;
    }
  }

  @Listen("modalOpened")
  modalOpenedHandler(event: CustomEvent<boolean>): void {
    if (event.detail) {
      this.firstElement.focus();
    }
  }

  /********************
   *  6.LYFECICLE METHODS
   ********************/
  componentDidLoad(): void {
    //console.log("this.serverNames", this.serverNames);
  }

  /********************
   *  7.CUSTOM METHODS
   ********************/

  createOptions(
    propertyType: string,
    componentType:
      | "gxg-combo-box-item"
      | "gxg-form-checkbox" = "gxg-combo-box-item"
  ): createOptionsArray {
    const optionsArray: createOptionsArray = [];
    let property: Array<GxOption>;
    switch (propertyType) {
      case "prototyping-target":
        property = this.prototypingTargets;
        break;
      case "user-interface-language":
        property = this.UILanguages;
        break;
      case "prototyping-environment":
        property = this.prototypingEnvironments;
        break;
      case "data-source":
        property = this.dataSources;
        break;
      case "front-end":
        property = this.frontEnd;
        break;
      case "server-name":
        property = this.serverNames;
        break;
      case "collation":
        property = this.collations;
        break;
      case "authentication-type":
        property = this.authenticationTypes;
        break;
    }

    if (property?.length) {
      property.forEach((option) => {
        let optionItem: GxgComboBoxItem | GxgFormCheckbox = null;
        if (componentType === "gxg-combo-box-item") {
          optionItem = (
            <gxg-combo-box-item value={option.id}>
              {option.text}
            </gxg-combo-box-item>
          );
        } else if (componentType === "gxg-form-checkbox") {
          optionItem = (
            <gxg-form-checkbox
              label={option.text}
              id={option.id}
              iconName={option.iconName}
            ></gxg-form-checkbox>
          );
        }
        optionsArray.push(optionItem);
      });
    }
    return optionsArray;
  }

  selectLocation(): void {
    console.log("select directory");
  }

  render(): void {
    return (
      <Host>
        <gxg-modal
          id="modal"
          modal-title="New Knowledge Base"
          visible={this.visible}
          width="calc(100% - 16px)"
          max-width="600px"
          flavor="alternate"
        >
          <div class="wrapper">
            <header class="header">
              <div class="header__item header__item--left-1">
                <label htmlFor="kb-name">Name:</label>
              </div>
              <div class="header__item header__item--middle-1">
                <gxg-form-text
                  label-position="start"
                  placeholder="Knowledge Base"
                  id="kb-name"
                  max-width="100%"
                  value={this.name}
                  ref={(el) => (this.firstElement = el as HTMLElement)}
                ></gxg-form-text>
              </div>
              <div class="header__item header__item--right-1"></div>
              <div class="header__item header__item--left-2">
                <label htmlFor="kb-name">Location:</label>
              </div>
              <div class="header__item header__item--middle-2">
                <gxg-form-text
                  label-position="start"
                  placeholder="C:\Models"
                  id="kb-name"
                  max-width="100%"
                  value={this.location}
                ></gxg-form-text>
              </div>
              <div class="header__item header__item--right-2">
                <gxg-button
                  type="secondary-icon-only"
                  icon="gemini-tools/folder"
                  onClick={this.selectLocation.bind(this)}
                ></gxg-button>
              </div>
            </header>
            <main class="main">
              <gxg-tabs height="100%" position="top" id="gxgTabs">
                <gxg-tab-bar slot="tab-bar">
                  <gxg-tab-button
                    slot="tab-bar"
                    tab-label="basic"
                    tab="basic"
                    is-selected
                  ></gxg-tab-button>
                  <gxg-tab-button
                    slot="tab-bar"
                    tab-label="advanced"
                    tab="advanced"
                  ></gxg-tab-button>
                </gxg-tab-bar>
                <gxg-tab tab="basic" no-padding>
                  <div class="tab-container basic__container">
                    <div class="basic__box basic__box--top">
                      <gxg-combo-box
                        id="prototyping-target"
                        disable-filter
                        width="100%"
                        label="Prototyping Target"
                        value={this.prototypingTargets[0]["id"]}
                      >
                        {this.createOptions("prototyping-target")}
                      </gxg-combo-box>

                      <gxg-combo-box
                        id="user-interface-language"
                        disable-filter
                        width="100%"
                        label="User Interface Language"
                        value={this.UILanguages[0]["id"]}
                      >
                        {this.createOptions("user-interface-language")}
                      </gxg-combo-box>
                    </div>
                    <div class="basic__box basic__box--left">
                      <header class="section__header">
                        <gxg-title type="title-04" class="large hydrated">
                          Back End
                        </gxg-title>
                      </header>
                      <div class="basic__box-inner-wrapper">
                        <gxg-combo-box
                          id="prototyping-environment"
                          disable-filter
                          width="100%"
                          label="Prototyping Environment"
                          value={this.prototypingEnvironments[0]["id"]}
                        >
                          {this.createOptions("prototyping-environment")}
                        </gxg-combo-box>

                        <gxg-combo-box
                          label="Data Source"
                          id="user-interface-language"
                          disable-filter
                          width="100%"
                          value={this.dataSources[0]["id"]}
                        >
                          {this.createOptions("data-source")}
                        </gxg-combo-box>
                      </div>
                    </div>
                    <div class="basic__box basic__box--right">
                      <header class="section__header">
                        <gxg-title type="title-04" class="large hydrated">
                          Front End
                        </gxg-title>
                      </header>
                      <div class="basic__box-inner-wrapper basic__box-inner-wrapper--smaller-gap">
                        {this.createOptions("front-end", "gxg-form-checkbox")}
                      </div>
                    </div>
                  </div>
                </gxg-tab>
                <gxg-tab tab="advanced" no-padding>
                  <div class="tab-container advanced__container">
                    <header class="advanced__box advanced__box--top section__header">
                      <gxg-title type="title-04" class="large hydrated">
                        Knowledge Base Storage
                      </gxg-title>
                    </header>
                    <div class="advanced__box advanced__box--left">
                      <div class="advanced__box--left__inner-wrapper">
                        <gxg-combo-box
                          label="Server Name"
                          id="server-name"
                          disable-filter
                          width="100%"
                          value="Select a server name"
                          class="row1-left"
                        >
                          {this.createOptions("server-name")}
                        </gxg-combo-box>
                        <gxg-button
                          type="secondary-icon-only"
                          icon="gemini-tools/search"
                          class="row1-right"
                        ></gxg-button>
                        <gxg-form-text
                          label-position="above"
                          label="Database Name"
                          placeholder="MyDatabase"
                          id="database-name"
                          max-width="100%"
                          class="row2-left"
                        ></gxg-form-text>
                        <gxg-combo-box
                          label="Collations"
                          id="collations"
                          disable-filter
                          width="100%"
                          class="row3-left"
                          value={this.collations[0]["id"]}
                        >
                          {this.createOptions("collation")}
                        </gxg-combo-box>
                        <gxg-button
                          type="secondary-icon-only"
                          icon="gemini-tools/reset"
                          class="row3-right"
                        ></gxg-button>
                        <gxg-form-checkbox
                          label="Create datafiles in Knowledge Base folder"
                          id="web-net"
                          class="row4-left"
                        ></gxg-form-checkbox>
                      </div>
                    </div>
                    <div class="advanced__box advanced__box--right">
                      <div class="advanced__box--right__inner-wrapper">
                        <gxg-combo-box
                          label="Authentication Type"
                          id="authentication-type"
                          disable-filter
                          width="100%"
                          value={this.authenticationTypes[0]["id"]}
                          class="row1-left"
                        >
                          {this.createOptions("authentication-type")}
                        </gxg-combo-box>
                        <gxg-form-text
                          label-position="above"
                          label="User name"
                          id="user-name"
                          max-width="100%"
                          class="row2-left"
                        ></gxg-form-text>
                        <gxg-form-text
                          label-position="above"
                          label="Password"
                          id="password"
                          max-width="100%"
                          class="row3-left"
                          password
                        ></gxg-form-text>
                        <gxg-form-checkbox
                          label="Save password"
                          id="save-password"
                          class="row4-left"
                        ></gxg-form-checkbox>
                      </div>
                    </div>
                  </div>
                </gxg-tab>
              </gxg-tabs>
            </main>
          </div>
          <gxg-button id="button-create" slot="footer" type="primary-text-only">
            Create
          </gxg-button>
          <gxg-button id="button-cancel" slot="footer" type="outlined">
            Cancel
          </gxg-button>
          <gxg-spacer-one slot="footer" space="xs"></gxg-spacer-one>
        </gxg-modal>
      </Host>
    );
  }
}

type createOptionsArray = (GxgComboBoxItem | GxgFormCheckbox)[];
