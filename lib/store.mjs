import { GUID, Reflection, Schema } from '../registry.mjs';
const privateBag = new WeakMap();
/**
 * This class provides functionality for storing data binded to a GUID.
 * @extends GUID
*/
export class Store extends GUID {
    /**
     * Constructs a new Store instance.
     * @param { GUID } Id identifier of the store.
     * @param { Schema } schema describes that data that the store will be working with
     * @param { Object } secureContext - access to getting or setting data from or to the store.
     * @throws { Error } - If schema or secureContext is undefined, null, or not an object.
    */
    constructor(Id, schema, secureContext) {
        const targetClass = new.target;
        if (!targetClass) {
            throw new Error(`Store should be constructed using the 'new' keyword.`);
        }
        if (!(Id instanceof GUID)) {
            throw new Error(`The Id argument is not an instance of a ${GUID.name}`);
        }
        if (schema === undefined || schema === null || !(schema instanceof Schema)) {
            throw new Error(`The schema argument is undefined, null, or not an instance of ${Schema.name}.`);
        }
        if (secureContext === undefined || secureContext === null || typeof secureContext !== 'object') {
            throw new Error('The secureContext argument is undefined, null, or not an object.');
        }
        super({ Id, schema });
        if (!(this instanceof Store)) {
            throw new Error(`not an instance of a ${Store.name}`);
        }
        if (privateBag.has(this)) {
            if (!isValidSecureContext.call(this, secureContext)) {
                throw new Error('StoreError: secure context is not valid.');
            }
        } else {
            const extended = Reflection.getExtendedClasses(targetClass).filter(x => x !== Store && x !== GUID);
            const storeId = new GUID({ Id: super.toString() });
            privateBag.set(this, { secureContext, extended, storeId, schema, Id });
            privateBag.set(storeId, schema.empty);
        }
    }
    /**
     * @returns { GUID }
    */
    get Id() {
        const { Id } = privateBag.get(this);
        return Id;
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
        schema.validate({ obj: value });
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