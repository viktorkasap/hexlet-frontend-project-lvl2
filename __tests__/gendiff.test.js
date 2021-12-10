import * as fs from 'fs';
import * as path from 'path';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import gendiff from '../src/index.js';

// /Users/victorkasap/Projects/frontend-project-lvl2/__tests__/gendiff.test.js
const __filename = fileURLToPath(import.meta.url);

//  /Users/victorkasap/Projects/frontend-project-lvl2/__tests__
const __dirname = dirname(__filename);

// /Users/victorkasap/Projects/frontend-project-lvl2/__fixtures__/file1.json
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

/*
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
 */
const getContent = (file) => {
	const ext = path.extname(file);
	
	switch (true) {
		case ext === '.json':
			return JSON.parse(fs.readFileSync((file), 'utf-8'));
		
		case ext === '.txt':
			return fs.readFileSync((file), 'utf-8').trim();
	}
};

test('Test flat JSON files', () => {
	const json1 = getFixturePath('file1.json');
	const json2 = getFixturePath('file2.json');
	const diff = gendiff(json1, json2);
	const expectedOfJson = getFixturePath('expected_json.txt');
	const expectContent = getContent(expectedOfJson);
	
	expect(gendiff(json1, json2)).toEqual(expectContent);
});