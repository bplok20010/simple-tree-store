'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function randomId() {
    return 'c_' + Math.random().toString(16).slice(2);
}

var TreeStore = function () {
    function TreeStore() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        (0, _classCallCheck3.default)(this, TreeStore);

        this.options = (0, _extends3.default)({
            rootId: null,
            idField: 'id',
            childrenField: 'children'
        }, options);

        this._NodeList = data;
        this._NodeListIds = [];
        this._NodeListMap = {};
        this._pids = {};
        this._levels = {};

        this._parse();
    }

    (0, _createClass3.default)(TreeStore, [{
        key: '_parse',
        value: function _parse() {
            var NodeList = this._NodeList;
            var NodeListIds = this._NodeListIds;
            var NodeListMap = this._NodeListMap;
            var pids = this._pids;
            var levels = this._levels;
            var _options = this.options,
                idField = _options.idField,
                childrenField = _options.childrenField,
                rootId = _options.rootId;


            var normalize = function normalize(node) {
                if (node[idField] == null) node[idField] = randomId();
            };

            var walkNodes = function walkNodes(node) {
                var pid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : rootId;
                var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

                normalize(node);
                var id = node[idField];
                var children = node[childrenField];

                NodeListIds.push(id);
                pids[id] = pid;
                levels[id] = level;
                NodeListMap[id] = node;

                if (Array.isArray(children)) {
                    children.forEach(function (col) {
                        return walkNodes(col, id, level + 1);
                    });
                }
            };

            NodeList.forEach(function (node) {
                return walkNodes(node, rootId);
            });
        }
    }, {
        key: 'isRoot',
        value: function isRoot(id) {
            var rootId = this.options.rootId;

            return this._pids[id] === rootId;
        }
    }, {
        key: 'isLeaf',
        value: function isLeaf(id) {
            var childrenField = this.options.childrenField;


            return !this._NodeListMap[id][childrenField];
        }
    }, {
        key: 'getNode',
        value: function getNode(id) {
            var idField = this.options.idField;


            return this._NodeListMap[id] == null ? (0, _defineProperty3.default)({}, idField, null) : this._NodeListMap[id];
        }
    }, {
        key: 'getChildren',
        value: function getChildren() {
            var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var _options2 = this.options,
                idField = _options2.idField,
                childrenField = _options2.childrenField,
                rootId = _options2.rootId;


            if (id === rootId) return this._NodeList.map(function (col) {
                return col[idField];
            });

            var node = this._NodeListMap[id];
            var children = node[childrenField];

            return Array.isArray(children) ? children.map(function (col) {
                return col[idField];
            }) : [];
        }
    }, {
        key: 'getAllChildren',
        value: function getAllChildren(id) {
            var _this = this;

            var childs = this.getChildren(id);

            var results = [].concat((0, _toConsumableArray3.default)(childs));

            childs.forEach(function (id) {
                results.push.apply(results, (0, _toConsumableArray3.default)(_this.getAllChildren(id)));
            });

            return results;
        }
    }, {
        key: 'getAllLeaf',
        value: function getAllLeaf(id) {
            return this.getAllChildren(id).filter(this.isLeaf.bind(this));
        }
    }, {
        key: 'getPid',
        value: function getPid(id) {
            return this._pids[id] ? this._pids[id] : null;
        }
    }, {
        key: 'getPids',
        value: function getPids(id) {
            var pids = [];
            var pid = void 0;

            while (pid = this.getPid(id)) {
                pids.push(pid);
                id = pid;
            }

            return pids;
        }
    }, {
        key: 'getLevel',
        value: function getLevel(id) {
            return this._levels[id] || 1;
        }
    }, {
        key: 'getLevelChildren',
        value: function getLevelChildren(level) {
            var _this2 = this;

            return this._NodeListIds.filter(function (id) {
                return _this2._levels[id] === level;
            });
        }
    }]);
    return TreeStore;
}();

exports.default = TreeStore;