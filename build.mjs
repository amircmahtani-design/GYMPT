import {mkdir,copyFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
// Explicit allowlist: never package local workout exports or private recovery data.
const files=['index.html','style.css','app.mjs','core.mjs','planning.mjs','ui.mjs','exercises.mjs','extra-exercises.mjs','favicon.svg','apple-touch-icon.png','icon-192.png','icon-512.png','manifest.webmanifest'];
await mkdir('dist',{recursive:true});
const manifest=[];
for(const file of files){await copyFile(file,`dist/${file}`);manifest.push({file,sha256:createHash('sha256').update(await readFile(file)).digest('hex')});}
await writeFile('dist/build-manifest.json',JSON.stringify({application:'GymPT',files:manifest},null,2));
console.log(`Built ${files.length} static application files in dist/. No installation or network access required.`);
