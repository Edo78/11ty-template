'use strict'

const format = require('date-fns/format')

module.exports = function (config) {

  // add `date` filter
  config.addFilter('date', function (date, dateFormat) {
    return format(date, dateFormat)
  })

  // ... the rest of your config here ...
}
