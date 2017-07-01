#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const componentName = process.argv[2];
const TemplateCreator = require('../lib/template-creator.js');

const creator = new TemplateCreator('templateCard', componentName);
creator.create();