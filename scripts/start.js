const transformES = require('transform-es');

transformES('src', 'lib', {
    watch: true,
    target: 'web',
    babelRuntimeHelpers: true,
});