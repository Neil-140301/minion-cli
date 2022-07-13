import { join } from 'path';
import { NPM } from '../../runner/index.js';
import { readFileSync, unlinkSync, writeFileSync } from 'fs';

const npm = new NPM();
const base = process.cwd();

const addBrowserRouter = (data: string) => {
	let arr = data.split('\n');
	arr.splice(4, 0, 'import { BrowserRouter } from "react-router-dom";');
	let idx = arr.findIndex(x => x.includes('<App />'));
	arr.splice(idx, 1, '  <BrowserRouter>\n    <App />\n  </BrowserRouter>');

	return arr.join('\n');
};

export const withRouter = (path: string, typescript: boolean = false) => {
	const projectPath = join(base, path);

	// install react router
	npm.cwd(projectPath).cmd('yarn add react-router-dom@6');

	// add browser router
	let filename = typescript ? 'index.tsx' : 'index.js';
	const data = readFileSync(`${projectPath}/src/${filename}`, 'utf8');
	writeFileSync(`${projectPath}/src/${filename}`, addBrowserRouter(data));
};
