const path = require('path');
const _ = require('lodash');
const ncp = require('ncp').ncp;
const fs = require('fs');
const rootAppPath = require('app-root-path').path

const LOG_LEVEL = {
  IMPORTANT: 'IMPORTANT',
  INFO: 'INFO',
  ERROR: 'ERROR',
};

class ModelCreator {
  constructor(modelName) {
    this.modelName = this._getModelName(modelName);
  }

  create() {
    this.log(`Creating model ${this.modelName}...`, LOG_LEVEL.IMPORTANT);

    this._copyTemplateFolder(() => {
      this._renameFile();
      this._renameCodeNames();

      this.log('created!', LOG_LEVEL.IMPORTANT);
    });
  }

  _renameCodeNames() {
    try {
      const modelsFolder = this._getModelsFolderPath();
      const filePath = path.join(modelsFolder, `${this.modelName}.js`);

      const source = fs.readFileSync(filePath, 'utf8');
      const changedSource = this._getRenamedCode(source);

      fs.writeFileSync(filePath, changedSource, 'utf8');
    } catch (error) {
      this.log(error, LOG_LEVEL.ERROR);
    }
  }

  _getRenamedCode(fileSource) {
    let result = fileSource;

    try {
      this.log('Start rename code...', LOG_LEVEL.INFO);

      const tempNameReg = new RegExp(`(^|\\s|,|\\.|\\(|\\)|'|"|\\/)(TemplateModel)(\\s?|,|\\.|\\(|\\)|'|")`, 'g');
      result = result.replace(tempNameReg, `$1${this.modelName}$3`);

      this.log('done', LOG_LEVEL.INFO);
    } catch (error) {
      this.log(error, LOG_LEVEL.ERROR);
    }

    return result;
  }

  _renameFile() {
    try {
      const modelsFolder = this._getModelsFolderPath();
      const modelFilePath = path.join(modelsFolder, 'templateModel.js');
      const newModelName = path.join(modelsFolder, `${this.modelName}.js`);
      fs.renameSync(modelFilePath, newModelName);
    } catch (error) {
      this.log(error, LOG_LEVEL.ERROR);
    }
  }

  _copyTemplateFolder(callback) {
    this.log('Start copy template folder...', LOG_LEVEL.INFO);

    const source = path.join(__dirname, `../templates/templateModel`);
    const modelsFolder = this._getModelsFolderPath();
    if (!fs.existsSync(modelsFolder)) {
      this.log(`Can't find Models folder: ${modelsFolder}`, LOG_LEVEL.ERROR);
    }
    else {
      ncp(source, modelsFolder, (err) => {
        if (err) {
          return this.error(err);
        }

        this.log('done', LOG_LEVEL.INFO);
        callback();
      });
    }
  }

  _getModelsFolderPath() {
    return path.join(rootAppPath, 'app/components/backend/models/');
  }

  log(msg, level) {
    if (level === LOG_LEVEL.IMPORTANT) {
      console.log(msg);
    } else if (level === LOG_LEVEL.ERROR) {
      console.error(msg);
    }
  }

  _getModelName() {
    return _.upperFirst(_.camelCase(this.modelName));
  }
}

module.exports = ModelCreator;