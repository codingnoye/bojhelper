const cheerio = require('cheerio')
const axios = require('axios')

module.exports = {
    init: async (pwd, data) => {console.log('init: '+data)},
    test: async (pwd, data) => {console.log('test: '+data)},
    submit: async (pwd, data) => {console.log('submit: '+data)}
}
