import { readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { NPM } from '../../runner/index.js';
import { tailwind_config, tailwind_config_next } from './tailwindConfig.js';

const npm = new NPM();
const base = process.cwd();

export const withTailwind = (
	path: string,
	next: boolean = false,
	redux: boolean = false,
	yarn: boolean = true
) => {
	const projectPath = join(base, path);
	const pkgCmd = yarn ? 'yarn add' : 'npm i';

	// install tailwind
	npm.cwd(projectPath).cmd(`${pkgCmd} -D tailwindcss postcss autoprefixer`);

	// initialize tailwind
	npm.cwd(projectPath).cmd(`npx tailwindcss init -p`);

	writeFileSync(
		`${projectPath}/tailwind.config.js`,
		next ? tailwind_config_next : tailwind_config
	);

	// add css
	const css = `\n@tailwind base;\n@tailwind components;\n@tailwind utilities;`;
	writeFileSync(
		resolve(
			projectPath,
			next
				? redux
					? 'src/styles/globals.css'
					: 'styles/globals.css'
				: 'src/index.css'
		),
		css
	);
};
