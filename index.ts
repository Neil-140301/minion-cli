#!/usr/bin/env node

/**
 * minion
 * A easy cli to set up new dev projects
 *
 * @author Neil Alvares <https://github.com/Neil-140301>
 */

import init from './utils/init.cjs';
import cli from './utils/cli.js';
import log from './utils/log.js';
import { newReactProject, startNewProject } from './prompts/init.js';
import type { ExpoProject, NodeProject, ReactProject } from './cli.types';
import { initReactProject } from './utils/reactProject.js';
import chalk from 'chalk';
import { NPM } from './runner/index.js';

const input: string[] = cli.input;
const flags = cli.flags;
const { debug } = flags;

(async () => {
	new NPM().output(false).installYarn();
	init({});

	if (input.length === 0 || input.includes('help')) return cli.showHelp(0);
	debug && log(flags);

	// if selected React
	let reactProject: ReactProject;

	if (input[0] !== 'init') return;
	const { type } = await startNewProject();

	switch (type) {
		case 'react':
			reactProject = await newReactProject();
			initReactProject(reactProject);
			break;
		case 'expo':
			console.log(
				chalk.bgWhite(
					chalk.bold(chalk.black('\nIn Development...stay tuned!'))
				)
			);
			break;
		case 'node':
			console.log(
				chalk.bgBlue(
					chalk.bold(chalk.green('\nIn Development...stay tuned!'))
				)
			);
	}
})();
