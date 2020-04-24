/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */

import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { AlertPosition, AlertType } from "./components/alert/alert";
import { ButtonType } from "./components/button/button";
import { TitleAlignment } from "./components/button-group/button-group";
import { ShadowType } from "./components/card/card";
import { MessageType } from "./components/form-message/form-message";
import { IconType } from "./components/icon/icon";
import { IconPositionType } from "./components/form-text/form-text";
import { Color, IconType as IconType1, Size } from "./components/icon/icon";
import { footerAlignmentType } from "./components/modal/modal";

export namespace Components {
  interface GxgAlert {
    /**
     * Wether the alert is active (visible) or not (not visible).
     */
    active: boolean;
    /**
     * The amount of miliseconds the alert is visible before hidding under the document.
     */
    activeTime: number;
    /**
     * The alert title (optional)
     */
    alertTitle: string;
    /**
     * The alert bottom position value
     */
    bottom: string;
    /**
     * The alert left position value
     */
    left: string;
    /**
     * The alert position.
     */
    position: AlertPosition;
    /**
     * The alert right position value
     */
    right: string;
    /**
     * The type of alert
     */
    type: AlertType;
    /**
     * The alert width
     */
    width: string;
  }
  interface GxgBox {
    height: string;
    /**
     * The card box-shadow value possible values: from 1 to 8
     */
    shadow: number;
    width: string;
  }
  interface GxgButton {
    /**
     * The state of the button. Whether is disabled or not.
     */
    disabled: boolean;
    /**
     * The kind of button
     */
    type: ButtonType;
  }
  interface GxgButtonGroup {
    /**
     * The title that will show up above the buttons group
     */
    buttonGroupTitle: string;
    /**
     * The id of the button that you would like to show active by default
     */
    defaultSelectedBtnId: string;
    /**
     * The main title alignment
     */
    titleAlignment: TitleAlignment;
  }
  interface GxgCard {
    /**
     * The card box-shadow value possible values: from 1 to 8
     */
    shadow: ShadowType;
    width: string;
  }
  interface GxgFormCheckbox {
    /**
     * Checkbox id
     */
    checkboxId: string;
    /**
     * Checkbox checked
     */
    checked: boolean;
    /**
     * Checkbox disabled
     */
    disabled: boolean;
    /**
     * Inline-flex display
     */
    inlineFlex: boolean;
    /**
     * Checkbox label
     */
    label: string;
    /**
     * Checkbox name
     */
    name: string;
    /**
     * Checkbox value
     */
    value: string;
  }
  interface GxgFormMessage {
    /**
     * The kind of message Possible values: error, warning
     */
    type: MessageType;
  }
  interface GxgFormRadio {
    /**
     * Radio id
     */
    RadioId: string;
    /**
     * Radio selected
     */
    checked: boolean;
    /**
     * Radio disabled
     */
    disabled: boolean;
    /**
     * Radio label
     */
    label: string;
    /**
     * Radio name
     */
    name: string;
    /**
     * Radio value
     */
    value: string;
  }
  interface GxgFormRadioWrapper {
    /**
     * Selected Radio id
     */
    RadioId: string;
    /**
     * Selected Radio value
     */
    RadioValue: string;
    /**
     * Inline-flex display
     */
    inlineFlex: boolean;
  }
  interface GxgFormSelect {
    /**
     * If select is disabled
     */
    disabled: boolean;
    /**
     * If select has errors
     */
    error: boolean;
    /**
     * If select is full width
     */
    fullWidth: boolean;
    /**
     * Inline-flex display
     */
    inlineFlex: boolean;
    /**
     * The select label
     */
    label: string;
    /**
     * The maximum number of visible options (scroll will apear if the total number exceeds this value)
     */
    maxVisibleOptions: string;
    /**
     * The select name
     */
    name: string;
    /**
     * The select id
     */
    selectId: string;
    /**
     * The selected option
     */
    value: string;
    /**
     * If select has warnings
     */
    warning: boolean;
    /**
     * The select width
     */
    width: string;
  }
  interface GxgFormText {
    /**
     * If input is disabled
     */
    disabled: boolean;
    /**
     * If input has errors
     */
    error: boolean;
    /**
     * If input is full width
     */
    fullWidth: boolean;
    /**
     * Input icon possible values: the same as the values for the icon component
     */
    icon: IconType;
    /**
     * Input icon side possible values: left, right
     */
    iconPosition: IconPositionType;
    /**
     * Inline-flex display
     */
    inlineFlex: boolean;
    /**
     * The input id
     */
    inputId: string;
    /**
     * The input label
     */
    label: string;
    /**
     * The input name
     */
    name: string;
    /**
     * The input placeholder
     */
    placeholder: string;
    /**
     * The input value
     */
    value: string;
    /**
     * If input has warning
     */
    warning: boolean;
    /**
     * input width
     */
    width: string;
  }
  interface GxgFormTextarea {
    /**
     * Number of cols
     */
    cols: number;
    /**
     * If textarea is disabled
     */
    disabled: boolean;
    /**
     * If textarea display is block
     */
    displayBlock: boolean;
    /**
     * If textarea has errors
     */
    error: boolean;
    /**
     * If textarea is full width
     */
    fullWidth: boolean;
    /**
     * The textarea label
     */
    label: string;
    /**
     * The textarea name
     */
    name: string;
    /**
     * The textarea placeholder
     */
    placeholder: string;
    /**
     * Number of cols
     */
    rows: number;
    /**
     * The textarea id
     */
    textareaId: string;
    /**
     * The textarea value
     */
    value: string;
    /**
     * If textarea has warnings
     */
    warning: boolean;
  }
  interface GxgIcon {
    /**
     * The color of the icon.
     */
    color: Color;
    /**
     * If enabled, the icon will be loaded lazily when it's visible in the viewport.
     */
    lazy: boolean;
    /**
     * The size of the icon. Possible values: regular, small.
     */
    size: Size;
    /**
     * The type of icon. Possible values: each of the icons in /assets.
     */
    type: IconType;
  }
  interface GxgMenu {
    fullWidth: boolean;
    tabs: boolean;
    title: string;
    width: string;
  }
  interface GxgMenuItem {
    active: boolean;
    icon: IconType;
    label: string;
  }
  interface GxgModal {
    /**
     * The footer alignment
     */
    footerAlignment: footerAlignmentType;
    /**
     * The modal title
     */
    modalTitle: string;
    /**
     * Wether the modal is visible or not
     */
    visible: boolean;
    /**
     * The modal width
     */
    width: string;
    /**
     * z-index
     */
    zIndex: string;
  }
  interface GxgProgressBar {
    /**
     * The state of the toggle. Whether is disabled or not.
     */
    disabled: boolean;
    /**
     * The label
     */
    label: string;
    /**
     * The value (percentage)
     */
    value: number;
    /**
     * The width
     */
    width: string;
  }
  interface GxgSlider {
    /**
     * The state of the toggle. Whether is disabled or not. Possible values: false, true
     */
    disabled: boolean;
    /**
     * The label
     */
    label: string;
    /**
     * The max value
     */
    max: number;
    /**
     * The initial value
     */
    value: number;
    /**
     * The slider width
     */
    width: string;
  }
  interface GxgStepper {
    /**
     * The state of the toggle. Whether is disabled or not.
     */
    disabled: boolean;
    /**
     * Inline-flex display
     */
    inlineFlex: boolean;
    /**
     * The toggle label
     */
    label: string;
    /**
     * The max value
     */
    max: number;
    /**
     * The min value
     */
    min: number;
    /**
     * The initial vaule
     */
    value: number;
  }
  interface GxgTab {
    isSelected: boolean;
    tab: string;
  }
  interface GxgTabBar {}
  interface GxgTabButton {
    disabled: boolean;
    icon: IconType;
    isSelected: boolean;
    tab: string;
    tabLabel: string;
  }
  interface GxgTabs {
    tab: string;
  }
  interface GxgTemplate {
    /**
     * The state of the toggle. Whether is disabled or not. Possible values: false, true
     */
    disabled: boolean;
    /**
     * The toggle label
     */
    label: string;
  }
  interface GxgToggle {
    /**
     * The state of the toggle. Whether is disabled or not.
     */
    disabled: boolean;
    /**
     * Inline-flex display
     */
    inlineFlex: boolean;
    /**
     * The label
     */
    label: string;
    /**
     * If the toggle is active or not
     */
    on: boolean;
  }
}

