import { join } from 'path';
import { NPM } from '../../../runner/index.js';
import { readFileSync, unlinkSync, writeFileSync } from 'fs';
import { addBrowserRouter } from '../../../utils/helper.js';

const npm = new NPM();
const base = process.cwd();

export const withRouter = (path: string, typescript: boolean = false) => {
	const projectPath = join(base, path);

	// install react router
	npm.cwd(projectPath).cmd('yarn add react-router-dom@6');

	// add browser router
	let filename = typescript ? 'index.tsx' : 'index.js';
	const data = readFileSync(`${projectPath}/src/${filename}`, 'utf8');
	writeFileSync(`${projectPath}/src/${filename}`, addBrowserRouter(data));
};
