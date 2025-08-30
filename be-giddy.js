// @ts-check
import { propInfo, rejected, resolved } from 'be-enhanced/cc.js';
import { BE } from 'be-enhanced/BE.js';
import {dispatchEvent as de} from 'trans-render/positractions/dispatchEvent.js';
/** @import {BEConfig, IEnhancement, BEAllProps} from './ts-refs/be-enhanced/types.d.ts' */
/** @import {Actions, PAP, AllProps, AP} from './ts-refs/be-giddy/types' */;

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
        },
        compacts: {
            when_idString_changes_call_parseIdString: 0,
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
        if(parentElement === null) return;
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
        console.log({ids});
        return /** @type {PAP} */ ({
            ids
        });
    }
}

await BeGiddy.bootUp();
export { BeGiddy };