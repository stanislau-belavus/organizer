'use strict';

var fs = require('fs');
var path = require('path');

var filepath = path.resolve(__dirname, '../../src/bundle.json');

module.exports = function (stats) {

    var publicPath = this.options.output.publicPath;
    var json = stats.toJson();

    var getChunks = function (name, ext) {
        ext = ext || /.js$/;
        var chunks = json.assetsByChunkName[name];

        if (!(Array.isArray(chunks))) {
            chunks = [chunks];
        }

        return chunks
            .filter(function(chunk) {
                return ext.test(path.extname(chunk))
            })
            .map(function(chunk) {
                return publicPath+chunk
            });
    };

    var content = {
        bundle: {
            js: getChunks('main', /js/),
            css: getChunks('main', /css/)
        }
    };
    fs.writeFileSync(filepath, JSON.stringify(content));

    console.log('`bundle.json` updated');
};
