import inquirer from 'inquirer';

export const startNewProject = async () => {
	const answers = await inquirer.prompt(projectTypeQuestions);
	return answers;
};

export const newReactProject = async () => {
	const answers = await inquirer.prompt(reactQuestions);
	return answers;
};

const projectTypeQuestions = [
	{
		type: 'list',
		name: 'type',
		message: 'What type of project are we building today? :',
		default: 'react',
		choices: ['react', 'expo', 'node']
	}
];

const reactQuestions = [
	// {
	// 	type: 'input',
	// 	name: 'name',
	// 	message: 'Project name:'
	// },
	{
		type: 'input',
		name: 'path',
		message: 'Project path:'
	},
	{
		type: 'list',
		name: 'framework',
		message: 'Project framework:',
		default: 'cra',
		choices: ['cra', 'next', 'vite']
	},
	{
		type: 'list',
		name: 'style',
		message: 'Project styling:',
		default: 'default',
		choices: [
			{
				name: 'Tailwind',
				value: 'tw'
			},
			{
				name: 'styled-components',
				value: 'sc'
			},
			{
				name: 'vanilla-css',
				value: 'default'
			}
		]
	},
	{
		type: 'confirm',
		name: 'typescript',
		message: 'use typescript:',
		default: true
	},
	{
		type: 'confirm',
		name: 'routing',
		message: 'use react-router:',
		default: false
	},
	{
		type: 'confirm',
		name: 'redux',
		message: 'use redux:',
		default: false
	}
];
