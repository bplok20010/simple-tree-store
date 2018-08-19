const TreeStore = require('../lib/TreeStore').default;

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
