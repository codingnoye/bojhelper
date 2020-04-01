const fs = require('fs-extra')
const timestamp = require('time-stamp')
const sheller = require('sheller.js')
const log = require('../logger.js')

const pwd = process.cwd()
const setting = JSON.parse(fs.readFileSync(__dirname+'/../setting.json'))
const ignore = [
    ".exe",
    ".class"
]

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

const test = async (argv) => {
    const cases = JSON.parse(fs.readFileSync(`${pwd}/testcases.json`))
    const files = await fs.readdir(pwd)
    let ext = ""

    for (let file of files) {
        if (file.substr(0, 4) == "code" && !ignore.includes(file.substr(4))) {
            ext = file.substr(4)
        }
    }

    if (ext == "") {
        log.error("Searching code files failed")
        process.exit(1)
    }

    await asyncForEach(cases, async (testcase, index)=>{
        log.important(`Test Case #${index}`)
        try {
            let tested = null
            const platform = process.platform
            fs.writeFileSync(`${pwd}/tmp`, testcase.input.trim())

            if (setting[platform][ext].length == 2) {
                await sheller(`${setting[platform][ext][0]}`)
                tested = await sheller(`${setting[platform]["pipe"]} ${setting[platform][ext][1]}`)
            } else {
                tested = await sheller(`${setting[platform]["pipe"]} ${setting[platform][ext][0]}`)
            }

            if (tested.trim() == testcase.output.trim()) {
                log.success("Correct!")
            } else {
                log.warning("Failed!")
                const logpath = `${pwd}/log/failed-case-${index}_${timestamp('YYYYMMDD_HHmmss')}.log`
                fs.writeFileSync(logpath, '# Input\n'+testcase.input+'\n# Correct Output\n'+testcase.output+'\n# Failed Output\n'+tested)
                log.log(logpath)
            }

        } catch (e) {
            log.error("Error!")
            const logpath = `${pwd}/log/error-case-${index}_${timestamp('YYYYMMDD_HHmmss')}.log`
            fs.writeFileSync(logpath, '# Input\n'+testcase.input+'\n# Correct Output\n'+testcase.output+'\n# Failed Output\n'+e.stdout+'\n# Error\n'+e.stderr)
            log.log(logpath)
            console.error(e.stderr)

        } finally {
            fs.unlinkSync(`./tmp`)
        }
    })
}

module.exports = {
    func : test,
    keyword : "test"
}