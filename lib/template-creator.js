const path = require('path');
const _ = require('lodash');
const ncp = require('ncp').ncp;
const fs = require('fs');

const LOG_LEVEL = {
  IMPORTANT: 'IMPORTANT',
  INFO: 'INFO',
  ERROR: 'ERROR',
};

class TemplateCreator {
  constructor(templateName, inputComponentName) {
    this.templateName = templateName;
    this.inputComponentName = inputComponentName;
  }

  create() {
    this.log(`Creating component ${this._getComponentName()}...`, LOG_LEVEL.IMPORTANT);

    this._copyTemplateFolder(() => {
      this._renameFiles();
      this._renameCodeNames();
    });

    this.log('created!', LOG_LEVEL.IMPORTANT);
  }

  _renameCodeNames() {
    try {
      const componentDir = path.join(this._getCurrFolderPath(), this._getComponentName());
      const list = fs.readdirSync(componentDir);

      list.forEach(fileName => {
        const filePath = path.join(componentDir, fileName);
        const source = fs.readFileSync(filePath, 'utf8');
        const changedSource = this._getRenamedCode(source);

        fs.writeFileSync(filePath, changedSource, 'utf8');
      });
    } catch (error) {
      this.log(error, LOG_LEVEL.ERROR);
    }
  }

  _getRenamedCode(fileSource) {
    let result = fileSource;

    try {
      this.log('Start rename code...', LOG_LEVEL.INFO);

      const tempNameReg = new RegExp(`(^|\\s|,|\\.|\\(|\\)|'|"|\\\|\\/)(${this.templateName})(\\s?|,|\\.|\\(|\\)|'|")`, 'g');
      result = result.replace(tempNameReg, `$1${this._getComponentName()}$3`);

      const tempConstructorName = _.upperFirst(this.templateName);
      const tempConstructorNameReg = new RegExp(`(^|\\s|,|\\.|\\(|\\)|'|"|\\\|\\/)(${tempConstructorName})(\\s?|,|\\.|\\(|\\)|'|")`, 'g');
      result = result.replace(tempConstructorNameReg, `$1${this._getConstructorName()}$3`);

      const tempCssComponentName = _.kebabCase(this.templateName);
      const tempCssComponentNameReg = new RegExp(`(^|\\s|,|\\.|\\(|\\)|'|"|\\\|\\/)(${tempCssComponentName})(_|-|\\s?|,|\\.|\\(|\\)|'|")`, 'g');
      result = result.replace(tempCssComponentNameReg, `$1${this._getCssComponentName()}$3`);

      this.log('done', LOG_LEVEL.INFO);
    } catch (error) {
      this.log(error, LOG_LEVEL.ERROR);
    }

    return result;
  }

  _renameFiles() {
    try {
      this.log('Start rename files...', LOG_LEVEL.INFO);
      
      const templatePath = path.join(this._getCurrFolderPath(), this.templateName);
      const list = fs.readdirSync(templatePath);
      
      list.forEach(fileName => {
        const oldName = path.join(templatePath, fileName);
        const extension = oldName.split('.').pop();
        const newName = path.join(templatePath, `${this._getComponentName()}.${extension}`);
        fs.renameSync(oldName, newName);
      });

      const newFolderName = path.join(this._getCurrFolderPath(), this._getComponentName());
      fs.renameSync(templatePath, newFolderName);

      this.log('done', LOG_LEVEL.INFO);
    } catch (error) {
      this.log(error, LOG_LEVEL.ERROR);
    }
  }

  _copyTemplateFolder(callback) {
    this.log('Start copy template folder...', LOG_LEVEL.INFO);

    const source = path.join(__dirname, `../templates/${this.templateName}`);
    const target = path.join(this._getCurrFolderPath(), this.templateName);
    ncp(source, target, (err) => {
      if (err) {
        return this.error(err);
      }

      this.log('done', LOG_LEVEL.INFO);
      callback();
    });
  }

  _getCurrFolderPath() {
    return process.cwd()
  }
  
  log(msg, level) {
    if (level === LOG_LEVEL.IMPORTANT) {
      console.log(msg);
    } else if (level === LOG_LEVEL.ERROR) {
      console.error(msg);
    }
  }

  _getComponentName() {
    return _.camelCase(this.inputComponentName);
  }

  _getConstructorName() {
    return _.upperFirst(this._getComponentName());
  }

  _getCssComponentName() {
    return _.kebabCase(this._getComponentName());
  }
}

module.exports = TemplateCreator;