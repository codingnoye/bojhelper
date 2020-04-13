const fs = require('fs-extra')
const timestamp = require('time-stamp')
const sheller = require('sheller.js')
const log = require('../logger.js')

const pwd = process.cwd()
const platform = process.platform
const setting = JSON.parse(fs.readFileSync(__dirname + '/../setting.json'))
const ignore = ['.exe', '.class', '.jar']

class Test {
    constructor(num) {
        this.num = num
        this.cases = []
        this.testcase = {}
        this.ext = ''
        this.log = ''
        this.exceeded = false
        this.timer = null
        this.sheller = null
    }
    async process() {
        this.getCases()
        this.getExt()
        await this.scoring()
        this.makeLog()
    }
    getCases() {
        try {
            this.cases = JSON.parse(fs.readFileSync(`${pwd}/${this.num}/testcases.json`))
        } catch {
            log.error('Finding directory is failed.')
            process.exit(1)
        }
    }
    getExt() {
        const files = fs.readdirSync(`${pwd}/${this.num}`)

        for (let file of files) {
            if (file.substr(0, 4) == 'Main' && !ignore.includes(file.substr(4))) {
                this.ext = file.substr(4)
            }
        }

        if (this.ext == '') {
            log.error('Finding Main file is failed.')
            process.exit(1)
        }
    }
    async scoring() {
        for (let i = 0; i < this.cases.length; i++) {
            let err = null
            this.testcase = this.cases[i]
            fs.writeFileSync(`${pwd}/${this.num}/tmp`, this.testcase.input)

            try {
                const check = await this.checkInTime()

                if (check) {
                    log.success(`Test Case #${i} : Correct!`)
                } else {
                    log.error(`Test Case #${i} : Failed..`)
                }
            } catch (error) {
                err = error
                if (this.exceeded) {
                    log.exceeded(`Test Case #${i} : Time Exceeded`)
                } else {
                    log.warning(`Test Case #${i} : Error`)
                }
            } finally {
                this.writeLog(i, err)
                fs.unlinkSync(`${pwd}/${this.num}/tmp`)
                clearTimeout(this.timer)
            }
        }
    }
    async getSheller() {
        try {
            const cd = `cd ${this.num};`
            const pipe = setting[platform]['pipe']
            const cmd = setting[platform][this.ext]

            if (cmd.length == 2) {
                await sheller(`${cd} ${cmd[0]}`)
                this.sheller = await sheller(`${cd} ${pipe} ${cmd[1]}`)
            } else {
                this.sheller = await sheller(`${cd} ${pipe} ${cmd[0]}`)
            }
        } catch (err) {
            throw new Error(err.stderr)
        }
    }
    checkSheller(testcase) {
        if (this.sheller.replace(/\s*$/, '') == testcase.output.replace(/\s*$/, '')) {
            return true
        } else {
            return false
        }
    }
    checkInTime() {
        return new Promise((res, rej) => {
            this.timer = setTimeout(() => {
                this.exceeded = true
                rej(new Error('Time exceeded, It works more than five sec.'))
            }, 5000)
            this.getSheller().then(() => {
                res(this.checkSheller(this.testcase))
            })
        })
    }
    writeLog(index, err) {
        this.log += `Test Case #${index}\n`
        this.log += '==========================================\n'
        this.log += `# Input\n${this.testcase.input}\n# Correct Output\n${this.testcase.output}\n` // '\n# Failed Output\n'+e.stdout+'\n# Error\n'+e.stderr
        if (!err) {
            this.log += `# Output\n${this.sheller.trim()}`
        } else {
            this.log += `# Output\n${err}`
        }
        this.log += '\n\n'
    }
    makeLog() {
        const path = `${pwd}/${this.num}/log/log_${timestamp('YYYYMMDD_HH:mm:ss')}.log`
        fs.writeFile(path, this.log).then(() => {
            process.exit(1)
        })
    }
}

const main = async (argv) => {
    if (argv.length != 2) {
        log.error("Usage: 'boj set [ext]'")
        return
    }

    const test = new Test(argv[1])
    test.process()
}

module.exports = {
    func: main,
    keyword: 'test',
}
