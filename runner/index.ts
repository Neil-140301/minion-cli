import { execSync, exec } from 'child_process';

export class NPM {
	options: any;
	args: string[];

	constructor() {
		this.options = {
			stdio: 'inherit'
		};
		this.args = process.argv.slice(2);
	}

	cwd(dir) {
		this.options.cwd = dir;
		return this;
	}

	output(value = true) {
		this.options.stdio = value ? 'inherit' : 'ignore';
		return this;
	}

	arguments(args = {}) {
		if (args === false) {
			this.args = [];
			return this;
		}

		const string: string[] = [];

		Object.keys(args)
			// in case of yargs
			.filter(key => key !== '$0' && key !== '_')
			.forEach(key => {
				if (Array.isArray(args[key])) {
					args[key].forEach(value =>
						string.push(`--${key} ${value}`)
					);
				} else {
					string.push(`--${key} ${args[key]}`);
				}
			});

		this.args = string;
		return this;
	}

	cmd(command = '') {
		try {
			return execSync(command, this.options).toString();
		} catch (e) {
			return null;
		}
	}
}
