import { TypeMemberDecorator, TypeRegisterId } from "../../registry.mjs";
export class TestTypeMemberDecorator extends TypeMemberDecorator {
    /**
     * @param { class } type
     * @param { String } memberName
     * @param { class } memberType
    */
    constructor(type, memberName, memberType) {
        super(undefined, type, memberName, memberType);
    }
}