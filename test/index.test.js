'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

describe('test/index.test.js', () => {
  it('check labels.json', () => {
    const buf = fs.readFileSync(path.join(__dirname, '../labels.json'));
    const labels = JSON.parse(buf);
    assert(Array.isArray(labels), 'labels should be array');
    for (const label of labels) {
      assert('name' in label, `name is required in ${label}`);
      assert('color' in label, `color is required in ${label}`);
    }
  });
});
