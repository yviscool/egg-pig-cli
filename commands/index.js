const path = require('path');
const fs = require('fs');
const assert = require('assert');
const c = require("clorox");

const Action = require('./action');
const GenerateCommand = require('./generate');

class Commander {

    constructor(program) {
        const action = new Action();
        new GenerateCommand().set(action).load(program, this.appPaths);

    }

    get config() {
        return {
            baseDir: process.cwd(),
        }
    }

    get appPaths() {
        const baseDir = this.config.baseDir;
        return [
            path.join(baseDir),
            path.join(baseDir, '..'),
            path.join(baseDir, '../..'),
            path.join(baseDir, '../../..'),
            path.join(baseDir, '../../../..'),
            path.join(baseDir, '../../../../...'),
        ]
    }
}

module.exports = Commander;