const _ = require('lodash');

class CardCreator {
  create(componentName) {
    const currentFolder = process.cwd();
    console.log(currentFolder, componentName);
  }
}

module.exports = CardCreator;