import {
  Component,
  Host,
  h,
  Prop,
  Listen,
  Event,
  EventEmitter,
} from "@stencil/core";
import { GxOption } from "../../gx-ide-common/definitions";
import { GxgComboBoxItem } from "../combo-box-item/combo-box-item";
import { GxgFormCheckbox } from "../form-checkbox/form-checkbox";
import { GxgFormText } from "../form-text/form-text";
import { GxgComboBox } from "../combo-box/combo-box";

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
  @Prop({ mutable: true }) location: string | undefined = undefined;

  /**
   * This is a function provided by the developer that returns a string, with the location path.
   */
  @Prop() readonly locationFunction: locationFunction = undefined;

  /**
   * The knowledge base default suggested name
   */
  @Prop() readonly kbName: string = "";

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
  /*References needed to collect data con "Create" button submit*/
  nameEl!: GxgFormText;
  locationEl!: GxgFormText;
  prototypingTargetEl!: GxgComboBox;
  userInterfaceLanguageEl!: GxgComboBox;
  prototypingEnvironmentEl!: GxgComboBox;
  dataSourceEl!: GxgComboBox;
  frontEndBoxEl!: HTMLElement;
  private frontEndOptionsArray: Array<any>; /*There are multiple checkboxes*/
  serverNameEl!: GxgComboBox;
  databaseNameEl!: GxgFormText;
  collationEl!: GxgComboBox;
  createDataFilesInKBFolderEl!: GxgFormCheckbox;
  authenticationTypeEl!: GxgComboBox;
  userNameEl!: GxgFormText;
  passwordEl!: GxgFormText;
  savePasswordEl!: GxgFormCheckbox;

  /********************
   *  4.EVENTS (EMMIT)
   ********************/

  /**
   * This event emmits the data needed to create a new kb
   */
  @Event() createKb: EventEmitter<NewKBData>;

  /********************
   *  5.EVENTS (LISTEN)
   ********************/

  @Listen("validationErrorMessage")
  validationErrorMessageHandler(event): void {
    console.log("message", event.detail);
  }

  /********************
   *  6.LYFECICLE METHODS
   ********************/
  componentDidLoad(): void {
    ((this.nameEl as unknown) as HTMLElement).focus();
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
    this.location = this.locationFunction();
  }

  getFrontEndOptionsValues() {
    this.frontEndOptionsArray = [];
    const FrontEndOptions = this.frontEndBoxEl.querySelectorAll(
      "gxg-form-checkbox"
    );
    FrontEndOptions?.forEach((FrontEndOption) => {
      this.frontEndOptionsArray.push({
        id: FrontEndOption.id,
        checked: FrontEndOption.checked,
      });
    });
    return this.frontEndOptionsArray;
  }

  createKbHandler() {
    this.createKb.emit({
      data: {
        kbName: this.nameEl.value,
        location: this.locationEl.value,
        prototypingTarget: this.prototypingEnvironmentEl.value,
        userInterfaceLanguage: this.userInterfaceLanguageEl.value,
        prototypingEnvironment: this.prototypingEnvironmentEl.value,
        dataSource: this.dataSourceEl.value,
        frontEnd: this.getFrontEndOptionsValues(),
        serverName: this.serverNameEl.value,
        databaseName: this.databaseNameEl.value,
        collation: this.collationEl.value,
        createDataFilesInKBFolder: this.createDataFilesInKBFolderEl.checked,
        authenticationType: this.authenticationTypeEl.value,
        userName: this.userNameEl.value,
        password: this.passwordEl.value,
        savePassword: this.savePasswordEl.checked,
      },
    });
  }

  render(): void {
    return (
      <Host>
        <div class="wrapper">
          <header
            class={{
              header: true,
              "header--no-location-folder": !this.locationFunction,
            }}
          >
            <div class="header__item header__item--left-1">
              <label htmlFor="kb-name">Name:</label>
            </div>
            <div class="header__item header__item--middle-1">
              <gxg-form-text
                label-position="start"
                placeholder="Knowledge Base"
                id="kb-name"
                max-width="100%"
                value={this.kbName}
                ref={(el) => (this.nameEl = (el as unknown) as GxgFormText)}
              ></gxg-form-text>
            </div>
            <div
              class={{
                ["header__item"]: true,
                "header__item--right-1": !this.locationFunction,
                hidden: !this.locationFunction,
              }}
            ></div>
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
                ref={(el) => (this.locationEl = (el as unknown) as GxgFormText)}
              ></gxg-form-text>
            </div>
            <div
              class={{
                ["header__item"]: true,
                "header__item--right-2": !this.locationFunction,
                hidden: !this.locationFunction,
              }}
            >
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
                  disabled={!this.isAdvanced}
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
                      ref={(el) =>
                        (this.prototypingTargetEl = (el as unknown) as GxgComboBox)
                      }
                    >
                      {this.createOptions("prototyping-target")}
                    </gxg-combo-box>

                    <gxg-combo-box
                      id="user-interface-language"
                      disable-filter
                      width="100%"
                      label="User Interface Language"
                      value={this.UILanguages[0]["id"]}
                      ref={(el) =>
                        (this.userInterfaceLanguageEl = (el as unknown) as GxgComboBox)
                      }
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
                        ref={(el) =>
                          (this.prototypingEnvironmentEl = (el as unknown) as GxgComboBox)
                        }
                      >
                        {this.createOptions("prototyping-environment")}
                      </gxg-combo-box>

                      <gxg-combo-box
                        label="Data Source"
                        id="data-source"
                        disable-filter
                        width="100%"
                        value={this.dataSources[0]["id"]}
                        ref={(el) =>
                          (this.dataSourceEl = (el as unknown) as GxgComboBox)
                        }
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
                    <div
                      class="basic__box-inner-wrapper basic__box-inner-wrapper--smaller-gap"
                      ref={(el) => (this.frontEndBoxEl = el as HTMLElement)}
                    >
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
                        ref={(el) =>
                          (this.serverNameEl = (el as unknown) as GxgComboBox)
                        }
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
                        ref={(el) =>
                          (this.databaseNameEl = (el as unknown) as GxgFormText)
                        }
                      ></gxg-form-text>
                      <gxg-combo-box
                        label="Collation"
                        id="collation"
                        disable-filter
                        width="100%"
                        class="row3-left"
                        value={this.collations[0]["id"]}
                        ref={(el) =>
                          (this.collationEl = (el as unknown) as GxgComboBox)
                        }
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
                        ref={(el) =>
                          (this.createDataFilesInKBFolderEl = (el as unknown) as GxgFormCheckbox)
                        }
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
                        ref={(el) =>
                          (this.authenticationTypeEl = (el as unknown) as GxgComboBox)
                        }
                      >
                        {this.createOptions("authentication-type")}
                      </gxg-combo-box>
                      <gxg-form-text
                        label-position="above"
                        label="User name"
                        id="user-name"
                        max-width="100%"
                        class="row2-left"
                        ref={(el) =>
                          (this.userNameEl = (el as unknown) as GxgFormText)
                        }
                      ></gxg-form-text>
                      <gxg-form-text
                        label-position="above"
                        label="Password"
                        id="password"
                        max-width="100%"
                        class="row3-left"
                        password
                        ref={(el) =>
                          (this.passwordEl = (el as unknown) as GxgFormText)
                        }
                      ></gxg-form-text>
                      <gxg-form-checkbox
                        label="Save password"
                        id="save-password"
                        class="row4-left"
                        ref={(el) =>
                          (this.savePasswordEl = (el as unknown) as GxgFormCheckbox)
                        }
                      ></gxg-form-checkbox>
                    </div>
                  </div>
                </div>
              </gxg-tab>
            </gxg-tabs>
          </main>
        </div>
        <footer class="footer">
          <gxg-button
            id="button-create"
            slot="footer"
            type="primary-text-only"
            onClick={this.createKbHandler.bind(this)}
          >
            Create
          </gxg-button>
          <gxg-button id="button-cancel" slot="footer" type="outlined">
            Cancel
          </gxg-button>
        </footer>
      </Host>
    );
  }
}

type createOptionsArray = (GxgComboBoxItem | GxgFormCheckbox)[];
export type locationFunction = () => string | undefined | null;
export interface NewKBData {
  data: {
    kbName: string;
    location: string;
    prototypingTarget: string;
    userInterfaceLanguage: string;
    prototypingEnvironment: string;
    dataSource: string;
    frontEnd: string[];
    serverName: string;
    databaseName: string;
    collation: string;
    createDataFilesInKBFolder: boolean;
    authenticationType: string;
    userName: string;
    password: string;
    savePassword: boolean;
  };
}
