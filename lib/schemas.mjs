import { GUID, Reflection } from "utils";
export class Uninitialised {
    constructor(type) {
        this.type = type;
    }
}
export class Schema {
    exsts(key) {
        return this[key] !== undefined;
    }
    validate(obj) {
        return Reflection.compareObjectKeys(this, obj);
    }
}
export class TypeRegisterSchema extends Schema {
    constructor() {
        super();
        this.name = new Uninitialised(String);
        this.type = new Uninitialised(Object);
        this.isPrimitive = new Uninitialised(Boolean);
        this.isClass = new Uninitialised(Boolean);
        this.Id = new Uninitialised(GUID);
    }
}
export class TypeDecoratorSchema extends TypeRegisterSchema {
    constructor() {
        super();
        this.members = new Uninitialised(Array);
    }
}
export class TypeMemberDecoratorSchema extends TypeDecoratorSchema {
    constructor() {
        super();
        this.memberName = new Uninitialised(String);
        this.memberType = new Uninitialised(Object);
    }
}