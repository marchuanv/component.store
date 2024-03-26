import { GUID, Reflection } from '../registry.mjs';
const privateBag = new WeakMap();
export class Uninitialised {
    /**
     * @param { Object } type
    */
    constructor(type) {
        this.type = type;
    }
}
/**
 * This class provides functionality for storing data binded to a GUID.
 * @extends GUID
*/
export class Store extends GUID {
    /**
     * Constructs a new Store instance.
     * @param { GUID } Id identifier of the store.
     * @param { Array<{ key: String, type: Object }> } schema describes that data that the store will be working with
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
        if (schema === undefined || schema === null || typeof schema !== 'object' || !Array.isArray(schema)) {
            throw new Error('The schema argument is undefined, null, not an object and not an array.');
        }
        if (secureContext === undefined || secureContext === null || typeof secureContext !== 'object') {
            throw new Error('The secureContext argument is undefined, null, or not an object.');
        }
        super({ Id, schema });
        if (!(this instanceof Store)) {
            throw new Error(`not an instance of ${Store.name}`);
        }
        if (privateBag.has(this)) {
            if (!isValidSecureContext.call(this, secureContext)) {
                throw new Error('StoreError: secure context is not valid.');
            }
        } else {
            const extended = Reflection.getExtendedClasses(targetClass).filter(x => x !== Store && x !== GUID);
            const storeId = new GUID({ Id: super.toString() });
            privateBag.set(this, { secureContext, extended, storeId, schema });
            const emptyData = createEmptyObject(schema);
            privateBag.set(storeId, emptyData);
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
        this.validate(value);
        const { storeId } = privateBag.get(this);
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
    /**
     * @param { Object } value value to validate against the schema
    */
    validate(value) {
        if (value === undefined || value === null || typeof value !== 'object') {
            throw new Error('The value argument is undefined, null, or not an object.');
        }
        const { schema } = privateBag.get(this);
        let properties = [];
        if (Array.isArray(value)) {
            for (const val of value) {
                for (const def of schema) {
                    const property = properties.find(x => x.key === def.key);
                    if (property) {
                        property.values.push(val[def.key]);
                        property.types.push(val[def.type]);
                    } else {
                        properties.push({ key: def.key, values: [val[def.key]], types: [def.type], validCount: 0 });
                    }
                }
            }
        } else {
            for (const def of schema) {
                const property = properties.find(x => x.key === def.key);
                if (property) {
                    property.values.push(value[def.key]);
                    property.types.push(def.type);
                } else {
                    properties.push({ key: def.key, values: [value[def.key]], types: [def.type], validCount: 0 });
                }
            }
        }
        // throw new Error(`The ${key} property type do not match the schema.`);
        dequeue(properties, (property) => {
            dequeue(property.values, (_value) => {
                dequeue(property.types, (type) => {
                    if (property.values.filter(x => x === undefined).length === property.values.length && type === undefined) {
                        property.validCount = property.validCount + 1;
                    } else if (property.values.filter(x => x === null).length === property.values.length && type === null) {
                        property.validCount = property.validCount + 1;
                    } else if (type === undefined) {
                        if (_value === undefined) {
                            property.validCount = property.validCount + 1;
                        }
                    } else if (type === null) {
                        if (_value === null) {
                            property.validCount = property.validCount + 1;
                        }
                    } else {
                        if (Reflection.isClass(type)) {
                            if (_value instanceof type) {
                                property.validCount = property.validCount + 1;
                            }
                        } else if (Reflection.isPrimitiveType(type)) {
                            if (typeof _value === type.name.toLowerCase()) {
                                property.validCount = property.validCount + 1;
                            } else if (typeof _value === 'function' && _value.name.toLowerCase() === type.name.toLowerCase()) {
                                property.validCount = property.validCount + 1;
                            } else if (Array.isArray(_value) && type === Array) {
                                property.validCount = property.validCount + 1;
                            }
                        } else if (typeof type === 'function') {
                            if (typeof _value === 'function') {
                                property.validCount = property.validCount + 1;
                            }
                        }
                    }
                });
            });
        });
        const invalidProperties = properties.filter(x => x.validCount === 0);
        if (invalidProperties.length > 0) {
            let messages = '\r\n';
            for (const property of invalidProperties) {
                messages = `${messages}\r\n-> The ${property.key} property does not match the schema definition`;
            }
            messages = `${messages}\r\n`;
            throw new Error(messages);
        }
    }
    /**
     * @returns { Object }
    */
    get schema() {
        const { schema } = privateBag.get(this);
        return schema;
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
/**
 * @param { Array<{ key: String, type: Object }> } schema describes that data that the store will be working with
 * @returns { Object }
*/
function createEmptyObject(schema) {
    const emptyData = {};
    for (const { key, type } of schema) {
        emptyData[key] = new Uninitialised(type);
    }
    Object.seal(emptyData);
    return emptyData;
}
function dequeue(array, callback) {
    const queue = [];
    for (const item of array) {
        const data = { item };
        const Id = new GUID(data);
        queue.push({ Id: Id.toString(), data });
        Id.destroy();
    }
    let dequeued = queue.shift();
    const startId = dequeued.Id;
    while (true) {
        callback(dequeued.data.item);
        queue.push(dequeued);
        dequeued = queue.shift();
        if (dequeued !== null && dequeued !== undefined) {
            if (dequeued.Id === startId) {
                return;
            }
        }
    }
}