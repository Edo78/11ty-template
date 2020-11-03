'use strict'

const format = require('date-fns/format')
const { readdirSync } = require('fs')

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
    })

  return configObj;
}
