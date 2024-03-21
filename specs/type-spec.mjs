
const defaultTypes = [
    String,
    Boolean,
    BigInt,
    Number,
    null,
    undefined,
    Array,
    Object
];
describe('when getting an undefined type', () => {
    it(`should return the type without error`, () => {
        try {
            const found = type.get({ type: undefined });
            expect(found.type).not.toBeDefined();
            expect(found.type).not.toBeNull();
            expect(found.name).toBe('undefined');
            expect(found.isPrimitive).toBeTrue();
        } catch (error) {
            console.log(error);
            fail(`did not expected any errors when constructing undefined type`);
        }
    });
});
describe('when getting a null type', () => {
    it(`should return the type without error`, () => {
        try {
            const found = type.get({ type: null });
            expect(found.type).toBeDefined();
            expect(found.type).toBeNull();
            expect(found.name).toBe('null');
            expect(found.isPrimitive).toBeTrue();
        } catch (error) {
            console.log(error);
            fail(`did not expected any errors when constructing undefined type`);
        }
    });
});
describe('when creating types given primitive types.', () => {
    it(`should resolve the type`, () => {
        for (const _type of defaultTypes.filter(x => x !== undefined && x !== null)) {
            try {
                const found = type.get({ type: _type });
                expect(found.type).toBeDefined();
                expect(found.type).toBe(_type);
            } catch (error) {
                console.log(error);
                fail(`did not expected any errors when creating ${_type}`);
            }
        }
    });
});