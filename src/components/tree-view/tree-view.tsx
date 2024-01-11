import {
  Component,
  Event,
  EventEmitter,
  h,
  Prop,
  Method,
  getAssetPath
} from "@stencil/core";
import {
  TreeViewDataTransferInfo,
  TreeViewDropCheckInfo,
  TreeViewItemContextMenu,
  TreeViewItemModel,
  TreeViewLines,
  TreeViewItemExpandedInfo,
  TreeViewItemOpenReferenceInfo
} from "@genexus/chameleon-controls-library/dist/types/components/tree-view/tree-view/types";
import {
  TreeViewFilterOptions,
  TreeViewFilterType,
  TreeViewItemModelExtended,
  TreeViewOperationStatusModifyCaption
} from "@genexus/chameleon-controls-library/dist/types/components/renders/tree-view/types";
import { GxDataTransferInfo } from "@genexus/chameleon-controls-library/dist/types/common/types";
import { ChTreeViewRender } from "@genexus/chameleon-controls-library/dist/types/components/renders/tree-view/tree-view-render";
import { resolveImgPath } from "./helpers";

const DEFAULT_DRAG_DISABLED_VALUE = false;
const DEFAULT_DROP_DISABLED_VALUE = false;
const DEFAULT_EDITABLE_ITEMS_VALUE = true;
const iconAssetsPath = getAssetPath(`./icon-assets`);

const defaultRenderItem = (
  itemModel: TreeViewItemModel,
  treeState: ChTreeViewRender,
  treeHasFilter: boolean,
  lastItem: boolean,
  level: number
) =>
  (treeState.filterType === "none" || itemModel.render !== false) && (
    <ch-tree-view-item
      key={itemModel.id}
      id={itemModel.id}
      caption={itemModel.caption}
      checkbox={itemModel.checkbox ?? treeState.checkbox}
      checked={itemModel.checked ?? treeState.checked}
      class={itemModel.class}
      disabled={itemModel.disabled}
      downloading={itemModel.downloading}
      dragDisabled={itemModel.dragDisabled ?? treeState.dragDisabled}
      dropDisabled={itemModel.dropDisabled ?? treeState.dropDisabled}
      editable={itemModel.editable ?? treeState.editableItems}
      expanded={itemModel.expanded}
      expandableButton={
        itemModel.expandableButton ?? treeState.expandableButton
      }
      expandOnClick={treeState.expandOnClick}
      indeterminate={itemModel.indeterminate}
      lastItem={lastItem}
      lazyLoad={itemModel.lazy}
      leaf={itemModel.leaf}
      leftImgSrc={
        itemModel.leftImgSrc
          ? resolveImgPath(iconAssetsPath, itemModel.leftImgSrc)
          : null
      }
      level={level}
      metadata={itemModel.metadata}
      rightImgSrc={itemModel.rightImgSrc}
      selected={itemModel.selected}
      showLines={treeState.showLines}
      toggleCheckboxes={
        itemModel.toggleCheckboxes ?? treeState.toggleCheckboxes
      }
    >
      {!itemModel.leaf &&
        itemModel.items != null &&
        itemModel.items.map((subModel, index) =>
          defaultRenderItem(
            subModel,
            treeState,
            treeHasFilter,
            treeState.showLines !== "none" &&
              // If there is a filter applied in the current list, use the
              // lastItemId value to calculate the last item
              (treeHasFilter && itemModel.lastItemId !== ""
                ? subModel.id === itemModel.lastItemId
                : index === itemModel.items.length - 1),
            level + 1
          )
        )}
    </ch-tree-view-item>
  );

@Component({
  tag: "gxg-tree-view",
  styleUrl: "tree-view.scss",
  shadow: false
})
export class ChTreeViewRenderWrapper {
  // Refs
  private treeRef: HTMLChTreeViewRenderElement;

  /**
   * Set this attribute if you want display a checkbox in all items by default.
   */
  @Prop() readonly checkbox: boolean = false;

