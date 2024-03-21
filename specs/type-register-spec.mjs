import { Reflection, TypeRegisterId } from '../registry.mjs';
import { Animal, Dog, TestTypeRegister } from './index.mjs';
fdescribe('when registering a type', () => {
    it(`should register undefined primitive type without error`, () => {
        const { name } = Reflection.getPrimitiveTypes().find(x => x.name === 'undefined');
        try {
            const typeRegister = new TestTypeRegister(name);
            expect(typeRegister.Id).toBeDefined();
            expect(typeRegister.Id).not.toBeNull();
            expect(typeRegister.Id).toBeInstanceOf(TypeRegisterId);
            expect(typeRegister.type).not.toBeNull();
            expect(typeRegister.type).not.toBeDefined();
            expect(typeRegister.name).toBeDefined();
            expect(typeRegister.name).not.toBeNull();
            expect(typeRegister.name).toBe('undefined');
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
            expect(typeRegister.Id).toBeInstanceOf(TypeRegisterId);
            expect(typeRegister.type).toBeDefined();
            expect(typeRegister.type).toBeNull();
            expect(typeRegister.typeName).toBeDefined();
            expect(typeRegister.typeName).not.toBeNull();
            expect(typeRegister.typeName).toBe('null');
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
                expect(typeRegister.Id).toBeInstanceOf(TypeRegisterId);
                expect(typeRegister.type).toBe(type);
                expect(typeRegister.type).not.toBeNull();
                expect(typeRegister.typeName).toBeDefined();
                expect(typeRegister.typeName).not.toBeNull();
                expect(typeRegister.typeName).toBe(name);
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
            expect(typeRegister.Id).toBeInstanceOf(TypeRegisterId);
            expect(typeRegister.type).toBeDefined();
            expect(typeRegister.type).not.toBeNull();
            expect(typeRegister.type).toBe(Dog);
            expect(typeRegister.typeName).toBeDefined();
            expect(typeRegister.typeName).not.toBeNull();
            expect(typeRegister.typeName).toBe(Dog.name);
        } catch (error) {
            console.log(error);
            fail(`did not expected any errors when registering ${Dog.name}`);
        }
    });
    it(`should get additional data without error`, () => {
        try {
            const typeRegister = new TestTypeRegister(Animal);
            expect(typeRegister.Id).toBeDefined();
            expect(typeRegister.Id).not.toBeNull();
            expect(typeRegister.Id).toBeInstanceOf(TypeRegisterId);
            expect(typeRegister.type).toBeDefined();
            expect(typeRegister.type).not.toBeNull();
            expect(typeRegister.type).toBe(Animal);
            expect(typeRegister.typeName).toBeDefined();
            expect(typeRegister.typeName).not.toBeNull();
            expect(typeRegister.typeName).toBe(Animal.name);
            typeRegister.set({ data: 'some data' })
            const data = typeRegister.get(Object.prototype);
            expect(data).toBeDefined();
            expect(data).not.toBeNull();
            expect(data).toBeInstanceOf(Object);

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
            expect(error.message).toBe(`could not find type.`);
        }
    });
});