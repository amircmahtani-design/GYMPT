import {exercises} from './exercises.mjs';
import {target} from './core.mjs';
const byId=Object.fromEntries(exercises.map(e=>[e.id,e]));
export const attachments=['lat-pulldown','low-row','chest-press','leg-extension'];
export function available(state,id){const e=byId[id];return Boolean(e&&!state.settings.excluded.includes(id)&&(e.gear==='bodyweight'||state.settings.equipment.includes(e.gear))&&(!e.attachment||(state.settings.attachments||[]).includes(e.attachment)));}
export const slots={
 squat:['squat','trx-squat','bw-squat'], hinge:['rdl','bb-rdl','bridge'],
 push:['press','machine-press','trx-press','knee-pushup','pushup'],
 pull:['row','bb-row','cable-row','trx','pulldown'],
 vertical:['overhead','machine-press','trx-press','pushup','knee-pushup'],
 secondPull:['trx','pulldown','cable-row','bb-row','row'],
 leg:['lunge','split','calf','leg-extension'], shoulder:['lateral','trx-fly'],
 arms:['curl','hammer','kickback'], core:['deadbug','birddog','bridge'],
 engine:['rowing','stepjack','boxing','march']
};
function pick(state,list,offset=0,used=[]){const allowed=list.filter(id=>available(state,id)&&!used.includes(id));return allowed.length?allowed[offset%allowed.length]:null;}

export function plan(state){
 const rotation=(state.week-1)%3;
 const strength=(source,title,focus,anchorSlots,accessorySlots)=>{
  const ids=[],anchors=[],missing=[];
  for(const slot of anchorSlots){const id=pick(state,slots[slot],0,ids);if(id){ids.push(id);anchors.push(id);}else missing.push(slot);}
  for(const [j,slot]of accessorySlots.entries()){
   const chosen=state.settings.choices?.[`${source}-${slot}`];
   const id=chosen&&slots[slot].includes(chosen)&&available(state,chosen)&&!ids.includes(chosen)?chosen:pick(state,slots[slot],rotation+j,ids);
   if(id)ids.push(id);else missing.push(slot);
  }
  return {source,title,focus,kind:'Strength',ids,anchors,missing,accessorySlots,sets:state.week===4?2:3,min:8,max:12,rir:state.week===4?4:2,rest:90,
   warmup:'5 minutes of easy movement, then 1–2 light practice sets for the first squat/hinge and push. Warm-up sets do not count as work sets.'};
 };
 const circuit=slots.engine.filter(id=>available(state,id));
 const engine=circuit.length?Array.from({length:Math.min(3,circuit.length)},(_,i)=>circuit[(rotation+i)%circuit.length]):[];
 const days=[
  strength(0,'Full body A','Squat · horizontal push · pull',['squat','push','pull'],['leg','core']),
  {source:1,title:'Recovery & mobility',kind:'Recovery',focus:'Easy movement. Make room to recover.',ids:[]},
  strength(2,'Full body B','Hinge · overhead / alternate push · pull',['hinge','vertical','secondPull'],['shoulder','arms']),
  {source:3,title:'Intervals & engine',kind:'Intervals',focus:state.week%2?'6 × 30s work / 60s easy':'8 × 20s work / 70s easy',ids:engine,anchors:[],missing:engine.length?[]:['conditioning'],sets:1,rir:7,rest:60},
  strength(4,'Full body C','Squat · hinge · pull',['squat','hinge','pull'],['arms','core']),
  {source:5,title:'Optional easy movement',kind:'Recovery',focus:'An easy walk or gentle mobility, at your pace.',ids:[]},
  {source:6,title:'Rest & reset',kind:'Recovery',focus:'Rest, review your week, prepare the next.',ids:[]}
 ];return state.order.map(i=>days[i]);
}
export function prescription(state,day,id){const t=target(state,id),anchor=day.anchors?.includes(id);const external=['dumbbells','barbell','multi-gym'].includes(byId[id].gear);return {...t,load:external?(state.settings.loads[id]??t.load):0,sets:day.kind==='Intervals'?1:anchor?day.sets:2,rest:anchor?90:60,rir:day.rir,role:anchor?'Anchor':'Accessory'};}
export function startSession(state,day,now=Date.now()){
 if(new Set(day.ids).size!==day.ids.length)throw Error('Duplicate exercise in circuit');
 return {id:crypto.randomUUID(),title:day.title,kind:day.kind,week:state.week,started:now,ended:null,entries:day.ids.flatMap((id,index)=>{
  const t=prescription(state,day,id),rounds=state.week%2?6:8;
  const reps=day.kind==='Intervals'?Math.floor(rounds/day.ids.length)+(index<rounds%day.ids.length?1:0):t.reps;
  return Array.from({length:t.sets},(_,i)=>({id,set:i+1,load:t.load,reps,rir:t.rir,prescribed:{load:t.load,reps,rir:t.rir},rest:t.rest,done:false}));
 })};
}
export function intervalPhases(session){
 const ids=[...new Set(session.entries.map(e=>e.id))],odd=session.week%2;
 if(!ids.length)return [{label:'No movements selected',seconds:1}];
 return [{label:'Prepare at an easy pace',seconds:60},...Array.from({length:odd?6:8},(_,i)=>[
  {label:`Round ${i+1} · ${byId[ids[i%ids.length]].name}`,seconds:odd?30:20},
  {label:`Round ${i+1} · easy recovery`,seconds:odd?60:70}
 ]).flat()];
}
