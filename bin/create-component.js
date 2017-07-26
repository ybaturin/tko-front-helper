#!/usr/bin/env node

const componentName = process.argv[1];
const TemplateCreator = require('../lib/template-creator.js');

if (!componentName) {
  return console.error('Не введено имя компонента, отмена...')
}

const creator = new TemplateCreator('templateComponent', componentName);
creator.create();