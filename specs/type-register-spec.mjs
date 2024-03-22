import { GUID, Reflection, TypeRegister } from '../registry.mjs';
import { Dog } from './index.mjs';
describe('when registering a type', () => {
    it(`should register undefined primitive type without error`, () => {
        const { name } = Reflection.getPrimitiveTypes().find(x => x.name === 'undefined');
        try {
            const typeRegister = new TypeRegister(name);

            expect(typeRegister.Id).toBeDefined();
            expect(typeRegister.Id).not.toBeNull();
            expect(typeRegister.Id).toBeInstanceOf(GUID);

            expect(typeRegister.type).not.toBeDefined();
            expect(typeRegister.type).not.toBeNull();

            expect(typeRegister.name).toBeDefined();
            expect(typeRegister.name).not.toBeNull();
            expect(typeRegister.name).toBe('undefined');

            expect(typeRegister.isClass).toBeDefined();
            expect(typeRegister.isClass).not.toBeNull();
            expect(typeRegister.isClass).toBeFalse();

            expect(typeRegister.isPrimitive).toBeDefined();
            expect(typeRegister.isPrimitive).not.toBeNull();
            expect(typeRegister.isPrimitive).toBeTrue();

        } catch (error) {
            console.log(error);
            fail(`did not expected any errors when registering an undefined primitive type.`);
        }
    });
    it(`should register null primitive type without error`, () => {
        const { name } = Reflection.getPrimitiveTypes().find(x => x.name === 'null');
        try {
            const typeRegister = new TypeRegister(name);

            expect(typeRegister.Id).toBeDefined();
            expect(typeRegister.Id).not.toBeNull();
            expect(typeRegister.Id).toBeInstanceOf(GUID);

            expect(typeRegister.type).toBeDefined();
            expect(typeRegister.type).toBeNull();

            expect(typeRegister.name).toBeDefined();
            expect(typeRegister.name).not.toBeNull();
            expect(typeRegister.name).toBe('null');

            expect(typeRegister.isClass).toBeDefined();
            expect(typeRegister.isClass).not.toBeNull();
            expect(typeRegister.isClass).toBeFalse();

            expect(typeRegister.isPrimitive).toBeDefined();
            expect(typeRegister.isPrimitive).not.toBeNull();
            expect(typeRegister.isPrimitive).toBeTrue();

        } catch (error) {
            console.log(error);
            fail(`did not expected any errors when registering an undefined primitive type.`);
        }
    });
    it(`should register primitive types without error`, () => {
        for (const { name, type } of Reflection.getPrimitiveTypes().filter(x => x.name !== 'undefined' && x.name !== 'null')) {
            try {
                const typeRegister = new TypeRegister(type);

                expect(typeRegister.Id).toBeDefined();
                expect(typeRegister.Id).not.toBeNull();
                expect(typeRegister.Id).toBeInstanceOf(GUID);

                expect(typeRegister.type).toBeDefined();
                expect(typeRegister.type).not.toBeNull();
                expect(typeRegister.type).toBe(type);

                expect(typeRegister.name).toBeDefined();
                expect(typeRegister.name).not.toBeNull();
                expect(typeRegister.name).toBe(name);

                expect(typeRegister.isClass).toBeDefined();
                expect(typeRegister.isClass).not.toBeNull();
                expect(typeRegister.isClass).toBeFalse();

                expect(typeRegister.isPrimitive).toBeDefined();
                expect(typeRegister.isPrimitive).not.toBeNull();
                expect(typeRegister.isPrimitive).toBeTrue();

            } catch (error) {
                console.log(error);
                fail(`did not expected any errors when registering ${name}`);
            }
        }
    });
    it(`should register class types without error`, () => {
        try {
            const typeRegister = new TypeRegister(Dog);

            expect(typeRegister.Id).toBeDefined();
            expect(typeRegister.Id).not.toBeNull();
            expect(typeRegister.Id).toBeInstanceOf(GUID);

            expect(typeRegister.type).toBeDefined();
            expect(typeRegister.type).not.toBeNull();
            expect(typeRegister.type).toBe(Dog);

            expect(typeRegister.name).toBeDefined();
            expect(typeRegister.name).not.toBeNull();
            expect(typeRegister.name).toBe(Dog.name);

            expect(typeRegister.isClass).toBeDefined();
            expect(typeRegister.isClass).not.toBeNull();
            expect(typeRegister.isClass).toBeTrue();

            expect(typeRegister.isPrimitive).toBeDefined();
            expect(typeRegister.isPrimitive).not.toBeNull();
            expect(typeRegister.isPrimitive).toBeFalse();

        } catch (error) {
            console.log(error);
            fail(`did not expected any errors when registering ${Dog.name}`);
        }
    });
    it(`should reconstruct registered class without error`, () => {
        try {
            const typeRegister = new TypeRegister(Dog);

            expect(typeRegister.Id).toBeDefined();
            expect(typeRegister.Id).not.toBeNull();
            expect(typeRegister.Id).toBeInstanceOf(GUID);

            expect(typeRegister.type).toBeDefined();
            expect(typeRegister.type).not.toBeNull();
            expect(typeRegister.type).toBe(Dog);

            expect(typeRegister.name).toBeDefined();
            expect(typeRegister.name).not.toBeNull();
            expect(typeRegister.name).toBe(Dog.name);

            expect(typeRegister.isClass).toBeDefined();
            expect(typeRegister.isClass).not.toBeNull();
            expect(typeRegister.isClass).toBeTrue();

            expect(typeRegister.isPrimitive).toBeDefined();
            expect(typeRegister.isPrimitive).not.toBeNull();
            expect(typeRegister.isPrimitive).toBeFalse();

            const sameTypeRegister = new TypeRegister(null, typeRegister.Id);

            expect(sameTypeRegister.Id).toBe(typeRegister.Id);
            expect(sameTypeRegister.type).toBe(typeRegister.type);
            expect(sameTypeRegister.name).toBe(typeRegister.name);
            expect(sameTypeRegister.isClass).toBe(typeRegister.isClass);
            expect(sameTypeRegister.isPrimitive).toBe(typeRegister.isPrimitive);

        } catch (error) {
            console.log(error);
            fail(`did not expected any errors when registering ${Dog.name}`);
        }
    });
    it(`should raise an error if no type is provided`, () => {
        try {
            new TypeRegister();
            fail('expected an error');
        } catch (error) {
            console.log(error);
            expect(error.message).toBe(`The type argument is unknown.`);
        }
    });
});