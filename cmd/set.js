const fs = require('fs-extra')
const log = require('../logger.js')

const setting = JSON.parse(fs.readFileSync(__dirname + '/../setting.json'))
const support = ['py', 'rb', 'go', 'js', 'cpp', 'c', 'java', 'kt']

class Set {
    constructor(ext) {
        this.ext = ext
        this.newSetting = {}
    }
    process() {
        this.writeSetting()
        log.success('Setting successfully changed.')
    }
    getNewSetting() {
        const newSetting = setting
        newSetting.current = this.ext

        return newSetting
    }
    writeSetting() {
        try {
            fs.writeFileSync(
                __dirname + '/../setting.json',
                JSON.stringify(this.getNewSetting(), null, 2)
            )
        } catch {
            log.error('Changing setting is failed.')
            process.exit(1)
        }
    }
}

const main = async (argv) => {
    if (argv.length != 2) {
        log.error("Usage: 'boj set [ext]'")
        return
    }
    if (!support.includes(argv[1])) {
        log.error('Unsupported language.')
        log.important(`Supported language is ${support.join(', ')}`)
        return
    }

    const set = new Set(argv[1])
    set.process()
}

module.exports = {
    keyword: 'set',
    func: main,
}
