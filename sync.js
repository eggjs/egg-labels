'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const cp = require('child_process');

// Get the access token that is encrypted by travis
const token = getToken();
fs.writeFileSync(path.join(__dirname, '.github-labels'), token);

// Spawn github-labels
const githubLabels = path.join(__dirname, 'node_modules/.bin/labels');
const args = [ '-c', path.join(__dirname, 'labels.json'), 'egg/egg-labels' ];
const env = Object.assign({}, process.env, { HOME: __dirname });
cp.fork(githubLabels, args, { env })
.on('exit', code => process.exit(code));

function getToken() {
  const token = process.env.COFFEE_TOKEN;
  assert(token, 'process.env.COFFEE_TOKEN should exist');
  return token;
}
