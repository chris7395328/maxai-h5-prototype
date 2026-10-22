/* Shared accessible select presentation; native select remains the form value. */
(function(){
 const registry=new WeakMap();let opened=null,sequence=0;
 function close(restore=false){if(!opened)return;const old=opened;opened=null;old.list.remove();old.button.setAttribute('aria-expanded','false');old.button.removeAttribute('aria-activedescendant');if(restore&&old.button.isConnected)old.button.focus()}
 function enhance(select){
  if(registry.has(select))return;const wrap=document.createElement('div'),button=document.createElement('button'),value=document.createElement('span'),arrow=document.createElement('img');
  wrap.className='custom-select'+(select.id==='sortOrder'?' sort-select':'');select.before(wrap);wrap.append(select);select.classList.add('select-native');select.tabIndex=-1;select.setAttribute('aria-hidden','true');
  button.type='button';button.className='select-trigger';button.setAttribute('role','combobox');button.setAttribute('aria-haspopup','listbox');button.setAttribute('aria-expanded','false');
  button.setAttribute('aria-label',select.getAttribute('aria-label')||select.closest('label')?.querySelector('span')?.textContent||select.name||'选择选项');
  arrow.src='vendor/icons/chevron-right.svg';arrow.alt='';arrow.className='select-chevron';button.append(value,arrow);wrap.append(button);
  const state={select,wrap,button,value,list:null,index:0,typed:'',typedAt:0};registry.set(select,state);
  function sync(){value.textContent=select.selectedOptions[0]?.textContent||'请选择';button.disabled=select.disabled}
  function highlight(index){const options=[...select.options];if(!options.length)return;state.index=Math.max(0,Math.min(index,options.length-1));[...state.list.children].forEach((node,i)=>node.classList.toggle('highlighted',i===state.index));const current=state.list.children[state.index];button.setAttribute('aria-activedescendant',current.id);current.scrollIntoView({block:'nearest'})}
  function choose(index){const option=select.options[index];if(!option||option.disabled)return;select.selectedIndex=index;sync();close(true);select.dispatchEvent(new Event('input',{bubbles:true}));select.dispatchEvent(new Event('change',{bubbles:true}))}
  function show(){if(button.disabled)return;close();const list=document.createElement('div');state.list=list;list.className='select-menu';list.id='blog-select-'+(++sequence);list.setAttribute('role','listbox');list.setAttribute('aria-label',button.getAttribute('aria-label'));button.setAttribute('aria-controls',list.id);
   [...select.options].forEach((option,i)=>{const row=document.createElement('div'),text=document.createElement('span'),check=document.createElement('img');row.id=list.id+'-'+i;row.className='select-option';row.setAttribute('role','option');row.setAttribute('aria-selected',String(option.selected));row.setAttribute('aria-disabled',String(option.disabled));text.textContent=option.textContent;check.src='vendor/icons/check.svg';check.alt='';row.append(text,check);row.onclick=e=>{e.preventDefault();choose(i)};row.onpointermove=()=>highlight(i);list.append(row)});
   (button.closest('dialog[open]')||document.body).append(list);opened=state;button.setAttribute('aria-expanded','true');const rect=button.getBoundingClientRect(),maxHeight=Math.min(260,Math.max(120,innerHeight-32));list.style.width=Math.min(rect.width,innerWidth-24)+'px';list.style.maxHeight=maxHeight+'px';const h=Math.min(list.scrollHeight,maxHeight),below=innerHeight-rect.bottom;list.style.left=Math.max(12,Math.min(rect.left,innerWidth-list.offsetWidth-12))+'px';list.style.top=(below>=h+8?rect.bottom+7:Math.max(12,rect.top-h-7))+'px';highlight(Math.max(0,select.selectedIndex));button.focus();
  }
  button.onclick=e=>{e.preventDefault();opened===state?close():show()};
  button.onkeydown=e=>{if(['ArrowDown','ArrowUp','Home','End','Escape','Enter',' '].includes(e.key)){e.preventDefault();if(e.key==='Escape'){close(true);return}if(!opened||opened!==state){show();if(['Enter',' '].includes(e.key))return}if(e.key==='Enter'||e.key===' '){choose(state.index);return}highlight(e.key==='Home'?0:e.key==='End'?select.options.length-1:state.index+(e.key==='ArrowUp'?-1:1))}else if(e.key==='Tab')close();else if(e.key.length===1&&!e.ctrlKey&&!e.metaKey){if(opened!==state)show();const now=Date.now();state.typed=(now-state.typedAt>900?'':state.typed)+e.key.toLowerCase();state.typedAt=now;const index=[...select.options].findIndex(o=>o.textContent.toLowerCase().startsWith(state.typed));if(index>=0)highlight(index)}};
  select.addEventListener('change',sync);select.addEventListener('focus',()=>button.focus());sync();
 }
 function refresh(){if(opened&&!opened.button.isConnected)close();document.querySelectorAll('select.field,select#sortOrder').forEach(enhance)}
 document.addEventListener('pointerdown',e=>{if(opened&&!opened.wrap.contains(e.target)&&!opened.list.contains(e.target))close()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close(true)});
 window.addEventListener('resize',()=>close());document.addEventListener('scroll',e=>{if(opened&&e.target!==opened.list&&!opened.list.contains(e.target))close()},true);
 new MutationObserver(refresh).observe(document.body,{childList:true,subtree:true});refresh();
 window.BlogSelectUI={refresh};
})();
