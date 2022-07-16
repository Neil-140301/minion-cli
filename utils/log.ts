import chalk from 'chalk';
import alert from 'cli-alerts';

export default info => {
	alert({
		type: `warning`,
		name: `DEBUG LOG`,
		msg: ``
	});

	console.log(info);
	console.log();
};

export const endCredits = () => {
	console.log(
		chalk.whiteBright(
			`🎉🎉 Yay! You shiny new project is ready!\nInside your project folder, run:`
		)
	);
	console.log(chalk.bold(chalk.blue(`\nyarn start\n`)));
};
