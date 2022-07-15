import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { NPM } from '../../../runner/index.js';

const npm = new NPM();
const base = process.cwd();

export const withTailwind = (path: string) => {
	const projectPath = join(base, path);

	// install tailwind
	npm.cwd(projectPath).cmd('yarn add -D tailwindcss postcss autoprefixer');

	// initialize tailwind
	npm.cmd(`cd ${projectPath} && npx tailwindcss init -p`);

	const tailwindConfig = readFileSync(
		'React/cra/with-tailwind/tailwind.config.cjs'
	);
	writeFileSync(`${projectPath}/tailwind.config.js`, tailwindConfig);

	// add css
	const css = `\n@tailwind base;\n@tailwind components;\n@tailwind utilities;`;
	writeFileSync(`${projectPath}/src/index.css`, css);
};
