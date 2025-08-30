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
        throw 'NI';
        return /** @type {PAP} */ ({})
    }
}

await BeGiddy.bootUp();
export { BeGiddy };