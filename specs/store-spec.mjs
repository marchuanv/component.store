import { Schema, SecureContext, Store, TypeInfo } from '../registry.mjs';
describe('when constructing stores given metadata and secure context', () => {
    class TestStore extends Store { }
    it(`should get the same store instances for the same schema and secure context`, () => {
        const secureContext = new SecureContext();
        try {
            class TestSchemaA extends Schema {
                constructor() {
                    super([{
                        name: 'message',
                        typeInfo: new TypeInfo({ type: String })
                    }]);
                }
            }
            class TestSchemaB extends Schema {
                constructor() {
                    super([{
                        name: 'message',
                        typeInfo: new TypeInfo({ type: String })
                    }]);
                }
            }

            const schemaA = new TestSchemaA();
            const schemaB = new TestSchemaB();

            const store1 = new TestStore(schemaA, secureContext);
            const store2 = new TestStore(schemaB, secureContext);

            store1.set({ message: 'Hello World A' }, secureContext);
            store2.set({ message: 'Hello World B' }, secureContext);

            const data1 = store1.get(secureContext);
            expect(data1).toBeDefined();
            expect(data1).not.toBeNull();
            expect(data1).toEqual({ message: 'Hello World B' });

            const data2 = store2.get(secureContext);
            expect(data2).toBeDefined();
            expect(data2).not.toBeNull();
            expect(data2).toEqual({ message: 'Hello World B' });
        } catch (error) {
            console.log(error);
            fail('did not expected any errors');
        }
    });
    it(`should get different store instances for different schemas and the same secure context`, () => {
        const secureContext = new SecureContext();
        try {
            class TestSchemaA extends Schema {
                constructor() {
                    super([{
                        name: 'message1',
                        typeInfo: new TypeInfo({ type: String })
                    }]);
                }
            }
            class TestSchemaB extends Schema {
                constructor() {
                    super([{
                        name: 'message2',
                        typeInfo: new TypeInfo({ type: String })
                    }]);
                }
            }

            const schemaA = new TestSchemaA();
            const schemaB = new TestSchemaB();

            const store1 = new TestStore(schemaA, secureContext);
            const store2 = new TestStore(schemaB, secureContext);

            store1.set({ message1: 'Hello World A' }, secureContext);
            store2.set({ message2: 'Hello World B' }, secureContext);

            const data1 = store1.get(secureContext);
            expect(data1).toBeDefined();
            expect(data1).not.toBeNull();
            expect(data1).toEqual({ message1: 'Hello World A' });

            const data2 = store2.get(secureContext);
            expect(data2).toBeDefined();
            expect(data2).not.toBeNull();
            expect(data2).toEqual({ message2: 'Hello World B' });

        } catch (error) {
            console.log(error);
            fail('did not expected any errors');
        }
    });
    it(`should get different store instances for the same schemas but different secure context`, () => {
        const secureContextA = new SecureContext();
        const secureContextB = new SecureContext();
        try {
            class TestSchemaA extends Schema {
                constructor() {
                    super([{
                        name: 'message',
                        typeInfo: new TypeInfo({ type: String })
                    }]);
                }
            }
            class TestSchemaB extends Schema {
                constructor() {
                    super([{
                        name: 'message',
                        typeInfo: new TypeInfo({ type: String })
                    }]);
                }
            }

            const schemaA = new TestSchemaA();
            const schemaB = new TestSchemaB();

            const store1 = new TestStore(schemaA, secureContextA);
            const store2 = new TestStore(schemaB, secureContextB);
            expect(store1).not.toBe(store2);

            store1.set({ message: 'Hello World A' }, secureContextA);
            store2.set({ message: 'Hello World B' }, secureContextB);

            const data1 = store1.get(secureContextA);
            expect(data1).toBeDefined();
            expect(data1).not.toBeNull();
            expect(data1).toEqual({ message: 'Hello World A' });

            const data2 = store2.get(secureContextB);
            expect(data2).toBeDefined();
            expect(data2).not.toBeNull();
            expect(data2).toEqual({ message: 'Hello World B' });

        } catch (error) {
            console.log(error);
            fail('did not expected any errors');
        }
    });
    it('should raise an error when getting data from the same store instance but with different secure context', () => {
        const secureContextA = new SecureContext();
        const secureContextB = new SecureContext();
        try {
            class TestSchemaA extends Schema {
                constructor() {
                    super([{
                        name: 'message',
                        typeInfo: new TypeInfo({ type: String })
                    }]);
                }
            }

            const schemaA = new TestSchemaA();

            const store1 = new TestStore(schemaA, secureContextA);
            const store2 = new TestStore(schemaA, secureContextA);
            expect(store1).toBe(store2);

            store1.set({ message: 'Hello World A' }, secureContextA);
            store2.set({ message: 'Hello World B' }, secureContextA);

            const data1 = store1.get(secureContextA);
            expect(data1).toBeDefined();
            expect(data1).not.toBeNull();

            const data2 = store1.get(secureContextA);
            expect(data2).toBeDefined();
            expect(data2).not.toBeNull();

            store1.get(secureContextB);
            store2.get(secureContextB);

            fail('expected an error to be raised.');
        } catch (error) {
            console.log(error);
            expect(error.message).toBe('StoreError: secure context is not valid.');
        }
    });
    it('should raise an error when setting data with a different secure context', () => {
        const secureContextA = new SecureContext();
        const secureContextB = new SecureContext();
        try {
            class TestSchemaA extends Schema {
                constructor() {
                    super([{
                        name: 'message',
                        typeInfo: new TypeInfo({ type: String })
                    }]);
                }
            }

            const schemaA = new TestSchemaA();

            const store1 = new TestStore(schemaA, secureContextA);
            const store2 = new TestStore(schemaA, secureContextA);
            expect(store1).toBe(store2);

            store1.set({ message: 'Hello World A' }, secureContextB);
            store2.set({ message: 'Hello World B' }, secureContextB);

            fail('expected an error to be raised.');
        } catch (error) {
            console.log(error);
            expect(error.message).toBe('StoreError: secure context is not valid.');
        }
    });
    it(`should raise an error if the secure context is not an object`, () => {
        const invalidSecureContext = '';
        try {
            class TestSchemaA extends Schema {
                constructor() {
                    super([{
                        name: 'message',
                        typeInfo: new TypeInfo({ type: String })
                    }]);
                }
            }
            const schemaA = new TestSchemaA();
            new TestStore(schemaA, invalidSecureContext);
            fail('expected an error to be raised.');
        } catch (error) {
            console.log(error);
            expect(error).toBeDefined();
            expect(error).not.toBeNull();
            expect(error.message).toBe(`The secureContext argument is undefined, null, or not a ${SecureContext.name}.`);
        }
    });
    it(`should raise an error when getting data and the secure context is not a ${SecureContext.name}`, () => {
        const secureContext = new SecureContext();
        const invalidSecureContext = '';
        try {
            class TestSchemaA extends Schema {
                constructor() {
                    super([{
                        name: 'message',
                        typeInfo: new TypeInfo({ type: String })
                    }]);
                }
            }
            const schemaA = new TestSchemaA();
            const store = new TestStore(schemaA, secureContext);
            store.get(invalidSecureContext);
            fail('expected an error to be raised.');
        } catch (error) {
            console.log(error);
            expect(error).toBeDefined();
            expect(error).not.toBeNull();
            expect(error.message).toBe(`The secureContext argument is undefined, null, or not a SecureContext.`);
        }
    });
    it(`should raise an error when setting data and the secure context is not a ${SecureContext.name}`, () => {
        const secureContext = new SecureContext();
        const invalidSecureContext = '';
        try {
            class TestSchemaA extends Schema {
                constructor() {
                    super([{
                        name: 'message',
                        typeInfo: new TypeInfo({ type: String })
                    }]);
                }
            }
            const schemaA = new TestSchemaA();
            const store = new TestStore(schemaA, secureContext);
            store.set('some data', invalidSecureContext);
            fail('expected an error to be raised.');
        } catch (error) {
            console.log(error);
            expect(error).toBeDefined();
            expect(error).not.toBeNull();
            expect(error.message).toBe(`The secureContext argument is undefined, null, or not a SecureContext.`);
        }
    });
    it(`should raise an error when setting data fields that do not match the schema.`, () => {
        const secureContext = new SecureContext();
        try {
            class TestSchemaA extends Schema {
                constructor() {
                    super([{
                        name: 'message',
                        typeInfo: new TypeInfo({ type: String })
                    }]);
                }
            }
            const schemaA = new TestSchemaA();
            const store = new TestStore(schemaA, secureContext);
            store.set({ wrongProperty: 'Hello World' }, secureContext);
            fail('expected an error to be raised.');
        } catch (error) {
            console.log(error);
            expect(error.message).toBe(`data does not have the message property.`);
        }
    });
    it(`should raise an error when setting data fields that do not match the schema.`, () => {
        const secureContext = new SecureContext();
        try {
            class TestSchemaA extends Schema {
                constructor() {
                    super([{
                        name: 'message',
                        typeInfo: new TypeInfo({ type: String })
                    }]);
                }
            }
            const schemaA = new TestSchemaA();
            const store = new TestStore(schemaA, secureContext);
            store.set({ message: { shouldnotbeobject: {} } }, secureContext);
            fail('expected an error to be raised.');
        } catch (error) {
            console.log(error);
            expect(error.message).toBe(`message value is not of type String`);
        }
    });
});