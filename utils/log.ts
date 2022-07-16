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
		chalk.whiteBright(`\n🎉🎉 Yay! You shiny new project is ready!`)
	);
};
