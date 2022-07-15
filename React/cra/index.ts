import { join } from 'path';
import { NPM } from '../../runner/index.js';
import {
	copyFileSync,
	readFileSync,
	rmSync,
	unlinkSync,
	writeFileSync,
	renameSync
} from 'fs';

const npm = new NPM();
const base = process.cwd();

const changeImport = (data: string, idx: number, content: string) => {
	let arr = data.split('\n');
	arr.splice(idx, 1, content);
	return arr.join('\n');
};

const removeLines = (data: string, lines: number[] = []) => {
	return data
		.split('\n')
		.filter((_, idx) => !lines.includes(idx))
		.join('\n');
};

export const withCRA = (path: string, redux: boolean = false) => {
	const projectPath = join(base, path);

	// create a new project
	npm.cmd(
		`yarn create react-app ${redux && '--template redux'} ${projectPath}`
	);

	// clean up project
	unlinkSync(`${projectPath}/public/logo192.png`);
	unlinkSync(`${projectPath}/public/logo512.png`);
	unlinkSync(`${projectPath}/public/manifest.json`);
	unlinkSync(`${projectPath}/public/robots.txt`);

	unlinkSync(`${projectPath}/src/App.test.js`);
	unlinkSync(`${projectPath}/src/logo.svg`);
	unlinkSync(`${projectPath}/src/reportWebVitals.js`);
	unlinkSync(`${projectPath}/src/setupTests.js`);

	if (redux) {
		unlinkSync(`${projectPath}/src/features/counter/Counter.js`);
		unlinkSync(`${projectPath}/src/features/counter/Counter.module.css`);
		unlinkSync(`${projectPath}/src/features/counter/counterAPI.js`);
		unlinkSync(`${projectPath}/src/features/counter/counterSlice.spec.js`);
	}

	const data = readFileSync(`${projectPath}/src/index.js`, 'utf8');
	if (redux) {
		const appData = readFileSync(`${projectPath}/src/App.js`, 'utf8');
		writeFileSync(
			`${projectPath}/src/App.js`,
			removeLines(appData, [1, 2, 9, 10])
		);
		writeFileSync(
			`${projectPath}/src/index.js`,
			removeLines(data, [5, 19, 20, 21, 22])
		);
		writeFileSync(
			`${projectPath}/src/index.js`,
			changeImport(
				removeLines(data, [5, 19, 20, 21, 22]),
				3,
				"import { store } from './redux/store';"
			)
		);
	} else {
		writeFileSync(
			`${projectPath}/src/index.js`,
			removeLines(data, [4, 13, 14, 15, 16])
		);
	}

	// rename app -> redux
	renameSync(`${projectPath}/src/app`, `${projectPath}/src/redux`);
	copyFileSync(
		`${projectPath}/src/features/counter/counterSlice.js`,
		`${projectPath}/src/redux/counterSlice.js`
	);
	rmSync(`${projectPath}/src/features`, {
		recursive: true,
		force: true
	});

	// change the import path for counter slice
	const reduxStoreData = readFileSync(
		`${projectPath}/src/redux/store.js`,
		'utf8'
	);

	writeFileSync(
		`${projectPath}/src/redux/store.js`,
		changeImport(
			reduxStoreData,
			1,
			"import counterReducer from './counterSlice';"
		)
	);

	// change counterSlice
	if (redux) {
		const counterSlice = readFileSync(`React/cra/sample_slice.txt`);
		writeFileSync(`${projectPath}/src/redux/counterSlice.js`, counterSlice);
	}

	// create components and pages
	npm.cwd(`${projectPath}/src`).cmd(`mkdir components`);
	npm.cwd(`${projectPath}/src`).cmd(`mkdir pages`);
};

export const withTypeScript = (path: string, redux: boolean = false) => {
	const projectPath = join(base, path);

	// create a new project
	npm.cmd(
		`yarn create react-app --template ${
			redux ? 'redux-typescript' : 'typescript'
		} ${projectPath}`
	);

	// clean up project
	unlinkSync(`${projectPath}/public/logo192.png`);
	unlinkSync(`${projectPath}/public/logo512.png`);
	unlinkSync(`${projectPath}/public/manifest.json`);
	unlinkSync(`${projectPath}/public/robots.txt`);

	unlinkSync(`${projectPath}/src/App.test.tsx`);
	unlinkSync(`${projectPath}/src/logo.svg`);
	unlinkSync(`${projectPath}/src/reportWebVitals.ts`);
	unlinkSync(`${projectPath}/src/setupTests.ts`);

	if (redux) {
		unlinkSync(`${projectPath}/src/features/counter/Counter.tsx`);
		unlinkSync(`${projectPath}/src/features/counter/Counter.module.css`);
		unlinkSync(`${projectPath}/src/features/counter/counterAPI.ts`);
		unlinkSync(`${projectPath}/src/features/counter/counterSlice.spec.ts`);
	}

	const data = readFileSync(`${projectPath}/src/index.tsx`, 'utf8');

	if (redux) {
		const appData = readFileSync(`${projectPath}/src/App.tsx`, 'utf8');
		writeFileSync(
			`${projectPath}/src/App.tsx`,
			removeLines(appData, [1, 2, 7, 10])
		);
		writeFileSync(
			`${projectPath}/src/index.tsx`,
			removeLines(data, [5, 19, 20, 21, 22])
		);
		writeFileSync(
			`${projectPath}/src/index.tsx`,
			changeImport(
				removeLines(data, [5, 19, 20, 21, 22]),
				3,
				"import { store } from './redux/store';"
			)
		);
	} else {
		writeFileSync(
			`${projectPath}/src/index.tsx`,
			removeLines(data, [4, 15, 16, 17, 18])
		);
	}

	// rename app -> redux
	renameSync(`${projectPath}/src/app`, `${projectPath}/src/redux`);
	copyFileSync(
		`${projectPath}/src/features/counter/counterSlice.ts`,
		`${projectPath}/src/redux/counterSlice.ts`
	);
	rmSync(`${projectPath}/src/features`, {
		recursive: true,
		force: true
	});

	// change the import path for counter slice
	const reduxStoreData = readFileSync(
		`${projectPath}/src/redux/store.ts`,
		'utf8'
	);

	writeFileSync(
		`${projectPath}/src/redux/store.ts`,
		changeImport(
			reduxStoreData,
			1,
			"import counterReducer from './counterSlice';"
		)
	);

	// create components and pages
	npm.cwd(`${projectPath}/src`).cmd(`mkdir components`);
	npm.cwd(`${projectPath}/src`).cmd(`mkdir pages`);
};
