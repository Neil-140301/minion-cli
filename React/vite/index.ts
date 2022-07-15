import { join } from 'path';
import { NPM } from '../../runner/index.js';
import { readFileSync, unlinkSync, writeFileSync } from 'fs';

const npm = new NPM();
const base = process.cwd();

export const withVite = (path:string) => {}