  /**
   * Set this attribute if you want the checkbox to be checked in all items by
   * default.
   * Only works if `checkbox = true`
   */
  @Prop() readonly checked: boolean = false;

  /**
   * Callback that is executed when an element tries to drop in another item of
   * the tree. Returns whether the drop is valid.
   */
  @Prop() readonly checkDroppableZoneCallback: (
    dropInformation: TreeViewDropCheckInfo
  ) => Promise<boolean>;

  /**
   * A CSS class to set as the `ch-tree-view` element class.
   */
  @Prop() readonly cssClass: string = "tree-view";

  /**
   * This attribute lets you specify if the drag operation is disabled in all
   * items by default. If `true`, the items can't be dragged.
   */
  @Prop() readonly dragDisabled: boolean = DEFAULT_DRAG_DISABLED_VALUE;

  /**
   * This attribute lets you specify if the drop operation is disabled in all
   * items by default. If `true`, the items won't accept any drops.
   */
  @Prop() readonly dropDisabled: boolean = DEFAULT_DROP_DISABLED_VALUE;

  /**
   * Callback that is executed when a list of items request to be dropped into
   * another item.
   */
  @Prop() readonly dropItemsCallback: (
    dataTransferInfo: TreeViewDataTransferInfo
  ) => Promise<{ acceptDrop: boolean; items?: TreeViewItemModel[] }>;

  /**
   * This attribute lets you specify if the edit operation is enabled in all
   * items by default. If `true`, the items can edit its caption in place.
   */
  @Prop() readonly editableItems: boolean = DEFAULT_EDITABLE_ITEMS_VALUE;

  /**
   * Specifies what kind of expandable button is displayed in the items by
   * default.
   *  - `"expandableButton"`: Expandable button that allows to expand/collapse
   *     the items of the control.
   *  - `"decorative"`: Only a decorative icon is rendered to display the state
   *     of the item.
   */
  @Prop() readonly expandableButton: "action" | "decorative" | "no" =
    "decorative";

  /**
   * Specifies if a tree-view-item is expanded on click interaction. If `true`
   * the tree-view-item is expanded on click interaction. If `false`, with
   * mouse interaction the tree-view-item will only be expanded on double click.
   */
  @Prop() readonly expandOnClick: boolean = true;

  /**
   * This property lets you determine the expression that will be applied to the
   * filter.
   * Only works if `filterType = "caption" | "metadata"`.
   */
  @Prop() readonly filter: string;

  /**
   * This property lets you determine the debounce time (in ms) that the
   * control waits until it processes the changes to the filter property.
   * Consecutive changes to the `filter` property between this range, reset the
   * timeout to process the filter.
   * Only works if `filterType = "caption" | "metadata"`.
   */
  @Prop() readonly filterDebounce: number = 0;

  /**
   * This property lets you determine the list of items that will be filtered.
   * Only works if `filterType = "id-list"`.
   */
  @Prop() readonly filterList: string[] = [];

  /**
   * This property lets you determine the options that will be applied to the
   * filter.
   * Only works if `filterType = "caption" | "metadata"`.
   */
  @Prop() readonly filterOptions: TreeViewFilterOptions = {};

  /**
   * This attribute lets you define what kind of filter is applied to items.
   * Only items that satisfy the filter predicate will be displayed.
   *
   * | Value       | Details                                                                                        |
   * | ----------- | ---------------------------------------------------------------------------------------------- |
   * | `checked`   | Show only the items that have a checkbox and are checked.                                      |
   * | `unchecked` | Show only the items that have a checkbox and are not checked.                                  |
   * | `caption`   | Show only the items whose `caption` satisfies the regex determinate by the `filter` property.  |
   * | `metadata`  | Show only the items whose `metadata` satisfies the regex determinate by the `filter` property. |
   * | `id-list`   | Show only the items that are contained in the array determinate by the `filterList` property.  |
   * | `none`      | Show all items.                                                                                |
   */
  @Prop() readonly filterType: TreeViewFilterType = "none";

  /**
   * Callback that is executed when a item request to load its subitems.
   */
  @Prop() readonly lazyLoadTreeItemsCallback: (
    treeItemId: string
  ) => Promise<TreeViewItemModel[]>;

