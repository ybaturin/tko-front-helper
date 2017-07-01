#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const componentName = process.argv[2];
const CardCreator = require('../lib/card-creator.js');

(new CardCreator).create(componentName);