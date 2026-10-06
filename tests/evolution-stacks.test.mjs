import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const window = {};
vm.runInNewContext(await readFile(new URL('../assets/js/evolution-stacks.js',import.meta.url),'utf8'),{window});
const group = window.EvolutionStacks.group;
const ids = entries => Array.from(entries,entry=>Array.from(entry.items,item=>item.id));
const normalize = value => JSON.parse(JSON.stringify(value));

test('keeps independent records in their existing order',()=>{
    const items=[{id:'A'},{id:'B'}];
    assert.deepEqual(normalize(ids(group(items,[]))),[['A'],['B']]);
});

test('places one evolution at its earliest record and preserves explicit stage order',()=>{
    const items=[{id:'NEW'},{id:'OTHER'},{id:'OLD'}];
    const before=JSON.stringify(items);
    const result=group(items,[{id:'chain',itemIds:['OLD','NEW']}]);
    assert.deepEqual(normalize(ids(result)),[['OLD','NEW'],['OTHER']]);
    assert.equal(result[0].items[0],items[2]);
    assert.equal(JSON.stringify(items),before);
});

test('invalid and incomplete relationships leave the records individually accessible',()=>{
    const items=[{id:'A'},{id:'B'}];
    for(const relationships of [null,{},[null],[{id:'missing',itemIds:['A','X']}],[{id:'repeat',itemIds:['A','A']}],[{id:'single',itemIds:['A']}]]){
        assert.deepEqual(normalize(ids(group(items,relationships))),[['A'],['B']]);
    }
});

test('overlapping relationships never hide or duplicate a record',()=>{
    const items=['A','B','C','D','E'].map(id=>({id}));
    const result=group(items,[{id:'first',itemIds:['A','B']},{id:'overlap',itemIds:['B','C']},{id:'second',itemIds:['D','E']}]);
    assert.deepEqual(normalize(ids(result)),[['A','B'],['C'],['D','E']]);
    assert.deepEqual(normalize(ids(result).flat()),['A','B','C','D','E']);
});

test('the site keeps TeaForge and Pelago as separate stages outside the Harness branch',async()=>{
    const data=JSON.parse(await readFile(new URL('../assets/data/roadmap.json',import.meta.url),'utf8'));
    const result=group(data.items,data.evolutions);
    const stack=result.find(entry=>entry.id==='test-design');
    assert.deepEqual(normalize(stack.items.map(item=>item.id)),['RM-P02','RM-P08']);
    assert.equal(stack.items[0].status,'done');
    assert.equal(stack.items[1].status,'progress');
    assert.equal(stack.items[1].percent,null);
    assert.equal(result.flatMap(entry=>entry.items).length,data.items.length);
    assert.equal(JSON.stringify(data.branches).includes('RM-P08'),false);
});
