
class Main extends require('../') {
  
  /**
   * 
   * @param {String} inputs object like {name: ,value: }
   * @param {string} appPath   egg app path 
   */
  constructor(inputs, appPath) {

    super(inputs, appPath, __dirname, 'controller');

  }
}


module.exports = Main;