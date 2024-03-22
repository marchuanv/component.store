import { GUID, Reflection } from '../registry.mjs';
import { Schema } from './schemas.mjs';
const privateBag = new WeakMap();
/**
 * This class provides functionality for storing data related to GUID's.
 * @extends GUID
 */
export class Store extends GUID {
    /**
     * Constructs a new Store instance.
     * @param { Object } metadata - Metadata object.
     * @param { Object } secureContext - If provided, when setting or getting data this context will need to be passed.
     * @param { Schema } schema describes the data that will be stored.
     * @param { Object } data initial data.
     * @returns {Store} - A new Store instance.
     * @throws {Error} - If metadata is not provided or not an object, or if secureContext is undefined, null, or not an object.
    */
    constructor(metadata, secureContext, schema, data) {
        const targetClass = new.target;
        if (targetClass === Store) {
            throw new Error(`${Store.name} is an abstract class.`);
        }
        if (!metadata || !(typeof metadata === 'object' || typeof metadata === 'string')) {
            throw new Error(`The metadata argument is not a string or an object.`);
        }
        if (secureContext === undefined || secureContext === null || typeof secureContext !== 'object') {
            throw new Error('The secureContext argument is undefined, null, or not an object.');
        }
        if (schema === null || schema === undefined || !(schema instanceof Schema)) {
            throw new Error(`The schema argument is null, undefined or not a ${Schema.name}.`);
        }
        super(metadata);
        if (privateBag.has(this)) {
            if (!isValidSecureContext.call(this, secureContext)) {
                throw new Error('StoreError: secure context is not valid.');
            }
        } else {
            if (data === null || data === undefined || typeof data !== 'object') {
                throw new Error(`The data argument is null, undefined or not an object.`);
            }
            if (!schema.validate(data)) {
                throw new Error(`data does not match schema.`);
            }
            const extended = Reflection.getExtendedClasses(targetClass).filter(x => x !== Store && x !== GUID);
            const storeId = new GUID({ Id: super.toString(), schema });
            privateBag.set(storeId, data);
            privateBag.set(this, { secureContext, extended, storeId, schema });
        }
    }
    /**
     * Classes that extend the Store class.
     * @returns {Array<Class>} - A list of class metadata.
     */
    get extended() {
        const store = privateBag.get(this);
        return store.extended;
    }
    /**
     * Sets a value for this store.
     * @param { Object } value - Object to set.
     * @param { Object } secureContext - If provided, when setting or getting data this context will need to be passed.
     * @throws {Error} - If secureContext is not valid or value is undefined.
    */
    set(value, secureContext) {
        if (!isValidSecureContext.call(this, secureContext)) {
            throw new Error('StoreError: secure context is not valid.');
        }
        if (value === undefined || value === undefined || typeof value !== 'object') {
            throw new Error('The value argument is null, undefined or not an object.');
        }
        const { storeId, schema } = privateBag.get(this);
        if (Array.isArray(value)) {
            for (const val of value) {
                if (!schema.validate(val)) {
                    throw new Error(`data does not match schema.`);
                }
            }
        } else {
            if (!schema.validate(value)) {
                throw new Error(`data does not match schema.`);
            }
        }
        privateBag.set(storeId, value);
    }
    /**
     * Gets a value from this store of a specific type.
     * @param { Object } secureContext If provided, when setting or getting data this context will need to be passed.
     * @returns { Object } Retrieved object.
     * @throws {Error} If secureContext is not valid.
    */
    get(secureContext) {
        if (!isValidSecureContext.call(this, secureContext)) {
            throw new Error('StoreError: secure context is not valid.');
        }
        const { storeId } = privateBag.get(this);
        return privateBag.get(storeId);
    }
}
/**
 * Checks if the provided secure context is valid.
 * @param {Object} secureContext
 * @returns {Boolean} - True if secure context is valid, otherwise false.
 * @throws {Error} - If secureContext is undefined, null, or not an object.
 */
function isValidSecureContext(secureContext) {
    const store = privateBag.get(this);
    if (secureContext === undefined || secureContext === null || typeof secureContext !== 'object') {
        throw new Error('The secureContext argument is undefined, null, or not an object.');
    }
    return store.secureContext === secureContext;
}