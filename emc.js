// @ts-check
import { BeHive, seed, MountObserver } from 'be-hive/be-hive.js';
/** @import {EMC} from './ts-refs/trans-render/be/types' */
/** @import {Actions, PAP, AllProps, AP} from './ts-refs/be-giddy/types' */;

/**
 * @type {EMC<any, AP>}
 */
export const emc = {
    base: 'be-giddy',
    map: {
        '0.0': {
            instanceOf: 'String',
            mapsTo: 'idString',
        }
    },
    enhPropKey: 'beGiddy',
    importEnh: async () => {
        const { BeGiddy } = 
        /** @type {{new(): IEnhancement<Element>}} */ 
        /** @type {any} */
        (await import('./be-giddy.js'));
        return BeGiddy;
    }
}
const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);