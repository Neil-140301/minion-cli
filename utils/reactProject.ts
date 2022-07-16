import chalk from 'chalk';
import { ReactProject } from '../cli.types';
import { withCRA, withTypeScript } from '../React/cra/index.js';
import { withRouter } from '../React/cra/with-router/index.js';
import { withStyledComponents } from '../React/with-styled-components/index.js';
import { withTailwind } from '../React/with-tailwind/index.js';
import { withNext } from '../React/next/index.js';
import { endCredits } from './log.js';

export const initReactProject = ({
	path,
	framework,
	style,
	redux,
	routing,
	typescript
}: ReactProject) => {
	console.log(
		chalk.bold(
			chalk.green(chalk.bgBlack('\nSetting up project template.\n'))
		)
	);
	switch (framework) {
		case 'cra':
			if (typescript) {
				withTypeScript(path, redux);
			} else {
				withCRA(path, redux);
			}

			if (routing) {
				console.log(
					chalk.bold(
						chalk.bgBlack(chalk.green('\nAdding react router.\n'))
					)
				);
				withRouter(path, typescript);
			}
			break;
		case 'next':
			withNext(path, typescript, redux);
			break;
		case 'vite':
			console.log(
				chalk.bgGreenBright(
					chalk.bold(chalk.green('\nIn Development...stay tuned!'))
				)
			);
			break;
	}

	if (style === 'tw') {
		console.log(
			chalk.bold(chalk.bgBlack(chalk.green('\nAdding Tailwind css.\n')))
		);
		withTailwind(path, framework === 'next', redux);
	} else if (style === 'sc') {
		console.log(
			chalk.bold(
				chalk.bgBlack(chalk.green('\nAdding styled-components.\n'))
			)
		);
		withStyledComponents(path);
	}

	endCredits();
};
