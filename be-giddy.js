// @ts-check
import { propInfo, rejected, resolved } from 'be-enhanced/cc.js';
import { BE } from 'be-enhanced/BE.js';
import {dispatchEvent as de} from 'trans-render/positractions/dispatchEvent.js';
/** @import {BEConfig, IEnhancement, BEAllProps} from './ts-refs/be-enhanced/types.d.ts' */
/** @import {Actions, PAP, AllProps, AP} from './ts-refs/be-giddy/types' */;
import {getCount} from 'trans-render/dss/tref/getCount.js';


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
            ids:{}
        },
        compacts: {
            when_idString_changes_call_parseIdString: 0,
            when_ids_changes_call_autoGen: 0,
        }
    }

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
            const id = unparsedID?.substring(2, unparsedID.length - 2);
            if(!id) continue;
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
        const { ids, enhancedElement } = self;
        const {parentElement} = enhancedElement;
        
        if(parentElement === null) throw 404;
        const allChildren = Array.from(parentElement.querySelectorAll('*'));
        /**
         * @type {{[key: string]: string}}
         */
        const idLookup = {};
        const base = 'be-giddy';
        for(const child of allChildren){
            const attrs = child.attributes;
            for(const attr of attrs){
                const {name, value} = attr;
                if(!name.startsWith('data-')) continue;
                
                for(const id of ids){
                    const token = `{{${id}}}`;
                    if(!value.includes(token)) continue;
                    if(!(id in idLookup)){
                        idLookup[id] = `${base}-${getCount(base)}`;
                    }
                    const newValue = value.replaceAll(token, idLookup[id]);
                    child.setAttribute(name.substring(5), newValue);
                    child.removeAttribute(name);
                }
                    
                
            }
        }
        if('disabled' in parentElement){
            parentElement.disabled = false;
        }
        console.log({ids});
    }
}

await BeGiddy.bootUp();
export { BeGiddy };