declare global {
  interface HTMLGxgAlertElement
    extends Components.GxgAlert,
      HTMLStencilElement {}
  var HTMLGxgAlertElement: {
    prototype: HTMLGxgAlertElement;
    new (): HTMLGxgAlertElement;
  };

  interface HTMLGxgBoxElement extends Components.GxgBox, HTMLStencilElement {}
  var HTMLGxgBoxElement: {
    prototype: HTMLGxgBoxElement;
    new (): HTMLGxgBoxElement;
  };

  interface HTMLGxgButtonElement
    extends Components.GxgButton,
      HTMLStencilElement {}
  var HTMLGxgButtonElement: {
    prototype: HTMLGxgButtonElement;
    new (): HTMLGxgButtonElement;
  };

  interface HTMLGxgButtonGroupElement
    extends Components.GxgButtonGroup,
      HTMLStencilElement {}
  var HTMLGxgButtonGroupElement: {
    prototype: HTMLGxgButtonGroupElement;
    new (): HTMLGxgButtonGroupElement;
  };

  interface HTMLGxgCardElement extends Components.GxgCard, HTMLStencilElement {}
  var HTMLGxgCardElement: {
    prototype: HTMLGxgCardElement;
    new (): HTMLGxgCardElement;
  };

  interface HTMLGxgFormCheckboxElement
    extends Components.GxgFormCheckbox,
      HTMLStencilElement {}
  var HTMLGxgFormCheckboxElement: {
    prototype: HTMLGxgFormCheckboxElement;
    new (): HTMLGxgFormCheckboxElement;
  };

  interface HTMLGxgFormMessageElement
    extends Components.GxgFormMessage,
      HTMLStencilElement {}
  var HTMLGxgFormMessageElement: {
    prototype: HTMLGxgFormMessageElement;
    new (): HTMLGxgFormMessageElement;
  };

  interface HTMLGxgFormRadioElement
    extends Components.GxgFormRadio,
      HTMLStencilElement {}
  var HTMLGxgFormRadioElement: {
    prototype: HTMLGxgFormRadioElement;
    new (): HTMLGxgFormRadioElement;
  };

  interface HTMLGxgFormRadioWrapperElement
    extends Components.GxgFormRadioWrapper,
      HTMLStencilElement {}
  var HTMLGxgFormRadioWrapperElement: {
    prototype: HTMLGxgFormRadioWrapperElement;
    new (): HTMLGxgFormRadioWrapperElement;
  };

  interface HTMLGxgFormSelectElement
    extends Components.GxgFormSelect,
      HTMLStencilElement {}
  var HTMLGxgFormSelectElement: {
    prototype: HTMLGxgFormSelectElement;
    new (): HTMLGxgFormSelectElement;
  };

  interface HTMLGxgFormTextElement
    extends Components.GxgFormText,
      HTMLStencilElement {}
  var HTMLGxgFormTextElement: {
    prototype: HTMLGxgFormTextElement;
    new (): HTMLGxgFormTextElement;
  };

  interface HTMLGxgFormTextareaElement
    extends Components.GxgFormTextarea,
      HTMLStencilElement {}
  var HTMLGxgFormTextareaElement: {
    prototype: HTMLGxgFormTextareaElement;
    new (): HTMLGxgFormTextareaElement;
  };

  interface HTMLGxgIconElement extends Components.GxgIcon, HTMLStencilElement {}
  var HTMLGxgIconElement: {
    prototype: HTMLGxgIconElement;
    new (): HTMLGxgIconElement;
  };

  interface HTMLGxgMenuElement extends Components.GxgMenu, HTMLStencilElement {}
  var HTMLGxgMenuElement: {
    prototype: HTMLGxgMenuElement;
    new (): HTMLGxgMenuElement;
  };

  interface HTMLGxgMenuItemElement
    extends Components.GxgMenuItem,
      HTMLStencilElement {}
  var HTMLGxgMenuItemElement: {
    prototype: HTMLGxgMenuItemElement;
    new (): HTMLGxgMenuItemElement;
  };

  interface HTMLGxgModalElement
    extends Components.GxgModal,
      HTMLStencilElement {}
  var HTMLGxgModalElement: {
    prototype: HTMLGxgModalElement;
    new (): HTMLGxgModalElement;
  };

  interface HTMLGxgProgressBarElement
    extends Components.GxgProgressBar,
      HTMLStencilElement {}
  var HTMLGxgProgressBarElement: {
    prototype: HTMLGxgProgressBarElement;
    new (): HTMLGxgProgressBarElement;
  };

  interface HTMLGxgSliderElement
    extends Components.GxgSlider,
      HTMLStencilElement {}
  var HTMLGxgSliderElement: {
    prototype: HTMLGxgSliderElement;
    new (): HTMLGxgSliderElement;
  };

  interface HTMLGxgStepperElement
    extends Components.GxgStepper,
      HTMLStencilElement {}
  var HTMLGxgStepperElement: {
    prototype: HTMLGxgStepperElement;
    new (): HTMLGxgStepperElement;
  };

  interface HTMLGxgTabElement extends Components.GxgTab, HTMLStencilElement {}
  var HTMLGxgTabElement: {
    prototype: HTMLGxgTabElement;
    new (): HTMLGxgTabElement;
  };

  interface HTMLGxgTabBarElement
    extends Components.GxgTabBar,
      HTMLStencilElement {}
  var HTMLGxgTabBarElement: {
    prototype: HTMLGxgTabBarElement;
    new (): HTMLGxgTabBarElement;
  };

  interface HTMLGxgTabButtonElement
    extends Components.GxgTabButton,
      HTMLStencilElement {}
  var HTMLGxgTabButtonElement: {
    prototype: HTMLGxgTabButtonElement;
    new (): HTMLGxgTabButtonElement;
  };

  interface HTMLGxgTabsElement extends Components.GxgTabs, HTMLStencilElement {}
  var HTMLGxgTabsElement: {
    prototype: HTMLGxgTabsElement;
    new (): HTMLGxgTabsElement;
  };

  interface HTMLGxgTemplateElement
    extends Components.GxgTemplate,
      HTMLStencilElement {}
  var HTMLGxgTemplateElement: {
    prototype: HTMLGxgTemplateElement;
    new (): HTMLGxgTemplateElement;
  };

  interface HTMLGxgToggleElement
    extends Components.GxgToggle,
      HTMLStencilElement {}
  var HTMLGxgToggleElement: {
    prototype: HTMLGxgToggleElement;
    new (): HTMLGxgToggleElement;
  };
  interface HTMLElementTagNameMap {
    "gxg-alert": HTMLGxgAlertElement;
    "gxg-box": HTMLGxgBoxElement;
    "gxg-button": HTMLGxgButtonElement;
    "gxg-button-group": HTMLGxgButtonGroupElement;
    "gxg-card": HTMLGxgCardElement;
    "gxg-form-checkbox": HTMLGxgFormCheckboxElement;
    "gxg-form-message": HTMLGxgFormMessageElement;
    "gxg-form-radio": HTMLGxgFormRadioElement;
    "gxg-form-radio-wrapper": HTMLGxgFormRadioWrapperElement;
    "gxg-form-select": HTMLGxgFormSelectElement;
    "gxg-form-text": HTMLGxgFormTextElement;
    "gxg-form-textarea": HTMLGxgFormTextareaElement;
    "gxg-icon": HTMLGxgIconElement;
    "gxg-menu": HTMLGxgMenuElement;
    "gxg-menu-item": HTMLGxgMenuItemElement;
    "gxg-modal": HTMLGxgModalElement;
    "gxg-progress-bar": HTMLGxgProgressBarElement;
    "gxg-slider": HTMLGxgSliderElement;
    "gxg-stepper": HTMLGxgStepperElement;
    "gxg-tab": HTMLGxgTabElement;
    "gxg-tab-bar": HTMLGxgTabBarElement;
    "gxg-tab-button": HTMLGxgTabButtonElement;
    "gxg-tabs": HTMLGxgTabsElement;
    "gxg-template": HTMLGxgTemplateElement;
    "gxg-toggle": HTMLGxgToggleElement;
  }
}

