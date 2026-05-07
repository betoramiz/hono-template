import { createContainer, asClass, InjectionMode } from 'awilix';
import { UserRepository } from "./persistence/repositories/UserRepository.js";
import * as UserModule  from '../core/users/index.js'

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});


container.register({
  userRepository: asClass(UserRepository).singleton(),
  createUser: asClass(UserModule.CreateUser).scoped(),
  getUserList: asClass(UserModule.GetList).scoped()
});