import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('./dist/',import.meta.url));
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.jpg':'image/jpeg','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain'};
http.createServer(async (req,res)=>{
 try { const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname); const target=path.resolve(root,'.'+pathname+(pathname.endsWith('/')?'index.html':'')); if(!target.startsWith(root)){res.writeHead(403).end();return;} const body=await readFile(target);res.writeHead(200,{'Content-Type':mime[path.extname(target)]||'application/octet-stream'}).end(body); }
 catch {res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'}).end(await readFile(path.join(root,'404.html')));}
}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
