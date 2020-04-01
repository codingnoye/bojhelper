const fs = require("fs-extra")
const sheller = require("sheller.js")
const crawler = require("../crawler.js")
const log = require("../logger.js")

const pwd = process.cwd()

const init = async (argv) => {
    if (argv.length != 3) {
        log.error(`Usage: 'boj init [problem_number] [ext]'`)
        process.exit(1)
    }

    num = argv[1]
    ext = argv[2]

    log.log('Making problem directory...')
    try {
        fs.mkdirSync(`${pwd}/${num}`)
        fs.mkdirSync(`${pwd}/${num}/log`)
    } catch (error) {
        log.error('Making problem directory failed.')
    }
    log.success("Successfully Making problem directory ")

    log.log('Parsing test cases...')
    const cases = await crawler.getTestcase(num)
    log.success("Successfully Parsing test cases.")

    log.log("Making files in problem directory...")
    try {
        fs.writeFileSync(`${pwd}/${num}/testcases.json`, JSON.stringify(cases, null, 4))
    } catch (error) {
        log.error('Making test case file failed.')
    }
    try {
        fs.writeFileSync(`${pwd}/${num}/code.${ext}`, '')
    } catch (error) {
        log.error('Making code file failed.')
    }
    log.success("Successfully Making files in problem directory.")

    log.success('Successfully initialized.')
}

module.exports = {
    func : init,
    keyword : "init"
}