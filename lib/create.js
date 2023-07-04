const path = require('path')
// fs-extra 是对 fs 模块的扩展，支持 promise 语法
const fs = require('fs-extra')

const inquirer = require('inquirer')

// 引入Generator的类
const { Generator } = require('./Generator')

module.exports = async function (name, options) {
    // 执行创建命令
    // 当前命令的执行目录
    const cwd = process.cwd()
    // 需要创建的目录地址
    const targetDir = path.resolve(cwd, name)
    // 判断目录是否存在
    if (fs.existsSync(targetDir)) {

        // 是否为强制创建？
        if (options.force) {
            await fs.remove(targetDir)
        } else {
            //  不是强制创建的情况下，询问用户是否要进行覆盖或者取消当前的操作
            const { action } = await inquirer.prompt([{
                name: 'action',
                type: 'list',
                message: 'Target directory already exists Pick an action:',
                choices: [
                    {
                        name: 'Overwrite',
                        value: 'overwrite'
                    }, {
                        name: 'Cancel',
                        value: false
                    }
                ]
            }])
            if (!action) {
                return
            } else {
                await fs.remove(targetDir)
            }
        }
    }
    // 创建项目
    const generator = new Generator(name, targetDir);

    // 开始创建项目
    generator.create()
}