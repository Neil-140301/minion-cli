export const changeImport = (data: string, idx: number, content: string) => {
	let arr = data.split('\n');
	arr.splice(idx, 1, content);
	return arr.join('\n');
};

export const insertData = (data: string, idx: number, content: string) => {
	let arr = data.split('\n');
	arr.splice(idx, 0, content);
	return arr.join('\n');
};

export const removeLines = (data: string, lines: number[] = []) => {
	return data
		.split('\n')
		.filter((_, idx) => !lines.includes(idx))
		.join('\n');
};

export const addBrowserRouter = (data: string) => {
	let arr = data.split('\n');
	arr.splice(4, 0, 'import { BrowserRouter } from "react-router-dom";');
	let idx = arr.findIndex(x => x.includes('<App />'));
	arr.splice(idx, 1, '  <BrowserRouter>\n    <App />\n  </BrowserRouter>');

	return arr.join('\n');
};
