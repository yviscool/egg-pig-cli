const color = require("colorette");
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const readline = require('readline');
const inflection = require('inflection');

class Core {

    constructor(inputs, appPath, dirname, componentPath) {
        this.pattern = /<%=.*?name.*?%>/gm;
        this.inputs = inputs;
        this.appPath = appPath;
        this.dirname = dirname;
        this.componentPath = componentPath;
    }

    async generate() {

        let content = this.readFile();

        const { filePath, name } = this.parse();

        let distPath = path.join(this.appPath, this.componentPath, `${name.toLowerCase()}.ts`);

        const routerPath = path.join(this.appPath, 'router.ts');

        const isdistPahtExist = this.exists(distPath);

        const isGenerateRouter = this.isGenerateRouter(distPath);

        if (isdistPahtExist && !isGenerateRouter) {
            this.logAlreadyExists(distPath);
            return;
        }

        if (isGenerateRouter) {
            const no = await this.askForRemoveRouter();
            if (no) {
                return;
            }
            this.remove(routerPath);
            distPath = routerPath;
        }

        content = content.replace(this.pattern, this.camelProp(name))

        fse.outputFileSync(distPath, content);

        this.logCreateSuccess(distPath);
    }

    readFile() {
        return fs.readFileSync(this.dirname + '/__name__.ts', { encoding: 'utf-8' })
    }

    camelProp(name) {
        return inflection.camelize(name);
    }

    parse() {
        let name;
        let filePath;
        for (const { key, value } of this.inputs) {
            if (key === 'name')
                name = value;
            if (key === 'path')
                filePath = value;
        }
        return { filePath, name };
    }

    exists(distPath) {
        if (fs.existsSync(distPath)) {
            return true;
        }
        return false;
    }

    isGenerateRouter(distPath, appPath) {
        if (/.*?app.*?middleware/.test(distPath)) {
            return true;
        }
        return false;
    }

    remove(fileOrDir) {
        return fse.removeSync(fileOrDir);
    }

    askForRemoveRouter() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        return new Promise(resolve => {
            rl.question('\nDo you want to delete router.ts ? (yes or no) ', msg => {
                rl.pause();
                msg =  msg.trim().toLocaleLowerCase();
                resolve(msg.includes('no'));
            })
        })
    }


    logAlreadyExists(distPath) {
        console.log(color.yellow(`ERROR! ${distPath} already exists.`))
    }

    logCreateSuccess(distPath) {
        console.log(color.yellow('CREATED') + color.green(distPath))
    }

}


module.exports = Core;
