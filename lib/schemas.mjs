import { GUID, Reflection } from "utils";
export class Uninitialised {
    constructor(type) {
        this.type = type;
    }
}
export class Schema {
    /**
     * @param {Array<{ key: String, type: Object }>} properties
    */
    constructor(properties) {
        this._properties = properties;
    }
    exsts(key) {
        return this[key] !== undefined;
    }
    /**
     * @returns { Schema }
    */
    empty() {
        for (const { key, type } of this._properties) {
            this[key] = new Uninitialised(type)
        }
        return this;
    }
    validate(obj) {
        return Reflection.compareObjectKeys(this, obj);
    }
}
export class TypeRegisterSchema extends Schema {
    /**
     * @param {Array<{ key: String, type: Object }>} types
    */
    constructor(properties = []) {
        properties = properties.concat([{
            key: 'name',
            type: String
        }, {
            key: 'type',
            type: Object
        }, {
            key: 'isPrimitive',
            type: Boolean
        }, {
            key: 'isClass',
            type: Boolean
        }, {
            key: 'Id',
            type: GUID
        }]);
        super(properties);
    }
}
export class TypeDecoratorSchema extends TypeRegisterSchema {
    /**
     * @param {Array<{ key: String, type: Object }>} properties
    */
    constructor(properties = []) {
        properties = properties.concat([{
            key: 'members',
            type: Array
        }]);
        super(properties);
    }
}
export class TypeMemberDecoratorSchema extends TypeDecoratorSchema {
    /**
     * @param {Array<{ key: String, type: Object }>} properties
    */
    constructor(properties = []) {
        properties = properties.concat([{
            key: 'memberName',
            type: String
        }, {
            key: 'memberType',
            type: Object
        }]);
        super(properties);
    }
}