exports.config = {
    directConnect:true,
    capabilities:{
        'browserName':'chrome'
    },
    framework: 'mocha',
    specs:['Homepage.spec.js',
    'Element.spec.js',
    'Elements.spec.js',
    'Layout.spec.js'],
    mochaOpts:{
        reporter:'spec',
        timeout:30000
    }
};
