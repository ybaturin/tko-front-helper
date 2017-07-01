const path = require('path');
const _ = require('lodash');
const ncp = require('ncp').ncp;
const fs = require('fs');
const TEMPLATE_NAME = 'templateCard';
const TEMPLATE_CARD_PATH = path.join(__dirname, `../templates/${TEMPLATE_NAME}`);


class CardCreator {
  create(inputName) {
    this.inputName = inputName;
    this.log(`Creating component ${this._getComponentName()}...`);

    this._copyTemplateFolder(() => {
      this._renameFiles();
    })
  }

  _renameFiles() {
    try {
      this.log('Start rename files...');
      
      const templatePath = path.join(this.getCurrFolderPath(), TEMPLATE_NAME);
      const list = fs.readdirSync(templatePath);
      
      list.forEach(fileName => {
        const oldName = path.join(dir, fileName);
        const newName = path.join(dir, this._getComponentName());
        fs.renameSync(oldName, newName);
      });
  
      const newFolderName = path.join(this.getCurrFolderPath(), this._getComponentName());
      fs.renameSync(templatePath, newFolderName);

      this.log('done');
    } catch (error) {
      this.error(error);
    }
  }

  _copyTemplateFolder(callback) {
    this.log('Start copy template folder...');
    ncp(TEMPLATE_CARD_PATH, this.getCurrFolderPath(), (err) => {
      if (err) {
        return this.error(err);
      }

      this.log('done');
      callback();
    });
  }

  getCurrFolderPath() {
    return process.cwd()
  }
  
  log(msg) {
    console.log(msg);
  }
  
  error(msg) {
    console.error(msg);
  }

  _getComponentName() {
    return _.camelCase(this.inputName);
  }

}

module.exports = CardCreator;