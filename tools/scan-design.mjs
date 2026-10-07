import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {enginePath,engineEnv} from './impeccable/run.mjs';

const args=process.argv.slice(2),targets=[];let out,mode,root=process.cwd(),config;
for(let i=0;i<args.length;i++){
  const k=args[i],v=args[++i];
  if(!v)throw new Error(`Missing value for ${k}`);
  if(k==='--target')targets.push(v);else if(k==='--out')out=v;else if(k==='--mode')mode=v;else if(k==='--root')root=v;else if(k==='--config')config=v;else throw new Error(`Unknown argument ${k}`);
}
if(!targets.length||!out||!['source','browser'].includes(mode))throw new Error('Usage: node scan-design.mjs --mode source|browser --target <file-or-url> [--target ...] --out <report-dir> [--root <project>] [--config <path>]');
if(targets.some(t=>/^https?:\/\//i.test(t)!==(mode==='browser')))throw new Error('Source mode requires paths; browser mode requires HTTP(S) URLs.');
root=path.resolve(root);out=path.resolve(out);if(mode==='source')targets.splice(0,targets.length,...targets.map(t=>path.resolve(t)));fs.mkdirSync(out,{recursive:true});
let result;
try{result=spawnSync(enginePath,['detect','--json','--no-config',...targets],{cwd:root,env:engineEnv(),encoding:'utf8',windowsHide:true,timeout:60000,maxBuffer:16*1024*1024});}
catch(error){result={status:null,stdout:'',stderr:'',error};}
fs.writeFileSync(path.join(out,'detector.stdout.txt'),result.stdout||'');
fs.writeFileSync(path.join(out,'detector.stderr.txt'),result.stderr||'');
let raw=null,parseError=null;
try{raw=JSON.parse(result.stdout||'');if(!Array.isArray(raw))throw new Error('Expected an array');}catch(error){parseError=error.message;}
let normalized=null,adapterError=null;
if(raw){
  const input=path.join(out,'findings.json');fs.writeFileSync(input,JSON.stringify(raw,null,2)+'\n');
  const adapter=path.join(path.dirname(fileURLToPath(import.meta.url)),'normalize-impeccable.mjs');
  const cfg=config?['--config',path.resolve(config)]:['--config',path.join(root,'.interface-craft/config.json')];
  const n=spawnSync(process.execPath,[adapter,'--input',input,...cfg],{cwd:root,encoding:'utf8',windowsHide:true});
  try{if(n.status!==0)throw new Error(n.stderr);normalized=JSON.parse(n.stdout);}catch(error){adapterError=error.message;}
}
const failed=!!(result.error||parseError||adapterError||![0,2].includes(result.status));
const report={schemaVersion:1,recordedAt:new Date().toISOString(),mode,targets,root,enginePackage:'@impeccable/cli-windows-x64@0.1.5',engineReportedVersion:'4.0.0',engineExit:result.status,status:failed?'operational-failure':raw.length?'findings':'completed',complete:!failed,coverage:['Selected targets only; source mode does not execute JavaScript.','This detector is not a complete accessibility or design audit.','An intentionally unlabelled input was missed in the bounded pilot.'],stderr:result.stderr||'',error:result.error?.message||parseError||adapterError||null,normalized};
fs.writeFileSync(path.join(out,'scan-report.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({report:path.join(out,'scan-report.json'),status:report.status,engineExit:report.engineExit,findings:raw?.length??null}));
process.exitCode=failed?1:0;
