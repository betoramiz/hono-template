import { createContainer, asClass, InjectionMode } from 'awilix';
import { UserRepository } from "./persistance/repositories/UserRepository.js";
import * as UserModule  from '@modules/users/index.js'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Obtenemos la ruta absoluta del directorio actual (equivalente a __dirname en CommonJS)
// const __dirname = dirname(fileURLToPath(import.meta.url));

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});


container.register({
  userRepository: asClass(UserRepository).singleton(),
  createUser: asClass(UserModule.CreateUser).scoped(),
  getUserList: asClass(UserModule.GetList).scoped()
});


// Al usar ESM nativo, la carga dinámica requiere top-level await y el flag de esModules
// Usamos ../ para retroceder desde infrastructure hacia core
// ** busca recursivamente en cualquier subcarpeta
// await container.loadModules(
//   [
//     '../core/modules/*/application/**/*.usecase.{ts,js}'
//   ],
//   {
//     cwd: __dirname,
//     formatName: 'camelCase',
//     resolverOptions: { register: asClass, lifetime: 'SCOPED' }
//   }
// );