import { Reflection, TypeRegisterId, PrimitiveTypeRegister } from '../registry.mjs';
import { Animal, Dog, TestTypeRegister } from './index.mjs';
describe('when registering a type', () => {
    it(`should register undefined primitive type without error`, () => {
        const { name } = Reflection.getPrimitiveTypes().find(x => x.name === 'undefined');
        try {
            const typeRegister = new TestTypeRegister(name);
            expect(typeRegister.Id).toBeDefined();
            expect(typeRegister.Id).not.toBeNull();
            expect(typeRegister.Id).toBeInstanceOf(PrimitiveTypeRegister);
            expect(typeRegister.type).not.toBeNull();
            expect(typeRegister.type).not.toBeDefined();
            expect(typeRegister.name).toBeDefined();
            expect(typeRegister.name).not.toBeNull();
            expect(typeRegister.name).toBe('undefined');
            expect(typeRegister.isClass).toBeTrue();
            expect(typeRegister.isClass).not.toBeNull();
            expect(typeRegister.isClass).toBe('undefined');
        } catch (error) {
            console.log(error);
            fail(`did not expected any errors when registering an undefined primitive type.`);
        }
    });
    it(`should register null primitive type without error`, () => {
        const { name } = Reflection.getPrimitiveTypes().find(x => x.name === 'null');
        try {
            const typeRegister = new TestTypeRegister(name);
            expect(typeRegister.Id).toBeDefined();
            expect(typeRegister.Id).not.toBeNull();
            expect(typeRegister.Id).toBeInstanceOf(PrimitiveTypeRegister);
            expect(typeRegister.type).toBeDefined();
            expect(typeRegister.type).toBeNull();
            expect(typeRegister.name).toBeDefined();
            expect(typeRegister.name).not.toBeNull();
            expect(typeRegister.name).toBe('null');
        } catch (error) {
            console.log(error);
            fail(`did not expected any errors when registering an undefined primitive type.`);
        }
    });
    it(`should register primitive types without error`, () => {
        for (const { name, type } of Reflection.getPrimitiveTypes().filter(x => x.name !== 'undefined' && x.name !== 'null')) {
            try {
                const typeRegister = new TestTypeRegister(type);
                expect(typeRegister.Id).toBeDefined();
                expect(typeRegister.Id).not.toBeNull();
                expect(typeRegister.Id).toBeInstanceOf(PrimitiveTypeRegister);
                expect(typeRegister.type).toBe(type);
                expect(typeRegister.type).not.toBeNull();
                expect(typeRegister.name).toBeDefined();
                expect(typeRegister.name).not.toBeNull();
                expect(typeRegister.name).toBe(name);
            } catch (error) {
                console.log(error);
                fail(`did not expected any errors when registering ${name}`);
            }
        }
    });
    it(`should register class types without error`, () => {
        try {
            const typeRegister = new TestTypeRegister(Dog);
            expect(typeRegister.Id).toBeDefined();
            expect(typeRegister.Id).not.toBeNull();
            expect(typeRegister.Id).toBeInstanceOf(TestTypeRegister);
            expect(typeRegister.type).toBeDefined();
            expect(typeRegister.type).not.toBeNull();
            expect(typeRegister.type).toBe(Dog);
            expect(typeRegister.name).toBeDefined();
            expect(typeRegister.name).not.toBeNull();
            expect(typeRegister.name).toBe(Dog.name);
        } catch (error) {
            console.log(error);
            fail(`did not expected any errors when registering ${Dog.name}`);
        }
    });
    it(`should raise an error if no type is provided`, () => {
        try {
            new TestTypeRegister();
            fail('expected an error');
        } catch (error) {
            console.log(error);
            expect(error.message).toBe(`could not find or determine the type.`);
        }
    });
});