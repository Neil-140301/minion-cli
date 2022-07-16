import chalk from 'chalk';
import { ReactProject } from '../cli.types';
import { withCRA, withTypeScript } from '../React/cra/index.js';
import { withRouter } from '../React/cra/with-router/index.js';
import { withStyledComponents } from '../React/cra/with-styled-components/index.js';
import { withTailwind } from '../React/cra/with-tailwind/index.js';
import { endCredits } from './log.js';

export const initReactProject = ({
	path,
	framework,
	style,
	redux,
	routing,
	typescript
}: ReactProject) => {
	switch (framework) {
		case 'cra':
			console.log(
				chalk.bold(
					chalk.green(
						chalk.bgBlack('\nSetting up project template.\n')
					)
				)
			);
			if (typescript) {
				withTypeScript(path, redux);
			} else {
				withCRA(path, redux);
			}

			if (style === 'tw') {
				console.log(
					chalk.bold(
						chalk.bgBlack(chalk.green('\nAdding Tailwind css.\n'))
					)
				);
				withTailwind(path);
			} else if (style === 'sc') {
				console.log(
					chalk.bold(
						chalk.bgBlack(
							chalk.green('\nAdding styled-components.\n')
						)
					)
				);
				withStyledComponents(path);
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
			console.log(
				chalk.bgWhite(
					chalk.bold(chalk.black('\nIn Development...stay tuned!'))
				)
			);
			break;
		case 'vite':
			console.log(
				chalk.bgGreenBright(
					chalk.bold(chalk.green('\nIn Development...stay tuned!'))
				)
			);
			break;
	}

	endCredits();
};
