const cheerio = require("cheerio")
const rp = require("request-promise-native")
const log = require("./logger.js")

module.exports = {
    async getTestcase(problemId) {
        try {
            const data = await rp(`https://www.acmicpc.net/problem/${num}`)
            const $ = cheerio.load(data)
            const inputs = $('.sampledata[id*=input]')
            const outputs = $('.sampledata[id*=output]')

            const ins = []
            const outs = []
            const cases = []
            inputs.each((index, item) => {ins.push($(item).text())})
            outputs.each((index, item) => {outs.push($(item).text())})

            if (ins.length == outs.length)
                log.success(`Found ${inputs.length} test cases.`)
            else
                log.warning(`Found ${inputs.length} inputs and ${outputs.length} outputs.`)
            for (let i=0; i<ins.length; i++) {
                const c = {input: ins[i], output: outs[i]}
                cases.push(c)
            }

            return cases
        } catch (error) {
            log.error("Parsing test cases failed")
        }
    }
}