import { SecureContext, GUID, Bag, Schema } from '../registry.mjs';
/**
 * This class provides functionality for storing data related to GUID's.
 * @extends GUID
 */
export class Store extends GUID {
    /**
     * Constructs a new Store instance.
     * @param { Schema } dataSchema describes the data that will be stored.
     * @param { SecureContext } secureContext secure context for accessing store
    */
    constructor(dataSchema, secureContext) {
        if (new.target === Store) {
            throw new Error(`${Store.name} is an abstract class.`);
        }
        if (dataSchema === null || dataSchema === undefined || !(dataSchema instanceof Schema)) {
            throw new Error(`The dataSchema argument is null, undefined or not a ${Schema.name}.`);
        }
        if (secureContext === undefined || secureContext === null || !(secureContext instanceof SecureContext)) {
            throw new Error(`The secureContext argument is undefined, null, or not a ${SecureContext.name}.`);
        }
        super(dataSchema.empty, dataSchema);
        Object.freeze(this);
    }
    /**
     * Sets the value for the store.
     * @param { Object } value value to set in the store
     * @param { SecureContext } secureContext secure context for accessing store
    */
    set(value, secureContext) {
        if (value === undefined || value === undefined || typeof value !== 'object') {
            throw new Error('The value argument is null, undefined or not an object.');
        }
        if (secureContext === undefined || secureContext === null || !(secureContext instanceof SecureContext)) {
            throw new Error(`The secureContext argument is undefined, null, or not a ${SecureContext.name}.`);
        }
        if (!Bag.hasKey(super.IdStr, secureContext)) {
            throw new Error('The secureContext argument is undefined, null, or not an object.');
        }
        const bagKey = Bag.getKey(this.IdStr, secureContext);
        Bag.setData(bagKey, value);
    }
    /**
     * Gets a value from this store.
     * @param { SecureContext } secureContext secure context for accessing store
     * @returns { Object } Retrieved object.
    */
    get(secureContext) {
        if (secureContext === undefined || secureContext === null || !(secureContext instanceof SecureContext)) {
            throw new Error(`The secureContext argument is undefined, null, or not a ${SecureContext.name}.`);
        }
        if (!Bag.hasKey(super.IdStr, secureContext)) {
            throw new Error('The secureContext argument is undefined, null, or not an object.');
        }
        const bagKey = Bag.getKey(this.IdStr, secureContext);
        const { data } = Bag.getData(bagKey, Schema.prototype);
        return data;
    }
}