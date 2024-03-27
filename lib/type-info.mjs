import { GUID, Reflection } from "utils";
import { Store } from "./store.mjs";
export class UnknownType { }
const secureContext = new GUID();
function Null() {
    return null;
}
function Undefined() {
    return undefined;
}
export class TypeInfo extends Store {
    /**
     * @param { { type: Function | null | undefined | UnknownType, name: String } | TypeInfo } typeInfo
    */
    constructor(typeInfo = { type: UnknownType, name: 'UnknownType' }) {
        if (typeInfo instanceof TypeInfo) {
            return typeInfo;
        }
        let _type = typeInfo.type;
        let _name = typeInfo.name;
        if (_name === 'null') {
            _type = Null;
        } else if (_name === 'undefined') {
            _type = Undefined;
        } else {
            _name = _type.name;
        }
        const Id = new GUID({ type: _type, context: secureContext })
        super(Id, [{
            key: 'type',
            type: Function
        }, {
            key: 'isPrimitive',
            type: Boolean
        }, {
            key: 'isClass',
            type: Boolean
        }, {
            key: 'Id',
            type: GUID
        }], secureContext);
        let isPrimitive = Reflection.isPrimitiveType(_type);
        if (!isPrimitive) {
            isPrimitive = Reflection.isPrimitiveType(_name);
        }
        const isClass = Reflection.isClass(_type);
        super.set({ Id, name: _name, type: _type, isPrimitive, isClass }, secureContext);
    }
    /**
     * @returns { GUID }
    */
    get Id() {
        const { Id } = super.get(secureContext);
        return Id;
    }
    /**
     * @returns { String | Uninitialised }
    */
    get name() {
        const { name } = super.get(secureContext);
        return name;
    }
    /**
     * @returns { Object | Uninitialised }
    */
    get type() {
        const { type } = super.get(secureContext);
        return type;
    }
    /**
     * @returns { Boolean | Uninitialised }
    */
    get isPrimitive() {
        const { isPrimitive } = super.get(secureContext);
        return isPrimitive;
    }
    /**
     * @returns { Boolean | Uninitialised }
    */
    get isClass() {
        const { isClass } = super.get(secureContext);
        return isClass;
    }
}