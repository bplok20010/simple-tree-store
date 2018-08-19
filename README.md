# tree-store
生成树结构

## install

`npm install --save simple-tree-store`

## options 

```
{
    rootId: null,
    idField: 'id',
    childrenField: 'children',
}
```

## api
`constructor(data[, options])` 构造函数

`isRoot(id)` 是否顶层节点

`isLeaf(id)` 是否叶子节点

`getNode(id)` 获取节点对象

`getChildren(id)` 获取节点下的子节点，为空则为根节点

`getAllChildren(id)` 获取节点下的所有子节点，为空则为根节点

`getAllLeaf(id)` 获取节点下的所有叶子节点，为空则为根节点

`getPid(id)` 获取父节点ID

`getPid(getPids)` 获取所有父节点ID

`getLevel(id)` 获取节点所在层级

`getMaxLevel(id)` 获取最大层级数


`getLevelChildren(level)` 获取该层级下所有节点

## examples

```
const TreeStore = require('simple-tree-store');

const data = [
    {
        id: 1
    },
    {
        id: 2,
        children: [
            { id: 5 },
            {
                id: 6, children: [
                    { id: 8 },
                    { id: 9 },
                    { id: 10 },
                ]
            },
            { id: 7 },
        ]
    },
    {
        id: 3
    },
    {
        id: 4
    },
];

const store = new TreeStore(data);

console.log(store.getAllChildren());

console.log(store.getChildren(2));

console.log(store.getAllChildren(2));

console.log(store.getAllLeaf(2));

console.log(store.getAllLeaf());

console.log(store.getPids(10));

console.log(store.getLevel(10));

console.log(store.getLevelChildren(3));

```
