const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),dest=path.join(root,'vendor');
function copy(source,target){fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(source,target)}
for(const file of ['jodit.min.js','jodit.min.css'])copy(path.join(root,'node_modules/jodit/es2021',file),path.join(dest,'jodit',file));
const language=fs.readFileSync(path.join(root,'node_modules/jodit/esm/langs/zh_cn.js'),'utf8');
fs.writeFileSync(path.join(dest,'jodit/zh_cn.js'),language.replace('export default','Jodit.lang.zh_cn ='));
copy(path.join(root,'node_modules/jodit/LICENSE.txt'),path.join(dest,'jodit/LICENSE.txt'));
copy(path.join(root,'node_modules/dompurify/dist/purify.min.js'),path.join(dest,'purify.min.js'));
copy(path.join(root,'node_modules/dompurify/LICENSE'),path.join(dest,'DOMPURIFY-LICENSE'));
copy(path.join(root,'node_modules/@tabler/icons/LICENSE'),path.join(dest,'TABLER-LICENSE'));
for(const name of ['layout-dashboard','article','photo','tags','messages','users','settings','arrow-left','arrow-up-right','plus','search','download','upload','dots','pencil','trash','eye','check','clock','external-link','device-floppy','menu-2','x','sun','moon','video','history','copy','pin','arrow-right','file-export','brand-youtube','circle-check','restore','file-text','chevron-right'])copy(path.join(root,'node_modules/@tabler/icons/icons/outline',name+'.svg'),path.join(dest,'icons',name+'.svg'));
console.log('Vendored Jodit, DOMPurify and Tabler icons, with licenses.');
