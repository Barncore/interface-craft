import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

export const enginePath=path.join(path.dirname(fileURLToPath(import.meta.url)),'engine/bin/impeccable.exe');
export function engineEnv(){
  if(process.platform!=='win32'||process.arch!=='x64') throw new Error('The bundled Impeccable engine is Windows x64 only. No download was attempted.');
  const env={...process.env};
  if(!env.IMPECCABLE_BROWSER){
    const candidates=[
      path.join(env.ProgramFiles||'C:/Program Files','Microsoft/Edge/Application/msedge.exe'),
      path.join(env['ProgramFiles(x86)']||'C:/Program Files (x86)','Microsoft/Edge/Application/msedge.exe'),
      path.join(env.ProgramFiles||'C:/Program Files','Google/Chrome/Application/chrome.exe')
    ];
    const browser=candidates.find(p=>fs.existsSync(p));
    if(browser)env.IMPECCABLE_BROWSER=browser;
  }
  return env;
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const args=process.argv.slice(2);
  if(args[0]!=='--root'||!args[1]||!args[2])throw new Error('Usage: node run.mjs --root <project> <engine-command> [args]');
  const cwd=path.resolve(args[1]);
  if(!fs.statSync(cwd).isDirectory())throw new Error('Project root must be a directory.');
  const command=args.slice(2),env=engineEnv();
  if(command[0]==='live'){
    const dir=path.join(cwd,'.impeccable/live');fs.mkdirSync(dir,{recursive:true});
    const log=path.join(dir,'live-boot.log'),fd=fs.openSync(log,'w');
    const result=spawnSync(enginePath,command,{cwd,env,stdio:['ignore',fd,fd],windowsHide:true,timeout:30000});
    fs.closeSync(fd);
    process.stdout.write(fs.readFileSync(log,'utf8').replace(/token=[^\s"<>]+/g,'token=[redacted]'));
    if(result.error)console.error(result.error.message);
    process.exitCode=result.status??1;
  }else{
    const result=spawnSync(enginePath,command,{cwd,env,stdio:'inherit',windowsHide:true});
    if(result.error)console.error(result.error.message);
    process.exitCode=result.status??1;
  }
}
