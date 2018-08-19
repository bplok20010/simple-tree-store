function randomId() {
    return 'c_' + Math.random().toString(16).slice(2);
}

export default class TreeStore {
    constructor(data = [], options = {}) {
        this.options = Object.assign({
            rootId: null,
            idField: 'id',
            childrenField: 'children',
        }, options);

        this._NodeList = data;
        this._NodeListIds = [];
        this._NodeListMap = {};
        this._pids = {};
        this._levels = {};

        this._parse();
    }

    _parse() {
        const NodeList = this._NodeList;
        const NodeListIds = this._NodeListIds;
        const NodeListMap = this._NodeListMap;
        const pids = this._pids;
        const levels = this._levels;
        const { idField, childrenField, rootId } = this.options;

        const normalize = node => {
            if (node[idField] == null) node[idField] = randomId();
        };

        const walkNodes = (node, pid = rootId, level = 1) => {
            normalize(node);
            const id = node[idField];
            const children = node[childrenField];

            NodeListIds.push(id);
            pids[id] = pid;
            levels[id] = level;
            NodeListMap[id] = node;

            if (Array.isArray(children)) {
                children.forEach(col => walkNodes(col, id, level + 1))
            }
        }

        NodeList.forEach(node => walkNodes(node, rootId));
    }

    isRoot(id) {
        const { rootId } = this.options;
        return this._pids[id] === rootId;
    }

    isLeaf(id) {
        const { childrenField } = this.options;

        return !this._NodeListMap[id][childrenField];
    }
    getNode(id) {
        const { idField } = this.options;

        return this._NodeListMap[id] == null ? {
            [idField]: null
        } : this._NodeListMap[id];
    }
    getChildren(id = null) {
        const { idField, childrenField, rootId } = this.options;

        if (id === rootId) return this._NodeList.map(col => col[idField]);

        const node = this._NodeListMap[id];
        const children = node[childrenField];

        return Array.isArray(children) ? children.map(col => col[idField]) : [];
    }

    getAllChildren(id) {
        const childs = this.getChildren(id);

        const results = [];

        childs.forEach(id => {
            results.push(id);
            results.push(...this.getAllChildren(id));
        });

        return results;
    }

    getAllLeaf(id) {
        return this.getAllChildren(id).filter(this.isLeaf.bind(this));
    }
    getPid(id) {
        return this._pids[id] ? this._pids[id] : null;
    }

    getPids(id) {
        const pids = [];
        let pid;

        while (pid = this.getPid(id)) {
            pids.push(pid);
            id = pid;
        }

        return pids;
    }
    getLevel(id) {
        return this._levels[id] || 1;
    }
    getMaxLevel() {
        const levels = this._levels;
        let level = 1;

        Object.keys(levels).forEach(id => {
            level = Math.max(level, levels[id]);
        });

        return level;
    }
    getLevelChildren(level) {
        return this._NodeListIds.filter(id => this._levels[id] === level);
    }
}
