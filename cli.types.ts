export type ReactProject = {
	name: string;
	path: string;
	framework: 'cra' | 'next' | 'vite';
	style: 'tw' | 'sc' | 'default';
	typescript: boolean;
	routing: boolean;
	redux: boolean;
};

export type ExpoProject = {};
export type NodeProject = {};
