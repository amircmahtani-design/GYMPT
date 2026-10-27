import test from 'node:test';
import assert from 'node:assert/strict';
import {initial,plan,exercises,available,startSession,intervalPhases,validate,target,equipment,attachments} from './core.mjs';

test('32 individually mapped exercise demonstrations with unique paired poses',()=>{
 assert.equal(exercises.length,32);
 assert.equal(new Set(exercises.map(e=>e.id)).size,32);
 assert.equal(new Set(exercises.map(e=>e.poses.join('|'))).size,32);
 for(const e of exercises){assert.ok(e.cue.length>50);for(const pose of e.poses)for(const point of pose.split(' ')){const [x,y]=point.split(',').map(Number);assert.ok(Number.isFinite(x)&&Number.isFinite(y));assert.ok(x>=0&&x<=160&&y>=0&&y<=145);}}
});

test('default block reaches at least 17 distinct movements while retaining anchors',()=>{
 const s=initial(),seen=new Set(),anchors=plan(s).filter(d=>d.kind==='Strength').map(d=>d.anchors);
 for(let week=1;week<=6;week++){s.week=week;const p=plan(s);assert.deepEqual(p.filter(d=>d.kind==='Strength').map(d=>d.anchors),anchors);for(const id of p.flatMap(d=>d.ids))seen.add(id);}
 assert.ok(seen.size>=17,`Only ${seen.size} movements used`);
});

test('all 32 equipment combinations produce eligible, duplicate-free sessions',()=>{
 for(let mask=0;mask<32;mask++){const s=initial();s.settings.equipment=equipment.filter((_,i)=>mask&(1<<i));s.settings.attachments=attachments;for(let w=1;w<=6;w++){s.week=w;for(const day of plan(s)){assert.equal(new Set(day.ids).size,day.ids.length);assert.ok(day.ids.every(id=>available(s,id)));}}}
});

test('multi-gym attachments are opt-in, not inferred from category',()=>{
 const s=initial();s.settings.equipment=['multi-gym'];assert.equal(available(s,'pulldown'),false);s.settings.attachments=['lat-pulldown'];assert.equal(available(s,'pulldown'),true);assert.equal(available(s,'machine-press'),false);s.settings.excluded=['pulldown'];assert.equal(available(s,'pulldown'),false);
});

test('manual accessory choice survives week changes and exclusions win',()=>{
 const s=initial();s.settings.choices={'0-leg':'split'};assert.ok(plan(s)[0].ids.includes('split'));s.week=3;assert.ok(plan(s)[0].ids.includes('split'));s.settings.excluded=['split'];assert.ok(!plan(s)[0].ids.includes('split'));
});

test('interval prescriptions and timer agree on rounds and ordering',()=>{
 const s=initial();for(let w=1;w<=6;w++){s.week=w;const day=plan(s)[3],session=startSession(s,day);assert.equal(session.entries.reduce((sum,e)=>sum+e.reps,0),w%2?6:8);const phases=intervalPhases(session);assert.equal(phases.length,1+2*(w%2?6:8));assert.ok(phases[1].label.includes(exercises.find(e=>e.id===day.ids[0]).name));}
});

test('anchor and accessory rests are preserved with session records',()=>{
 const s=initial(),d=plan(s)[0],a=startSession(s,d);assert.equal(a.entries.filter(e=>e.id==='squat').length,3);assert.equal(a.entries.find(e=>e.id==='squat').rest,90);assert.equal(a.entries.filter(e=>e.id==='lunge').length,2);assert.equal(a.entries.find(e=>e.id==='lunge').rest,60);assert.doesNotThrow(()=>validate(JSON.parse(JSON.stringify({...s,active:a}))));
});

test('two-set accessory progression requires both prescribed sets',()=>{
 const s=initial(),d=plan(s)[2],h=startSession(s,d);h.ended=Date.now();h.entries=h.entries.filter(e=>e.id==='lateral');for(const e of h.entries){e.done=true;e.load=4;e.reps=12;e.rir=2;}s.history=[h];s.settings.incrementConfirmed=true;assert.equal(target(s,'lateral').load,6);h.entries[1].done=false;assert.equal(target(s,'lateral').load,4);
});

test('unknown attachments, choices and prototype ids rejected on import',()=>{
 for(const mutate of [s=>s.settings.attachments=['unknown'],s=>s.settings.choices={'evil':'squat'},s=>s.settings.excluded=['__proto__'],s=>s.settings.loads={'constructor':20}]){const s=initial();mutate(s);assert.throws(()=>validate(s));}
});

test('TRX never receives external load progression',()=>{
 const s=initial(),h=startSession(s,plan(s)[2]);h.entries=h.entries.filter(e=>e.id==='trx');for(const e of h.entries){e.done=true;e.reps=12;}h.ended=Date.now();s.history=[h];assert.equal(target(s,'trx').load,0);
});

test('unknown available increments never invent a heavier or lighter load',()=>{
 const s=initial(),h=startSession(s,plan(s)[0]);h.entries=h.entries.filter(e=>e.id==='squat');h.ended=Date.now();for(const e of h.entries){e.done=true;e.load=10;e.reps=12;e.rir=2;}s.history=[h];assert.equal(target(s,'squat').load,10);assert.match(target(s,'squat').reason,/confirm/);h.entries[0].rir=0;assert.equal(target(s,'squat').load,10);s.settings.incrementConfirmed=true;assert.equal(target(s,'squat').load,8);
});
