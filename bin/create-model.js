#!/usr/bin/env node

const modelName = process.argv[2];
const ModelCreator = require('../lib/model-creator.js');

if (!modelName) {
  return console.error('Не введено имя модели, отмена...')
}

const creator = new ModelCreator(modelName);
creator.create();