const c = require("clorox");
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const inflection = require('inflection');

class Core {

    constructor(inputs, appPath, dirname, componentPath) {
        this.pattern = /<%=.*?name.*?%>/gm;
        this.inputs = inputs;
        this.appPath = appPath;
        this.dirname = dirname;
        this.componentPath = componentPath;
    }

    generate() {

        let content = this.readFile();

        const { filePath, name } = this.parse();

        const distPath = path.join(this.appPath, this.componentPath, `${name.toLowerCase()}.ts`);

        const flag = this.exists(distPath);

        if (flag && path.basename(distPath) !== 'router') {
            this.logAlreadyExists(distPath);
            return;
        } else {
            this.removeSync(flag);
            this.logRemoveSuccess();
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


    remove(fileOrDir) {
        return fse.removeSync(fileOrDir);
    }

    logRemoveSuccess() {
        console.log(`${c.yellow('remove default router.ts success! ')}`);
    }

    logAlreadyExists(distPath) {
        console.log(`${c.yellow('ERROR!' + distPath + ' already exists.')}`)
    }

    logCreateSuccess(distPath) {
        console.log(`${c.yellow('CREATEA')} ${c.green(distPath)} `)
    }



}


module.exports = Core;