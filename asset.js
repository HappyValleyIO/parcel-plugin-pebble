const HTMLAsset = require('parcel-bundler/lib/assets/HTMLAsset')
const _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
const _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const render = require('posthtml-render');

function shouldIgnore (file) {
    return /{{.+}}/.test(file)
}

class SkipPebbleTemplateProcessing extends HTMLAsset {
    constructor(name, options) {
        super(name, options);
        this.type = 'peb';
        this.isAstDirty = false;
        this.hmrPageReload = true;
    }

    addDependency (name, opts) {
        if (!shouldIgnore(opts.resolved)) {
            return super.addDependency(name, opts)
        } else {
            console.info(`Ignoring pebble dependency: ${name}`)
        }
    }

    processSingleDependency (p, opts) {
        console.warn(`Processing pebble dependency ${p}`)
        if (shouldIgnore(p)) {
            return p
        } else {
            return super.processSingleDependency(p, opts)
        }
    }

    postProcess(generated) {
        var _this5 = this;

        return (0, _asyncToGenerator2.default)(function* () {
            // Replace inline scripts and styles with processed results.
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = generated[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    let rendition = _step2.value;
                    let _rendition$meta = rendition.meta,
                        type = _rendition$meta.type,
                        node = _rendition$meta.node;

                    if (type === 'attr' && rendition.type === 'css') {
                        node.attrs.style = rendition.value;
                    } else if (type === 'tag') {
                        if (rendition.isMain) {
                            node.content = rendition.value;
                        } // Delete "type" attribute, since CSS and JS are the defaults.
                        // Unless it's application/ld+json


                        if (node.attrs && (node.tag === 'style' || node.attrs.type && SCRIPT_TYPES[node.attrs.type] === 'js')) {
                            delete node.attrs.type;
                        }
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return [{
                type: 'peb',
                value: render(_this5.ast)
            }];
        })();
    }
}

module.exports = SkipPebbleTemplateProcessing