import { join } from 'path';
import { NPM } from '../../../runner/index.js';

const npm = new NPM();
const base = process.cwd();

export const withStyledComponents = (path: string) => {
	const projectPath = join(base, path);

	// install styled-components
	npm.cwd(projectPath).cmd('yarn add styled-components');
};