  /**
   * Callback that is executed when a item request to modify its caption.
   */
  @Prop() readonly modifyItemCaptionCallback: (
    treeItemId: string,
    newCaption: string
  ) => Promise<TreeViewOperationStatusModifyCaption>;

  /**
   * Set this attribute if you want to allow multi selection of the items.
   */
  @Prop() readonly multiSelection: boolean = false;

  /**
   * This property allows us to implement custom rendering of tree items.
   */
  @Prop() readonly renderItem: (
    itemModel: TreeViewItemModel,
    treeState: ChTreeViewRender,
    treeHasFilter: boolean,
    lastItem: boolean,
    level: number
  ) => any = defaultRenderItem;

  /**
   * `true` to display the relation between tree items and tree lists using
   * lines.
   */
  @Prop() readonly showLines: TreeViewLines = "all";

  /**
   * Callback that is executed when the treeModel is changed to order its items.
   */
  @Prop() readonly sortItemsCallback: (subModel: TreeViewItemModel[]) => void;

  /**
   * Set this attribute if you want all the children item's checkboxes to be
   * checked when the parent item checkbox is checked, or to be unchecked when
   * the parent item checkbox is unchecked.
   * This attribute will be used in all items by default.
   */
  @Prop() readonly toggleCheckboxes: boolean = false;

  /**
   * This property lets you define the model of the ch-tree-x control.
   */
  @Prop() readonly treeModel: TreeViewItemModel[] = [];

  /**
   * Fired when the checked items change.
   * This event does take into account the currently filtered items.
   */
  @Event() checkedItemsChange: EventEmitter<
    Map<string, TreeViewItemModelExtended>
  >;

  /**
   * Fired when an element displays its contextmenu.
   */
  @Event() itemContextmenu: EventEmitter<TreeViewItemContextMenu>;

  /**
   * Fired when the user interacts with an item in a way that its reference
   * must be opened.
   */
  @Event() itemOpenReference: EventEmitter<TreeViewItemOpenReferenceInfo>;

  /**
   * Fired when the selected items change.
   * This event can be fired by the following conditions:
   *   1. A user changes the selected items interacting with the Tree View.
   *
   *   2. The `multiSelection` value is changed from `true` to `false`.
   *
   *   3. A selected item is no longer rendered because it does not satisfies a
   *      filter condition.
   *
   *   4. TODO: The `treeModel` property is updated and contains different selected
   *      items. Even if it does not contains different selected items, this
   *      event is fired because the selected items can have a different path
   *      than before the `treeModel` update.
   *
   *   5. The `updateItemsProperties` method is executed, changing the item
   *      selection.
   *
   *   6. A selected item is removed.
   *
   *   7. TODO: A selected item is moved into a new parent with drag and drop.
   *      In this case, since the detail of the event contains the information
   *      of the parent, this event must be fired to update the information.
   *
   *   8. Executing `scrollIntoVisible` method and updating the selected value
   *      of the scrolled item.
   *
   *   9. TODO: An external item is dropped into the Tree View and the item is
   *      selected.
   *
   *  10. TODO: Lazy loading content that has selected items?
   *
   * Thing that does not fire this event:
   *   - TODO: Renaming a selected item.
   *
   *   - TODO: Applying a filter that keeps all selected items rendered.
   */
  @Event() selectedItemsChange: EventEmitter<TreeViewItemModelExtended[]>;

  /**
   * Given an item id, an array of items to add, the download status and the
   * lazy state, updates the item's UI Model.
   */
  @Method()
  async loadLazyContent(
    itemId: string,
    items?: TreeViewItemModel[],
    downloading = false,
    lazy = false
  ) {
    this.treeRef.loadLazyContent(itemId, items, downloading, lazy);
  }

  /**
   * Given a list of ids, removes the items and their children in the tree.
   */
  @Method()
  async removeItems(items: string[]) {
    this.treeRef.removeItems(items);
  }

