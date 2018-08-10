class GenerateCommand {

    set(action) {
        this.action = action;
        return this;
    }

    load(program, appPaths) {
        const parse = this.parse.bind(this);
        const action = this.action;
        program
            .command('generate <type> <name> [path]')
            .alias('g')
            .description('Generate egg-pig component.')
            .action((type, name, path, command) => {
                const inputs = [];
                inputs.push(parse('type', type));
                inputs.push(parse('name', name));
                inputs.push(parse('path', path || 'common'));
                action.handle(inputs, appPaths);
            })

        program.on('--help', () => {
              console.log('')
              console.log('  Examples:');
              console.log('');
              console.log('    $ pig g co cats     # controller');
              console.log('    $ pig g gu role     # guard');
              console.log('    $ pig g pi validate # pipe');
              console.log('    $ pig g in log      # interceptor ');
              console.log('    $ pig g ex http     # exception');
              console.log('    $ pig g fi http     # filter');
              console.log('    $ pig g de custom   # descorator');
              console.log('    $ pig g mi some     # router ');
              console.log('');
            })
    }

    parse(key, value) {
        return {
            key,
            value,
        }
    }
}

module.exports = GenerateCommand;