declare namespace LocalJSX {
  interface GxgAlert {
    /**
     * Wether the alert is active (visible) or not (not visible).
     */
    active?: boolean;
    /**
     * The amount of miliseconds the alert is visible before hidding under the document.
     */
    activeTime?: number;
    /**
     * The alert title (optional)
     */
    alertTitle?: string;
    /**
     * The alert bottom position value
     */
    bottom?: string;
    /**
     * The alert left position value
     */
    left?: string;
    /**
     * The alert position.
     */
    position?: AlertPosition;
    /**
     * The alert right position value
     */
    right?: string;
    /**
     * The type of alert
     */
    type?: AlertType;
    /**
     * The alert width
     */
    width?: string;
  }
  interface GxgBox {
    height?: string;
    /**
     * The card box-shadow value possible values: from 1 to 8
     */
    shadow?: number;
    width?: string;
  }
  interface GxgButton {
    /**
     * The state of the button. Whether is disabled or not.
     */
    disabled?: boolean;
    /**
     * The kind of button
     */
    type?: ButtonType;
  }
  interface GxgButtonGroup {
    /**
     * The title that will show up above the buttons group
     */
    buttonGroupTitle?: string;
    /**
     * The id of the button that you would like to show active by default
     */
    defaultSelectedBtnId?: string;
    /**
     * The main title alignment
     */
    titleAlignment?: TitleAlignment;
  }
  interface GxgCard {
    /**
     * The card box-shadow value possible values: from 1 to 8
     */
    shadow?: ShadowType;
    width?: string;
  }
  interface GxgFormCheckbox {
    /**
     * Checkbox id
     */
    checkboxId?: string;
    /**
     * Checkbox checked
     */
    checked?: boolean;
    /**
     * Checkbox disabled
     */
    disabled?: boolean;
    /**
     * Inline-flex display
     */
    inlineFlex?: boolean;
    /**
     * Checkbox label
     */
    label?: string;
    /**
     * Checkbox name
     */
    name?: string;
    /**
     * Checkbox value
     */
    value?: string;
  }
  interface GxgFormMessage {
    /**
     * The kind of message Possible values: error, warning
     */
    type?: MessageType;
  }
  interface GxgFormRadio {
    /**
     * Radio id
     */
    RadioId?: string;
    /**
     * Radio selected
     */
    checked?: boolean;
    /**
     * Radio disabled
     */
    disabled?: boolean;
    /**
     * Radio label
     */
    label?: string;
    /**
     * Radio name
     */
    name?: string;
    onRadioClicked?: (event: CustomEvent<any>) => void;
    /**
     * Radio value
     */
    value?: string;
  }
  interface GxgFormRadioWrapper {
    /**
     * Selected Radio id
     */
    RadioId?: string;
    /**
     * Selected Radio value
     */
    RadioValue?: string;
    /**
     * Inline-flex display
     */
    inlineFlex?: boolean;
  }
  interface GxgFormSelect {
    /**
     * If select is disabled
     */
    disabled?: boolean;
    /**
     * If select has errors
     */
    error?: boolean;
    /**
     * If select is full width
     */
    fullWidth?: boolean;
    /**
     * Inline-flex display
     */
    inlineFlex?: boolean;
    /**
     * The select label
     */
    label?: string;
    /**
     * The maximum number of visible options (scroll will apear if the total number exceeds this value)
     */
    maxVisibleOptions?: string;
    /**
     * The select name
     */
    name?: string;
    /**
     * The select id
     */
    selectId?: string;
    /**
     * The selected option
     */
    value?: string;
    /**
     * If select has warnings
     */
    warning?: boolean;
    /**
     * The select width
     */
    width?: string;
  }
  interface GxgFormText {
    /**
     * If input is disabled
     */
    disabled?: boolean;
    /**
     * If input has errors
     */
    error?: boolean;
    /**
     * If input is full width
     */
    fullWidth?: boolean;
    /**
     * Input icon possible values: the same as the values for the icon component
     */
    icon?: IconType;
    /**
     * Input icon side possible values: left, right
     */
    iconPosition?: IconPositionType;
    /**
     * Inline-flex display
     */
    inlineFlex?: boolean;
    /**
     * The input id
     */
    inputId?: string;
    /**
     * The input label
     */
    label?: string;
    /**
     * The input name
     */
    name?: string;
    /**
     * The input placeholder
     */
    placeholder?: string;
    /**
     * The input value
     */
    value?: string;
    /**
     * If input has warning
     */
    warning?: boolean;
    /**
     * input width
     */
    width?: string;
  }
  interface GxgFormTextarea {
    /**
     * Number of cols
     */
    cols?: number;
    /**
     * If textarea is disabled
     */
    disabled?: boolean;
    /**
     * If textarea display is block
     */
    displayBlock?: boolean;
    /**
     * If textarea has errors
     */
    error?: boolean;
    /**
     * If textarea is full width
     */
    fullWidth?: boolean;
    /**
     * The textarea label
     */
    label?: string;
    /**
     * The textarea name
     */
    name?: string;
    /**
     * The textarea placeholder
     */
    placeholder?: string;
    /**
     * Number of cols
     */
    rows?: number;
    /**
     * The textarea id
     */
    textareaId?: string;
    /**
     * The textarea value
     */
    value?: string;
    /**
     * If textarea has warnings
     */
    warning?: boolean;
  }
  interface GxgIcon {
    /**
     * The color of the icon.
     */
    color?: Color;
    /**
     * If enabled, the icon will be loaded lazily when it's visible in the viewport.
     */
    lazy?: boolean;
    /**
     * The size of the icon. Possible values: regular, small.
     */
    size?: Size;
    /**
     * The type of icon. Possible values: each of the icons in /assets.
     */
    type?: IconType;
  }
  interface GxgMenu {
    fullWidth?: boolean;
    tabs?: boolean;
    title?: string;
    width?: string;
  }
  interface GxgMenuItem {
    active?: boolean;
    icon?: IconType;
    label?: string;
    onMenuItemActive?: (event: CustomEvent<any>) => void;
  }
  interface GxgModal {
    /**
     * The footer alignment
     */
    footerAlignment?: footerAlignmentType;
    /**
     * The modal title
     */
    modalTitle?: string;
    /**
     * Wether the modal is visible or not
     */
    visible?: boolean;
    /**
     * The modal width
     */
    width?: string;
    /**
     * z-index
     */
    zIndex?: string;
  }
  interface GxgProgressBar {
    /**
     * The state of the toggle. Whether is disabled or not.
     */
    disabled?: boolean;
    /**
     * The label
     */
    label?: string;
    /**
     * The value (percentage)
     */
    value?: number;
    /**
     * The width
     */
    width?: string;
  }
  interface GxgSlider {
    /**
     * The state of the toggle. Whether is disabled or not. Possible values: false, true
     */
    disabled?: boolean;
    /**
     * The label
     */
    label?: string;
    /**
     * The max value
     */
    max?: number;
    /**
     * The initial value
     */
    value?: number;
    /**
     * The slider width
     */
    width?: string;
  }
  interface GxgStepper {
    /**
     * The state of the toggle. Whether is disabled or not.
     */
    disabled?: boolean;
    /**
     * Inline-flex display
     */
    inlineFlex?: boolean;
    /**
     * The toggle label
     */
    label?: string;
    /**
     * The max value
     */
    max?: number;
    /**
     * The min value
     */
    min?: number;
    /**
     * The initial vaule
     */
    value?: number;
  }
  interface GxgTab {
    isSelected?: boolean;
    tab?: string;
  }
  interface GxgTabBar {}
  interface GxgTabButton {
    disabled?: boolean;
    icon?: IconType;
    isSelected?: boolean;
    onTabActivated?: (event: CustomEvent<any>) => void;
    tab?: string;
    tabLabel?: string;
  }
  interface GxgTabs {
    tab?: string;
  }
  interface GxgTemplate {
    /**
     * The state of the toggle. Whether is disabled or not. Possible values: false, true
     */
    disabled?: boolean;
    /**
     * The toggle label
     */
    label?: string;
  }
  interface GxgToggle {
    /**
     * The state of the toggle. Whether is disabled or not.
     */
    disabled?: boolean;
    /**
     * Inline-flex display
     */
    inlineFlex?: boolean;
    /**
     * The label
     */
    label?: string;
    /**
     * If the toggle is active or not
     */
    on?: boolean;
  }

