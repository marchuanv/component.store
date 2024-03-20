import { Specs } from '../registry.mjs';
import { Animal } from './classes/animal.mjs';
import { Dog } from './classes/dog.mjs';
import { ID_TypeRegister } from './classes/id-type-register.mjs';
import { Type_TypeRegister } from './classes/type-type-register.mjs';
export { Animal, Dog, ID_TypeRegister, Type_TypeRegister };
const specs = new Specs(60000, './');
specs.run();