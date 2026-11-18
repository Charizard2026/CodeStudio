(() => {
"use strict";
const $ = s => document.querySelector(s);
const api = () => window.CodeStudio;
function status(message){const el=$("#status-message");if(el)el.textContent=message;}
function download(name,content){
 const blob=new Blob([content],{type:"application/octet-stream"});
 const url=URL.createObjectURL(blob),a=document.createElement("a");
 a.href=url;a.download=name.split("/").pop()||"archivo";a.click();
 setTimeout(()=>URL.revokeObjectURL(url),1200);
}
$("#upload-files").onclick=()=>$("#file-input").click();
$("#upload-folder").onclick=()=>$("#folder-input").click();
$("#download-current").onclick=()=>{
 const x=api();if(!x.active||x.files[x.active]===undefined){status("No hay archivo abierto");return;}
 x.save();download(x.active,x.files[x.active]);status("Archivo descargado");
};
$("#rename-item").onclick=()=>{
 const x=api();if(!x.active)return;
 const old=x.active,parts=old.split("/"),name=prompt("Nuevo nombre o ruta:",old);
 if(!name)return;const next=name.trim().replace(/^\/+|\.\./g,"");
 if(!next||x.files[next]!==undefined){alert("Ruta no válida o ya existente.");return;}
 x.files[next]=x.files[old];delete x.files[old];
 x.tabs=x.tabs.map(p=>p===old?next:p);
 x.open(next);x.persist();x.drawTree();status("Archivo renombrado");
};
$("#delete-item").onclick=()=>{
 const x=api();if(!x.active)return;
 const name=x.active;if(!confirm("¿Eliminar "+name+" del proyecto?"))return;
 delete x.files[name];x.closeTab(name);
 const next=Object.keys(x.files)[0];if(next)x.open(next);
 x.persist();x.drawTree();status("Archivo eliminado");
};
const zone=document.querySelector(".editor-wrap");
let dragDepth=0;
zone.addEventListener("dragenter",e=>{e.preventDefault();dragDepth++;zone.classList.add("file-drop-active");});
zone.addEventListener("dragover",e=>{e.preventDefault();if(e.dataTransfer)e.dataTransfer.dropEffect="copy";});
zone.addEventListener("dragleave",e=>{e.preventDefault();dragDepth=Math.max(0,dragDepth-1);if(!dragDepth)zone.classList.remove("file-drop-active");});
async function readEntry(entry,prefix=""){
 if(entry.isFile)return new Promise(resolve=>entry.file(file=>{if(file.size>2000000){resolve([]);return;}const r=new FileReader();r.onload=()=>resolve([[prefix+file.name,String(r.result||"")]]);r.onerror=()=>resolve([]);r.readAsText(file);},()=>resolve([])));
 if(entry.isDirectory)return new Promise(resolve=>{const reader=entry.createReader(),all=[];function batch(){reader.readEntries(async entries=>{if(!entries.length){resolve(all);return;}for(const e of entries)all.push(...await readEntry(e,prefix+entry.name+"/"));batch();},()=>resolve(all));}batch();});
 return [];
}
zone.addEventListener("drop",async e=>{
 e.preventDefault();dragDepth=0;zone.classList.remove("file-drop-active");
 const items=[...(e.dataTransfer?.items||[])];if(!items.length)return;
 const collected=[];
 for(const item of items){const entry=item.webkitGetAsEntry?.();if(entry)collected.push(...await readEntry(entry));else{const f=item.getAsFile?.();if(f&&f.size<=2000000)collected.push([f.name,await f.text()]);}}
 const x=api();if(!collected.length){status("No se encontraron archivos de texto compatibles");return;}
 for(const [path,content] of collected)x.files[path]=content;
 x.persist();x.drawTree();x.drawTabs();status("Importados "+collected.length+" archivos. Ábrelos desde el explorador.");
});
document.addEventListener("keydown",e=>{
 if((e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key.toLowerCase()==="e"){e.preventDefault();api().exportZip();}
});
})();