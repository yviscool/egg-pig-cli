const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const c = require("clorox");

class Core {

    constructor(inputs, appPath, dirname, componentPath) {
        this.pattern = /<%= name %>/gm;
        this.inputs = inputs;
        this.appPath = appPath;
        this.dirname = dirname;
        this.componentPath = componentPath;
    }



    generate() {

        let content = this.readFile();

        const { filePath, name } = this.parse();

        const distPath = path.join(this.appPath, this.componentPath, `${name}.ts`);
        const flag = this.exists(distPath);
        if (flag) {
            this.logAlreadyExists(distPath);
            return;
        }
        content = content.replace(this.pattern, this.camelProp(name))

        fse.outputFileSync(distPath, content);

        this.logCreateSuccess(distPath);
    }

    readFile() {
        return fs.readFileSync(this.dirname + '/__name__.ts', { encoding: 'utf-8' })
    }

    camelProp(name) {
        return name.charAt(0).toUpperCase() + name.substring(1);
    }

    parse() {
        let name;
        let filePath;
        for (let { key, value } of this.inputs) {
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


    logAlreadyExists(distPath) {
        console.log(`${c.yellow('ERROR!' + distPath + ' already exists.')}`)
    }

    logCreateSuccess(distPath) {
        console.log(`${c.yellow('CREATEA')} ${c.green(distPath)} `)
    }



}


module.exports = Core;