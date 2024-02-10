import genDiff from '../src/index.js';

const flatJson = '\n{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';

test('genDiff with .json format', () => {
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toEqual(flatJson);
  // expect(genDiff('')).toEqual('');
});

test('genDiff with .yaml format', () => {
  expect(genDiff('./__fixtures__/file1.yml', './__fixtures__/file2.yaml')).toEqual(flatJson);
  // expect(genDiff('')).toEqual('');
});
