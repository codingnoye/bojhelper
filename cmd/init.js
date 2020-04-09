const fs = require("fs-extra")
const crawler = require("../crawler.js")
const log = require("../logger.js")

const setting = JSON.parse(fs.readFileSync(__dirname + '/../setting.json'))
const pwd = process.cwd()

class Init {
    constructor(num) {
        this.ext = setting.current
        this.num = num
        this.cases = {}
        this.isDirectoryCreated = false
    }
    async process() {
        try {
            log.important(`Current ext : ${this.ext}`)
            this.makeDirectory()
            await this.parseTestCase()
            this.makeFileInDirectory()
            log.success("Directory successfully created.")
        } catch {
            this.controlError()
        }
    }
    controlError() {
        if (this.isDirectoryCreated) {
            fs.removeSync(`${pwd}/${this.num}`)
        }
    }
    async parseTestCase() {
        try {
            this.cases = await crawler.getTestcase(this.num)
        } catch {
            log.error("Parsing cases is failed.")
            throw new Error()
        }
    }
    makeDirectory() {
        try {
            fs.mkdirSync(`${pwd}/${this.num}`)
            fs.mkdirSync(`${pwd}/${this.num}/log`)
            this.isDirectoryCreated = true
        } catch {
            log.error("Making directory is failed.")
            throw new Error()
        }
    }
    makeFileInDirectory() {
        fs.writeFileSync(`${pwd}/${this.num}/testcases.json`, JSON.stringify(this.cases, null, 4))
        fs.writeFileSync(`${pwd}/${this.num}/Main.${this.ext}`, '')
    }
}

const main = async (argv) => {
    if (argv.length != 2) {
        log.error("Usage: 'boj init [problem_number]'")
        return
    }

    const init = new Init(argv[1])
    init.process()
}

module.exports = {
    func: main,
    keyword: "init"
}