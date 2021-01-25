# gxg-test

<!-- Auto Generated Below -->

## Properties

| Property    | Attribute    | Description                                                                              | Type      | Default |
| ----------- | ------------ | ---------------------------------------------------------------------------------------- | --------- | ------- |
| `emptyTree` | `empty-tree` | Set this attribute if the tree item has a potential tree to be downloaded                | `boolean` | `false` |
| `isLeaf`    | `is-leaf`    |                                                                                          | `boolean` | `false` |
| `treeOpen`  | `tree-open`  | If this tree-item has a nested tree, set this attribute to make the tree open by default | `boolean` | `false` |

## Events

| Event         | Description | Type               |
| ------------- | ----------- | ------------------ |
| `itemToggled` |             | `CustomEvent<any>` |

## Dependencies

### Depends on

- [gxg-icon](../icon)

### Graph

```mermaid
graph TD;
  gxg-tree-item --> gxg-icon
  style gxg-tree-item fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
