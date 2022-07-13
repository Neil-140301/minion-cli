import chalk from 'chalk';
import { ReactProject } from '../cli.types';
import { withCRA, withTypeScript } from '../cra/index.js';
import { withRouter } from '../cra/with-router/index.js';
import { withStyledComponents } from '../cra/with-styled-components/index.js';
import { withTailwind } from '../cra/with-tailwind/index.js';

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
			chalk.bold(
				chalk.bgBlack(
					chalk.green('\n1. setting up project template.\n')
				)
			);
			typescript ? withTypeScript(path, redux) : withCRA(path, redux);
			if (style === 'tw') {
				chalk.bold(
					chalk.bgBlack(chalk.green('\n2. Adding Tailwind css.\n'))
				);
				withTailwind(path);
			} else if (style === 'sc') {
				chalk.bold(
					chalk.bgBlack(
						chalk.green('\n2. Adding styled-components.\n')
					)
				);
				withStyledComponents(path);
			}

			if (routing) {
				chalk.bold(
					chalk.bgBlack(chalk.green('\n3. Adding react router.\n'))
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
};