  /**
   * Given an item id and the additional properties to update before and after
   * reload, it reloads the items of the `itemId` node by using the
   * `lazyLoadTreeItemsCallback` property.
   */
  @Method()
  async reloadItems(
    itemId: string,
    beforeProperties?: Partial<TreeViewItemModel>,
    afterProperties?: Partial<TreeViewItemModel>
  ): Promise<boolean> {
    return this.treeRef.reloadItems(itemId, beforeProperties, afterProperties);
  }

  /**
   * Given the path of the item (represent by a sorted array containing all ids
   * from the root to the item) and the additional properties to update after,
   * it displays and scrolls into the item view.
   * The path can also be a string representing the id of the item to scroll
   * into.
   *
   * When using a path, this method will fail if:
   *   - The path does not start from the root element.
   *   - The path contains a cycle.
   *   - The path does not correspond to a valid path on the server:
   *     - One of the item of the path, except for the last one, is a leaf.
   *     - An item in the path does not exists on the server.
   *     - The path has repeated items.
   *     - And so on.
   */
  @Method()
  async scrollIntoVisible(
    path: string | string[],
    afterProperties?: Partial<TreeViewItemModel>
  ): Promise<boolean> {
    return this.treeRef.scrollIntoVisible(path, afterProperties);
  }

  /**
   * This method is used to toggle a tree item by the tree item id/ids.
   *
   * @param treeItemIds An array id the tree items to be toggled.
   * @param expand A boolean indicating that the tree item should be expanded or collapsed. (optional)
   * @returns The modified items after the method was called.
   */
  @Method()
  async toggleItems(
    treeItemIds: string[],
    expand?: boolean
  ): Promise<TreeViewItemExpandedInfo[]> {
    return this.treeRef.toggleItems(treeItemIds, expand);
  }

  /**
   * Given a subset of item's properties, it updates all item UI models.
   */
  @Method()
  async updateAllItemsProperties(properties: {
    expanded?: boolean;
    checked?: boolean;
  }) {
    this.treeRef.updateAllItemsProperties(properties);
  }

  /**
   * Given a item list and the properties to update, it updates the properties
   * of the items in the list.
   */
  @Method()
  async updateItemsProperties(items: string[], properties: TreeViewItemModel) {
    this.treeRef.updateItemsProperties(items, properties);
  }

  /**
   * Update the information about the valid droppable zones.
   * @param requestTimestamp Time where the request to the server was made. Useful to avoid having old information.
   * @param newContainerId ID of the container where the drag is trying to be made.
   * @param draggedItems Information about the dragged items.
   * @param validDrop Current state of the droppable zone.
   */
  @Method()
  async updateValidDropZone(
    requestTimestamp: number,
    newContainerId: string,
    draggedItems: GxDataTransferInfo[],
    validDrop: boolean
  ) {
    this.treeRef.updateValidDropZone(
      requestTimestamp,
      newContainerId,
      draggedItems,
      validDrop
    );
  }

  render() {
    return (
      <ch-tree-view-render
        checkbox={this.checkbox}
        checked={this.checked}
        checkDroppableZoneCallback={this.checkDroppableZoneCallback}
        cssClass={this.cssClass}
        dragDisabled={this.dragDisabled}
        dropDisabled={this.dropDisabled}
        dropItemsCallback={this.dropItemsCallback}
        editableItems={this.editableItems}
        expandOnClick={this.expandOnClick}
        filter={this.filter}
        filterList={this.filterList}
        filterOptions={this.filterOptions}
        filterDebounce={this.filterDebounce}
        filterType={this.filterType}
        lazyLoadTreeItemsCallback={this.lazyLoadTreeItemsCallback}
        modifyItemCaptionCallback={this.modifyItemCaptionCallback}
        multiSelection={this.multiSelection}
        renderItem={this.renderItem}
        showLines={this.showLines}
        sortItemsCallback={this.sortItemsCallback}
        toggleCheckboxes={this.toggleCheckboxes}
        treeModel={this.treeModel}
        ref={el => (this.treeRef = el)}
      ></ch-tree-view-render>
    );
  }
}
