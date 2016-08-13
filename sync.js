'use strict';

const path = require('path');
const assert = require('assert');
const cp = require('child_process');

// Get the access token that is encrypted by travis
const token = getToken();

// Spawn github-labels
const githubLabels = path.join(__dirname, 'node_modules/.bin/labels');
const args = [
  '-c', path.join(__dirname, 'labels.json'), 'eggjs/egg',
  '-t', token,
];
const env = Object.assign({}, process.env, { HOME: __dirname });
cp.fork(githubLabels, args, { env })
.on('exit', code => process.exit(code));

function getToken() {
  const token = process.env.COFFEE_TOKEN;
  assert(token, 'process.env.COFFEE_TOKEN should exist');
  return token;
}
