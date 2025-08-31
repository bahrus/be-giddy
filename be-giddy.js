// @ts-check
import { propInfo, rejected, resolved } from 'be-enhanced/cc.js';
import { BE } from 'be-enhanced/BE.js';
import {dispatchEvent as de} from 'trans-render/positractions/dispatchEvent.js';
/** @import {BEConfig, IEnhancement, BEAllProps} from './ts-refs/be-enhanced/types.d.ts' */
/** @import {Actions, PAP, AllProps, AP} from './ts-refs/be-giddy/types' */;
import {getCount} from 'trans-render/dss/tref/getCount.js';
import {nudge} from 'trans-render/lib/nudge.js';

const attrMap = {
    '@': 'name',
    '|': 'itemprop',
};

/**
 * @implements {Actions}
 * 
 */
class BeGiddy extends BE {
    /**
     * @type {BEConfig<AP & BEAllProps, Actions & IEnhancement>}
     */
    static config = {
        propInfo: {
            ...propInfo,
            idString: {},
            ids:{},
            emc: {},
        },
        compacts: {
            when_idString_changes_call_parseIdString: 0,
            when_ids_changes_call_autoGen: 0,
            when_resolved_changes_call_retire: 0,
        },
        positractions: [resolved, rejected],
    }

    de = de;

    /**
     * 
     * @param {AP & BEAllProps} self 
     */
    parseIdString(self) {
        const { idString, enhancedElement } = self;
        if(idString){
            throw 'NI';
        }
        const {parentElement} = enhancedElement;
        if(parentElement === null) throw 404;
        const dataIds = Array.from(parentElement.querySelectorAll('[data-id^="{{"][data-id$="}}"]'));
        /** @type {Array<string>} */
        const ids = [];
        for(const di of dataIds){
            if(!(di instanceof HTMLElement)) continue;
            const unparsedID = di.dataset.id;
            const inner = unparsedID?.substring(2, unparsedID.length - 2);
            if(!inner) continue;
            const split = inner.split(' ');
            const id = split.length === 2 ? split[1] : split[0];
            if(ids.includes(id)) throw 500;
            ids.push(id);
        }
        
        return /** @type {PAP} */ ({
            ids
        });
    }

    /**
     * 
     * @param {AP & BEAllProps} self 
     */
    autoGen(self) {
        const { ids, enhancedElement, emc } = self;
        const {parentElement} = enhancedElement;
        
        if(parentElement === null) throw 404;
        const allChildren = Array.from(parentElement.querySelectorAll('*'));
        allChildren.push(parentElement);
        /**
         * @type {{[key: string]: string}}
         */
        const idLookup = {};
        const {base} = emc;
        if(!base) throw 500;
        for(const child of allChildren){
            const attrs = child.attributes;
            for(const attr of attrs){
                const {name, value} = attr;
                if(!name.startsWith('data-')) continue;
                if(name === 'data-id'){
                    if(!value.startsWith('{{') || !value.endsWith('}}')) continue;
                    const inner = value.substring(2, value.length - 2);
                    const split = inner.split(' ');
                    const id = split.length === 2 ? split[1] : split[0];
                    if(!(id in idLookup)){
                        idLookup[id] = `${base}-${getCount(base)}`;
                    }
                    if(split.length === 2){
                        const sideEffects = split[0];
                        for(const char of sideEffects){
                            switch(char){
                                case '@':
                                case '|':
                                    child.setAttribute(attrMap[char], id);
                                    break;
                                case '%':
                                    child.part.add(id);
                                    break;
                                case '.':
                                    child.classList.add(id);
                                    break;

                            }
                        }
                    }
                    child.id = idLookup[id];
                    child.setAttribute('data-id', id);
                }else{
                    let newValue = value;
                    for(const id of ids){
                        const token = `{{${id}}}`;
                        if(!newValue.includes(token)) continue;
                        if(!(id in idLookup)){
                            idLookup[id] = `${base}-${getCount(base)}`;
                        }
                        newValue = newValue.replaceAll(token, idLookup[id]);
                        
                    }
                    if(newValue === value) continue;
                    child.setAttribute(name.substring(5), newValue);
                    child.removeAttribute(name);
                }
                
            }
            for(const attr of attrs){
                const {name, value} = attr;
                if(!name.startsWith('defer-')) continue;
                const nameWithoutDefer = name.substring(6);
                const valueWithoutDefer = child.getAttribute(nameWithoutDefer);
                if(valueWithoutDefer === null) continue;
                let newValue = valueWithoutDefer;
                for(const id of ids){
                    const token = `{{${id}}}`;
                    if(!newValue.includes(token)) continue;
                    if(!(id in idLookup)){
                        idLookup[id] = `${base}-${getCount(base)}`;
                    }
                    newValue = newValue.replaceAll(token, idLookup[id]);
                    
                }
                child.setAttribute(nameWithoutDefer, newValue);
                nudge(child, name);
            }
        }
        if('disabled' in parentElement){
            nudge(parentElement);
        }
        return /** @type {PAP} */ ({
            resolved: true,
        });
    }

    /**
     * 
     * @param {AP & BEAllProps} self 
     * @returns 
     */
    retire(self) {
        const { enhancedElement, emc } = self;
        enhancedElement.beEnhanced.whenDetached(emc);
    }
}

await BeGiddy.bootUp();
export { BeGiddy };