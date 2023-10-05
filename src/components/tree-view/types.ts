import {
  TreeXItemModel,
  TreeXModel,
} from "@genexus/chameleon-controls-library/dist/types/components/tree-x/types";

export type TreeXItemModelExtended = {
  parentItem: TreeXModel | TreeXItemModel;
  item: TreeXItemModel;
};

export type TreeXOperationStatus = {
  success: boolean;
};

export type TreeXOperationStatusModifyCaption = TreeXOperationStatus & {
  errorMessage: string;
};
