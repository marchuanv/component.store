
import { Type } from '../registry.mjs';
const defaultTypes = [
    String,
    Boolean,
    BigInt,
    Number,
    null,
    Array,
    Object
];
describe('when createing a type', () => {
    it(`should resolve the type`, () => {
        for (const _type of defaultTypes) {
            try {
                const type = new Type(_type);
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