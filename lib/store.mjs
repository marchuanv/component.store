import { Bag, GUID, Schema, SecureContext } from '../registry.mjs';
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
        super(secureContext, dataSchema.empty, dataSchema);
        Object.freeze(this);
    }
    /**
     * Sets the value for the store.
     * @param { Object } value value to set in the store
     * @param { SecureContext } secureContext secure context for accessing store
    */
    set(value, secureContext) {
        if (secureContext === undefined || secureContext === null || !(secureContext instanceof SecureContext)) {
            throw new Error(`The secureContext argument is undefined, null, or not a ${SecureContext.name}.`);
        }
        if (value === undefined || value === undefined || typeof value !== 'object') {
            throw new Error('The value argument is null, undefined or not an object.');
        }
        if (!Bag.hasKey(this.IdStr, secureContext)) {
            throw new Error('StoreError: secure context is not valid.');
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
        if (!Bag.hasKey(this.IdStr, secureContext)) {
            throw new Error('StoreError: secure context is not valid.');
        }
        const bagKey = Bag.getKey(this.IdStr, secureContext);
        return Bag.getData(bagKey, Schema.prototype);
    }
}