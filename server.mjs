import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd();
const allowed=new Set(['index.html','style.css','app.mjs','core.mjs','ui.mjs','planning.mjs','exercises.mjs','extra-exercises.mjs','favicon.svg','apple-touch-icon.png','icon-192.png','icon-512.png','manifest.webmanifest']);
http.createServer(async(req,res)=>{let file;try{file=decodeURIComponent(req.url.split('?')[0]).replace(/^\//,'')||'index.html';}catch{res.writeHead(400);res.end();return;}if(!allowed.has(file)){res.writeHead(404);res.end('Not found');return;}try{const data=await readFile(path.join(root,file));const mime={'.html':'text/html','.css':'text/css','.mjs':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.webmanifest':'application/manifest+json'};res.writeHead(200,{'Content-Type':mime[path.extname(file)],'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});res.end(data);}catch{res.writeHead(404);res.end();}}).listen(4173,'127.0.0.1',()=>console.log('GymPT preview: http://127.0.0.1:4173'));
