import { TreeXItemModel } from "@genexus/chameleon-controls-library/dist/types/components/tree-view/tree-x/types";

export type TreeXItemModelExtended = {
  parentItem: TreeXItemModel;
  item: TreeXItemModel;
};

export type TreeXOperationStatus = {
  success: boolean;
};

export type TreeXOperationStatusModifyCaption = TreeXOperationStatus & {
  errorMessage: string;
};
