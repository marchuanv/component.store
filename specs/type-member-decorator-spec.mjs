import { GUID, TypeMemberDecorator } from '../registry.mjs';
import { Dog } from './index.mjs';
describe('when creating a type decorator', () => {
    it(`should decorate a type with member data and retrieve before decorated type provided a typeDecoratorId`, () => {
        try {
            let typeDecor = new TypeMemberDecorator(Dog, null, 'age', Number);
            const originalId = typeDecor.Id;

            expect(typeDecor.Id).toBeDefined();
            expect(typeDecor.Id).not.toBeNull();
            expect(typeDecor.Id).toBeInstanceOf(GUID);

            expect(typeDecor.type).toBeDefined();
            expect(typeDecor.type).not.toBeNull();
            expect(typeDecor.type).toBe(Dog);

            expect(typeDecor.name).toBeDefined();
            expect(typeDecor.name).not.toBeNull();
            expect(typeDecor.name).toBe(Dog.name);

            expect(typeDecor.isClass).toBeDefined();
            expect(typeDecor.isClass).not.toBeNull();
            expect(typeDecor.isClass).toBeTrue();

            expect(typeDecor.isPrimitive).toBeDefined();
            expect(typeDecor.isPrimitive).not.toBeNull();
            expect(typeDecor.isPrimitive).toBeFalse();

            expect(typeDecor.memberName).toBeDefined();
            expect(typeDecor.memberName).not.toBeNull();
            expect(typeDecor.memberName).toBe('age');

            expect(typeDecor.memberType).toBeDefined();
            expect(typeDecor.memberType).not.toBeNull();
            expect(typeDecor.memberType).toBe(Number);

            typeDecor = new TypeMemberDecorator(null, originalId);

            expect(typeDecor.Id).toBeDefined();
            expect(typeDecor.Id).not.toBeNull();
            expect(typeDecor.Id).toBeInstanceOf(GUID);

            expect(typeDecor.type).toBeDefined();
            expect(typeDecor.type).not.toBeNull();
            expect(typeDecor.type).toBe(Dog);

            expect(typeDecor.name).toBeDefined();
            expect(typeDecor.name).not.toBeNull();
            expect(typeDecor.name).toBe(Dog.name);

            expect(typeDecor.isClass).toBeDefined();
            expect(typeDecor.isClass).not.toBeNull();
            expect(typeDecor.isClass).toBeTrue();

            expect(typeDecor.isPrimitive).toBeDefined();
            expect(typeDecor.isPrimitive).not.toBeNull();
            expect(typeDecor.isPrimitive).toBeFalse();

            expect(typeDecor.memberName).toBeDefined();
            expect(typeDecor.memberName).not.toBeNull();
            expect(typeDecor.memberName).toBe('age');

            expect(typeDecor.memberType).toBeDefined();
            expect(typeDecor.memberType).not.toBeNull();
            expect(typeDecor.memberType).toBe(Number);

            expect(typeDecor.Id).toBe(originalId);
        } catch (error) {
            console.log(error);
            fail(`did not expected any errors `);
        }
    });
});