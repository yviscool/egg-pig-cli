const fse = require('fs-extra')
const fs = require('fs')
const path = require('path');
const c = require("clorox");

class Main /*extends require('../')*/ {

  generate(inputs, appPath) {


    let content = fs.readFileSync(__dirname + '/__name__.ts', {
      encoding: 'utf-8',
    });


    const pattern = /<%= name %>/gm;


    let filePath;
    let name;
    for (let { key, value } of inputs) {
      if (key === 'name')
        name = value;
      if (key === 'path')
        filePath = path;
    }

    const distPath = path.join(appPath, 'common/exceptions', `${name}.ts`);

    if (fs.existsSync(distPath)) {
      const errorMessage = `ERROR! ${distPath}.ts already exists.`;
      console.log(`${c.yellow(errorMessage)} `)
      return;
    }


    
    content = content.replace(pattern, this.parse(name))



    fse.outputFileSync(distPath, content);
    console.log(`${c.yellow('CREATEA')} ${c.green(distPath)} `)

  }



  parse(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

}


module.exports = new Main()