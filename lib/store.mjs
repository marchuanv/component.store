import { GUID, Reflection } from '../registry.mjs';
const privateBag = new WeakMap();
class StoreItemId extends GUID {
    /**
     * @param { GUID } Id
     * @param { Object } schema
    */
    constructor(Id, schema) {
        super({ Id, schema });
    }
}
class EmptyStore extends StoreItemId {
    /**
     * @param { GUID } Id
    */
    constructor(Id) {
        super(Id, { isEmpty: null });
    }
}
/**
 * This class provides functionality for storing data related to GUID's.
 * @extends GUID
 */
export class Store extends GUID {
    /**
     * Constructs a new Store instance.
     * @param { Object } metadata - Metadata object.
     * @param { Object } secureContext - If provided, when setting or getting data this context will need to be passed.
     * @param { Object } schema describes the data that will be stored.
     * @returns {Store} - A new Store instance.
     * @throws {Error} - If metadata is not provided or not an object, or if secureContext is undefined, null, or not an object.
    */
    constructor(metadata, secureContext, schema) {
        const targetClass = new.target;
        if (targetClass === Store) {
            throw new Error(`${Store.name} is an abstract class.`);
        }
        if (!metadata || typeof metadata !== 'object') {
            throw new Error(`The metadata argument is not an object.`);
        }
        if (secureContext === undefined || secureContext === null || typeof secureContext !== 'object') {
            throw new Error('The secureContext argument is undefined, null, or not an object.');
        }
        if (schema === null || schema === undefined || typeof schema !== 'object') {
            throw new Error(`The schema argument is null, undefined or not an object.`);
        }
        const schemaKeys = Object.keys(schema);
        if (schemaKeys.length === 0) {
            throw new Error(`The schema argument does not have any properties.`);
        }
        for (const key of schemaKeys) {
            if (typeof schema[key] !== 'string') {
                throw new Error(`The schema argument contains properties that are not of type string.`);
            }
        }
        const extended = Reflection.getExtendedClasses(targetClass).filter(x => x !== Store && x !== GUID);
        const directStoreExtendClass = extended[0];
        const classMetadata = Reflection.getClassMetadata(directStoreExtendClass);
        const getMethod = classMetadata.find(member => member.name === 'get' && member.isMethod);
        const setMethod = classMetadata.find(member => member.name === 'set' && member.isMethod);
        const extendedProperty = classMetadata.find(member => member.name === 'extended' && member.isProperty);
        const existsProperty = classMetadata.find(member => member.name === 'exists' && member.isProperty);
        if (getMethod === undefined || setMethod === undefined || extendedProperty === undefined || existsProperty === undefined) {
            throw new Error(`${directStoreExtendClass.name} requires overriding get() and set() methods and an overriding get properties called extended and exists.`);
        }
        super(metadata);
        if (privateBag.has(this)) {
            if (!isValidSecureContext.call(this, secureContext)) {
                throw new Error('StoreError: secure context is not valid.');
            }
        } else {
            const storeId = new StoreItemId(this, schema);
            privateBag.set(this, { secureContext, extended, storeId, schema });
            const emptyStoreId = new EmptyStore(this);
            privateBag.set(emptyStoreId, null);
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
        //validate against the schema
        const schemaKeys = Object.keys(schema);
        if (Array.isArray(value)) {
            for (const val of value) {
                for (const key of schemaKeys) {
                    const desc = schema[key];
                    if (value[key] === undefined && desc.indexOf('undefined') === -1) {
                        throw new Error(`value object in array does not have a ${key} property`);
                    }
                }
            }
        } else {
            for (const key of schemaKeys) {
                const desc = schema[key];
                if (value[key] === undefined && desc.indexOf('undefined') === -1) {
                    throw new Error(`value object does not have a ${key} property`);
                }
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
        if (this.isEmpty) {
            throw new Error(`the store is empty`);
        } else {
            const { storeId } = privateBag.get(this);
            return privateBag.get(storeId);
        }
    }
    /**
     * checks if the store is empty.
     * @returns { Boolean }
    */
    get isEmpty() {
        const { storeId } = privateBag.get(this);
        return !privateBag.has(storeId);
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