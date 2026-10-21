import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
const { site } = JSON.parse(readFileSync('content.json', 'utf8'));
const base = new URL(site.origin).pathname.replace(/\/+$/, '');
const strip = ref => (base && ref.startsWith(base) ? ref.slice(base.length) : ref);
const walk = dir => readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
let count=0;
for(const file of walk('dist').filter(f=>f.endsWith('.html'))){
 const html=readFileSync(file,'utf8');
 for(const [,ref] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(!ref.startsWith('/'))continue;
  const [p,anchor]=strip(ref).split('#'); const target=path.join('dist',p.endsWith('/')?p+'index.html':p);
  if(!existsSync(target))throw new Error(`${file}: missing ${ref}`);
  if(anchor&&!readFileSync(target,'utf8').includes(`id="${anchor}"`))throw new Error(`Missing anchor: ${ref}`);
  count++;
 }
 for(const [,ref] of html.matchAll(/data-scene="([^"]+)"/g))if(!existsSync(path.join('dist',strip(ref))))throw new Error(`Missing scene: ${ref}`);
}
console.log(`Verified ${count} local references and scene assets.`);
