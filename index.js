module.exports = function (bundler) {
    bundler.addAssetType('peb', require.resolve('./asset.js'));
};