#!/usr/bin/env node
const commander = require('commander')
const CommandLoader = require('../commands')
const bootstrap = () => {
  const program = commander;
  program
    .version(require('../package.json').version)
  new CommandLoader(program);
  commander.parse(process.argv);
}

bootstrap();
