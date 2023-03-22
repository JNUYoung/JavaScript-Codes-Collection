const tree = [
    {
        id: 0,
        name: 'root',
        children: [
            {
                id: 1,
                name: 'child1',
                children: [
                    {
                        id: 4,
                        name: 'child1-1',
                        children: []
                    },
                    {
                        id: 5,
                        name: 'child1-2',
                        children: []
                    }
                ]
            },
            {
                id: 2,
                name: 'child2',
                children: [
                    {
                        id: 6,
                        name: 'child2-1',
                        children: [
                            {
                                id: 8,
                                name: 'child2-1-1',
                                children: []
                            }
                        ]
                    }
                ]
            },
            {
                id: 3,
                name: 'child3',
                children: [
                    {
                        id: 7,
                        name: 'child3-1',
                        children: []
                    }
                ]
            }
        ]
    }
]

/**
 * 基本思路：
 * 遍历树中每个节点，将当前节点加入列表中，并且记录其父节点
 */

const tree2Arr = function(tree, arr, parentId = null) {
    for (const node of tree) {
        arr.push({
            id: node.id,
            name: node.name,
            children: [],
            parentId
        })
        // 如果当前节点有子节点
        if (node.children.length > 0) {
            // 子节点的parentId属性设置为当前节点的节点id
            tree2Arr(node.children, arr, node.id)
        }
    }
}
const arr = []
tree2Arr(tree, arr, )
console.log(arr)