  interface IntrinsicElements {
    "gxg-alert": GxgAlert;
    "gxg-box": GxgBox;
    "gxg-button": GxgButton;
    "gxg-button-group": GxgButtonGroup;
    "gxg-card": GxgCard;
    "gxg-form-checkbox": GxgFormCheckbox;
    "gxg-form-message": GxgFormMessage;
    "gxg-form-radio": GxgFormRadio;
    "gxg-form-radio-wrapper": GxgFormRadioWrapper;
    "gxg-form-select": GxgFormSelect;
    "gxg-form-text": GxgFormText;
    "gxg-form-textarea": GxgFormTextarea;
    "gxg-icon": GxgIcon;
    "gxg-menu": GxgMenu;
    "gxg-menu-item": GxgMenuItem;
    "gxg-modal": GxgModal;
    "gxg-progress-bar": GxgProgressBar;
    "gxg-slider": GxgSlider;
    "gxg-stepper": GxgStepper;
    "gxg-tab": GxgTab;
    "gxg-tab-bar": GxgTabBar;
    "gxg-tab-button": GxgTabButton;
    "gxg-tabs": GxgTabs;
    "gxg-template": GxgTemplate;
    "gxg-toggle": GxgToggle;
  }
}

export { LocalJSX as JSX };

declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      "gxg-alert": LocalJSX.GxgAlert &
        JSXBase.HTMLAttributes<HTMLGxgAlertElement>;
      "gxg-box": LocalJSX.GxgBox & JSXBase.HTMLAttributes<HTMLGxgBoxElement>;
      "gxg-button": LocalJSX.GxgButton &
        JSXBase.HTMLAttributes<HTMLGxgButtonElement>;
      "gxg-button-group": LocalJSX.GxgButtonGroup &
        JSXBase.HTMLAttributes<HTMLGxgButtonGroupElement>;
      "gxg-card": LocalJSX.GxgCard & JSXBase.HTMLAttributes<HTMLGxgCardElement>;
      "gxg-form-checkbox": LocalJSX.GxgFormCheckbox &
        JSXBase.HTMLAttributes<HTMLGxgFormCheckboxElement>;
      "gxg-form-message": LocalJSX.GxgFormMessage &
        JSXBase.HTMLAttributes<HTMLGxgFormMessageElement>;
      "gxg-form-radio": LocalJSX.GxgFormRadio &
        JSXBase.HTMLAttributes<HTMLGxgFormRadioElement>;
      "gxg-form-radio-wrapper": LocalJSX.GxgFormRadioWrapper &
        JSXBase.HTMLAttributes<HTMLGxgFormRadioWrapperElement>;
      "gxg-form-select": LocalJSX.GxgFormSelect &
        JSXBase.HTMLAttributes<HTMLGxgFormSelectElement>;
      "gxg-form-text": LocalJSX.GxgFormText &
        JSXBase.HTMLAttributes<HTMLGxgFormTextElement>;
      "gxg-form-textarea": LocalJSX.GxgFormTextarea &
        JSXBase.HTMLAttributes<HTMLGxgFormTextareaElement>;
      "gxg-icon": LocalJSX.GxgIcon & JSXBase.HTMLAttributes<HTMLGxgIconElement>;
      "gxg-menu": LocalJSX.GxgMenu & JSXBase.HTMLAttributes<HTMLGxgMenuElement>;
      "gxg-menu-item": LocalJSX.GxgMenuItem &
        JSXBase.HTMLAttributes<HTMLGxgMenuItemElement>;
      "gxg-modal": LocalJSX.GxgModal &
        JSXBase.HTMLAttributes<HTMLGxgModalElement>;
      "gxg-progress-bar": LocalJSX.GxgProgressBar &
        JSXBase.HTMLAttributes<HTMLGxgProgressBarElement>;
      "gxg-slider": LocalJSX.GxgSlider &
        JSXBase.HTMLAttributes<HTMLGxgSliderElement>;
      "gxg-stepper": LocalJSX.GxgStepper &
        JSXBase.HTMLAttributes<HTMLGxgStepperElement>;
      "gxg-tab": LocalJSX.GxgTab & JSXBase.HTMLAttributes<HTMLGxgTabElement>;
      "gxg-tab-bar": LocalJSX.GxgTabBar &
        JSXBase.HTMLAttributes<HTMLGxgTabBarElement>;
      "gxg-tab-button": LocalJSX.GxgTabButton &
        JSXBase.HTMLAttributes<HTMLGxgTabButtonElement>;
      "gxg-tabs": LocalJSX.GxgTabs & JSXBase.HTMLAttributes<HTMLGxgTabsElement>;
      "gxg-template": LocalJSX.GxgTemplate &
        JSXBase.HTMLAttributes<HTMLGxgTemplateElement>;
      "gxg-toggle": LocalJSX.GxgToggle &
        JSXBase.HTMLAttributes<HTMLGxgToggleElement>;
    }
  }
}
