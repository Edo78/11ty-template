'use strict'

const format = require('date-fns/format')
const { readdirSync, readFileSync } = require('fs')

module.exports = function (config) {

  const configObj = {
    dir: {
      input: './src',
    }
  }
  // add `date` filter
  config.addFilter('date', function (date, dateFormat) {
    return format(date, dateFormat)
  });

  readdirSync(configObj.dir.input, { withFileTypes: true })
    .filter(item => item.isDirectory())
    .forEach(dir => {
      config.addCollection(`${dir.name}`, function(collectionApi) {
        return collectionApi.getFilteredByGlob(`${configObj.dir.input}/${dir.name}/**/*`);
      });
    });

  config.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {

        bs.addMiddleware("*", (req, res) => {
          const content_404 = readFileSync('_site/404.html');
          // Provides the 404 content without redirect.
          res.write(content_404);
          // Add 404 http status code in request header.
          // res.writeHead(404, { "Content-Type": "text/html" });
          res.writeHead(404);
          res.end();
        });
      }
    }
  });

  return configObj;
}
