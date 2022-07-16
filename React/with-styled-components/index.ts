import { join } from 'path';
import { NPM } from '../../runner/index.js';

const npm = new NPM();
const base = process.cwd();

export const withStyledComponents = (path: string, yarn: boolean = true) => {
	const projectPath = join(base, path);
	const pkgCmd = yarn ? 'yarn add' : 'npm i';

	// install styled-components
	npm.cwd(projectPath).cmd(`${pkgCmd} styled-components`);
};
